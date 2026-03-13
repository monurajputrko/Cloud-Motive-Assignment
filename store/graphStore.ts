import { create } from "zustand"
import { Node, Edge } from "reactflow"

type GraphState = {
  nodes: Node[]
  edges: Edge[]
  setNodes: (nodes: Node[]) => void
  setEdges: (edges: Edge[]) => void
}

export const useGraphStore = create<GraphState>((set) => ({
  nodes: [],
  edges: [],
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
}))