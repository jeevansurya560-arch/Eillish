import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  FolderGit2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Search,
  Check,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, switchWorkspace } = useAuth();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [workspaceName, setWorkspaceName] = useState(user?.workspace || 'Personal Engineering');
  const [selectedSource, setSelectedSource] = useState<'github' | 'local' | 'docs'>('github');
  const [selectedRepos, setSelectedRepos] = useState<string[]>(['eillish-core', 'frontend-docs']);
  const [isIndexing, setIsIndexing] = useState(false);
  const [indexingProgress, setIndexingProgress] = useState(0);

  const sampleRepos = [
    { id: 'eillish-core', name: 'eillish-core', desc: 'FastAPI service, pgvector IVFFlat indexes, AST parser', files: 48, language: 'Python' },
    { id: 'frontend-docs', name: 'frontend-docs', desc: 'React 18 components, Lpalo design tokens, Playwright specs', files: 34, language: 'TypeScript' },
    { id: 'infrastructure-k8s', name: 'infrastructure-k8s', desc: 'Kubernetes manifests, Helm charts, Terraform configs', files: 19, language: 'HCL' },
  ];

  const toggleRepo = (id: string) => {
    setSelectedRepos((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const handleStartIndexing = () => {
    setIsIndexing(true);
    let p = 0;
    const interval = setInterval(() => {
      p += 25;
      setIndexingProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setIsIndexing(false);
        setCurrentStep(5);
      }
    }, 400);
  };

  const handleFinishOnboarding = () => {
    switchWorkspace(workspaceName);
    navigate('/dashboard');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--color-peach-paper)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        fontFamily: 'var(--font-manrope)',
      }}
    >
      {/* Container Card */}
      <div
        style={{
          width: '100%',
          maxWidth: '620px',
          background: 'var(--color-snow)',
          border: '2px solid var(--color-charcoal-ink)',
          borderRadius: 'var(--radius-cards)',
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Progress Bar & Header */}
        <div style={{ marginBottom: 28 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 800,
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
              }}
            >
              Step {currentStep} of 5
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 800,
                color: 'var(--color-charcoal-ink)',
              }}
            >
              {Math.round((currentStep / 5) * 100)}% Completed
            </span>
          </div>

          <div
            style={{
              width: '100%',
              height: 6,
              background: 'var(--color-peach-paper)',
              borderRadius: 'var(--radius-full)',
              border: '1.5px solid var(--color-charcoal-ink)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${(currentStep / 5) * 100}%`,
                height: '100%',
                background: 'var(--color-charcoal-ink)',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>

        {/* STEP 1: Welcome */}
        {currentStep === 1 && (
          <div className="animate-fade-in">
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 'var(--radius-sm)',
                border: '2px solid var(--color-charcoal-ink)',
                background: 'var(--color-sunbeam-yellow)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 18,
              }}
            >
              <Sparkles size={24} />
            </div>

            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', margin: '0 0 10px 0' }}>
              Welcome to Eillish, {user?.name.split(' ')[0] || 'Engineer'}
            </h1>
            <p style={{ fontSize: '14px', lineHeight: 1.55, color: 'var(--text-primary)', margin: '0 0 24px 0' }}>
              Eillish is not a generic chatbot. It is an active engineering knowledge layer that ingests your code and docs, parses them along Abstract Syntax Tree (AST) boundaries, and gives you reasoned answers with verifiable line citations.
            </p>

            <div
              style={{
                background: 'var(--color-peach-paper)',
                border: '2px solid var(--color-charcoal-ink)',
                borderRadius: 'var(--radius-sm)',
                padding: '16px 20px',
                marginBottom: 28,
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', marginBottom: 4 }}>
                The Eillish Promise
              </div>
              <div style={{ fontSize: '13px', fontWeight: 700 }}>
                Every claim connects to a source file, line number, and commit hash.
              </div>
            </div>

            <button
              onClick={() => setCurrentStep(2)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                width: '100%',
                padding: '12px 20px',
                borderRadius: 'var(--radius-full)',
                border: '2px solid var(--color-charcoal-ink)',
                background: 'var(--color-charcoal-ink)',
                color: 'var(--color-snow)',
                fontSize: '13.5px',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              <span>Set Up Workspace</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}

        {/* STEP 2: Workspace Setup */}
        {currentStep === 2 && (
          <div className="animate-fade-in">
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', margin: '0 0 8px 0' }}>
              Name your knowledge workspace
            </h2>
            <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', margin: '0 0 24px 0' }}>
              Workspaces isolate documents, repositories, and pgvector indexes to ensure strict data tenancy.
            </p>

            <div style={{ marginBottom: 28 }}>
              <label
                htmlFor="onboarding-workspace-name"
                style={{
                  display: 'block',
                  fontSize: '11.5px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-mono)',
                  marginBottom: 8,
                }}
              >
                Workspace Name
              </label>
              <input
                id="onboarding-workspace-name"
                type="text"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '2px solid var(--color-charcoal-ink)',
                  background: 'var(--color-snow)',
                  fontSize: '14px',
                  fontWeight: 600,
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={() => setCurrentStep(1)}
                style={{
                  padding: '12px 20px',
                  borderRadius: 'var(--radius-full)',
                  border: '2px solid var(--color-charcoal-ink)',
                  background: 'var(--color-snow)',
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                <ArrowLeft size={14} />
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  padding: '12px 20px',
                  borderRadius: 'var(--radius-full)',
                  border: '2px solid var(--color-charcoal-ink)',
                  background: 'var(--color-charcoal-ink)',
                  color: 'var(--color-snow)',
                  fontSize: '13.5px',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                <span>Continue to Source Selection</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Choose Source Type */}
        {currentStep === 3 && (
          <div className="animate-fade-in">
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', margin: '0 0 8px 0' }}>
              Connect your first knowledge source
            </h2>
            <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', margin: '0 0 20px 0' }}>
              Choose how you want Eillish to discover files and AST syntax trees.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
              {[
                { id: 'github', title: 'GitHub Repository Sync', desc: 'Read-only webhook listeners on master/main branches with automatic commit diff polling.', icon: FolderGit2 },
                { id: 'local', title: 'Local Directory Watcher', desc: 'Indexes your active filesystem directories via file system watchers.', icon: Search },
              ].map((opt) => {
                const Icon = opt.icon;
                const isSelected = selectedSource === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => setSelectedSource(opt.id as any)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                      padding: '16px',
                      borderRadius: 'var(--radius-sm)',
                      border: '2px solid var(--color-charcoal-ink)',
                      background: isSelected ? 'var(--color-sunbeam-yellow)' : 'var(--color-snow)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 'var(--radius-sm)',
                        border: '2px solid var(--color-charcoal-ink)',
                        background: 'var(--color-snow)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon size={18} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800, fontSize: '13.5px', marginBottom: 2 }}>{opt.title}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.4 }}>{opt.desc}</div>
                    </div>
                    {isSelected && <CheckCircle2 size={20} style={{ color: 'var(--color-charcoal-ink)' }} />}
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={() => setCurrentStep(2)}
                style={{
                  padding: '12px 20px',
                  borderRadius: 'var(--radius-full)',
                  border: '2px solid var(--color-charcoal-ink)',
                  background: 'var(--color-snow)',
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                <ArrowLeft size={14} />
              </button>
              <button
                onClick={() => setCurrentStep(4)}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  padding: '12px 20px',
                  borderRadius: 'var(--radius-full)',
                  border: '2px solid var(--color-charcoal-ink)',
                  background: 'var(--color-charcoal-ink)',
                  color: 'var(--color-snow)',
                  fontSize: '13.5px',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                <span>Select Repositories</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Select Repositories & Trigger Initial Ingestion */}
        {currentStep === 4 && (
          <div className="animate-fade-in">
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', margin: '0 0 8px 0' }}>
              Select repositories to index
            </h2>
            <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', margin: '0 0 20px 0' }}>
              Select which codebases Eillish should parse into semantic AST chunks.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
              {sampleRepos.map((repo) => {
                const isSelected = selectedRepos.includes(repo.id);
                return (
                  <div
                    key={repo.id}
                    onClick={() => toggleRepo(repo.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px 16px',
                      borderRadius: 'var(--radius-sm)',
                      border: '2px solid var(--color-charcoal-ink)',
                      background: isSelected ? 'var(--color-mint-wash)' : 'var(--color-snow)',
                      cursor: 'pointer',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                        <span style={{ fontWeight: 800, fontSize: '13.5px' }}>{repo.name}</span>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '10px',
                            fontWeight: 700,
                            padding: '2px 6px',
                            borderRadius: 'var(--radius-full)',
                            background: 'var(--color-snow)',
                            border: '1px solid var(--color-charcoal-ink)',
                          }}
                        >
                          {repo.language}
                        </span>
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{repo.desc}</div>
                    </div>

                    <div
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: '4px',
                        border: '2px solid var(--color-charcoal-ink)',
                        background: isSelected ? 'var(--color-charcoal-ink)' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-snow)',
                      }}
                    >
                      {isSelected && <Check size={14} />}
                    </div>
                  </div>
                );
              })}
            </div>

            {isIndexing ? (
              <div
                style={{
                  background: 'var(--color-peach-paper)',
                  border: '2px solid var(--color-charcoal-ink)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '20px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontWeight: 800, fontSize: '14px', marginBottom: 8 }}>
                  Parsing AST Functional Scopes... {indexingProgress}%
                </div>
                <div
                  style={{
                    width: '100%',
                    height: 8,
                    background: 'var(--color-snow)',
                    borderRadius: 'var(--radius-full)',
                    border: '1.5px solid var(--color-charcoal-ink)',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${indexingProgress}%`,
                      height: '100%',
                      background: 'var(--color-charcoal-ink)',
                      transition: 'width 0.2s linear',
                    }}
                  />
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  onClick={() => setCurrentStep(3)}
                  style={{
                    padding: '12px 20px',
                    borderRadius: 'var(--radius-full)',
                    border: '2px solid var(--color-charcoal-ink)',
                    background: 'var(--color-snow)',
                    fontSize: '13px',
                    fontWeight: 800,
                    cursor: 'pointer',
                  }}
                >
                  <ArrowLeft size={14} />
                </button>
                <button
                  onClick={handleStartIndexing}
                  disabled={selectedRepos.length === 0}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    padding: '12px 20px',
                    borderRadius: 'var(--radius-full)',
                    border: '2px solid var(--color-charcoal-ink)',
                    background: 'var(--color-charcoal-ink)',
                    color: 'var(--color-snow)',
                    fontSize: '13.5px',
                    fontWeight: 800,
                    cursor: selectedRepos.length === 0 ? 'not-allowed' : 'pointer',
                  }}
                >
                  <span>Parse & Index {selectedRepos.length} Repositories</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* STEP 5: Success & Ready to Ask */}
        {currentStep === 5 && (
          <div className="animate-fade-in" style={{ textAlign: 'center' }}>
            <div
              style={{
                width: 54,
                height: 54,
                borderRadius: '50%',
                background: 'var(--color-mint-wash)',
                border: '2px solid var(--color-charcoal-ink)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
              }}
            >
              <CheckCircle2 size={30} style={{ color: 'var(--color-charcoal-ink)' }} />
            </div>

            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', margin: '0 0 8px 0' }}>
              Knowledge System Initialized!
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-primary)', margin: '0 0 24px 0', lineHeight: 1.5 }}>
              82 files parsed across <strong>{workspaceName}</strong>. 1,284 semantic AST chunks have been indexed into pgvector with exact line-span boundaries.
            </p>

            <div
              style={{
                background: 'var(--color-peach-paper)',
                border: '2px solid var(--color-charcoal-ink)',
                borderRadius: 'var(--radius-sm)',
                padding: '16px',
                textAlign: 'left',
                marginBottom: 28,
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', marginBottom: 4 }}>
                Recommended First Step:
              </div>
              <div style={{ fontSize: '13px', fontWeight: 700 }}>
                Try asking questions in AI Search like <em>"How is authentication handled?"</em> to verify line-level citations.
              </div>
            </div>

            <button
              onClick={handleFinishOnboarding}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                width: '100%',
                padding: '13px 24px',
                borderRadius: 'var(--radius-full)',
                border: '2px solid var(--color-charcoal-ink)',
                background: 'var(--color-charcoal-ink)',
                color: 'var(--color-snow)',
                fontSize: '14px',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              <span>Enter Workspace Dashboard</span>
              <ArrowRight size={15} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
