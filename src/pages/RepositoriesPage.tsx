import React, { useState } from 'react';
import {
  FolderGit2,
  RefreshCw,
  Plus,
  GitBranch,
  Settings as SettingsIcon,
  X,
  Github,
  CheckCircle2,
} from 'lucide-react';
import { mockRepositories } from '../data/mockData';
import { Repository } from '../types';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { useToast } from '../components/common/Toast';

export const RepositoriesPage: React.FC = () => {
  const { showToast } = useToast();
  const [repos, setRepos] = useState<Repository[]>(mockRepositories);
  const [syncingRepoId, setSyncingRepoId] = useState<string | null>(null);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [newRepoName, setNewRepoName] = useState('');

  const handleSyncRepo = (id: string, name: string) => {
    if (syncingRepoId) return;
    setSyncingRepoId(id);
    showToast(`Syncing ${name}... polling Git tree & chunking deltas`, 'info');

    setTimeout(() => {
      setSyncingRepoId(null);
      setRepos((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, status: 'synced', lastSyncedAt: 'Just now' } : r
        )
      );
      showToast(`${name} synchronized successfully. Vector index up to date.`, 'success');
    }, 1200);
  };

  const handleSyncAll = () => {
    showToast('Triggering delta synchronization for all 12 repositories...', 'info');
    setTimeout(() => {
      showToast('All repositories synchronized and verified.', 'success');
    }, 1500);
  };

  const handleConnectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRepoName.trim()) return;

    const created: Repository = {
      id: `repo-${Date.now()}`,
      name: newRepoName.trim(),
      description: 'Connected via GitHub Integration. Initializing vector ingestion.',
      provider: 'github',
      filesCount: 84,
      chunksCount: 620,
      status: 'synced',
      lastSyncedAt: 'Just now',
      branch: 'main',
    };

    setRepos([created, ...repos]);
    setIsConnectModalOpen(false);
    setNewRepoName('');
    showToast(`Repository "${created.name}" connected and queued for AST chunking!`, 'success');
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="hero-title-group">
          <h1 className="hero-heading">Connected Repositories</h1>
          <p className="hero-subtitle">
            Synchronized version control repositories with automatic AST chunking & vector indexing.
          </p>
        </div>

        <div className="hero-actions">
          <Button
            variant="secondary"
            size="sm"
            icon={<RefreshCw size={12} />}
            onClick={handleSyncAll}
          >
            Sync All
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={<Plus size={13} />}
            onClick={() => setIsConnectModalOpen(true)}
          >
            Connect Repository
          </Button>
        </div>
      </div>

      {/* Repositories Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 14 }}>
        {repos.map((repo) => {
          const isSyncing = syncingRepoId === repo.id;
          return (
            <div key={repo.id} className="ui-card ui-card--hoverable" style={{ padding: '18px 20px' }}>
              <div className="flex items-center justify-between" style={{ marginBottom: 6 }}>
                <div className="flex items-center gap-2">
                  <div className="kpi-icon-pill" style={{ width: 22, height: 22 }}>
                    <FolderGit2 size={12} />
                  </div>
                  <span className="type-h3" style={{ fontSize: '14px' }}>
                    {repo.name}
                  </span>
                </div>
                <Badge
                  variant={repo.status === 'synced' ? 'emerald' : 'amber'}
                  dot
                >
                  {isSyncing ? 'Syncing...' : repo.status === 'synced' ? 'Synced' : 'Needs attention'}
                </Badge>
              </div>

              <p className="type-secondary" style={{ fontSize: '12px', minHeight: 34, marginBottom: 14 }}>
                {repo.description}
              </p>

              {/* Stats Box */}
              <div
                className="flex items-center justify-between type-metadata"
                style={{
                  padding: '8px 12px',
                  background: 'var(--surface-subtle)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: 14,
                }}
              >
                <div>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                    {repo.filesCount}
                  </span>{' '}
                  files
                </div>
                <div>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                    {repo.chunksCount.toLocaleString()}
                  </span>{' '}
                  chunks
                </div>
                <div className="flex items-center gap-1">
                  <GitBranch size={11} />
                  <span>{repo.branch || 'main'}</span>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div
                className="flex items-center justify-between"
                style={{
                  paddingTop: 10,
                  borderTop: '1px solid var(--border)',
                }}
              >
                <span className="type-metadata">
                  {isSyncing ? 'Sync in progress...' : `Last sync: ${repo.lastSyncedAt}`}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    className="ui-button ui-button--ghost ui-button--sm"
                    title="Repository Settings"
                    onClick={() => showToast(`Config for ${repo.name}`, 'info')}
                  >
                    <SettingsIcon size={12} />
                  </button>
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={<RefreshCw size={11} className={isSyncing ? 'animate-spin' : ''} />}
                    onClick={() => handleSyncRepo(repo.id, repo.name)}
                    disabled={isSyncing}
                  >
                    {isSyncing ? 'Syncing' : 'Sync'}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Connect Repository Modal */}
      {isConnectModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 150,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(15, 23, 42, 0.45)',
            backdropFilter: 'blur(3px)',
            padding: 16,
          }}
          onClick={() => setIsConnectModalOpen(false)}
        >
          <div
            className="animate-slide-up"
            style={{
              width: '100%',
              maxWidth: '480px',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-float)',
              padding: '24px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
              <div className="flex items-center gap-2">
                <Github size={18} />
                <h2 className="type-h2">Connect GitHub Repository</h2>
              </div>
              <button
                onClick={() => setIsConnectModalOpen(false)}
                className="ui-button ui-button--ghost ui-button--sm"
              >
                <X size={15} />
              </button>
            </div>

            <p className="type-secondary" style={{ fontSize: 13, marginBottom: 16 }}>
              Select a repository to index. Eillish will establish AST boundary parsers, compute pgvector embeddings, and configure live push webhooks.
            </p>

            <form onSubmit={handleConnectSubmit} className="flex flex-col gap-4">
              <div>
                <label className="type-metadata" style={{ display: 'block', marginBottom: 6, fontWeight: 550 }}>
                  Repository Name (e.g. org/project)
                </label>
                <input
                  type="text"
                  className="ui-input"
                  placeholder="e.g. organization/knowledge-core"
                  value={newRepoName}
                  onChange={(e) => setNewRepoName(e.target.value)}
                  autoFocus
                />
              </div>

              <div>
                <label className="type-metadata" style={{ display: 'block', marginBottom: 6, fontWeight: 550 }}>
                  Default Branch
                </label>
                <input type="text" className="ui-input" defaultValue="main" />
              </div>

              <div
                style={{
                  padding: '10px 12px',
                  background: 'var(--surface-subtle)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 12,
                  color: 'var(--text-secondary)',
                }}
              >
                <div className="flex items-center gap-1.5 font-medium" style={{ color: 'var(--text-primary)', marginBottom: 2 }}>
                  <CheckCircle2 size={13} style={{ color: 'var(--success)' }} />
                  <span>Webhook synchronization</span>
                </div>
                Commits to this branch will automatically trigger differential chunk recalculation.
              </div>

              <div className="flex items-center justify-end gap-2" style={{ marginTop: 8 }}>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsConnectModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" icon={<Plus size={13} />}>
                  Connect & Index
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
