import { useWorkflowStore } from '../../store/useWorkflowStore';
import { NODE_FORM_SCHEMAS } from '../../types/schemas';
import type { NodeType, FormFieldSchema } from '../../types/schemas';
import { TextField, SelectField, DateField, NumberField } from './fields/Fields';

export const FormEngine = ({ nodeId }: { nodeId: string }) => {
  const { nodes, updateNodeData } = useWorkflowStore();
  const node = nodes.find((n: any) => n.id === nodeId);

  if (!node) return null;

  const type = node.type as NodeType;
  const schema: FormFieldSchema[] = NODE_FORM_SCHEMAS[type];

  const handleChange = (key: string, value: any) => {
    updateNodeData(nodeId, { [key]: value });
  };

  const renderField = (field: FormFieldSchema) => {
    const value = node.data[field.key];
    const props = {
      label: field.label,
      value: value,
      onChange: (val: any) => handleChange(field.key, val),
      required: field.required,
    };

    switch (field.type) {
      case 'string':
        return <TextField key={field.key} {...props} placeholder={field.placeholder} />;
      case 'select':
        return <SelectField key={field.key} {...props} options={field.options || []} />;
      case 'date':
        return <DateField key={field.key} {...props} />;
      case 'number':
        return <NumberField key={field.key} {...props} />;
      default:
         return <div key={field.key} className="text-red-500 text-xs">Unsupported field type: {field.type}</div>;
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="px-4 py-3 bg-slate-50 border-b border-border text-sm font-semibold flex items-center text-slate-700 capitalize">
        {type} Node Configuration
      </div>
      <div className="p-4">
        {schema.map(field => renderField(field))}
      </div>
    </div>
  );
};
