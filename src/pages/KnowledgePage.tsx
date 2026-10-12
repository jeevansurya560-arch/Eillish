import React, { useState, useEffect } from 'react';
import {
  Search,
  LayoutList,
  LayoutGrid,
  FileCode,
  FileText,
  X,
  AlertCircle,
} from 'lucide-react';
import { knowledgeService } from '../services/knowledge.service';
import { repositoryService } from '../services/repository.service';
import { Document } from '../types';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';

export const KnowledgePage: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [repos, setRepos] = useState<string[]>(['All']);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRepo, setSelectedRepo] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [sortBy, setSortBy] = useState<'updated' | 'title' | 'chunks'>('updated');
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  const types = ['All', 'markdown', 'code', 'documentation', 'text'];

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        setIsLoading(true);
        setError(null);
        const [docs, repoList] = await Promise.all([
          knowledgeService.getDocuments(),
          repositoryService.getRepositories(),
        ]);
        if (isMounted) {
          setDocuments(docs);
          const repoNames = ['All', ...new Set(repoList.map((r) => r.name))];
          setRepos(repoNames);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || 'Failed to load documents.');
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filtering
  const filtered = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.tags && doc.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())));

    const matchesRepo = selectedRepo === 'All' || doc.repository.toLowerCase() === selectedRepo.toLowerCase();
    const matchesType = selectedType === 'All' || doc.type === selectedType;

    return matchesSearch && matchesRepo && matchesType;
  });

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    if (sortBy === 'chunks') return b.chunksCount - a.chunksCount;
    return 0;
  });

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="hero-title-group">
          <h1 className="hero-heading">Knowledge Explorer</h1>
          <p className="hero-subtitle">
            Browse and inspect {documents.length} verified documents, AST chunk boundaries, and vector representations.
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
          <div
            className="flex items-center gap-2 flex-1"
            style={{
              minWidth: '220px',
              background: 'var(--surface-subtle)',
              border: '1.5px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              padding: '6px 12px',
            }}
          >
            <Search size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Filter by filename, path, or extracted symbol..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                width: '100%',
                outline: 'none',
                fontSize: '13px',
                fontFamily: 'var(--font-sans)',
                color: 'var(--text-primary)',
              }}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                  display: 'flex',
                }}
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Scope Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Repository Select */}
            <select
              value={selectedRepo}
              onChange={(e) => setSelectedRepo(e.target.value)}
              style={{
                padding: '6px 10px',
                background: 'var(--surface)',
                border: '1.5px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '12px',
                fontFamily: 'var(--font-sans)',
                color: 'var(--text-primary)',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              {repos.map((r) => (
                <option key={r} value={r}>
                  Repo: {r}
                </option>
              ))}
            </select>

            {/* Type Select */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              style={{
                padding: '6px 10px',
                background: 'var(--surface)',
                border: '1.5px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '12px',
                fontFamily: 'var(--font-sans)',
                color: 'var(--text-primary)',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              {types.map((t) => (
                <option key={t} value={t}>
                  Type: {t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
              ))}
            </select>

            {/* Sort Select */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              style={{
                padding: '6px 10px',
                background: 'var(--surface)',
                border: '1.5px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '12px',
                fontFamily: 'var(--font-sans)',
                color: 'var(--text-primary)',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="updated">Sort: Recently Updated</option>
              <option value="title">Sort: File Name</option>
              <option value="chunks">Sort: Most Chunks</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main List / Grid State */}
      {isLoading ? (
        <div className="ui-card" style={{ padding: '60px', textAlign: 'center' }}>
          <div
            style={{
              width: 32,
              height: 32,
              border: '3px solid var(--color-charcoal-ink)',
              borderTopColor: 'transparent',
              borderRadius: '50%',
              margin: '0 auto 16px auto',
              animation: 'spin 0.8s linear infinite',
            }}
          />
          <div style={{ fontWeight: 700, fontSize: '14px' }}>Loading indexed documents from pgvector...</div>
        </div>
      ) : error ? (
        <div className="ui-card" style={{ padding: '40px', textAlign: 'center', borderColor: '#ef4444' }}>
          <AlertCircle size={28} style={{ color: '#ef4444', margin: '0 auto 12px auto' }} />
          <div style={{ fontWeight: 800, fontSize: '16px', color: '#991b1b', marginBottom: 6 }}>
            Error Fetching Documents
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: 16 }}>{error}</p>
          <Button variant="secondary" size="sm" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      ) : sorted.length === 0 ? (
        <div className="ui-card" style={{ padding: '60px 20px', textAlign: 'center' }}>
          <div className="flex flex-col items-center gap-3">
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 'var(--radius-sm)',
                background: 'var(--surface-subtle)',
                border: '2px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FileCode size={20} style={{ color: 'var(--text-muted)' }} />
            </div>
            <h3 className="type-h3" style={{ fontSize: 16 }}>
              {searchTerm || selectedRepo !== 'All' ? 'No matching documents' : 'Your knowledge base is empty'}
            </h3>
            <p style={{ fontFamily: 'var(--font-manrope)', fontSize: '14px', color: 'var(--text-secondary)', maxWidth: 420 }}>
              {searchTerm || selectedRepo !== 'All'
                ? `No documents matched your filters. Try clearing your search term or switching repositories.`
                : `Connect a GitHub repository or synchronize your workspace to index code, documentation, and AST chunks.`}
            </p>
            {searchTerm || selectedRepo !== 'All' ? (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedRepo('All');
                  setSelectedType('All');
                }}
              >
                Reset All Filters
              </Button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={() => (window.location.href = '/repositories')}
              >
                Connect Repository
              </Button>
            )}
          </div>
        </div>
      ) : viewMode === 'list' ? (
        <div className="ui-card" style={{ padding: '4px 0' }}>
          {sorted.map((doc) => (
            <div
              key={doc.id}
              onClick={() => setSelectedDoc(doc)}
              className="knowledge-row"
              style={{ padding: '12px 16px', cursor: 'pointer' }}
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
                  {doc.tags &&
                    doc.tags.slice(0, 2).map((tag) => (
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
              style={{ padding: '20px', cursor: 'pointer' }}
            >
              <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
                <div className="flex items-center gap-2">
                  {doc.type === 'code' ? <FileCode size={16} /> : <FileText size={16} />}
                  <span className="type-h3" style={{ fontSize: 14 }}>
                    {doc.title}
                  </span>
                </div>
                <Badge variant="emerald" dot>
                  Indexed
                </Badge>
              </div>

              <div className="type-path" style={{ marginBottom: 8 }}>
                {doc.path}
              </div>

              <p className="type-secondary" style={{ fontSize: 12.5, marginBottom: 12, minHeight: 36 }}>
                {doc.description}
              </p>

              <div
                className="flex items-center justify-between type-metadata"
                style={{ borderTop: '2px solid var(--color-charcoal-ink)', paddingTop: 10 }}
              >
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
            background: 'rgba(26, 26, 26, 0.4)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
          onClick={() => setSelectedDoc(null)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 580,
              background: 'var(--color-snow)',
              borderLeft: '2px solid var(--color-charcoal-ink)',
              height: '100%',
              padding: '28px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              fontFamily: 'var(--font-manrope)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {selectedDoc.type === 'code' ? <FileCode size={18} /> : <FileText size={18} />}
                <span style={{ fontWeight: 800, fontSize: 16 }}>{selectedDoc.title}</span>
              </div>
              <button
                onClick={() => setSelectedDoc(null)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--color-charcoal-ink)',
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Path and Repo Details */}
            <div
              style={{
                padding: '12px',
                background: 'var(--surface-subtle)',
                border: '1.5px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              <div className="type-path" style={{ marginBottom: 4 }}>
                {selectedDoc.path}
              </div>
              <div className="type-metadata">
                Repository: <strong>{selectedDoc.repository}</strong> · {selectedDoc.chunksCount} chunks · {selectedDoc.linesCount || 0} lines
              </div>
            </div>

            {/* Tags */}
            {selectedDoc.tags && selectedDoc.tags.length > 0 && (
              <div className="flex items-center gap-1 flex-wrap">
                {selectedDoc.tags.map((t) => (
                  <Badge key={t} variant="slate">
                    {t}
                  </Badge>
                ))}
              </div>
            )}

            {/* Content Preview */}
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>Indexed Content Preview</div>
              <pre
                style={{
                  padding: 14,
                  background: 'var(--surface-subtle)',
                  border: '1.5px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 12,
                  fontFamily: 'var(--font-mono)',
                  maxHeight: 350,
                  overflowY: 'auto',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {selectedDoc.content || '// No preview available for this document.'}
              </pre>
            </div>

            <div style={{ marginTop: 'auto', paddingTop: 14 }}>
              <Button
                variant="primary"
                size="md"
                onClick={() => (window.location.href = `/knowledge/${selectedDoc.id}`)}
              >
                Open Full AST & Chunks Inspector
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
