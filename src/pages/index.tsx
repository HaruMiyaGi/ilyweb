import FocusGraphWrapper from '@/components/FocusGraphWrapper';
import useResize from '@/helpers/resize';
import {
	Autocomplete,
	Button,
	Card,
	Divider,
	Flex,
	HighlightMatch,
	Loader,
	Message,
	Text,
} from '@aws-amplify/ui-react';
import { IconEdit, IconEditOff, IconTrash } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { generateClient } from 'aws-amplify/data';
import Head from 'next/head';
import { useState } from 'react';
import { Schema } from '../../amplify/data/resource';
import NodeCreateForm from '../../ui-components/NodeCreateForm';
import NodeUpdateForm from '../../ui-components/NodeUpdateForm';

const client = generateClient<Schema>();

const GRID_ID = 'grid-wrapper';

export default function Home() {
	const queryClient = useQueryClient();

	const {
		data: { width, height },
		action: onResize,
	} = useResize(GRID_ID);

	const {
		data: nodeLinks,
		isLoading: nodeLinksLoading,
		isPending: nodeLinksPending,
		isFetching: nodeLinksFetching,
	} = useQuery({
		queryKey: [`nodeLinkKey`],
		queryFn: async () => {
			const { data } = await client.models.NodeLink.list();
			return !data ? null : data;
		},
	});

	const { data, isLoading, isSuccess, isError, isPending, isFetching } =
		useQuery({
			queryKey: [`nodeKey`],
			queryFn: async () => {
				const { data } = await client.models.Node.list();
				return !data ? null : data;
			},
		});
	const deleteMutation = useMutation({
		mutationFn: async (id: string) => {
			const { data } = await client.models.Node.delete({ id });
			return data;
		},
		// When mutate is called:
		onMutate: async (id) => {
			// Cancel any outgoing refetches
			// (so they don't overwrite our optimistic update)
			await queryClient.cancelQueries({ queryKey: [`nodeKey`, id] });
			await queryClient.cancelQueries({ queryKey: [`nodeKey`] });

			// Snapshot the previous value
			const prevData = queryClient.getQueryData([`nodeKey`, id]);

			// Optimistically update to the new value
			if (prevData) {
				queryClient.setQueryData([`nodeKey`, id], id);
			}

			// Return a context with the previous and new realEstateProperty
			return { prevData, id };
		},
		// If the mutation fails, use the context we returned above
		onError: (err, data, context) => {
			console.error('Error deleting record:', err, data);
			if (context?.prevData) {
				queryClient.setQueryData([`nodeKey`, context.id], context.prevData);
			}
		},
		// Always refetch after error or success:
		onSettled: (data) => {
			if (data) {
				queryClient.invalidateQueries({
					queryKey: [`nodeKey`, data.id],
				});
				queryClient.invalidateQueries({ queryKey: [`nodeKey`] });
			}

			handleUpdateAction(true);
		},
	});

	const [previewNode, setPreviewNode] = useState<
		Schema['Node']['type'] | null
	>();
	const [previewEditNodeId, setPreviewEditNodeId] = useState<string | null>();

	const handleUpdateAction = (close: boolean) => {
		queryClient.invalidateQueries({ queryKey: [`nodeKey`] });
		queryClient.invalidateQueries({ queryKey: [`nodeLinkKey`] });
		onResize();

		if (close) {
			setPreviewEditNodeId(null);
			setPreviewNode(null);
		}
	};

	return (
		<>
			<Head>
				<title>ilyweb</title>
				<meta name="description" content="ilyweb" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div id="link-list">
				{data?.map((item) => (
					<div key={item.id}>
						{item.label} (
						{
							nodeLinks?.filter(
								({ sourceId, targetId }) =>
									sourceId === item.id || targetId === item.id,
							).length
						}
						)
					</div>
				))}
			</div>

			<div id={GRID_ID}>
				{isPending ||
				isLoading ||
				isFetching ||
				nodeLinksLoading ||
				nodeLinksPending ||
				nodeLinksFetching ? (
					<Loader />
				) : (
					<FocusGraphWrapper //
						data={data}
						nodeLinks={nodeLinks}
						width={width}
						height={height}
						onNodeSelect={(node) => setPreviewNode(node)}
					/>
				)}
			</div>

			<div id="create-node">
				<NodeCreateForm
					onSuccess={() => handleUpdateAction(true)}
					onError={() => handleUpdateAction(true)}
					overrides={{
						note: {
							display: 'none',
						},
					}}
				/>
			</div>

			{!!previewNode && (
				<Card id="preview-node">
					<Button onClick={() => setPreviewNode(null)}>Close</Button>
					<Flex alignItems={'center'}>
						<Text flex={1}>{previewNode.label}</Text>
						{previewEditNodeId === previewNode.id ? (
							<Button //
								size="small"
								gap={'0.3rem'}
								colorTheme="info"
								onClick={() => setPreviewEditNodeId(null)}
							>
								<IconEditOff />
								Cancel
							</Button>
						) : (
							<Button //
								size="small"
								gap={'0.3rem'}
								colorTheme="info"
								onClick={() => setPreviewEditNodeId(previewNode.id)}
								disabled={
									previewEditNodeId === previewNode.id ||
									deleteMutation.isPending
								}
							>
								<IconEdit />
								Edit
							</Button>
						)}

						<Button
							size="small"
							gap={'0.3rem'}
							colorTheme="warning"
							onClick={() => {
								deleteMutation.mutate(previewNode.id);
								handleUpdateAction(true);
							}}
							disabled={
								previewEditNodeId === previewNode.id ||
								deleteMutation.isPending ||
								nodeLinks?.some(
									({ targetId, sourceId }) =>
										sourceId === previewNode.id || targetId === previewNode.id,
								)
							}
						>
							<IconTrash />
							Remove
						</Button>
					</Flex>

					<Flex>
						{!!previewNode?.note && (
							<Message
								variation="outlined"
								colorTheme="neutral"
								width={'100%'}
							>
								{previewNode?.note}
							</Message>
						)}
					</Flex>

					{previewEditNodeId === previewNode.id && (
						<NodeUpdateForm
							id={previewNode.id}
							onSuccess={() => handleUpdateAction(true)}
							onError={() => handleUpdateAction(true)}
						/>
					)}

					<Divider marginTop={18} orientation="horizontal" />

					{/*  */}

					<Autocomplete
						marginTop={2}
						label="Link To"
						labelHidden={false}
						isLoading={isLoading}
						options={data as any}
						optionFilter={(opt, val) =>
							opt.id !== previewNode.id &&
							(nodeLinks?.some(
								({ targetId, sourceId }) =>
									targetId === previewNode.id && sourceId === opt.id,
							) ||
							nodeLinks?.some(
								({ targetId, sourceId }) =>
									sourceId === previewNode.id && targetId === opt.id,
							)
								? false
								: true) &&
							opt.label.toLowerCase().includes(val.toLowerCase())
						}
						renderOption={(option, value) => (
							<HighlightMatch query={value}>{option?.label}</HighlightMatch>
						)}
						onSubmit={console.log}
						onSelect={async (opt) => {
							await client.models.NodeLink.create({
								category: 'test',
								sourceId: previewNode.id,
								targetId: opt.id,
							});
							handleUpdateAction(false);
						}}
					/>

					<Autocomplete
						marginTop={2}
						label="Unlink from"
						labelHidden={false}
						isLoading={isLoading}
						options={data as any}
						optionFilter={(opt, val) =>
							opt.id !== previewNode.id &&
							(nodeLinks?.some(
								({ targetId, sourceId }) =>
									targetId === previewNode.id && sourceId === opt.id,
							) ||
							nodeLinks?.some(
								({ targetId, sourceId }) =>
									sourceId === previewNode.id && targetId === opt.id,
							)
								? true
								: false) &&
							opt.label.toLowerCase().includes(val.toLowerCase())
						}
						onSubmit={console.log}
						onSelect={async (opt) => {
							const linkNode = nodeLinks?.find(
								({ targetId, sourceId }) =>
									(targetId === previewNode.id && sourceId === opt.id) ||
									(sourceId === previewNode.id && targetId === opt.id),
							);

							if (!!linkNode) {
								await client.models.NodeLink.delete({
									id: linkNode.id as string,
								});
								handleUpdateAction(false);
							}
						}}
					/>
				</Card>
			)}
		</>
	);
}
