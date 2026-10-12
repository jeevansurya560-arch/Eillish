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
import { knowledgeService } from '../../services/knowledge.service';
import { Document } from '../../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');
  const [docs, setDocs] = useState<Document[]>([]);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      knowledgeService.getDocuments().then(setDocs).catch(() => setDocs([]));
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

  const filteredDocs = docs.filter((doc) =>
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

  const handleSelectDoc = (docId: string) => {
    navigate(`/knowledge/${docId}`);
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
        background: 'rgba(0, 0, 0, 0.45)',
      }}
      onClick={onClose}
    >
      <div
        className="ui-card"
        style={{
          width: '100%',
          maxWidth: 620,
          background: 'var(--color-snow)',
          padding: 0,
          overflow: 'hidden',
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
            borderBottom: '2px solid var(--color-charcoal-ink)',
          }}
        >
          <Search size={18} style={{ color: 'var(--color-charcoal-ink)', flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search indexed files..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: 14,
              fontFamily: 'var(--font-manrope)',
              fontWeight: 600,
              width: '100%',
              color: 'var(--color-charcoal-ink)',
            }}
          />
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-charcoal-ink)',
              display: 'flex',
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Results List */}
        <div style={{ maxHeight: 380, overflowY: 'auto', padding: 8 }}>
          {/* Navigation Section */}
          {filteredNav.length > 0 && (
            <div style={{ marginBottom: 12 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  padding: '6px 12px',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                Quick Navigation
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
                      gap: 10,
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      fontSize: 13,
                      fontWeight: 600,
                      color: 'var(--color-charcoal-ink)',
                      transition: 'background var(--transition-fast)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-subtle)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <Icon size={14} />
                    <span>{item.title}</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Documents Section */}
          {filteredDocs.length > 0 && (
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  padding: '6px 12px',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                Indexed Documents
              </div>
              {filteredDocs.slice(0, 5).map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => handleSelectDoc(doc.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    fontSize: 13,
                    fontWeight: 600,
                    color: 'var(--color-charcoal-ink)',
                    transition: 'background var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-subtle)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <div className="flex items-center gap-2">
                    <FileCode size={14} />
                    <span>{doc.title}</span>
                  </div>
                  <span className="type-metadata" style={{ fontSize: 11 }}>{doc.repository}</span>
                </div>
              ))}
            </div>
          )}

          {filteredNav.length === 0 && filteredDocs.length === 0 && (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
              No commands or documents found for "{search}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
