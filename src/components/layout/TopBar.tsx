import { useState } from 'react';
import { useWorkflowStore } from '../../store/useWorkflowStore';
import { simulateWorkflow } from '../../services/api';
import { serializeWorkflow } from '../../utils/serializer';
import { Play, Save, RefreshCw, Command, Loader2, AlertCircle } from 'lucide-react';

export const TopBar = () => {
  const { nodes, edges, validate, resetWorkflow, setSimulationResult } = useWorkflowStore();
  const [isSimulating, setIsSimulating] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleRun = async () => {
    if (!validate()) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    setIsSimulating(true);
    const result = await simulateWorkflow(serializeWorkflow(nodes, edges));
    setSimulationResult(result);
    setIsSimulating(false);
  };

  return (
    <header className="h-14 bg-white border-b border-border flex items-center justify-between px-6 shadow-sm z-20">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center text-white shadow-inner">
          <Command size={18} />
        </div>
        <div>
          <h1 className="text-sm font-bold text-slate-800 leading-tight">User Automation</h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Workflow Designer</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        {showError && <span className="text-xs font-semibold text-red-500 flex items-center gap-1"><AlertCircle size={14}/> Validation Failed</span>}
        <button 
          onClick={resetWorkflow}
          className="flex items-center gap-2 px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-md text-sm transition-colors font-medium border border-transparent"
        >
          <RefreshCw size={14} /> Reset
        </button>
        <button className="flex items-center gap-2 px-4 py-1.5 text-slate-600 hover:bg-slate-100 rounded-md text-sm transition-colors font-medium border border-slate-200 shadow-sm">
          <Save size={14} /> Save Draft
        </button>
        <button 
          disabled={isSimulating}
          onClick={handleRun}
          className="flex items-center gap-2 px-4 py-1.5 bg-primary-600 hover:bg-primary-700 text-white rounded-md text-sm transition-colors font-medium shadow-sm disabled:opacity-70"
        >
          {isSimulating ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />}
          <span>Run Workflow</span>
        </button>
      </div>
    </header>
  );
};
