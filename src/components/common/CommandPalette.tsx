import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  BookOpen,
  FolderGit2,
  Activity,
  BarChart3,
  Settings,
  Sparkles,
  ArrowRight,
  FileCode,
  X,
} from 'lucide-react';
import { mockDocuments } from '../../data/mockData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Keyboard shortcut listener for Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickNav = [
    { title: 'Landing Page', icon: ArrowRight, path: '/' },
    { title: 'Knowledge Explorer', icon: BookOpen, path: '/knowledge' },
    { title: 'Ask AI Knowledge', icon: Sparkles, path: '/search' },
    { title: 'Repositories', icon: FolderGit2, path: '/repositories' },
    { title: 'Activity Timeline', icon: Activity, path: '/activity' },
    { title: 'Analytics & Benchmarks', icon: BarChart3, path: '/analytics' },
    { title: 'Settings', icon: Settings, path: '/settings' },
  ];

  const filteredDocs = mockDocuments.filter((doc) =>
    doc.title.toLowerCase().includes(search.toLowerCase()) ||
    doc.path.toLowerCase().includes(search.toLowerCase())
  );

  const filteredNav = quickNav.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectNav = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleSelectDoc = () => {
    navigate('/knowledge');
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 150,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '12vh',
        background: 'rgba(15, 23, 42, 0.45)',
        backdropFilter: 'blur(3px)',
      }}
      onClick={onClose}
    >
      <div
        className="animate-slide-up"
        style={{
          width: '100%',
          maxWidth: '560px',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-float)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '14px 18px',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <Search size={17} style={{ color: 'var(--text-muted)' }} />
          <input
            ref={inputRef}
            type="text"
            className="flex-1"
            placeholder="Type a command or search knowledge..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              fontSize: '14px',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-sans)',
            }}
          />
          {search ? (
            <button onClick={() => setSearch('')} style={{ color: 'var(--text-muted)' }}>
              <X size={14} />
            </button>
          ) : (
            <kbd>ESC</kbd>
          )}
        </div>

        {/* List of Results */}
        <div style={{ maxHeight: '380px', overflowY: 'auto', padding: '8px' }}>
          {/* Quick Actions / Navigation */}
          {filteredNav.length > 0 && (
            <div style={{ marginBottom: 12 }}>
              <div
                className="type-overline"
                style={{ padding: '6px 10px', color: 'var(--text-muted)' }}
              >
                Navigation
              </div>
              {filteredNav.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.path}
                    onClick={() => handleSelectNav(item.path)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 10px',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      fontSize: '13px',
                      color: 'var(--text-primary)',
                      transition: 'background 0.12s ease',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = 'var(--surface-subtle)')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = 'transparent')
                    }
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Icon size={15} style={{ color: 'var(--text-muted)' }} />
                      <span>{item.title}</span>
                    </div>
                    <ArrowRight size={13} style={{ color: 'var(--text-muted)' }} />
                  </div>
                );
              })}
            </div>
          )}

          {/* Matching Documents */}
          {filteredDocs.length > 0 && (
            <div>
              <div
                className="type-overline"
                style={{ padding: '6px 10px', color: 'var(--text-muted)' }}
              >
                Knowledge Documents ({filteredDocs.length})
              </div>
              {filteredDocs.map((doc) => (
                <div
                  key={doc.id}
                  onClick={handleSelectDoc}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    fontSize: '13px',
                    transition: 'background 0.12s ease',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = 'var(--surface-subtle)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = 'transparent')
                  }
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <FileCode size={15} style={{ color: 'var(--text-muted)' }} />
                    <div>
                      <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>
                        {doc.title}
                      </div>
                      <div className="type-path" style={{ fontSize: '11px' }}>
                        {doc.path}
                      </div>
                    </div>
                  </div>
                  <span className="type-metadata" style={{ fontFamily: 'var(--font-mono)' }}>
                    {doc.chunksCount} chunks
                  </span>
                </div>
              ))}
            </div>
          )}

          {filteredNav.length === 0 && filteredDocs.length === 0 && (
            <div
              style={{
                padding: '32px 16px',
                textAlign: 'center',
                color: 'var(--text-muted)',
                fontSize: '13px',
              }}
            >
              No commands or knowledge found matching "{search}"
            </div>
          )}
        </div>

        {/* Footer info */}
        <div
          style={{
            padding: '8px 16px',
            background: 'var(--surface-subtle)',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '11.5px',
            color: 'var(--text-muted)',
          }}
        >
          <div style={{ display: 'flex', gap: 12 }}>
            <span><kbd>↑</kbd> <kbd>↓</kbd> to navigate</span>
            <span><kbd>↵</kbd> to select</span>
          </div>
          <span>Eillish Command Center</span>
        </div>
      </div>
    </div>
  );
};
