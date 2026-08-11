'use client';

import { useState } from 'react';
import { Sidebar } from './Sidebar';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div
      className="min-h-screen light"
      style={{
        display: 'grid',
        gridTemplateColumns: sidebarOpen ? '222px 1fr' : '64px 1fr',
        background: '#F7F5F1',
        fontFamily: "'Inter', system-ui, sans-serif",
        color: '#1F2E24',
        WebkitFontSmoothing: 'antialiased',
        transition: 'grid-template-columns 0.3s ease'
      }}
    >
      {/* SIDEBAR */}
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* MAIN CONTENT */}
      <main style={{ minWidth: 0, overflow: 'auto', padding: '24px 24px 24px 32px' }}>
        {children}
      </main>
    </div>
  );
}
