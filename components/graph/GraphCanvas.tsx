"use client";

import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  Connection,
  Edge,
  Node,
  MarkerType,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "reactflow";

import "reactflow/dist/style.css";

import { useEffect, useState } from "react";
import { saveGraph } from "@/hooks/useGraphStorage";

import NodeEditor from "./NodeEditor";
import EdgeEditor from "./EdgeEditor";
import GraphSearch from "./GraphSearch";
import { layoutGraph } from "@/lib/layoutGraph";
import { loadSeedGraph } from "@/lib/loadSeedGraph";
import GraphToolbar from "./GraphToolbar";

type Props = {
  initialNodes: Node[];
  initialEdges: Edge[];
};

export default function GraphCanvas({ initialNodes, initialEdges }: Props) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [editingEdge, setEditingEdge] = useState<Edge | null>(null);

  const { getZoom, setCenter } = useReactFlow();
  const [zoom, setZoom] = useState(1);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || null;

  /* ---------------- PERSIST GRAPH ---------------- */

  useEffect(() => {
    saveGraph({ nodes, edges });
  }, [nodes, edges]);

  /* ---------------- INITIAL LAYOUT ---------------- */

  useEffect(() => {
    const handleNodeAndEdges = async () => {
      const raw = localStorage.getItem("knowledge-graph");

      if (raw) {
        const saved = JSON.parse(raw);
        if (
          saved?.nodes[0]?.position?.x == 415.8805111142651 &&
          saved?.nodes[0]?.position?.y == 354.6026556918796
        ) {
          const laidOutNodes = layoutGraph(saved.nodes, saved.edges);

          setNodes(laidOutNodes);
          setEdges(saved.edges);
          return;
        }
        setNodes(saved.nodes);
        setEdges(saved.edges);
      } else {
        const data = await loadSeedGraph();

        const laidOutNodes = layoutGraph(data.nodes, data.edges);

        setNodes(laidOutNodes);
        setEdges(data.edges);
      }
    };
    handleNodeAndEdges();
  }, []);

  /* ---------------- ZOOM TRACK ---------------- */

  const onMove = () => {
    setZoom(getZoom());
  };

  /* ---------------- CONNECT EDGE ---------------- */

  const onConnect = (connection: Connection) => {
    if (!connection.source || !connection.target) return;

    const newEdge: Edge = {
      ...connection,
      source: connection.source,
      target: connection.target,
      id: `${connection.source}-${connection.target}`,
      label: "relates to",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { strokeWidth: 2 },
    };

    setEdges((eds) => addEdge(newEdge, eds));
  };

  /* ---------------- NODE CLICK ---------------- */

  const onNodeClick = (_: any, node: Node) => {
    setSelectedNodeId(node.id);
  };

  /* ---------------- EDGE EDIT ---------------- */

  const onEdgeDoubleClick = (_: any, edge: Edge) => {
    setEditingEdge(edge);
  };

  /* ---------------- SEARCH SELECT ---------------- */

  const handleSearchSelect = (node: Node) => {
    setSelectedNodeId(node.id);

    setCenter(node.position.x, node.position.y, {
      zoom: 1.5,
      duration: 800,
    });
  };

  /* ---------------- DRAG SAVE ---------------- */

  const onNodeDragStop = () => {
    saveGraph({ nodes, edges });
  };

  /* ---------------- NODE HIGHLIGHT ---------------- */

  const highlightedNodes = nodes.map((node) => {
    const connected =
      selectedNodeId &&
      edges.some(
        (e) =>
          (e.source === selectedNodeId && e.target === node.id) ||
          (e.target === selectedNodeId && e.source === node.id) ||
          node.id === selectedNodeId,
      );

    return {
      ...node,
      style: {
        ...node.style,
        opacity: selectedNodeId ? (connected ? 1 : 0.15) : 1,
        transition: "all 0.25s ease",
        boxShadow:
          node.id === selectedNodeId ? "0 0 15px rgba(59,130,246,1)" : "none",
        cursor: "pointer",
      },
    };
  });

  /* ---------------- EDGE HIGHLIGHT ---------------- */

  const highlightedEdges = edges.map((edge) => {
    const connected =
      selectedNodeId &&
      (edge.source === selectedNodeId || edge.target === selectedNodeId);

    return {
      ...edge,
      animated: !!connected,
      style: {
        ...(edge.style || {}),
        strokeWidth: connected ? 3 : 1.5,
        opacity: selectedNodeId ? (connected ? 1 : 0.15) : 1,
      },
    };
  });

  const onEdgesDelete = (deleted: Edge[]) => {
    setEdges((eds) =>
      eds.filter((edge) => !deleted.some((d) => d.id === edge.id)),
    );
  };

  return (
    <>
      <GraphToolbar
        nodes={nodes}
        edges={edges}
        setNode={setNodes}
        onSelect={handleSearchSelect}
      />
      <div className="flex h-[calc(100vh-60px)]">
        {/* GRAPH */}
        <div className="flex-1">
          {/* <ReactFlow
            nodes={highlightedNodes}
            edges={highlightedEdges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onEdgeDoubleClick={onEdgeDoubleClick}
            onNodeDragStop={onNodeDragStop}
            onMove={onMove}
            onEdgesDelete={onEdgesDelete}
            onPaneClick={() => setSelectedNodeId(null)}
            fitView
          >
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow> */}
          <ReactFlow
            nodes={highlightedNodes}
            edges={highlightedEdges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onEdgeDoubleClick={onEdgeDoubleClick}
            onNodeDragStop={onNodeDragStop}
            onMove={onMove}
            onEdgesDelete={onEdgesDelete}
            deleteKeyCode={["Backspace", "Delete"]}
            onPaneClick={() => setSelectedNodeId(null)}
            fitView
          >
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
        </div>

        {/* NODE EDITOR */}
        {selectedNode && (
          <NodeEditor
            node={selectedNode}
            nodes={nodes}
            edges={edges}
            setNodes={setNodes}
            setEdges={setEdges}
            onClose={() => setSelectedNodeId(null)}
          />
        )}

        {/* EDGE EDITOR */}
        {editingEdge && (
          <EdgeEditor
            edge={editingEdge}
            edges={edges}
            setEdges={setEdges}
            onClose={() => setEditingEdge(null)}
          />
        )}
      </div>
    </>
  );
}
