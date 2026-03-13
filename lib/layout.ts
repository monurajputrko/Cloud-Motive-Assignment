import { Node } from "reactflow"

export function generateLayout(nodes: Node[]) {
  const spacingX = 250
  const spacingY = 180
  const cols = Math.ceil(Math.sqrt(nodes.length))

  return nodes.map((node, index) => {
    const row = Math.floor(index / cols)
    const col = index % cols

    return {
      ...node,
      position: {
        x: col * spacingX,
        y: row * spacingY,
      },
    }
  })
}