import type { ReactNode } from 'react';
import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';
import { InspectorPanel } from '../panels/InspectorPanel';

export const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-background">
      <TopBar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 relative flex flex-col">
          {children}
        </main>
        <InspectorPanel />
      </div>
    </div>
  );
};
