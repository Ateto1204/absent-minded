import dagre from "@dagrejs/dagre";
import { Edge, Node } from "@xyflow/react";

const nodeWidth = 172;
const nodeHeight = 36;

export default function getLayoutedElements(nodes: Node[], edges: Edge[]) {
    const graph = new dagre.graphlib.Graph();
    graph.setDefaultEdgeLabel(() => ({}));
    graph.setGraph({ rankdir: "LR" });
    nodes.forEach((node) => {
        graph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });
    edges.forEach((edge) => {
        graph.setEdge(edge.source, edge.target);
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
    const layoutedEdges = edges.map((edge) => ({
        ...edge,
        type: "default",
    }));
    return { layoutedNodes, layoutedEdges };
}
