import type { Edge, Node } from '@xyflow/react';

// --- TYPES & SCHEMAS ---

export type NodeType = 'start' | 'task' | 'approval' | 'automated' | 'end';

export interface BaseNodeData extends Record<string, unknown> {
  label: string;
  description?: string;
  status?: 'pending' | 'active' | 'completed' | 'error';
}

export type AppNode = Node<BaseNodeData, NodeType>;
export type AppEdge = Edge;

// Dynamic Form schema configurations
// Rather than hardcoding fields per component, we specify schemas.
export type FieldType = 'string' | 'number' | 'boolean' | 'date' | 'select';

export interface FieldOption {
  value: string;
  label: string;
}

export interface FormFieldSchema {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: FieldOption[]; // for 'select'
  dependsOn?: string; // e.g. "if field x is set, show this"
}

export const NODE_FORM_SCHEMAS: Record<NodeType, FormFieldSchema[]> = {
  start: [
    { key: 'label', label: 'Trigger Name', type: 'string', required: true, placeholder: 'e.g., On Employee Hired' },
    { key: 'description', label: 'Description', type: 'string', placeholder: 'Trigger context...' },
  ],
  task: [
    { key: 'label', label: 'Task Name', type: 'string', required: true },
    { key: 'assignee', label: 'Assignee Email', type: 'string', placeholder: 'user@company.com' },
    { key: 'dueDate', label: 'Due Date', type: 'date' },
  ],
  approval: [
    { key: 'label', label: 'Approval Step', type: 'string', required: true },
    { key: 'approverRole', label: 'Approver Role', type: 'select', options: [
      { value: 'manager', label: 'Direct Manager' },
      { value: 'hr', label: 'HR Department' },
      { value: 'it', label: 'IT Department' },
    ]},
    { key: 'threshold', label: 'Approval Threshold (days)', type: 'number' },
  ],
  automated: [
    { key: 'label', label: 'Action Name', type: 'string', required: true },
    { key: 'actionId', label: 'Automation Task', type: 'select', options: [
        { value: 'send_email', label: 'Send Email Notification' },
        { value: 'create_account', label: 'Provision IT Account' },
        { value: 'slack_message', label: 'Post to Slack' }
    ]},
  ],
  end: [
    { key: 'label', label: 'End State Name', type: 'string', required: true },
    { key: 'endMessage', label: 'Completion Message', type: 'string', placeholder: 'Workflow finalized.' },
  ],
};

// API Models
export interface AutomationAction {
  id: string;
  label: string;
}

// Simulation Types
export interface WorkflowSimulationStep {
  nodeId: string;
  status: 'pending' | 'success' | 'error';
  logs: string[];
  duration?: number;
}

export interface SimulationResponse {
  success: boolean;
  steps: WorkflowSimulationStep[];
  errors?: string[];
}

export interface WorkflowExport {
  id: string;
  version: string;
  nodes: AppNode[];
  edges: AppEdge[];
  updatedAt: string;
}
