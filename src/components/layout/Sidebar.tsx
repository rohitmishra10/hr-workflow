import { Play, CheckCircle, UserCheck, Zap, Flag, LayoutDashboard, GitMerge } from 'lucide-react';
import type { NodeType } from '../../types/schemas';

export const Sidebar = () => {
  const onDragStart = (event: React.DragEvent, nodeType: NodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'copy';
  };

  const palette = [
    { type: 'start' as NodeType, label: 'Start Trigger', icon: Play, color: 'text-emerald-500' },
    { type: 'task' as NodeType, label: 'Human Task', icon: CheckCircle, color: 'text-blue-500' },
    { type: 'approval' as NodeType, label: 'Approval Step', icon: UserCheck, color: 'text-purple-500' },
    { type: 'automated' as NodeType, label: 'Automated Action', icon: Zap, color: 'text-amber-500' },
    { type: 'end' as NodeType, label: 'End State', icon: Flag, color: 'text-slate-500' },
  ];

  return (
    <aside className="w-64 bg-slate-50 border-r border-border flex flex-col z-10 shadow-[4px_0_15px_-3px_rgba(0,0,0,0.03)] h-full">
      <div className="p-4 border-b border-border">
        <nav className="flex flex-col gap-1">
           <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 font-medium hover:bg-slate-200 hover:text-slate-900 rounded-md transition-colors"><LayoutDashboard size={16}/> Dashboard</a>
           <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm bg-white border border-slate-200 text-primary-600 font-medium shadow-sm rounded-md"><GitMerge size={16}/> Workflows</a>
        </nav>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Node Palette</h2>
        <div className="flex flex-col gap-2">
          {palette.map((item) => (
            <div
              key={item.type}
              className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg cursor-grab hover:border-primary-400 hover:shadow-card transition-all"
              onDragStart={(event) => onDragStart(event, item.type)}
              draggable
            >
              <div className={`p-1.5 rounded-md bg-slate-50 ${item.color}`}>
                <item.icon size={16} />
              </div>
              <span className="text-sm font-medium text-slate-700">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
