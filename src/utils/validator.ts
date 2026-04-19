import type { AppNode, AppEdge } from '../types/schemas';

export const validateWorkflow = (nodes: AppNode[], edges: AppEdge[]): string[] => {
  const errors: string[] = [];

  const startNodes = nodes.filter(n => n.type === 'start');
  if (startNodes.length === 0) errors.push('A Start node is required.');
  if (startNodes.length > 1) errors.push('Only a single Start node is allowed.');

  if (nodes.length > 1) {
    const connected = new Set<string>();
    edges.forEach(e => { connected.add(e.source); connected.add(e.target); });
    nodes.forEach(n => {
      if (!connected.has(n.id)) errors.push(`Node "${n.data.label}" is disconnected.`);
    });
  }

  // Detect Cycles (Basic DFS)
  const adjacency = new Map<string, string[]>();
  nodes.forEach(n => adjacency.set(n.id, []));
  edges.forEach(e => adjacency.get(e.source)?.push(e.target));

  const visited = new Set<string>();
  const stack = new Set<string>();

  const isCyclic = (nodeId: string): boolean => {
    if (stack.has(nodeId)) return true;
    if (visited.has(nodeId)) return false;
    visited.add(nodeId);
    stack.add(nodeId);
    const neighbors = adjacency.get(nodeId) || [];
    for (const neighbor of neighbors) {
      if (isCyclic(neighbor)) return true;
    }
    stack.delete(nodeId);
    return false;
  };

  for (const n of nodes) {
    if (isCyclic(n.id)) {
      errors.push('Cycles detected. Please adjust edges directly backwards.');
      break;
    }
  }

  return errors;
};
