import dagre from "dagre"
import { Node, Edge } from "reactflow"

const nodeWidth = 150
const nodeHeight = 40

export function layoutGraph(nodes: Node[], edges: Edge[]) {

  const g = new dagre.graphlib.Graph()

  g.setDefaultEdgeLabel(() => ({}))

  g.setGraph({
    rankdir: "TB", // top -> bottom
    nodesep: 80,
    ranksep: 120
  })

  nodes.forEach((node) => {
    g.setNode(node.id, {
      width: nodeWidth,
      height: nodeHeight
    })
  })

  edges.forEach((edge) => {
    g.setEdge(edge.source, edge.target)
  })

  dagre.layout(g)

  return nodes.map((node) => {

    const pos = g.node(node.id)

    return {
      ...node,
      position: {
        x: pos.x - nodeWidth / 2,
        y: pos.y - nodeHeight / 2
      }
    }

  })
}