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
import { useTaskContext } from "@/context/TaskContext";
import Task from "@/models/entities/Task";

export type PlaceholderNodeProps = Partial<NodeProps> & {
    children?: ReactNode;
};

export const PlaceholderNode = forwardRef<HTMLDivElement, PlaceholderNodeProps>(
    ({ selected, children }, ref) => {
        const id = useNodeId();
        const { setNodes, setEdges } = useReactFlow();
        const { addTask } = useTaskContext();

        const createNode = useCallback(
            (id: string, x: number, y: number) => {
                const task: Task = {
                    id: id,
                    data: { label: "" },
                };
                addTask(task);
                const newNode: Node = {
                    id: id,
                    data: { label: "" },
                    position: { x, y },
                    connectable: false,
                    type: "placeholder",
                };
                return newNode;
            },
            [addTask]
        );

        const createEdge = (source: string, target: string) => {
            const newEdge: Edge = {
                id: `e-${source}-${target}`,
                source,
                target,
                type: "default",
                animated: true,
            };
            return newEdge;
        };

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
                const newNode1: Node = createNode(
                    newId1,
                    node?.position?.x ?? 0,
                    (node?.position?.y ?? 0) + 80
                );
                if (id === "root") return [...updatedNodes, newNode1];
                const newNode2: Node = createNode(
                    newId2,
                    (node?.position?.x ?? 0) + 80,
                    (node?.position?.y ?? 0) + 80
                );
                return [...updatedNodes, newNode1, newNode2];
            });

            setEdges((edges) => {
                const edge = edges.find((edge) => edge.target === id);
                const source = edge?.source || "root";
                const updatedEdges = edges.map((edge) =>
                    edge.target === id ? { ...edge, animated: false } : edge
                );
                const newEdge1: Edge = createEdge(source, newId1);
                if (id === "root") return [...updatedEdges, newEdge1];
                const newEdge2: Edge = createEdge(id, newId2);
                return [...updatedEdges, newEdge1, newEdge2];
            });
        }, [id, setEdges, setNodes, createNode]);

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
