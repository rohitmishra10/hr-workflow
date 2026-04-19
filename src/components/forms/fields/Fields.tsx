interface FieldProps {
  label: string;
  value: any;
  onChange: (val: any) => void;
  required?: boolean;
}

export const TextField = ({ label, value, onChange, required, placeholder }: FieldProps & { placeholder?: string }) => (
  <div className="flex flex-col gap-1.5 mb-4">
    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type="text"
      value={value || ''}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
    />
  </div>
);

export const SelectField = ({ label, value, onChange, required, options }: FieldProps & { options: {value: string, label: string}[] }) => (
  <div className="flex flex-col gap-1.5 mb-4">
    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      value={value || ''}
      onChange={e => onChange(e.target.value)}
      className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
    >
      <option value="" disabled>Select an option...</option>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

export const DateField = ({ label, value, onChange, required }: FieldProps) => (
  <div className="flex flex-col gap-1.5 mb-4">
    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type="date"
      value={value || ''}
      onChange={e => onChange(e.target.value)}
      className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
    />
  </div>
);

export const NumberField = ({ label, value, onChange, required }: FieldProps) => (
  <div className="flex flex-col gap-1.5 mb-4">
    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type="number"
      value={value || ''}
      onChange={e => onChange(Number(e.target.value))}
      className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
    />
  </div>
);
