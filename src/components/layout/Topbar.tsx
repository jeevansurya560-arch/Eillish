import React, { useState } from 'react';
import { useLocation, NavLink, Link, useNavigate } from 'react-router-dom';
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
  LayoutDashboard,
  LogOut,
} from 'lucide-react';
import { useToast } from '../common/Toast';
import { useAuth } from '../../context/AuthContext';
import './AppShell.css';

interface TopbarProps {
  onOpenCommand?: () => void;
}

export const Topbar: React.FC<TopbarProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { user, logout, switchWorkspace } = useAuth();
  const [isSyncing, setIsSyncing] = useState(false);
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
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

  const handleLogout = () => {
    logout();
    showToast('Signed out of Eillish session', 'info');
    navigate('/auth/login');
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
              <span className="lpalo-workspace-label">{user?.workspace || 'Personal Engineering'}</span>
              <ChevronDown size={12} />
            </button>

            {showWorkspaceMenu && (
              <div
                className="lpalo-dropdown animate-fade-in"
                onClick={() => setShowWorkspaceMenu(false)}
              >
                <div className="lpalo-dropdown-header">Workspaces</div>
                {['Personal Engineering', 'Core Infrastructure', 'Experimental Research'].map((ws) => (
                  <div
                    key={ws}
                    className={`lpalo-dropdown-item ${user?.workspace === ws ? 'active' : ''}`}
                    onClick={() => switchWorkspace(ws)}
                  >
                    <span>{ws}</span>
                    {user?.workspace === ws && <Check size={13} />}
                  </div>
                ))}
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

        {/* Right Section: Live Status Pill & User Profile Menu */}
        <div className="lpalo-topbar-right" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="lpalo-status-pill" onClick={handleManualSync} title="Click to refresh sync">
            <span className="lpalo-status-dot" />
            <span className="lpalo-status-text">94.2% Synced</span>
            <RefreshCw size={11} className={isSyncing ? 'animate-spin' : ''} />
          </div>

          {/* User Profile Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '4px 12px 4px 6px',
                borderRadius: 'var(--radius-full)',
                border: '2px solid var(--color-charcoal-ink)',
                background: 'var(--color-snow)',
                fontFamily: 'var(--font-manrope)',
                fontSize: '12px',
                fontWeight: 800,
                cursor: 'pointer',
              }}
              title="User Account"
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: 'var(--color-sunbeam-yellow)',
                  border: '1.5px solid var(--color-charcoal-ink)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: 900,
                }}
              >
                {user?.name?.charAt(0) || 'A'}
              </div>
              <span>{user?.name?.split(' ')[0] || 'User'}</span>
              <ChevronDown size={12} />
            </button>

            {showProfileMenu && (
              <div
                className="lpalo-dropdown animate-fade-in"
                style={{ right: 0, left: 'auto', minWidth: 200, padding: 6 }}
                onClick={() => setShowProfileMenu(false)}
              >
                <div style={{ padding: '8px 10px', borderBottom: '1px solid var(--border)', marginBottom: 4 }}>
                  <div style={{ fontWeight: 800, fontSize: 13 }}>{user?.name || 'Alex Rivera'}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{user?.email || 'alex@eillish.internal'}</div>
                </div>

                <Link
                  to="/settings"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: 12.5,
                    fontWeight: 700,
                    color: 'var(--color-charcoal-ink)',
                    textDecoration: 'none',
                  }}
                >
                  <Settings size={14} />
                  <span>Account Settings</span>
                </Link>

                <div
                  onClick={handleLogout}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: 12.5,
                    fontWeight: 700,
                    color: '#dc2626',
                    cursor: 'pointer',
                    marginTop: 2,
                    borderTop: '1px solid var(--border)',
                  }}
                >
                  <LogOut size={14} />
                  <span>Sign Out</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
