// import dynamic from "next/dynamic";
import { useRef } from 'react';
import ForceGraph3D, { ForceGraphMethods } from 'react-force-graph-3d';
import SpriteText from 'three-spritetext';

interface IParams {
	data: any;
	nodeLinks: any;
	width: number;
	height: number;
	onNodeSelect: (node: any) => void;
}

export default ({ ...params }: IParams) => {
	const fgRef = useRef<ForceGraphMethods>();

	params.nodeLinks?.forEach((link: any) => {
		const a = params.data.find(({ id }: any) => id === link.sourceId);
		const b = params.data.find(({ id }: any) => id === link.targetId);

		!a.neighbors && (a.neighbors = []);
		!b.neighbors && (b.neighbors = []);
		a.neighbors.push(b);
		b.neighbors.push(a);

		!a.links && (a.links = []);
		!b.links && (b.links = []);
		a.links.push(link);
		b.links.push(link);
	});

	const highlightNodes = new Set();
	const highlightLinks = new Set();
	let hoverNode: any = null;

	function updateHighlight() {
		if (!!fgRef.current) {
			fgRef.current.refresh();
		}
	}

	return (
		<>
			<ForceGraph3D
				ref={fgRef}
				graphData={{
					nodes: params.data || [],
					links: params.nodeLinks || [],
				}}
				linkTarget="targetId"
				linkSource="sourceId"
				width={params.width}
				height={params.height}
				backgroundColor={'rgba(0,0,0,0)'}
				showNavInfo={false}
				nodeLabel="label"
				// linkLabel={'id'}
				nodeThreeObject={(node: any) => {
					const sprite = new SpriteText(node.label);
					sprite.color = highlightNodes.has(node)
						? node === hoverNode
							? 'rgba(0, 111, 238, 1)'
							: 'rgba(23, 201, 100, 1)'
						: 'rgba(236, 237, 238, 1)';
					sprite.textHeight = 8;
					return sprite;
				}}
				nodeColor={(node) =>
					highlightNodes.has(node)
						? node === hoverNode
							? 'rgba(0, 111, 238, 1)'
							: 'rgba(23, 201, 100, 1)'
						: 'rgba(63, 63, 70, 1)'
				}
				linkWidth={(link) => (highlightLinks.has(link) ? 4 : 1)}
				linkDirectionalParticles={(link) => (highlightLinks.has(link) ? 4 : 0)}
				linkDirectionalParticleWidth={4}
				onNodeHover={(node) => {
					// no state change
					if ((!node && !highlightNodes.size) || (node && hoverNode === node))
						return;

					highlightNodes.clear();
					highlightLinks.clear();
					if (node) {
						highlightNodes.add(node);
						node.neighbors?.forEach((neighbor: any) =>
							highlightNodes.add(neighbor),
						);
						node.links?.forEach((link: any) => highlightLinks.add(link));
					}

					hoverNode = node || null;

					updateHighlight();
				}}
				onLinkHover={(link) => {
					highlightNodes.clear();
					highlightLinks.clear();

					if (link) {
						highlightLinks.add(link);
						highlightNodes.add(link.source);
						highlightNodes.add(link.target);
					}

					updateHighlight();
				}}
				onNodeClick={(node: any) => {
					// const distance = 40;
					// const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

					// if (fgRef.current) {
					// 	fgRef.current.cameraPosition(
					// 		{
					// 			x: node.x * distRatio,
					// 			y: node.y * distRatio,
					// 			z: node.z * distRatio,
					// 		}, // new position
					// 		node, // lookAt ({ x, y, z })
					// 		1000, // ms transition duration
					// 	);
					// }
					params.onNodeSelect(node);
				}}
				controlType="trackball"
			/>
		</>
	);
};
