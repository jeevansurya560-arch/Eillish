import React, { useState } from 'react';
import {
  Database,
  Cpu,
  Shield,
  Bell,
  Palette,
  Search,
  FolderGit2,
  Sliders,
  Check,
} from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { useToast } from '../components/common/Toast';

export const SettingsPage: React.FC = () => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('Indexing');

  const settingsTabs = [
    { id: 'Workspace', label: 'Workspace', icon: Sliders },
    { id: 'Repositories', label: 'Repositories & Sync', icon: FolderGit2 },
    { id: 'Indexing', label: 'Chunking & Vector Index', icon: Database },
    { id: 'AI', label: 'AI Models & Reasoning', icon: Cpu },
    { id: 'Search', label: 'Search & Retrieval', icon: Search },
    { id: 'Appearance', label: 'Appearance', icon: Palette },
    { id: 'Notifications', label: 'Notifications', icon: Bell },
    { id: 'Security', label: 'Security & Access', icon: Shield },
  ];

  const handleSave = () => {
    showToast('Configuration preferences updated successfully.', 'success');
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="hero-title-group">
        <h1 className="hero-heading">Settings</h1>
        <p className="hero-subtitle">
          Manage vector storage configurations, AST chunk boundaries, AI models, and workspace permissions.
        </p>
      </div>

      {/* Tabbed Layout: Left Navigation + Right Content */}
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 20 }}>
        {/* Left Settings Sidebar */}
        <div className="ui-card" style={{ padding: '8px', height: 'fit-content' }}>
          <div className="flex flex-col gap-1">
            {settingsTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 9,
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '13px',
                    fontWeight: isActive ? 550 : 450,
                    cursor: 'pointer',
                    background: isActive ? 'var(--surface-subtle)' : 'transparent',
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    transition: 'all var(--transition-fast)',
                    textAlign: 'left',
                  }}
                >
                  <Icon size={14} style={{ opacity: isActive ? 1 : 0.7 }} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Settings Content Area */}
        <div className="flex flex-col gap-4">
          {activeTab === 'Indexing' && (
            <>
              {/* Chunking Strategy Box */}
              <div className="ui-card" style={{ padding: '20px' }}>
                <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
                  <div>
                    <h3 className="type-h3">Semantic Chunking Boundaries</h3>
                    <p className="type-secondary" style={{ fontSize: 12 }}>
                      Controls AST boundary splitting, target token sizes, and overlap ratios.
                    </p>
                  </div>
                  <Badge variant="emerald" dot>Active Strategy</Badge>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between" style={{ padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                    <div>
                      <div className="type-body" style={{ fontWeight: 500 }}>Target Chunk Size</div>
                      <div className="type-secondary" style={{ fontSize: 11.5 }}>Tokens per discrete embedding unit</div>
                    </div>
                    <code className="type-code" style={{ padding: '3px 8px', background: 'var(--surface-subtle)', borderRadius: 4 }}>
                      512 tokens
                    </code>
                  </div>

                  <div className="flex items-center justify-between" style={{ padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                    <div>
                      <div className="type-body" style={{ fontWeight: 500 }}>Chunk Overlap Ratio</div>
                      <div className="type-secondary" style={{ fontSize: 11.5 }}>Sliding window overlap between consecutive chunks</div>
                    </div>
                    <code className="type-code" style={{ padding: '3px 8px', background: 'var(--surface-subtle)', borderRadius: 4 }}>
                      10% (50 tokens)
                    </code>
                  </div>

                  <div className="flex items-center justify-between" style={{ padding: '10px 0' }}>
                    <div>
                      <div className="type-body" style={{ fontWeight: 500 }}>AST Markdown Headers</div>
                      <div className="type-secondary" style={{ fontSize: 11.5 }}>Never split within code blocks or table rows</div>
                    </div>
                    <Badge variant="blue">Enforced</Badge>
                  </div>
                </div>
              </div>

              {/* Vector Store Config */}
              <div className="ui-card" style={{ padding: '20px' }}>
                <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
                  <div>
                    <h3 className="type-h3">pgvector Database Cluster</h3>
                    <p className="type-secondary" style={{ fontSize: 12 }}>
                      PostgreSQL pgvector extension index configuration.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between" style={{ padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                    <div>
                      <div className="type-body" style={{ fontWeight: 500 }}>Embedding Dimension</div>
                      <div className="type-secondary" style={{ fontSize: 11.5 }}>Dense vector float array length</div>
                    </div>
                    <span className="type-metadata" style={{ fontFamily: 'var(--font-mono)' }}>1,536 dimensions</span>
                  </div>

                  <div className="flex items-center justify-between" style={{ padding: '10px 0' }}>
                    <div>
                      <div className="type-body" style={{ fontWeight: 500 }}>Index Type</div>
                      <div className="type-secondary" style={{ fontSize: 11.5 }}>IVFFlat approximate nearest neighbor cluster</div>
                    </div>
                    <Badge variant="emerald">IVFFlat (lists: 100)</Badge>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'AI' && (
            <div className="ui-card" style={{ padding: '20px' }}>
              <h3 className="type-h3" style={{ marginBottom: 4 }}>AI Models & Reasoning Configuration</h3>
              <p className="type-secondary" style={{ fontSize: 12, marginBottom: 16 }}>
                Select reasoning models used for evidence synthesis and citation verification.
              </p>

              <div className="flex flex-col gap-3">
                <div style={{ padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                  <label className="type-metadata" style={{ display: 'block', marginBottom: 4, fontWeight: 550 }}>
                    Embedding Model Provider
                  </label>
                  <select className="ui-input" defaultValue="openai-3-small">
                    <option value="openai-3-small">OpenAI text-embedding-3-small (1536 dim)</option>
                    <option value="openai-3-large">OpenAI text-embedding-3-large (3072 dim)</option>
                    <option value="bge-large">BGE Large En v1.5 (1024 dim - Local)</option>
                  </select>
                </div>

                <div style={{ padding: '10px 0' }}>
                  <label className="type-metadata" style={{ display: 'block', marginBottom: 4, fontWeight: 550 }}>
                    Synthesis & Reasoning Model
                  </label>
                  <select className="ui-input" defaultValue="claude-3-5-sonnet">
                    <option value="claude-3-5-sonnet">Claude 3.5 Sonnet (Recommended for technical code)</option>
                    <option value="gpt-4o">GPT-4o (High-throughput reasoning)</option>
                    <option value="deepseek-r1">DeepSeek R1 (Open-source distilled)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab !== 'Indexing' && activeTab !== 'AI' && (
            <div className="ui-card flex flex-col items-center justify-center text-center gap-2" style={{ padding: '48px 24px' }}>
              <div className="type-h3">{activeTab} Preferences</div>
              <p className="type-secondary" style={{ maxWidth: 360, fontSize: 12.5 }}>
                Standard enterprise configuration defaults are applied for {activeTab.toLowerCase()}.
              </p>
            </div>
          )}

          {/* Save Button Bar */}
          <div className="flex items-center justify-end gap-2" style={{ marginTop: 6 }}>
            <Button variant="secondary" size="sm" onClick={() => showToast('Changes discarded', 'info')}>
              Discard
            </Button>
            <Button variant="primary" size="sm" icon={<Check size={13} />} onClick={handleSave}>
              Save Preferences
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
