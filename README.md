# ⚙️ HR Workflow Designer (V2)

A production-grade, highly-modular Node Workflow Designer rebuilt with enterprise SaaS constraints in mind. It uses React Flow for an infinite canvas, Zustand for atomic state separation, and a deeply customizable Schema Form Engine for node properties.

---

## 📖 Table of Contents

- [Core Principles](#-core-principles)
- [Quick Start Installation](#-quick-start-installation)
- [Application Layout](#-application-layout)
- [Using the Workflow Designer](#-using-the-workflow-designer)
  - [Node Types](#1-node-types)
  - [The Dynamic Form Engine](#2-the-dynamic-form-engine)
  - [Workflow Validation & Simulation](#3-workflow-validation--simulation)
- [Project Architecture](#-project-architecture)
- [How to Add a New Node Type](#-how-to-add-a-new-node-type)

---

## 🏗 Core Principles

1. **State Independence**: React Flow rendering strictly relies on Zustand state trees (`useWorkflowStore`). Component state doesn't mutate arbitrarily.
2. **Dynamic UI Rendering**: Hardcoding HTML forms for sidebar configurations is strictly forbidden. The `InspectorPanel` dynamically maps schemas located in `schemas.ts`, achieving data-driven forms.
3. **Pristine Layout Constraints**: The UI relies on a 4-pane Flex/Grid (`AppLayout.tsx`). Everything is responsive but restricted, meaning the canvas never breaks out of the sidebar framing.

---

## 🚀 Quick Start Installation

### Prerequisites
You need **Node.js (v18+)** and **npm** installed.

### Initialization

1. **Clone the repository**:
   ```bash
   git clone https://github.com/rohitmishra10/hr-workflow.git
   cd "hr-workflow"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Boot the Local Development Server (Vite)**:
   ```bash
   npm run dev
   ```

4. **Navigate**: 
   Open `http://localhost:5173` in your browser.

---

## 🖼 Application Layout

The wrapper `AppLayout.tsx` breaks the viewport into 4 highly-managed panes:

1. **Top Bar**: System-level commands (Saving, Resetting, Execution Simulation).
2. **Left Sidebar**: The navigation context and **Draggable Node Palette**.
3. **Center Canvas**: The React Flow `WorkflowCanvas.tsx` containing Grid snapping, bezier edges, drop interactions, and Mini-map utilities. 
4. **Right Inspector Panel**: The dual-purpose properties editor. 
   - *State A:* No node selected -> View structural insights (Node count, End states).
   - *State B:* Node selected -> The Form Engine runs mapping inputs.

---

## 🕹 Using the Workflow Designer

### 1. Node Types
Drag and drop any of the 5 standard nodes from the left Sidebar onto the Canvas.

| Node Type | Description & Usage Context |
| :--- | :--- |
| **Start Trigger** | The mandatory entry point `[1 Required]`. Sets off downstream nodes. |
| **Human Task** | Manual steps assigned to specific employees or emails. |
| **Approval Step** | Gates requiring role-based confirmation (e.g., IT, Manager). |
| **Automated Action** | System-driven background processes (Send Slack/Emails). |
| **End State** | Terminating steps marking absolute workflow completion. |

### 2. The Dynamic Form Engine
Click any node in the canvas. The Right Inspector will update. We utilize **Schema-Driven Forms**. 

For example, if you click a `Task Node`, `src/components/forms/FormEngine.tsx` loops through the definitions in `src/types/schemas.ts` and instantly mounts a Form requesting `Assignee Email` and `Due Date`. This drastically eliminates boilerplates.

### 3. Workflow Validation & Simulation
When you click **Run Workflow** in the Top Bar, the layout runs through `src/utils/validator.ts` doing Graph operations:
- **Depth-First Search (DFS)** cycle detection to prevent infinite execution loops.
- Empty connectivity checks (Islands).
- Boundary limits (exactly 1 Start Trigger allowed).

If valid, the execution generates dynamic logs in a stylized bottom overlay.

---

## 📦 Project Architecture

Every folder has extremely narrow logic concerns to enforce single-responsibility logic:

```txt
src/
├── components/          
│   ├── canvas/          # The drop-zones and React Flow core setups
│   ├── forms/           # FormEngine and generic isolated inputs (TextField, DateField) 
│   ├── layout/          # The 4 primary layout pane frames
│   ├── nodes/           # Node logic wrapping HTML inside Tailwind polished cards
│   └── panels/          # Sidebar palettes and Right-side insights logic
├── services/            # Simulated Promise-based API networks
├── store/               # Zustand hooks managing global Flow state
├── types/               # Type-safe schemas and Typescript definitions
├── utils/               # Serialization payloads & graph topology validators
└── App.tsx              # Main entrypoint
```

---

## 🛠 How to Add a New Node Type

Thanks to the modular scaling rules, adding a new node is incredibly fast:

1. Add your node name to `NodeType` inside `src/types/schemas.ts`. 
2. Create the JSON blueprint for what fields the Form Engine should generate inside `NODE_FORM_SCHEMAS`.
3. Wrap your custom Component UI logic with the `<BaseNodeWrapper>` inside `src/components/nodes/index.tsx`.
4. Export the new item into the palette mappings in `src/components/layout/Sidebar.tsx`. 

*No massive custom form overrides, no massive HTML edits. The engine maps it dynamically!*
