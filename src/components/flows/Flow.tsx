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

import TaskNode from "@/components/nodes/TaskNode";
import PlaceholderNodeDemo from "@/components/nodes/PlaceholderNodeDemo";
import getLayoutedElements from "@/utils/getLayoutedElements";
import { useTaskContext } from "@/context/TaskContext";
import {
    tasksToEdges,
    tasksToNodes,
    tasksToNodeTasks,
} from "@/utils/taskParser";
import { useProjectContext } from "@/context/ProjectContext";
import { Flex } from "@radix-ui/themes";
import StateBar from "@/components/flows/StateBar";
import { useUserContext } from "@/context/UserContext";

const nodeTypes = { task: TaskNode, placeholder: PlaceholderNodeDemo };

export default function Flow() {
    const [nodes, setNodes] = useNodesState<Node>([]);
    const [edges, setEdges] = useEdgesState<Edge>([]);
    const { fitView } = useReactFlow();
    const { tasks, loading, deleteTask } = useTaskContext();
    const [mounted, setMounted] = useState(false);
    const { currentProject } = useProjectContext();
    const { userEmail } = useUserContext();

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
        if ((!mounted && loading) || !currentProject) return;
        const nodeTasks = tasksToNodeTasks(tasks, currentProject.id, userEmail);
        const initNodes = tasksToNodes(nodeTasks);
        const initEdges = tasksToEdges(nodeTasks, currentProject.rootTask);
        const { layoutedNodes, layoutedEdges } = getLayoutedElements(
            initNodes,
            initEdges
        );
        setNodes(layoutedNodes);
        setEdges(layoutedEdges);
        if (!mounted) setMounted(true);
    }, [
        nodes.length,
        setNodes,
        setEdges,
        loading,
        tasks,
        mounted,
        currentProject,
        userEmail,
    ]);

    return (
        <div className="w-full h-full border rounded-md border-white relative">
            {currentProject ? (
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
            ) : (
                <Flex
                    direction="column"
                    align="center"
                    justify="center"
                    className="h-full text-gray-500"
                >
                    <p className="text-xl font-semibold mb-2">
                        No project selected
                    </p>
                    <p className="text-sm">
                        Please choose or create a project from the sidebar.
                    </p>
                </Flex>
            )}
            <StateBar />
        </div>
    );
}
