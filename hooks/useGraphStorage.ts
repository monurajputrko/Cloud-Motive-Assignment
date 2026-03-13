const KEY = "knowledge_graph";

export const saveGraph = (graph: any) => {
  const cleanEdges = graph.edges.map((e: any) => ({
    id: e.id,
    source: typeof e.source === "object" ? e.source.id : e.source,
    target: typeof e.target === "object" ? e.target.id : e.target,
    label: e.label,
    markerEnd: e.markerEnd,
    style: e.style,
  }));

  const cleanNodes = graph.nodes.map((n: any) => ({
    id: n.id,
    position: n.position,
    data: n.data,
    style: n.style,
  }));

  localStorage.setItem(
    "knowledge-graph",
    JSON.stringify({
      nodes: cleanNodes,
      edges: cleanEdges,
    }),
  );
};

export const loadGraph = () => {
  const raw = localStorage.getItem("knowledge-graph");

  if (!raw) return null;

  const graph = JSON.parse(raw);

  graph.edges = graph.edges.map((e: any) => ({
    ...e,
    source: typeof e.source === "object" ? e.source.id : e.source,
    target: typeof e.target === "object" ? e.target.id : e.target,
  }));

  return graph;
};
