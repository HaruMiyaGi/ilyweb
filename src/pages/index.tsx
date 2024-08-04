import FocusGraphWrapper from '@/components/FocusGraphWrapper';
import useResize from '@/helpers/resize';
import {
	Autocomplete,
	Badge,
	Button,
	Card,
	Flex,
	HighlightMatch,
	Loader,
	SearchField,
} from '@aws-amplify/ui-react';
import { IconTrash, IconX } from '@tabler/icons-react';
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
			return !data
				? null
				: data.sort((a, b) => {
						return (
							new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
						);
					});
		},
	});

	const { data, isLoading, isSuccess, isError, isPending, isFetching } =
		useQuery({
			queryKey: [`nodeKey`],
			queryFn: async () => {
				const { data } = await client.models.Node.list();
				return !data
					? null
					: data.sort((a, b) => {
							return (
								new Date(b.createdAt).getTime() -
								new Date(a.createdAt).getTime()
							);
						});
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

	const handleUpdateAction = (close: boolean) => {
		queryClient.invalidateQueries({ queryKey: [`nodeKey`] });
		queryClient.invalidateQueries({ queryKey: [`nodeLinkKey`] });
		onResize();

		if (close) {
			setPreviewNode(null);
		}
	};

	const [linkTo, setLinkTo] = useState<string>('');
	const [linkFrom, setLinkFrom] = useState<string>('');

	const getLinkedNodes = (nodeId: string) => {
		const connectedLinks = nodeLinks?.filter(
			({ sourceId, targetId }) => sourceId === nodeId || targetId === nodeId,
		);
		const availableNodes = data?.filter(({ id }) =>
			connectedLinks?.some(
				(link) =>
					(link.sourceId === id || link.targetId === id) && id !== nodeId,
			),
		);
		return availableNodes;
	};

	// const [globalSearch, setGlobalSearch] = useState('');

	return (
		<>
			<Head>
				<title>ilyweb</title>
				<meta name="description" content="ilyweb" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div id="global-search">
				<SearchField
					label="Search"
					placeholder="Search here..."
					onSubmit={(searchValue) => console.log(searchValue)}
					onClear={() => console.log('clear')}
				/>
			</div>

			<div id="link-list">
				{data?.map((node) => (
					<div
						className={`link-item ${previewNode?.id === node.id ? 'active' : ''}`}
						key={node.id}
						onClick={() => setPreviewNode(node)}
					>
						{node.label} ({getLinkedNodes(node.id)?.length || 0})
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
						ClearButton: {
							size: 'small',
						},
						SubmitButton: {
							children: 'Create',
							size: 'small',
						},
						label: {
							size: 'small',
							label: '',
							placeholder: 'Enter name',
							errorMessage: '',
						},
						note: {
							display: 'none',
						},
					}}
				/>
			</div>

			{!!previewNode && (
				<Card id="preview-node">
					<Flex alignItems={'center'} justifyContent={'flex-end'}>
						<Button
							size="small"
							gap={'0.3rem'}
							colorTheme="warning"
							onClick={() => {
								deleteMutation.mutate(previewNode.id);
								handleUpdateAction(true);
							}}
							disabled={
								deleteMutation.isPending ||
								nodeLinks?.some(
									({ targetId, sourceId }) =>
										sourceId === previewNode.id || targetId === previewNode.id,
								)
							}
						>
							<IconTrash />
							Delete
						</Button>
						<Button size="small" onClick={() => setPreviewNode(null)}>
							<IconX />
							Close
						</Button>
					</Flex>

					<NodeUpdateForm
						id={previewNode.id}
						onSuccess={(updatedData) => {
							setPreviewNode((prev: any) => {
								return { ...prev, ...updatedData };
							});

							handleUpdateAction(false);
						}}
						onError={() => handleUpdateAction(false)}
						overrides={{
							SubmitButton: {
								children: 'Update',
							},
							ResetButton: {
								children: 'Undo',
							},
						}}
					/>

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
						onChange={(e) => setLinkTo(e.target.value)}
						value={linkTo}
						onSelect={async (opt) => {
							await client.models.NodeLink.create({
								category: 'test',
								sourceId: previewNode.id,
								targetId: opt.id,
							});
							handleUpdateAction(false);
							setLinkTo('');
						}}
					/>

					<Autocomplete
						marginTop={2}
						label="Unlink From"
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
						value={linkFrom}
						onChange={(e) => setLinkFrom(e.target.value)}
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
								setLinkFrom('');
							}
						}}
					/>

					<Flex gap={6} wrap={'wrap'} marginTop={14}>
						{getLinkedNodes(previewNode.id)?.map((node) => (
							<Badge
								variation="info"
								style={{ cursor: 'pointer' }}
								key={node.id}
								onClick={() => setPreviewNode(node)}
							>
								{node.label}
							</Badge>
						))}
					</Flex>
				</Card>
			)}
		</>
	);
}
