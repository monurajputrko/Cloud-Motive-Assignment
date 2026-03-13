"use client";

import { useReactFlow } from "reactflow";
import GraphSearch from "./GraphSearch";
import { layoutGraph } from "@/lib/layoutGraph";

export default function GraphToolbar({ nodes, edges, onSelect, setNode }: any) {
  const { setNodes } = useReactFlow();

  const addNode = () => {
    const id = Date.now().toString();

    setNodes((nodes) => [
      ...nodes,
      {
        id,
        position: { x: Math.random() * 400, y: Math.random() * 400 },
        data: {
          label: "New Topic",
          note: "",
        },
        style: {
          padding: 10,
          borderRadius: 8,
          border: "1px solid #333",
          background: "white",
        },
      },
    ]);
  };

  return (
    <div className="flex justify-between items-center p-3 border-b">
      <button
        onClick={addNode}
        className="px-3 py-2 bg-blue-600 text-white rounded"
      >
        Add Node
      </button>

      {/* SEARCH */}
      <GraphSearch nodes={nodes} onSelect={onSelect} />

      {/* AUTO LAYOUT BUTTON */}
      <button
        onClick={() => {
          const newNodes = layoutGraph(nodes, edges);
          setNode(newNodes);
        }}
        className=" bg-blue-500 text-white px-3 py-1 rounded"
      >
        Auto Layout
      </button>
    </div>
  );
}
