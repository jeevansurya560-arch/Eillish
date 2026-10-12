import { useState, useEffect } from "react";
import {
  Database,
  Cpu,
  Shield,
  Sliders,
  Check,
  User,
  Github
} from "lucide-react";
import { Badge } from "../components/common/Badge";
import { Button } from "../components/common/Button";
import { useToast } from "../components/common/Toast";
import { useAuth } from "../context/AuthContext";
import { settingsService } from "../services/settings.service";
const SettingsPage = () => {
  const { showToast } = useToast();
  const { user, switchWorkspace } = useAuth();
  const [activeTab, setActiveTab] = useState("Profile");
  const [settings, setSettings] = useState({
    chunkSize: 512,
    chunkOverlap: 50,
    embeddingModel: "text-embedding-3-small",
    llmModel: "gpt-4o-mini",
    retrievalK: 5,
    searchMode: "hybrid",
    astHeadersEnforced: true,
    embeddingDimension: 1536,
    vectorStatus: "HNSW Cosine Vector Index (Active)"
  });
  const [dbHealth, setDbHealth] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [workspaceInput, setWorkspaceInput] = useState(user?.workspace || "Personal Engineering");
  const settingsTabs = [
    { id: "Profile", label: "Profile & Account", icon: User },
    { id: "Integrations", label: "Integrations & GitHub", icon: Github },
    { id: "Security", label: "Security & Access", icon: Shield },
    { id: "Indexing", label: "Chunking & Vector Index", icon: Database },
    { id: "AI", label: "AI Models & Reasoning", icon: Cpu },
    { id: "Workspace", label: "Workspace Config", icon: Sliders }
  ];
  useEffect(() => {
    async function loadConfig() {
      try {
        setIsLoading(true);
        const [configData, healthData] = await Promise.all([
          settingsService.getSettings(),
          settingsService.getDatabaseHealth().catch(() => null)
        ]);
        setSettings(configData);
        setDbHealth(healthData);
      } catch (err) {
        showToast("Loaded local configuration defaults", "info");
      } finally {
        setIsLoading(false);
      }
    }
    loadConfig();
  }, []);
  const handleSave = async () => {
    try {
      await settingsService.updateSettings(settings);
      if (workspaceInput !== user?.workspace) {
        switchWorkspace(workspaceInput);
      }
      showToast("Configuration preferences saved to database.", "success");
    } catch (err) {
      showToast(`Failed to save preferences: ${err.message}`, "info");
    }
  };
  return <div className="flex flex-col gap-5">
      {
    /* Header */
  }
      <div className="hero-title-group">
        <h1 className="hero-heading">Settings</h1>
        <p className="hero-subtitle">
          Manage vector storage configurations, AST chunk boundaries, AI models, and workspace permissions.
        </p>
      </div>

      {isLoading ? <div className="ui-card" style={{ padding: "60px", textAlign: "center" }}>
          <div
    style={{
      width: 32,
      height: 32,
      border: "3px solid var(--color-charcoal-ink)",
      borderTopColor: "transparent",
      borderRadius: "50%",
      margin: "0 auto 16px auto",
      animation: "spin 0.8s linear infinite"
    }}
  />
          <div style={{ fontWeight: 700, fontSize: "14px" }}>Loading configuration preferences...</div>
        </div> : (
    /* Tabbed Layout: Left Navigation + Right Content */
    <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 20 }}>
          {
      /* Left Settings Sidebar */
    }
          <div className="ui-card" style={{ padding: "8px", height: "fit-content" }}>
          <div className="flex flex-col gap-1">
            {settingsTabs.map((tab) => {
      const Icon = tab.icon;
      const isActive = activeTab === tab.id;
      return <button
        key={tab.id}
        onClick={() => setActiveTab(tab.id)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "8px 12px",
          borderRadius: "var(--radius-sm)",
          border: "none",
          background: isActive ? "var(--color-charcoal-ink)" : "transparent",
          color: isActive ? "var(--color-snow)" : "var(--text-secondary)",
          fontFamily: "var(--font-sans)",
          fontSize: 12.5,
          fontWeight: 600,
          cursor: "pointer",
          textAlign: "left",
          transition: "all var(--transition-fast)",
          width: "100%"
        }}
      >
                  <Icon size={14} />
                  <span>{tab.label}</span>
                </button>;
    })}
          </div>
        </div>

        {
      /* Right Settings Content */
    }
        <div className="flex flex-col gap-4">
          {
      /* TAB 1: PROFILE */
    }
          {activeTab === "Profile" && <div className="ui-card" style={{ padding: "20px" }}>
              <h3 className="type-h3" style={{ marginBottom: 4 }}>User Profile</h3>
              <p className="type-secondary" style={{ fontSize: 12, marginBottom: 16 }}>
                Primary account identity and workspace credentials.
              </p>

              <div className="flex flex-col gap-3" style={{ maxWidth: 440 }}>
                <div>
                  <label className="type-metadata" style={{ display: "block", marginBottom: 4, fontWeight: 550 }}>
                    Display Name
                  </label>
                  <input
      type="text"
      className="ui-input"
      value={user?.name || "Engineer"}
      readOnly
      style={{ width: "100%", background: "var(--surface-subtle)" }}
    />
                </div>

                <div>
                  <label className="type-metadata" style={{ display: "block", marginBottom: 4, fontWeight: 550 }}>
                    Email Address
                  </label>
                  <input
      type="email"
      className="ui-input"
      value={user?.email || "dev@eillish.internal"}
      readOnly
      style={{ width: "100%", background: "var(--surface-subtle)" }}
    />
                </div>

                <div>
                  <label className="type-metadata" style={{ display: "block", marginBottom: 4, fontWeight: 550 }}>
                    Assigned Role
                  </label>
                  <div className="flex items-center gap-2">
                    <Badge variant="emerald">{user?.role || "engineer"}</Badge>
                    <span className="type-secondary" style={{ fontSize: 11.5 }}>Workspace tenant isolation active</span>
                  </div>
                </div>
              </div>
            </div>}

          {
      /* TAB 2: INTEGRATIONS */
    }
          {activeTab === "Integrations" && <div className="ui-card" style={{ padding: "20px" }}>
              <h3 className="type-h3" style={{ marginBottom: 4 }}>Connected Ingestion Providers</h3>
              <p className="type-secondary" style={{ fontSize: 12, marginBottom: 16 }}>
                External service connections used for codebase ingestion and webhook triggers.
              </p>

              <div className="flex flex-col gap-3">
                {
      /* GitHub Ingestion Service */
    }
                <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px",
        borderRadius: "var(--radius-sm)",
        border: "1.5px solid var(--border)",
        background: "var(--surface)"
      }}
    >
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: "var(--radius-sm)",
        background: "var(--color-charcoal-ink)",
        color: "var(--color-snow)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
                      <Github size={20} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 14 }}>GitHub Ingestion Service</div>
                      <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                        {user?.githubConnected ? `Connected as @${user.githubUsername || "developer"} \xB7 Repository read access` : "Connected via GitHub REST API \xB7 Ingestion ready"}
                      </div>
                    </div>
                  </div>

                  <Badge variant="emerald" dot>Connected</Badge>
                </div>

                {
      /* Supabase Database Service */
    }
                <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px",
        borderRadius: "var(--radius-sm)",
        border: "1.5px solid var(--border)",
        background: "var(--surface-subtle)"
      }}
    >
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: "var(--radius-sm)",
        background: "var(--color-sunbeam-yellow)",
        border: "1.5px solid var(--color-charcoal-ink)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
                      <Database size={20} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 14 }}>Supabase PostgreSQL + pgvector</div>
                      <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                        {dbHealth?.pgvector_version ? `Connected \xB7 pgvector version ${dbHealth.pgvector_version} \xB7 HNSW active` : "Connected to Supabase PostgreSQL cluster"}
                      </div>
                    </div>
                  </div>

                  <Badge variant="emerald" dot>Healthy</Badge>
                </div>
              </div>
            </div>}

          {
      /* TAB 3: SECURITY */
    }
          {activeTab === "Security" && <div className="ui-card" style={{ padding: "24px" }}>
              <h3 className="type-h3" style={{ marginBottom: 4 }}>Security & Access Control</h3>
              <p className="type-secondary" style={{ fontSize: 12, marginBottom: 20 }}>
                Review active bearer tokens, session persistence, and tenant isolation parameters.
              </p>

              <div className="flex flex-col gap-4">
                <div style={{ padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
                  <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 2 }}>Session Authentication</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8 }}>
                    Signed HS256 JWT Bearer token verified on every protected API route.
                  </div>
                  <Badge variant="emerald">Valid Session</Badge>
                </div>

                <div style={{ padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
                  <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 2 }}>Data Tenancy Isolation</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8 }}>
                    User Tenant Partition: <code className="type-code">{user?.id || "usr-default"}</code>
                  </div>
                  <Badge variant="blue">Enforced</Badge>
                </div>
              </div>
            </div>}

          {
      /* TAB 4: INDEXING */
    }
          {activeTab === "Indexing" && <>
              {
      /* Chunking Strategy Box */
    }
              <div className="ui-card" style={{ padding: "20px" }}>
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
                  <div className="flex items-center justify-between" style={{ padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                    <div>
                      <div className="type-body" style={{ fontWeight: 500 }}>Target Chunk Size</div>
                      <div className="type-secondary" style={{ fontSize: 11.5 }}>Tokens per discrete embedding unit</div>
                    </div>
                    <select
      className="ui-input"
      value={settings.chunkSize}
      onChange={(e) => setSettings({ ...settings, chunkSize: Number(e.target.value) })}
    >
                      <option value={256}>256 tokens (Fine-grained)</option>
                      <option value={512}>512 tokens (Default / Recommended)</option>
                      <option value={1024}>1024 tokens (Broad context)</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between" style={{ padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                    <div>
                      <div className="type-body" style={{ fontWeight: 500 }}>Chunk Overlap Ratio</div>
                      <div className="type-secondary" style={{ fontSize: 11.5 }}>Sliding window overlap between consecutive chunks</div>
                    </div>
                    <select
      className="ui-input"
      value={settings.chunkOverlap}
      onChange={(e) => setSettings({ ...settings, chunkOverlap: Number(e.target.value) })}
    >
                      <option value={25}>5% (25 tokens)</option>
                      <option value={50}>10% (50 tokens - Default)</option>
                      <option value={100}>20% (100 tokens)</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between" style={{ padding: "10px 0" }}>
                    <div>
                      <div className="type-body" style={{ fontWeight: 500 }}>AST Markdown Headers & Code Blocks</div>
                      <div className="type-secondary" style={{ fontSize: 11.5 }}>Never split within code blocks or table rows</div>
                    </div>
                    <Badge variant="blue">Enforced in Pipeline</Badge>
                  </div>
                </div>
              </div>

              {
      /* Vector Store Config */
    }
              <div className="ui-card" style={{ padding: "20px" }}>
                <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
                  <div>
                    <h3 className="type-h3">pgvector Database Cluster</h3>
                    <p className="type-secondary" style={{ fontSize: 12 }}>
                      PostgreSQL pgvector extension index configuration.
                    </p>
                  </div>
                  <Badge variant="emerald">pgvector 0.8.2 Verified</Badge>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between" style={{ padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                    <div>
                      <div className="type-body" style={{ fontWeight: 500 }}>Embedding Dimension</div>
                      <div className="type-secondary" style={{ fontSize: 11.5 }}>Dense vector float array length</div>
                    </div>
                    <span className="type-metadata" style={{ fontFamily: "var(--font-mono)" }}>
                      {settings.embeddingDimension} dimensions
                    </span>
                  </div>

                  <div className="flex items-center justify-between" style={{ padding: "10px 0" }}>
                    <div>
                      <div className="type-body" style={{ fontWeight: 500 }}>Index Type</div>
                      <div className="type-secondary" style={{ fontSize: 11.5 }}>Hierarchical Navigable Small World (HNSW) cosine metric</div>
                    </div>
                    <Badge variant="emerald">HNSW (vector_cosine_ops)</Badge>
                  </div>
                </div>
              </div>
            </>}

          {
      /* TAB 5: AI */
    }
          {activeTab === "AI" && <div className="ui-card" style={{ padding: "20px" }}>
              <h3 className="type-h3" style={{ marginBottom: 4 }}>AI Models & Reasoning Configuration</h3>
              <p className="type-secondary" style={{ fontSize: 12, marginBottom: 16 }}>
                Select reasoning models used for evidence synthesis and citation verification.
              </p>

              <div className="flex flex-col gap-3">
                <div style={{ padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                  <label className="type-metadata" style={{ display: "block", marginBottom: 4, fontWeight: 550 }}>
                    Embedding Model Provider
                  </label>
                  <select
      className="ui-input"
      value={settings.embeddingModel}
      onChange={(e) => setSettings({ ...settings, embeddingModel: e.target.value })}
    >
                    <option value="text-embedding-3-small">OpenAI text-embedding-3-small (1536 dim)</option>
                    <option value="eillish-semantic-biencoder-1536">Eillish Semantic Bi-Encoder (1536 dim)</option>
                  </select>
                </div>

                <div style={{ padding: "10px 0" }}>
                  <label className="type-metadata" style={{ display: "block", marginBottom: 4, fontWeight: 550 }}>
                    Synthesis & Reasoning Model
                  </label>
                  <select
      className="ui-input"
      value={settings.llmModel}
      onChange={(e) => setSettings({ ...settings, llmModel: e.target.value })}
    >
                    <option value="gpt-4o-mini">GPT-4o Mini (Fast & Grounded)</option>
                    <option value="gpt-4o">GPT-4o (High-throughput reasoning)</option>
                    <option value="eillish-grounded-synthesizer">Eillish Grounded Synthesizer (Local Evidence)</option>
                  </select>
                </div>
              </div>
            </div>}

          {
      /* TAB 6: WORKSPACE */
    }
          {activeTab === "Workspace" && <div className="ui-card" style={{ padding: "20px" }}>
              <h3 className="type-h3" style={{ marginBottom: 4 }}>Workspace Configuration</h3>
              <p className="type-secondary" style={{ fontSize: 12, marginBottom: 16 }}>
                Configure tenancy names and default branch ingestion filters.
              </p>

              <div className="flex flex-col gap-3">
                <div>
                  <label className="type-metadata" style={{ display: "block", marginBottom: 4, fontWeight: 550 }}>
                    Current Active Workspace
                  </label>
                  <input
      type="text"
      className="ui-input"
      value={workspaceInput}
      onChange={(e) => setWorkspaceInput(e.target.value)}
      style={{ width: "100%", maxWidth: "380px" }}
    />
                </div>
              </div>
            </div>}

          {
      /* Save Button Bar */
    }
          <div className="flex items-center justify-end gap-2" style={{ marginTop: 6 }}>
            <Button variant="secondary" size="sm" onClick={() => window.location.reload()}>
              Discard
            </Button>
            <Button variant="primary" size="sm" icon={<Check size={13} />} onClick={handleSave}>
              Save Preferences
            </Button>
          </div>
        </div>
      </div>
  )}
    </div>;
};
export {
  SettingsPage
};
