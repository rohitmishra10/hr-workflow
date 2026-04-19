import { create } from 'zustand';
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from '@xyflow/react';
import type { Connection, EdgeChange, NodeChange } from '@xyflow/react';
import type { AppNode, AppEdge, SimulationResponse, NodeType } from '../types/schemas';
import { validateWorkflow } from '../utils/validator';

interface WorkflowState {
  nodes: AppNode[];
  edges: AppEdge[];
  selectedNodeId: string | null;
  validationErrors: string[];
  simulationResult: SimulationResponse | null;
  
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  addNode: (type: NodeType, position: { x: number, y: number }) => void;
  updateNodeData: (nodeId: string, data: Record<string, any>) => void;
  setSelectedNodeId: (id: string | null) => void;
  validate: () => boolean;
  setSimulationResult: (result: SimulationResponse | null) => void;
  resetWorkflow: () => void;
}

let idCounter = 1;
const getId = (type: string) => `${type}-${idCounter++}`;

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: [
    {
      id: 'start-0',
      type: 'start',
      position: { x: 250, y: 150 },
      data: { label: 'Start Trigger' },
    }
  ],
  edges: [],
  selectedNodeId: null,
  validationErrors: [],
  simulationResult: null,

  onNodesChange: (changes: NodeChange[]) => {
    set({ nodes: applyNodeChanges(changes, get().nodes) as AppNode[] });
  },

  onEdgesChange: (changes: EdgeChange[]) => {
    set({ edges: applyEdgeChanges(changes, get().edges) as AppEdge[] });
  },

  onConnect: (connection: Connection) => {
    set({ edges: addEdge({ ...connection, animated: true, style: { stroke: '#94a3b8', strokeWidth: 2 } }, get().edges) as AppEdge[] });
  },

  addNode: (type: NodeType, position: { x: number, y: number }) => {
    const newNode: AppNode = {
      id: getId(type),
      type,
      position,
      data: { label: `New ${type.charAt(0).toUpperCase() + type.slice(1)}` },
    };
    set({ nodes: [...get().nodes, newNode] });
  },

  updateNodeData: (nodeId: string, newData: Record<string, any>) => {
    set({
      nodes: get().nodes.map((node) => 
        node.id === nodeId ? { ...node, data: { ...node.data, ...newData } } : node
      ),
    });
  },

  setSelectedNodeId: (id: string | null) => {
    set({ selectedNodeId: id });
  },

  validate: () => {
    const errors = validateWorkflow(get().nodes, get().edges);
    set({ validationErrors: errors });
    return errors.length === 0;
  },

  setSimulationResult: (result: SimulationResponse | null) => {
    set({ simulationResult: result });
  },

  resetWorkflow: () => {
    set({
      nodes: [
        {
          id: 'start-0',
          type: 'start',
          position: { x: 250, y: 150 },
          data: { label: 'Start Trigger' },
        }
      ],
      edges: [],
      selectedNodeId: null,
      validationErrors: [],
      simulationResult: null,
    });
  }
}));
