import type { SimulationResponse, WorkflowExport } from '../types/schemas';

export const simulateWorkflow = async (workflow: WorkflowExport): Promise<SimulationResponse> => {
  await new Promise(resolve => setTimeout(resolve, 1500));

  const startNodes = workflow.nodes.filter(n => n.type === 'start');
  if (startNodes.length === 0) {
    return {
      success: false,
      steps: [],
      errors: ['Invalid Graph: A workflow must begin with a Start node.'],
    };
  }
  if (startNodes.length > 1) {
    return {
      success: false,
      steps: [],
      errors: ['Invalid Graph: Only one Start node is permitted.'],
    };
  }

  const steps: any[] = [];
  let currentNodeId: string | undefined = startNodes[0].id;

  while (currentNodeId) {
    const node = workflow.nodes.find(n => n.id === currentNodeId);
    if (!node) break;

    steps.push({
      nodeId: node.id,
      status: 'success',
      logs: [`Initiating execution for [${node.type.toUpperCase()}] node: ${node.data.label}`],
      duration: Math.floor(Math.random() * 250) + 20,
    });

    const outgoingEdges = workflow.edges.filter(e => e.source === currentNodeId);
    if (outgoingEdges.length > 0) {
      currentNodeId = outgoingEdges[0].target; // Simple sequential mock
    } else {
      currentNodeId = undefined;
    }
  }

  return {
    success: true,
    steps,
  };
};
