import { useWorkflowStore } from '../../store/useWorkflowStore';
import { FormEngine } from '../forms/FormEngine';
import { Activity, Layers, CheckCircle2 } from 'lucide-react';

export const InspectorPanel = () => {
  const { selectedNodeId, nodes, edges } = useWorkflowStore();

  const renderInsights = () => {
    const startNodes = nodes.filter(n => n.type === 'start').length;
    const endNodes = nodes.filter(n => n.type === 'end').length;
    const actions = nodes.filter(n => n.type === 'automated').length;

    return (
      <div className="flex flex-col h-full">
        <div className="px-4 py-3 bg-slate-50 border-b border-border text-sm font-semibold flex items-center text-slate-700">
          Workflow Insights
        </div>
        <div className="p-5 flex flex-col gap-6 flex-1">
          <div className="grid grid-cols-2 gap-3 pb-6 border-b border-slate-100">
            <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-sm flex items-center justify-between">
              <span className="text-slate-500 text-xs font-semibold">Nodes</span>
              <span className="text-lg font-bold text-slate-800">{nodes.length}</span>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-sm flex items-center justify-between">
              <span className="text-slate-500 text-xs font-semibold">Edges</span>
              <span className="text-lg font-bold text-slate-800">{edges.length}</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-2">Structure Analysis</h4>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <CheckCircle2 size={16} className={startNodes === 1 ? "text-emerald-500" : "text-amber-500"} />
              <span>{startNodes} Start Trigger(s)</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <Layers size={16} className="text-blue-500" />
              <span>{endNodes} Terminal States</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <Activity size={16} className="text-purple-500" />
              <span>{actions} Automated Actions</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <aside className="w-80 bg-white border-l border-border h-full flex flex-col shadow-[-4px_0_15px_-3px_rgba(0,0,0,0.03)] z-10 overflow-y-auto">
      {selectedNodeId ? <FormEngine nodeId={selectedNodeId} /> : renderInsights()}
    </aside>
  );
};
