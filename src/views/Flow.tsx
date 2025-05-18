"use client";

import React, { useCallback, useEffect } from "react";
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

const nodeTypes = { task: TaskNode, placeholder: PlaceholderNodeDemo };

export default function Flow() {
    const [nodes, setNodes] = useNodesState<Node>([]);
    const [edges, setEdges] = useEdgesState<Edge>([]);
    const { fitView } = useReactFlow();

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

    useEffect(() => {
        if (nodes.length !== 0) return;
        const newNode: Node = {
            id: "root",
            data: { label: "node" },
            position: { x: 100, y: 100 },
            connectable: false,
            type: "placeholder",
        };
        setNodes((nds) => [...nds, newNode]);
    }, [nodes.length, setNodes]);

    return (
        <div className="w-full h-full border rounded-md border-white relative">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={handleNodesChange}
                onEdgesChange={handleEdgesChange}
                nodeTypes={nodeTypes}
                onNodeContextMenu={onNodeContextMenu}
                fitView
            >
                <Background />
            </ReactFlow>
        </div>
    );
}
