import dagre from "@dagrejs/dagre";
import { Edge, Node } from "@xyflow/react";

const nodeWidth = 172;
const nodeHeight = 36;

export default function getLayoutedElements(nodes: Node[], edges: Edge[]) {
    const graph = new dagre.graphlib.Graph();
    graph.setDefaultEdgeLabel(() => ({ weight: 1 }));
    graph.setGraph({ rankdir: "LR" });
    const nodeIds = new Set(nodes.map((node) => node.id));
    nodes.forEach((node) => {
        graph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });
    const safeEdges = edges.filter(
        (edge) =>
            edge.source &&
            edge.target &&
            nodeIds.has(edge.source) &&
            nodeIds.has(edge.target)
    );
    safeEdges.forEach((edge) => {
        graph.setEdge(edge.source, edge.target, { weight: 1 });
    });
    dagre.layout(graph);
    const layoutedNodes = nodes.map((node) => {
        const nodeWithPosition = graph.node(node.id);
        return {
            ...node,
            position: {
                x: nodeWithPosition.x - nodeWidth / 2,
                y: nodeWithPosition.y - nodeHeight / 2,
            },
        };
    });
    const layoutedEdges = safeEdges.map((edge) => ({
        ...edge,
        type: "default",
    }));
    return { layoutedNodes, layoutedEdges };
}
