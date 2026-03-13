import { Node, Edge } from "reactflow";
import { parseCSV } from "./csvLoader";
import { generateLayout } from "./layout";
import { applyForceLayout } from "./forceLayout";

export async function loadSeedGraph() {
  const nodesRes = await fetch("/data/nodes.csv");
  const edgesRes = await fetch("/data/edges.csv");

  const nodesText = await nodesRes.text();
  const edgesText = await edgesRes.text();

  const nodeRows: any[] = parseCSV(nodesText);
  const edgeRows: any[] = parseCSV(edgesText);

  const nodes: Node[] = nodeRows.map((n) => ({
    id: String(n.id),
    position: { x: 0, y: 0 },
    data: {
      label: n.title,
      note: n.note,
    },
    style: {
      padding: 10,
      borderRadius: 8,
      border: "1px solid #333",
      background: "white",
    },
  }));

  //   const edges: Edge[] = edgeRows.map((e, i) => ({
  //     id: `e-${i}`,
  //     source: e.source,
  //     target: e.target,
  //     label: e.label,
  //   }))

  const edges: Edge[] = edgeRows.map((e, i) => ({
    id: `e-${i}`,
    source: String(e.source),
    target: String(e.target),
    label: e.label,
    markerEnd: { type: "arrowclosed" },
    style: { strokeWidth: 2 },
  }));

  //   const layoutedNodes = generateLayout(nodes)
  const layoutedNodes = applyForceLayout(nodes, edges);

  return { nodes: layoutedNodes, edges };
}
