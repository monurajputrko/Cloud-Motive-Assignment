# Knowledge Graph Viewer (React Flow + Next.js)

An interactive **personal knowledge graph viewer** built with **Next.js, TypeScript, and React Flow**.
It allows users to visualize topics as nodes and relationships as edges, edit content, and persist the graph locally.

This project was built as a **frontend-only assignment** demonstrating graph visualization, UI interaction, and state persistence.

---

# ✨ Features

## Graph Visualization

* Interactive graph canvas powered by **React Flow**
* Nodes represent **topics/notes**
* Edges represent **relationships between topics**
* Directed edges with arrow markers
* Zoom, pan, and minimap navigation

---

## Node Interaction

* Click a node to open the **detail sidebar**
* Sidebar displays:

  * Node **title**
  * Node **note content**
* Title and note can be edited

---

## CRUD Operations

### Create Node

* Use the **toolbar add node button**
* New nodes appear in the graph
* Position can be adjusted via drag

### Edit Node

* Click node → sidebar opens
* Edit title or note
* Changes update in real-time

### Delete Node

* Delete button in the node editor
* All connected edges are automatically removed

---

### Create Edge

* Drag from one node handle to another
* A new relationship edge is created
* Default label: `relates to`

---

### Edit Edge

* **Double click edge**
* Edge editor panel opens
* Modify relationship label

---

### Delete Edge

Edges can be removed in two ways:

1. **Edge Editor**

   * Double click edge
   * Click **Delete**

2. **Keyboard Shortcut**

   * Click edge
   * Press **Delete / Backspace**

---

# Graph Interaction Enhancements

### Connected Node Highlighting

Selecting a node:

* Connected nodes remain visible
* Unrelated nodes fade
* Connected edges animate

This improves graph readability.

---

### Search + Auto Focus

Search nodes by name.

Features:

* Instant filtering
* Clicking a result **centers the graph on that node**
* Zoom animation to focus target node

---

### Auto Layout

Graph layout can be recalculated using **Dagre layout algorithm**.

Purpose:

* Prevent node overlap
* Maintain readable graph structure

---

### Drag & Position Persistence

Nodes can be dragged freely.

Positions are:

* Automatically saved to **localStorage**
* Restored on page refresh

---

# Local Persistence

Graph state is saved to:

```
localStorage → "knowledge-graph"
```

Saved data includes:

* nodes
* edges
* node positions
* node notes
* edge labels

Refreshing the page restores the exact graph state.

---

# Seed Data

If localStorage is empty, the graph loads initial data from CSV files.

### nodes.csv

```
id,title,note
1,React,A JavaScript library for building user interfaces
2,Next.js,React framework with SSR support
3,TypeScript,Typed superset of JavaScript
4,State Management,Patterns for managing app state
5,Component Design,Reusable UI component design
6,Performance,Optimization techniques
7,Testing,Unit and integration testing
8,CSS & Styling,Styling approaches
```

### edges.csv

```
source,target,label
2,1,built on
1,3,pairs well with
1,4,uses
1,5,guides
2,6,improves
1,7,requires
1,8,styled with
4,6,impacts
5,6,impacts
```

These files populate the graph on first load.

---

# 🧱 Project Structure

```
.
├── app/                
│   └── page.tsx
│
├── components/         
│   └── graph/
│       ├── GraphCanvas.tsx
│       ├── GraphToolbar.tsx
│       ├── GraphSearch.tsx
│       ├── NodeEditor.tsx
│       └── EdgeEditor.tsx
│
├── hooks/               
│   └── useGraphStorage.ts
│
├── lib/                 
│   ├── layoutGraph.ts
│   └── loadSeedGraph.ts
│
├── public/             
│
├── store/               
│
├── types/               
│
├── utils/               
│
├── next.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

# ⚙️ Technologies Used

* **Next.js**
* **React**
* **TypeScript**
* **React Flow**
* **Dagre (graph layout)**
* **TailwindCSS**

---

# 🚀 Installation

Clone the repository:

```bash
git clone https://github.com/monurajputrko/Cloud-Motive-Assignment.git
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Open in browser:

```
http://localhost:3000
```

---

# 💡 Key Functionalities Demonstrated

| Area                | Implementation                  |
| ------------------- | ------------------------------- |
| Graph Visualization | React Flow canvas               |
| Node CRUD           | Sidebar editor                  |
| Edge CRUD           | Double-click edge editor        |
| State Persistence   | localStorage                    |
| Layout Algorithm    | Dagre                           |
| Search              | Node search with focus          |
| UX Interaction      | Node highlight + edge animation |

---

# Possible Improvements

Future enhancements could include:

* Graph physics (force-directed layout)
* Node clustering
* Graph export/import
* Multi-user collaboration
* Cloud persistence

---

# Demo Flow

1. Open the application
2. Explore the graph
3. Click a node to view/edit details
4. Create relationships by connecting nodes
5. Double click an edge to edit its label
6. Drag nodes to rearrange the graph
7. Refresh page to see persistence

# Future Improvements
- Responsive layout for mobile and tablet devices
- Cloud persistence instead of localStorage

---

# License

This project is for **demonstration and learning purposes**.
