import React, { useState } from 'react';
import {
  Search,
  LayoutList,
  LayoutGrid,
  FileCode,
  FileText,
  X,
  ExternalLink,
} from 'lucide-react';
import { mockDocuments } from '../data/mockData';
import { Document } from '../types';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';

export const KnowledgePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRepo, setSelectedRepo] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [sortBy, setSortBy] = useState<'updated' | 'title' | 'chunks'>('updated');
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  const repos = ['All', 'Eillish', 'Eillish-Docs', 'Eillish-Knowledge'];
  const types = ['All', 'markdown', 'code', 'documentation'];

  // Filtering
  const filtered = mockDocuments.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesRepo = selectedRepo === 'All' || doc.repository === selectedRepo;
    const matchesType = selectedType === 'All' || doc.type === selectedType;

    return matchesSearch && matchesRepo && matchesType;
  });

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    if (sortBy === 'chunks') return b.chunksCount - a.chunksCount;
    return 0; // default updated order
  });

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="hero-title-group">
          <h1 className="hero-heading">Knowledge Explorer</h1>
          <p className="hero-subtitle">
            Browse and inspect 1,284 indexed documents, AST chunk boundaries, and vector representations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View mode toggle */}
          <div
            style={{
              display: 'flex',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              padding: 2,
            }}
          >
            <button
              onClick={() => setViewMode('list')}
              style={{
                padding: '4px 8px',
                borderRadius: 4,
                background: viewMode === 'list' ? 'var(--surface-subtle)' : 'transparent',
                color: viewMode === 'list' ? 'var(--text-primary)' : 'var(--text-muted)',
              }}
              title="List View"
            >
              <LayoutList size={14} />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              style={{
                padding: '4px 8px',
                borderRadius: 4,
                background: viewMode === 'grid' ? 'var(--surface-subtle)' : 'transparent',
                color: viewMode === 'grid' ? 'var(--text-primary)' : 'var(--text-muted)',
              }}
              title="Grid View"
            >
              <LayoutGrid size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="ui-card" style={{ padding: '10px 14px' }}>
        <div className="flex items-center justify-between gap-3 flex-wrap">
          {/* Search Input */}
          <div className="flex items-center gap-2 flex-1" style={{ minWidth: 240 }}>
            <Search size={15} style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Filter by title, path, or tags..."
              className="flex-1"
              style={{ fontSize: 13, color: 'var(--text-primary)' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} style={{ color: 'var(--text-muted)' }}>
                <X size={13} />
              </button>
            )}
          </div>

          {/* Filters Group */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Repo Filter */}
            <div className="flex items-center gap-1.5 type-metadata">
              <span>Repo:</span>
              <select
                value={selectedRepo}
                onChange={(e) => setSelectedRepo(e.target.value)}
                style={{
                  padding: '3px 8px',
                  background: 'var(--surface-subtle)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: 12,
                  color: 'var(--text-primary)',
                }}
              >
                {repos.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-1.5 type-metadata">
              <span>Type:</span>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                style={{
                  padding: '3px 8px',
                  background: 'var(--surface-subtle)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: 12,
                  color: 'var(--text-primary)',
                }}
              >
                {types.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-1.5 type-metadata">
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                style={{
                  padding: '3px 8px',
                  background: 'var(--surface-subtle)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-xs)',
                  fontSize: 12,
                  color: 'var(--text-primary)',
                }}
              >
                <option value="updated">Recently Updated</option>
                <option value="title">Title (A-Z)</option>
                <option value="chunks">Chunks Count</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Document Results Counter */}
      <div className="flex items-center justify-between type-metadata" style={{ padding: '0 4px' }}>
        <span>Showing {sorted.length} knowledge items</span>
        <span>IVFFlat vector cluster index status: Healthy</span>
      </div>

      {/* Main Results View */}
      {viewMode === 'list' ? (
        <div className="ui-card" style={{ padding: '4px 0' }}>
          {sorted.map((doc) => (
            <div
              key={doc.id}
              onClick={() => setSelectedDoc(doc)}
              className="knowledge-row"
              style={{ padding: '12px 16px' }}
            >
              <div className="knowledge-row-left">
                <div className="file-type-icon">
                  {doc.type === 'code' ? <FileCode size={14} /> : <FileText size={14} />}
                </div>
                <div className="doc-info-block">
                  <div className="doc-info-title">{doc.title}</div>
                  <div className="doc-info-sub">
                    <span className="type-path">{doc.path}</span>
                    <span>·</span>
                    <span>{doc.repository}</span>
                    <span>·</span>
                    <span>Updated {doc.updatedAt}</span>
                  </div>
                </div>
              </div>

              <div className="knowledge-row-right">
                <div className="flex items-center gap-1">
                  {doc.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="slate">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <span className="type-metadata" style={{ fontFamily: 'var(--font-mono)' }}>
                  {doc.chunksCount} chunks
                </span>
                <Badge variant="emerald" dot>
                  Indexed
                </Badge>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 14 }}>
          {sorted.map((doc) => (
            <div
              key={doc.id}
              onClick={() => setSelectedDoc(doc)}
              className="ui-card ui-card--hoverable"
              style={{ padding: '16px', cursor: 'pointer' }}
            >
              <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
                <div className="flex items-center gap-2">
                  <div className="file-type-icon" style={{ width: 24, height: 24 }}>
                    {doc.type === 'code' ? <FileCode size={13} /> : <FileText size={13} />}
                  </div>
                  <span className="type-h3" style={{ fontSize: 13 }}>{doc.title}</span>
                </div>
                <Badge variant="emerald" dot>
                  Indexed
                </Badge>
              </div>

              <div className="type-path" style={{ marginBottom: 8 }}>
                {doc.path}
              </div>

              <p className="type-secondary" style={{ fontSize: 12, marginBottom: 12, minHeight: 36 }}>
                {doc.description}
              </p>

              <div className="flex items-center justify-between type-metadata" style={{ borderTop: '1px solid var(--border)', paddingTop: 8 }}>
                <span>{doc.chunksCount} chunks</span>
                <span>{doc.repository}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Slide-over Document Detail Drawer */}
      {selectedDoc && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 140,
            display: 'flex',
            justifyContent: 'flex-end',
            background: 'rgba(15, 23, 42, 0.35)',
            backdropFilter: 'blur(2px)',
          }}
          onClick={() => setSelectedDoc(null)}
        >
          <div
            className="animate-slide-up"
            style={{
              width: '100%',
              maxWidth: '640px',
              height: '100%',
              background: 'var(--surface)',
              borderLeft: '1px solid var(--border)',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              flexDirection: 'column',
              padding: '24px',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex items-start justify-between" style={{ marginBottom: 16 }}>
              <div>
                <div className="type-overline" style={{ color: 'var(--accent)', marginBottom: 4 }}>
                  {selectedDoc.repository} · {selectedDoc.type}
                </div>
                <h2 className="type-h1" style={{ fontSize: '18px' }}>
                  {selectedDoc.title}
                </h2>
                <div className="type-path" style={{ marginTop: 4 }}>
                  {selectedDoc.path}
                </div>
              </div>

              <button
                onClick={() => setSelectedDoc(null)}
                className="ui-button ui-button--ghost ui-button--sm"
              >
                <X size={16} />
              </button>
            </div>

            {/* Tags & Metadata strip */}
            <div
              className="flex items-center gap-2 flex-wrap"
              style={{
                padding: '10px 14px',
                background: 'var(--surface-subtle)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                marginBottom: 20,
              }}
            >
              <span className="type-metadata">Tags:</span>
              {selectedDoc.tags.map((t) => (
                <Badge key={t} variant="slate">
                  {t}
                </Badge>
              ))}
              <span className="type-metadata" style={{ marginLeft: 'auto' }}>
                {selectedDoc.chunksCount} chunks · Updated {selectedDoc.updatedAt}
              </span>
            </div>

            {/* Document Content View */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div className="type-h3">Document Content & Citations</div>
              <div
                style={{
                  background: 'var(--surface-subtle)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '16px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12.5px',
                  lineHeight: '1.6',
                  whiteSpace: 'pre-wrap',
                  overflowX: 'auto',
                  flex: 1,
                  color: 'var(--text-primary)',
                }}
              >
                {selectedDoc.content || `# ${selectedDoc.title}\n\n${selectedDoc.description}\n\nPath: ${selectedDoc.path}\n\n## Chunks Summary\nTotal semantic chunks: ${selectedDoc.chunksCount}\nOverlap ratio: 10%\nTokenizer: cl100k_base\nStatus: Synced with pgvector`}
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div
              className="flex items-center justify-between"
              style={{
                marginTop: 20,
                paddingTop: 14,
                borderTop: '1px solid var(--border)',
              }}
            >
              <Button variant="secondary" size="sm" onClick={() => setSelectedDoc(null)}>
                Close
              </Button>
              <Button variant="primary" size="sm" icon={<ExternalLink size={13} />}>
                Open in Source Repo
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
