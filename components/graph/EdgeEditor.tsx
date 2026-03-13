"use client";

import { Edge } from "reactflow";
import { useState } from "react";

export default function EdgeEditor({ edge, edges, setEdges, onClose }: any) {
  const [label, setLabel] = useState(edge.label);

  const updateEdge = () => {
    const updated = edges.map((e: Edge) =>
      e.id === edge.id
        ? {
            ...e,
            label,
          }
        : e,
    );

    setEdges(updated);

    onClose();
  };

  const deleteEdge = () => {
    setEdges((eds: Edge[]) => eds.filter((e) => e.id !== edge.id));
    onClose();
  };

  return (
    <div className="w-80 border-l bg-white p-4">
      <h2 className="font-bold mb-3">Edit Relationship</h2>

      <input
        className="w-full border p-2 mb-3"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      />
 <div className="flex gap-2">
      <button
        onClick={updateEdge}
        className="bg-blue-600 text-white px-3 py-2 rounded"
      >
        Save
      </button>
      <button
        onClick={deleteEdge}
       className="bg-red-600 text-white px-3 py-2 rounded"
      >
        Delete
      </button>
      <button onClick={onClose} 
       className="  border px-3 py-2 rounded">
        Cancel
      </button>
      </div>
    </div>
  );
}
