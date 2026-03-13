import { forceSimulation, forceManyBody, forceLink, forceCenter } from "d3-force"
import { Node, Edge } from "reactflow"

export function applyForceLayout(nodes: Node[], edges: Edge[]) {

  const simulation = forceSimulation(nodes as any)
    .force("charge", forceManyBody().strength(-400))
    .force(
      "link",
      forceLink(edges as any)
        .id((d: any) => d.id)
        .distance(200)
    )
    .force("center", forceCenter(400, 300))
    .stop()

  for (let i = 0; i < 300; ++i) {
    simulation.tick()
  }

  return nodes.map((n: any) => ({
    ...n,
    position: {
      x: n.x,
      y: n.y,
    },
  }))
}