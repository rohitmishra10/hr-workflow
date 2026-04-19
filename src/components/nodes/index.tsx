import type { NodeProps, Node } from '@xyflow/react';
import { Play, CheckCircle, UserCheck, Zap, Flag } from 'lucide-react';
import { BaseNodeWrapper } from './BaseNodeWrapper';

const Badge = ({ children, color }: { children: React.ReactNode, color: string }) => (
  <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${color}`}>
    {children}
  </span>
);

type NodeData = Record<string, string | number | undefined>;

export const StartNode = ({ data, selected }: NodeProps<Node>) => {
  const d = data as unknown as NodeData;
  return (
    <BaseNodeWrapper
      title={d.label as string}
      icon={Play}
      iconColorClass="text-emerald-500"
      accentClass="bg-emerald-500"
      hasInput={false}
      selected={selected}
    >
      <p className="text-xs text-slate-600 line-clamp-2">{d.description as string || 'Initiates the workflow process.'}</p>
    </BaseNodeWrapper>
  );
};

export const TaskNode = ({ data, selected }: NodeProps<Node>) => {
  const d = data as unknown as NodeData;
  return (
    <BaseNodeWrapper
      title={d.label as string}
      icon={CheckCircle}
      iconColorClass="text-blue-500"
      accentClass="bg-blue-500"
      selected={selected}
    >
      <div className="flex flex-col gap-1.5">
        {d.assignee && (
          <div className="text-xs text-slate-600 flex justify-between">
            <span className="font-medium text-slate-500">Assignee:</span>
            <span>{d.assignee as string}</span>
          </div>
        )}
        {d.dueDate && (
          <div className="text-xs text-slate-600 flex justify-between">
            <span className="font-medium text-slate-500">Due:</span>
            <span>{d.dueDate as string}</span>
          </div>
        )}
        {!d.assignee && !d.dueDate && <span className="text-[11px] text-slate-400">Unassigned task</span>}
      </div>
    </BaseNodeWrapper>
  );
};

export const ApprovalNode = ({ data, selected }: NodeProps<Node>) => {
  const d = data as unknown as NodeData;
  return (
    <BaseNodeWrapper
      title={d.label as string}
      icon={UserCheck}
      iconColorClass="text-purple-500"
      accentClass="bg-purple-500"
      selected={selected}
    >
      <div className="flex items-center justify-between">
        <Badge color="bg-purple-100 text-purple-700">{d.approverRole as string || 'Unassigned Role'}</Badge>
        {d.threshold && <span className="text-[11px] text-slate-500 font-mono">Max {d.threshold as string}d</span>}
      </div>
    </BaseNodeWrapper>
  );
};

export const AutomatedNode = ({ data, selected }: NodeProps<Node>) => {
  const d = data as unknown as NodeData;
  return (
    <BaseNodeWrapper
      title={d.label as string}
      icon={Zap}
      iconColorClass="text-amber-500"
      accentClass="bg-amber-500"
      selected={selected}
    >
      <div className="text-xs text-slate-600 border border-slate-200 bg-white p-1.5 rounded-md font-mono line-clamp-1">
          Action ID: [{d.actionId as string || 'none'}]
      </div>
    </BaseNodeWrapper>
  );
};

export const EndNode = ({ data, selected }: NodeProps<Node>) => {
  const d = data as unknown as NodeData;
  return (
    <BaseNodeWrapper
      title={d.label as string}
      icon={Flag}
      iconColorClass="text-slate-500"
      accentClass="bg-slate-500"
      hasOutput={false}
      selected={selected}
    >
      <p className="text-xs text-slate-500 italic">Workflow terminates here.</p>
    </BaseNodeWrapper>
  );
};

export const nodeTypes = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  automated: AutomatedNode,
  end: EndNode,
};
