"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
    ReactFlow,
    Background,
    Node,
    Edge,
    useNodesState,
    useEdgesState,
    applyNodeChanges,
    applyEdgeChanges,
    useReactFlow,
    NodeChange,
    EdgeChange,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import TaskNode from "@/components/TaskNode";
import PlaceholderNodeDemo from "@/components/PlaceholderNodeDemo";
import getLayoutedElements from "@/utils/getLayoutedElements";
import { useTaskContext } from "@/context/TaskContext";
import {
    tasksToEdges,
    tasksToNodes,
    tasksToNodeTasks,
} from "@/utils/taskParser";

const nodeTypes = { task: TaskNode, placeholder: PlaceholderNodeDemo };

export default function Flow() {
    const [nodes, setNodes] = useNodesState<Node>([]);
    const [edges, setEdges] = useEdgesState<Edge>([]);
    const { fitView } = useReactFlow();
    const { tasks, loading, success, error, deleteTask } = useTaskContext();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        fitView({ duration: 500, padding: 1 });
    }, [fitView, nodes.length]);

    const handleNodesChange = useCallback(
        (changes: NodeChange<Node>[]) => {
            setNodes((nds) => {
                const changed = applyNodeChanges(changes, nds);
                const { layoutedNodes } = getLayoutedElements(changed, edges);
                return layoutedNodes;
            });
        },
        [edges, setNodes]
    );

    const handleEdgesChange = useCallback(
        (changes: EdgeChange<Edge>[]) => {
            setEdges((eds) => {
                const changed = applyEdgeChanges(changes, eds);
                const { layoutedEdges } = getLayoutedElements(nodes, changed);
                return layoutedEdges;
            });
        },
        [nodes, setEdges]
    );

    const onNodeContextMenu = useCallback(
        (event: React.MouseEvent, node: Node) => {
            event.preventDefault();
            setNodes((nds) => nds.filter((n) => n.id !== node.id));
            setEdges((eds) =>
                eds.filter((e) => e.source !== node.id && e.target !== node.id)
            );
        },
        [setEdges, setNodes]
    );

    const onNodesDelete = useCallback(
        (deleted: Node[]) => {
            const deletedIds = new Set(deleted.map((node) => node.id));
            setNodes((nds) => nds.filter((n) => !deletedIds.has(n.id)));
            setEdges((eds) =>
                eds.filter(
                    (e) =>
                        !deletedIds.has(e.source) && !deletedIds.has(e.target)
                )
            );

            deleted.forEach((node) => {
                if (node.type === "task") {
                    deleteTask(node.id);
                }
            });
        },
        [setNodes, setEdges, deleteTask]
    );

    useEffect(() => {
        if (!mounted && loading) return;
        const nodeTasks = tasksToNodeTasks(tasks);
        const initNodes = tasksToNodes(nodeTasks);
        const initEdges = tasksToEdges(nodeTasks);
        const { layoutedNodes, layoutedEdges } = getLayoutedElements(
            initNodes,
            initEdges
        );
        setNodes(layoutedNodes);
        setEdges(layoutedEdges);
        if (!mounted) setMounted(true);
    }, [nodes.length, setNodes, setEdges, loading, tasks, mounted, success]);

    return (
        <div className="w-full h-full border rounded-md border-white relative">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={handleNodesChange}
                onEdgesChange={handleEdgesChange}
                nodeTypes={nodeTypes}
                onNodeContextMenu={onNodeContextMenu}
                onNodesDelete={onNodesDelete}
                fitView
            >
                <Background />
            </ReactFlow>

            <div className="absolute bottom-2 right-2 text-sm bg-white bg-opacity-80 p-2 rounded shadow text-black">
                {loading && <p>Loading</p>}
                {success && !loading && <p>done</p>}
                {error && !loading && <p>failed</p>}
            </div>
        </div>
    );
}
