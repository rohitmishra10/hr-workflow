import { ReactFlowProvider } from '@xyflow/react';
import { AppLayout } from './components/layout/AppLayout';
import { WorkflowCanvas } from './components/canvas/WorkflowCanvas';

function App() {
  return (
    <ReactFlowProvider>
      <AppLayout>
        <WorkflowCanvas />
      </AppLayout>
    </ReactFlowProvider>
  );
}

export default App;
