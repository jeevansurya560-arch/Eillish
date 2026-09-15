import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  BookOpen,
  Search,
  FolderGit2,
  Activity,
  BarChart3,
  Settings,
  Sparkles,
  ArrowLeft,
  X,
} from 'lucide-react';
import './AppShell.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCommand: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onOpenCommand }) => {
  const coreNav = [
    { to: '/knowledge', label: 'Knowledge Base', icon: BookOpen, badge: '1,284' },
    { to: '/search', label: 'AI Search', icon: Search, isAI: true },
    { to: '/repositories', label: 'Repositories', icon: FolderGit2, badge: '12' },
    { to: '/activity', label: 'Activity Feed', icon: Activity },
    { to: '/analytics', label: 'RAG Analytics', icon: BarChart3 },
  ];

  return (
    <aside className={`app-sidebar ${isOpen ? 'open' : 'closed'}`}>
      {/* Brand Header with Explicit Close Button */}
      <div className="sidebar-header">
        <Link to="/" className="sidebar-brand">
          <div className="brand-logo-container">
            <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" fill="#0F172A" />
              <rect x="8" y="8" width="16" height="3.5" fill="#FFFFFF" />
              <rect x="8" y="14" width="11" height="3.5" fill="#CBD5E1" />
              <rect x="8" y="20.5" width="8" height="3.5" fill="#94A3B8" />
              <circle cx="21" cy="22.25" r="1.75" fill="#0F172A" stroke="#FFFFFF" strokeWidth="1.5" />
            </svg>
          </div>
          <div className="sidebar-brand-text">
            <div className="sidebar-brand-name">Eillish</div>
            <div className="sidebar-tagline">Architectural System</div>
          </div>
        </Link>

        {/* Explicit Close Button for Desktop & Mobile */}
        <button
          className="sidebar-close-btn"
          onClick={onClose}
          title="Close Sidebar (Ctrl+B)"
          aria-label="Close Sidebar"
        >
          <X size={13} />
          <span className="sidebar-close-label">Close</span>
        </button>
      </div>

      {/* Return to Landing Page Ghost Link */}
      <div className="sidebar-home-action">
        <Link to="/" className="sidebar-home-btn">
          <ArrowLeft size={12} />
          <span>Landing Home</span>
        </Link>
      </div>

      {/* Quick Search Shortcut Strip */}
      <div className="sidebar-search-action">
        <button className="sidebar-search-btn" onClick={onOpenCommand}>
          <div className="flex items-center gap-2">
            <Search size={12} style={{ color: 'var(--text-muted)' }} />
            <span>Search / ⌘K</span>
          </div>
          <kbd>⌘K</kbd>
        </button>
      </div>

      {/* Navigation Sections */}
      <nav className="sidebar-nav">
        <div className="nav-section-label">Core System</div>
        {coreNav.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              onClick={() => {
                if (window.innerWidth < 960) {
                  onClose();
                }
              }}
            >
              <div className="nav-item-indicator" />
              <Icon className="nav-item-icon" />
              <span className="nav-item-label">{item.label}</span>
              {item.isAI && (
                <span className="nav-ai-pill">
                  <Sparkles size={9} />
                  <span>AI</span>
                </span>
              )}
              {item.badge && <span className="nav-item-badge">{item.badge}</span>}
            </NavLink>
          );
        })}

        <div className="nav-section-label" style={{ marginTop: '24px' }}>
          Preferences
        </div>
        <NavLink
          to="/settings"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          onClick={() => {
            if (window.innerWidth < 960) {
              onClose();
            }
          }}
        >
          <div className="nav-item-indicator" />
          <Settings className="nav-item-icon" />
          <span className="nav-item-label">Settings</span>
        </NavLink>
      </nav>

      {/* Bottom: System Status */}
      <div className="sidebar-footer">
        <div className="system-status-box">
          <div className="status-indicator-dot" />
          <div className="status-text-block">
            <div className="status-heading">System Operational</div>
            <div className="status-sub">1,284 Indexed · 432.00 Hz Lock</div>
          </div>
        </div>
      </div>
    </aside>
  );
};
