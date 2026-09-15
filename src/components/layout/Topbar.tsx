import React, { useState } from 'react';
import { useLocation, NavLink, Link } from 'react-router-dom';
import {
  BookOpen,
  Search,
  FolderGit2,
  Activity,
  BarChart3,
  Settings,
  RefreshCw,
  ChevronDown,
  Check,
} from 'lucide-react';
import { useToast } from '../common/Toast';
import './AppShell.css';

interface TopbarProps {
  onOpenCommand?: () => void;
}

export const Topbar: React.FC<TopbarProps> = () => {
  const location = useLocation();
  const { showToast } = useToast();
  const [isSyncing, setIsSyncing] = useState(false);
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);

  const navItems = [
    { to: '/knowledge', label: 'Knowledge', icon: BookOpen, badge: '1,284' },
    { to: '/search', label: 'AI Search', icon: Search, isAI: true },
    { to: '/repositories', label: 'Repositories', icon: FolderGit2, badge: '12' },
    { to: '/activity', label: 'Activity', icon: Activity },
    { to: '/analytics', label: 'Analytics', icon: BarChart3 },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  const handleManualSync = () => {
    if (isSyncing) return;
    setIsSyncing(true);
    showToast('Syncing neural AST vector graph...', 'info');

    setTimeout(() => {
      setIsSyncing(false);
      showToast('12 repositories synchronized with neural index.', 'success');
    }, 1400);
  };

  return (
    <header className="lpalo-topbar">
      <div className="lpalo-topbar-inner">
        {/* Left Section: Eillish Brand on the left + Workspaces right beside it */}
        <div className="lpalo-topbar-left">
          <Link to="/" className="lpalo-brand-pill">
            <span className="lpalo-brand-mark">Eillish</span>
            <span className="lpalo-brand-tag">Neural</span>
          </Link>

          {/* Workspace Pill Selector on the left */}
          <div style={{ position: 'relative' }}>
            <button
              className="lpalo-workspace-pill"
              onClick={() => setShowWorkspaceMenu(!showWorkspaceMenu)}
              title="Select Workspace"
            >
              <span className="lpalo-workspace-label">Personal Engineering</span>
              <ChevronDown size={12} />
            </button>

            {showWorkspaceMenu && (
              <div
                className="lpalo-dropdown animate-fade-in"
                onClick={() => setShowWorkspaceMenu(false)}
              >
                <div className="lpalo-dropdown-header">Workspaces</div>
                <div className="lpalo-dropdown-item active">
                  <span>Personal Engineering</span>
                  <Check size={13} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center: Compact Navigation Cluster with Sidebar Properties */}
        <nav className="lpalo-nav-cluster">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={`lpalo-nav-pill ${isActive ? 'active' : ''}`}
              >
                <Icon size={14} />
                <span>{item.label}</span>
                {item.isAI && <span className="lpalo-pill-ai">AI</span>}
                {item.badge && <span className="lpalo-pill-badge">{item.badge}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Right Section: Live Status Pill (Search bar removed) */}
        <div className="lpalo-topbar-right">
          <div className="lpalo-status-pill" onClick={handleManualSync} title="Click to refresh sync">
            <span className="lpalo-status-dot" />
            <span className="lpalo-status-text">94.2% Synced</span>
            <RefreshCw size={11} className={isSyncing ? 'animate-spin' : ''} />
          </div>
        </div>
      </div>
    </header>
  );
};
