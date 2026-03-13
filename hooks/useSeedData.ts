import { useEffect } from "react"
import { useGraphStore } from "@/store/graphStore"
import { loadGraph } from "./useGraphStorage"

export function useSeedData(seedNodes: any, seedEdges: any) {
  const { setNodes, setEdges } = useGraphStore()

  useEffect(() => {
    const saved = loadGraph()

    if (saved) {
      setNodes(saved.nodes)
      setEdges(saved.edges)
    } else {
      setNodes(seedNodes)
      setEdges(seedEdges)
    }
  }, [])
}