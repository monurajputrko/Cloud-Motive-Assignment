"use client";

import { useState } from "react";

export default function GraphSearch({ nodes, onSelect }: any) {
  const [query, setQuery] = useState("");

  const results = nodes.filter((n: any) =>
    n.data.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className=" bg-white">

      <input
        placeholder="Search node..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border p-1 "
      />

      {query &&
        results.slice(0, 5).map((node: any) => (
          <div
            key={node.id}
            onClick={() => {
              onSelect(node);
              setQuery("");
            }}
            className="cursor-pointer hover:bg-gray-100 p-1 text-sm"
          >
            {node.data.label}
          </div>
        ))}
    </div>
  );
}