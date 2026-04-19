# HR Workflow Designer

A production-grade, SaaS-style drag-and-drop workflow builder designed specifically for HR automations. Built with React, Vite, TypeScript, React Flow, and Tailwind CSS.

## 🚀 Features

- **Pristine SaaS Canvas Layout**: A strict 4-pane layout featuring a fixed Left Sidebar, Top Bar, Center Canvas, and a dynamic Right Inspector Panel.
- **Node Configuration Engine**: A schema-driven Form Engine dynamically mounts configuration parameters based on strictly typed Custom Nodes instead of hardcoding inputs.
- **Modular Node System**: Drag and drop custom structured React Flow cards featuring:
  - Start Trigger
  - Human Tasks
  - Approval Steps
  - Automated Actions
  - End States
- **Validating Mock Workflow Execution**: Simulates workflow runs including structural checks (missing connections, cycle detection, multi-start rules) and renders logs dynamically.

## 🛠 Tech Stack

- **React 18** (Vite build)
- **TypeScript** (Strict typings enforcing UI boundaries)
- **Tailwind CSS v3** (SaaS tailored styling, shadow design, unified tokens)
- **Zustand** (Isolated reactive state management out of React scope)
- **React Flow (`@xyflow/react`)** (Interactive node-graph algorithms and edge connections)
- **Lucide React** (Consistent modern iconography)

## 📦 Project Architecture
```text
src/
├── components/          
│   ├── canvas/          # React Flow implementations, minimaps, and drops
│   ├── forms/           # Dynamic Form Engine and primitive fields
│   ├── layout/          # 4-pane App shell structure
│   ├── nodes/           # Node logic separated from visual React Flow wrapper
│   └── panels/          # Inspector and properties views
├── services/            # Mock API execution layer
├── store/               # Zustand action dispatchers and node definitions
├── types/               # Type-safe schemas restricting application bounds
└── utils/               # Serialization and DFS topology cycle validation
```

## 🏁 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Interact:**
   Navigate to `http://localhost:5173`. Drag elements from the left palette to generate complex node webs and hit `Run Workflow`!
