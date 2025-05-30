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
import { BaseNode } from "@/components/nodes/base-node";
import { v4 as uuidv4 } from "uuid";
import { useTaskContext } from "@/context/TaskContext";
import Task from "@/models/interfaces/task/Task";
import { useProjectContext } from "@/context/ProjectContext";
import { Tooltip } from "@radix-ui/themes";
import TaskStatus from "@/models/enums/TaskStatus";

export type PlaceholderNodeProps = Partial<NodeProps> & {
    children?: ReactNode;
};

export const PlaceholderNode = forwardRef<HTMLDivElement, PlaceholderNodeProps>(
    ({ selected, children }, ref) => {
        const id = useNodeId();
        const { setNodes, setEdges } = useReactFlow();
        const { addTask, loading } = useTaskContext();
        const { setupRootTask, currentProject } = useProjectContext();

        const createNode = (id: string, x: number, y: number) => {
            const newNode: Node = {
                id,
                data: { label: "new task" },
                position: { x, y },
                connectable: false,
                type: "placeholder",
            };
            return newNode;
        };

        const createEdge = (source: string, target: string) => {
            const newEdge: Edge = {
                id: `e-${source}-${target}`,
                source,
                target,
                type: "default",
                animated: true,
                selectable: false,
            };
            return newEdge;
        };

        const handleClick = useCallback(() => {
            if (!id || loading) return;
            const rootId = uuidv4();
            const newId1 = uuidv4();
            const newId2 = uuidv4();
            setNodes((nodes) => {
                const node = nodes.find((node) => node.id === id);
                const updatedNodes = nodes.map((node) => {
                    if (node.id === id) {
                        if (id === "root") {
                            setupRootTask(rootId);
                            return { ...node, id: rootId, type: "task" };
                        }
                        return {
                            ...node,
                            type: "task",
                        };
                    }
                    return node;
                });
                const x = node?.position?.x ?? 0;
                const y = node?.position?.y ?? 0;
                const newNode1: Node = createNode(newId1, x, y + 80);
                if (id === "root") return [...updatedNodes, newNode1];
                const newNode2: Node = createNode(newId2, x + 80, y + 80);
                return [...updatedNodes, newNode1, newNode2];
            });

            setEdges((edges) => {
                const edge = edges.find((edge) => edge.target === id);
                const source = edge?.source || "root";
                const updatedEdges = edges.map((edge) => {
                    if (edge.target === id) {
                        return { ...edge, animated: false };
                    }
                    return edge;
                });
                const task: Task = {
                    id: id === "root" ? rootId : id,
                    data: {
                        label: id === "root" ? "root" : "new task",
                        description: "",
                        start: null,
                        deadline: null,
                    },
                    parent: source,
                    status: TaskStatus.Active,
                    project: currentProject,
                };
                addTask(task);
                const newEdge1: Edge = createEdge(source, newId1);
                if (id === "root") return [...updatedEdges, newEdge1];
                const newEdge2: Edge = createEdge(id, newId2);
                return [...updatedEdges, newEdge1, newEdge2];
            });
        }, [
            id,
            setEdges,
            setNodes,
            addTask,
            loading,
            currentProject,
            setupRootTask,
        ]);

        return (
            <Tooltip content="Add new task">
                <BaseNode
                    ref={ref}
                    selected={selected}
                    className={`w-24 border-dashed border-gray-400 bg-card p-2 text-center text-gray-400 shadow-none ${
                        loading ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
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
            </Tooltip>
        );
    }
);

PlaceholderNode.displayName = "PlaceholderNode";
