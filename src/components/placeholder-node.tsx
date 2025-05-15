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
            const newId = uuidv4();
            setNodes((nodes) => {
                const node = nodes.find((node) => node.id === id);
                const newNode: Node = {
                    id: newId,
                    data: { label: "" },
                    position: {
                        x: node?.position?.x ?? 0,
                        y: (node?.position?.y ?? 0) + 80,
                    },
                    connectable: false,
                    type: "placeholder",
                };
                const updatedNodes = nodes.map((node) => {
                    if (node.id === id) {
                        return {
                            ...node,
                            data: { ...node.data, label: "Node" },
                            type: "custom",
                        };
                    }
                    return node;
                });
                return [...updatedNodes, newNode];
            });

            setEdges((edges) => {
                const edge = edges.find((edge) => edge.target === id);
                const source = edge?.source || "root";
                const newEdges: Edge = {
                    id: `e-${source}-${newId}`,
                    source: source,
                    target: newId,
                    type: "default",
                    animated: true,
                };
                const updatedEdges = edges.map((edge) =>
                    edge.target === id ? { ...edge, animated: false } : edge
                );
                return [...updatedEdges, newEdges];
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
