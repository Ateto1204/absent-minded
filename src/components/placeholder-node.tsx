import React, { useCallback, ReactNode, forwardRef } from "react";
import {
    useReactFlow,
    useNodeId,
    NodeProps,
    Handle,
    Position,
    Node,
    Edge,
} from "@xyflow/react";
import { BaseNode } from "@/components/base-node";
import { v4 as uuidv4 } from "uuid";

export type PlaceholderNodeProps = Partial<NodeProps> & {
    children?: ReactNode;
};

export const PlaceholderNode = forwardRef<HTMLDivElement, PlaceholderNodeProps>(
    ({ selected, children }, ref) => {
        const id = useNodeId();
        const { setNodes, setEdges } = useReactFlow();

        const handleClick = useCallback(() => {
            if (!id) return;
            const newId1 = uuidv4();
            const newId2 = uuidv4();
            setNodes((nodes) => {
                const node = nodes.find((node) => node.id === id);
                const updatedNodes = nodes.map((node) => {
                    if (node.id === id) {
                        return {
                            ...node,
                            data: { ...node.data, label: "Node" },
                            type: "task",
                        };
                    }
                    return node;
                });
                const newNode1: Node = {
                    id: newId1,
                    data: { label: "" },
                    position: {
                        x: node?.position?.x ?? 0,
                        y: (node?.position?.y ?? 0) + 80,
                    },
                    connectable: false,
                    type: "placeholder",
                };
                if (id === "root") return [...updatedNodes, newNode1];
                const newNode2: Node = {
                    id: newId2,
                    data: { label: "" },
                    position: {
                        x: (node?.position?.x ?? 0) + 80,
                        y: (node?.position?.y ?? 0) + 80,
                    },
                    connectable: false,
                    type: "placeholder",
                };
                console.log("node 2:", newNode2);
                return [...updatedNodes, newNode1, newNode2];
            });

            setEdges((edges) => {
                const edge = edges.find((edge) => edge.target === id);
                const source = edge?.source || "root";
                const updatedEdges = edges.map((edge) =>
                    edge.target === id ? { ...edge, animated: false } : edge
                );
                const newEdge1: Edge = {
                    id: `e-${source}-${newId1}`,
                    source: source,
                    target: newId1,
                    type: "default",
                    animated: true,
                };
                if (id === "root") return [...updatedEdges, newEdge1];
                const newEdge2: Edge = {
                    id: `e-${id}-${newId2}`,
                    source: id,
                    target: newId2,
                    type: "default",
                    animated: true,
                };
                return [...updatedEdges, newEdge1, newEdge2];
            });
        }, [id, setEdges, setNodes]);

        return (
            <BaseNode
                ref={ref}
                selected={selected}
                className="w-24 border-dashed border-gray-400 bg-card p-2 text-center text-gray-400 shadow-none"
                onClick={handleClick}
            >
                {children}
                <Handle
                    type="target"
                    style={{ visibility: "hidden" }}
                    position={Position.Left}
                    isConnectable={false}
                />
                <Handle
                    type="source"
                    style={{ visibility: "hidden" }}
                    position={Position.Right}
                    isConnectable={false}
                />
            </BaseNode>
        );
    }
);

PlaceholderNode.displayName = "PlaceholderNode";
