import { useCallback } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useReactFlow,
  MiniMap,
  BackgroundVariant
} from '@xyflow/react';
import type { Node } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useWorkflowStore } from '../../store/useWorkflowStore';
import { nodeTypes } from '../nodes';
import type { NodeType } from '../../types/schemas';
import { CheckCircle2, ChevronRight, XCircle } from 'lucide-react';

export const WorkflowCanvas = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode, setSelectedNodeId, simulationResult } = useWorkflowStore();
  const { screenToFlowPosition } = useReactFlow();

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow') as NodeType;
      if (!type) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      addNode(type, position);
    },
    [screenToFlowPosition, addNode],
  );

  const onSelectionChange = useCallback(({ nodes }: { nodes: Node[] }) => {
    setSelectedNodeId(nodes.length === 1 ? nodes[0].id : null);
  }, [setSelectedNodeId]);

  return (
    <>
      <div className="flex-1 h-full w-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onSelectionChange={onSelectionChange}
          nodeTypes={nodeTypes}
          fitView
          snapToGrid
          snapGrid={[20, 20]}
          defaultEdgeOptions={{ type: 'smoothstep' }}
          className="bg-canvas"
        >
          <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#cbd5e1" />
          <Controls position="bottom-right" className="bg-white shadow-sm border border-slate-200" />
          <MiniMap 
             position="bottom-left"
             className="!bg-white !rounded-xl !shadow-card !border !border-slate-200"
             maskColor="rgba(241, 245, 249, 0.7)"
          />
        </ReactFlow>
      </div>

      {simulationResult && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[600px] max-h-[300px] bg-slate-900 rounded-xl shadow-2xl border border-slate-700 p-4 font-mono text-sm overflow-hidden flex flex-col z-50">
          <div className="flex items-center justify-between border-b border-slate-700 pb-2 mb-3">
            <span className="text-slate-300 font-bold flex items-center gap-2">
              {simulationResult.success ? <CheckCircle2 className="text-emerald-500" size={16}/> : <XCircle className="text-red-500" size={16}/>}
              Execution Logs
            </span>
          </div>
          <div className="overflow-y-auto pr-2 space-y-3">
             {simulationResult.errors?.map((err, i) => (
                <div key={i} className="text-red-400">!! {err}</div>
             ))}
             {simulationResult.steps?.map((step, i) => (
               <div key={i} className="bg-slate-800 rounded px-3 py-2 border border-slate-700">
                 <div className="text-xs text-slate-500 flex justify-between mb-1">
                   <span>Node: {step.nodeId}</span>
                   <span className="text-emerald-400">{step.duration}ms</span>
                 </div>
                 {step.logs.map((log, j) => (
                   <div key={j} className="text-slate-300 flex gap-2">
                     <ChevronRight size={14} className="text-blue-500 mt-0.5 shrink-0" />
                     <span>{log}</span>
                   </div>
                 ))}
               </div>
             ))}
          </div>
        </div>
      )}
    </>
  );
};
