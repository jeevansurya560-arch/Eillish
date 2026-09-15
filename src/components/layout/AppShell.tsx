import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Topbar } from './Topbar';
import { CommandPalette } from '../common/CommandPalette';
import { ToastProvider } from '../common/Toast';
import './AppShell.css';

export const AppShell: React.FC = () => {
  const [commandOpen, setCommandOpen] = useState<boolean>(false);

  // Global ⌘K / Ctrl+K keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <ToastProvider>
      <div className="lpalo-app-shell">
        {/* Global Command Palette */}
        <CommandPalette
          isOpen={commandOpen}
          onClose={() => setCommandOpen(false)}
        />

        {/* Small, Compact Navigation Bar (Embedding all Sidebar Properties) */}
        <Topbar onOpenCommand={() => setCommandOpen(true)} />

        {/* Full-Width Main Content View for Inside Pages */}
        <main className="lpalo-app-content">
          <Outlet />
        </main>
      </div>
    </ToastProvider>
  );
};
