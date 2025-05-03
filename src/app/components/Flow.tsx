'use client';

import React, { useCallback, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Connection,
} from 'reactflow';
import 'reactflow/dist/style.css';

import dagre from 'dagre';

const nodeWidth = 172;
const nodeHeight = 36;

function getLayoutedElements(nodes: Node[], edges: Edge[]) {
  const graph = new dagre.graphlib.Graph();
  graph.setDefaultEdgeLabel(() => ({}));
  graph.setGraph({ rankdir: 'TB' });
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
    type: 'smoothstep',
  }));
  return { layoutedNodes, layoutedEdges };
}

let idCounter = 1;

export default function Flow() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  // 拖曳節點時
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  // 邊更新時
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  // 新增連線時
  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    []
  );

  // 自動排版節點
  const handleLayout = useCallback(() => {
    const { layoutedNodes, layoutedEdges } = getLayoutedElements(nodes, edges);
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [nodes, edges]);

  // 右鍵刪除節點
  const onNodeContextMenu = useCallback(
    (event: React.MouseEvent, node: Node) => {
      event.preventDefault();
      setNodes((nds) => nds.filter((n) => n.id !== node.id));
      setEdges((eds) => eds.filter((e) => e.source !== node.id && e.target !== node.id));
    },
    []
  );

  // 按按鈕新增節點（隨機位置）
  const handleAddNode = () => {
    const x = Math.random() * 400 + 100;
    const y = Math.random() * 300 + 100;

    const newNode: Node = {
      id: `${idCounter++}`,
      data: { label: `節點 ${idCounter - 1}` },
      position: { x, y },
      type: 'default',
    };

    setNodes((nds) => [...nds, newNode]);
  };

  return (
    <div>
      <button
        onClick={handleAddNode}
        style={{
          margin: '10px',
          padding: '8px 16px',
          backgroundColor: '#d1d5db', // 淺灰色（tailwind 的 gray-300）
          color: '#1f2937',            // 深灰文字（gray-800）
          borderRadius: '6px',
          border: '1px solid #9ca3af', // 邊框灰色（gray-400）
          cursor: 'pointer',
        }}
      >
        新增節點
      </button>
      <button
        onClick={handleLayout}
        style={{
          margin: '10px',
          padding: '8px 16px',
          backgroundColor: '#d1d5db',
          color: '#1f2937',
          borderRadius: '6px',
          border: '1px solid #9ca3af',
          cursor: 'pointer',
        }}
      >
        排版
      </button>

      <div style={{ width: '100%', height: '600px' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeContextMenu={onNodeContextMenu}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}