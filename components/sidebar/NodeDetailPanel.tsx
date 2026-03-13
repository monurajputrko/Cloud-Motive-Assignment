"use client"

import { useState } from "react"
import { useGraphStore } from "@/store/graphStore"

export default function NodeDetailPanel({ node }: any) {
  const { nodes, setNodes } = useGraphStore()

  const [title, setTitle] = useState(node.data.title)
  const [note, setNote] = useState(node.data.note)

  const updateNode = () => {
    const updated = nodes.map((n) =>
      n.id === node.id ? { ...n, data: { ...n.data, title, note } } : n
    )

    setNodes(updated)
  }

  return (
    <div className="w-80 p-4 border-l">
      <input
        className="border p-2 w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="border p-2 w-full mt-2"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <button
        className="mt-3 bg-black text-white px-3 py-2"
        onClick={updateNode}
      >
        Save
      </button>
    </div>
  )
}