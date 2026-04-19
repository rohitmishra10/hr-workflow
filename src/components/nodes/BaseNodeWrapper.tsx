import type { ReactNode } from 'react';
import { Handle, Position } from '@xyflow/react';
import { clsx } from 'clsx';
import type { LucideIcon } from 'lucide-react';

interface BaseNodeProps {
  title: string;
  icon: LucideIcon;
  iconColorClass: string;
  accentClass: string;
  selected?: boolean;
  hasInput?: boolean;
  hasOutput?: boolean;
  children?: ReactNode;
}

export const BaseNodeWrapper = ({
  title,
  icon: Icon,
  iconColorClass,
  accentClass,
  selected,
  hasInput = true,
  hasOutput = true,
  children
}: BaseNodeProps) => {
  return (
    <div className={clsx(
      "relative w-[280px] bg-white rounded-xl shadow-card transition-all flex flex-col border border-slate-200",
      selected && "border-primary-500 shadow-card-hover ring-1 ring-primary-500"
    )}>
      {/* Accent Top Bar */}
      <div className={clsx("h-1 w-full rounded-t-xl", accentClass)} />

      {/* Input Handle */}
      {hasInput && (
        <Handle
          type="target"
          position={Position.Top}
          className="!w-3 !h-3 !border-2 !border-white !bg-slate-400 !translate-y-[-50%] z-10"
        />
      )}

      {/* Node Header */}
      <div className="flex items-center gap-3 p-4 border-b border-slate-100">
        <div className={clsx("p-2 rounded-lg bg-slate-50", iconColorClass)}>
          <Icon size={18} strokeWidth={2.5} />
        </div>
        <h3 className="font-semibold text-sm text-slate-800">{title}</h3>
      </div>

      {/* Node Body */}
      <div className="p-4 bg-slate-50 rounded-b-xl flex flex-col gap-2">
        {children || <span className="text-xs text-slate-400 italic">No additional details</span>}
      </div>

      {/* Output Handle */}
      {hasOutput && (
        <Handle
          type="source"
          position={Position.Bottom}
          className="!w-3 !h-3 !border-2 !border-white !bg-slate-400 !translate-y-[50%] z-10"
        />
      )}
    </div>
  );
};
