import type { AppNode, AppEdge, WorkflowExport } from '../types/schemas';

export const serializeWorkflow = (nodes: AppNode[], edges: AppEdge[]): WorkflowExport => {
  return {
    id: `wf_${Date.now()}`,
    version: '1.0',
    nodes: [...nodes],
    edges: [...edges],
    updatedAt: new Date().toISOString(),
  };
};
