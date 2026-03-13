"use client";

import { Node, Edge } from "reactflow";
import { useState } from "react";

type Props = {
  node: Node;
  nodes: Node[];
  edges: Edge[];
  setNodes: any;
  setEdges: any;
  onClose: () => void;
};

export default function NodeEditor({
  node,
  nodes,
  edges,
  setNodes,
  setEdges,
  onClose,
}: Props) {
  const [title, setTitle] = useState(node.data.label);
  const [note, setNote] = useState(node.data.note || "");

  const updateNode = () => {
    const updatedNodes = nodes.map((n) =>
      n.id === node.id
        ? {
            ...n,
            data: {
              ...n.data,
              label: title,
              note: note,
            },
          }
        : n,
    );

    setNodes(updatedNodes);
    onClose();
  };

  const deleteNode = () => {
    const filteredNodes = nodes.filter((n) => n.id !== node.id);

    const filteredEdges = edges.filter(
      (e) => e.source !== node.id && e.target !== node.id,
    );

    setNodes(filteredNodes);
    setEdges(filteredEdges);

    onClose();
  };

  return (
    <div className="w-80 border-l bg-white p-4">
      <h2 className="font-bold mb-3">Edit Node</h2>

      <label className="text-sm">Title</label>
      <input
        className="w-full border p-2 mb-3"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label className="text-sm">Note</label>
      <textarea
        className="w-full border p-2 mb-3"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <div className="flex gap-2">
        <button
          onClick={updateNode}
          className="bg-blue-600 text-white px-3 py-2 rounded"
        >
          Save
        </button>

        <button
          onClick={deleteNode}
          className="bg-red-500 text-white px-3 py-2 rounded"
        >
          Delete
        </button>

        <button onClick={onClose} className="px-3 py-2 border rounded">
          Close
        </button>
      </div>
    </div>
  );
}
