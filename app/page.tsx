"use client"

import { useEffect, useState } from "react"
import { loadSeedGraph } from "@/lib/loadSeedGraph"
import { loadGraph } from "@/hooks/useGraphStorage"
import { ReactFlowProvider } from "reactflow"
import GraphCanvas from "@/components/graph/GraphCanvas"

export default function Home() {

  const [nodes, setNodes] = useState<any[]>([])
  const [edges, setEdges] = useState<any[]>([])

  useEffect(() => {

    async function init() {

      const saved = loadGraph()

      if (saved) {
        setNodes(saved.nodes)
        setEdges(saved.edges)
        return
      }

      const data = await loadSeedGraph()

      setNodes(data.nodes)
      setEdges(data.edges)
    }

    init()

  }, [])

  if (!nodes.length) return <div>Loading graph...</div>

  return (
    <ReactFlowProvider>


      <GraphCanvas
        initialNodes={nodes}
        initialEdges={edges}
      />

    </ReactFlowProvider>
  )
}