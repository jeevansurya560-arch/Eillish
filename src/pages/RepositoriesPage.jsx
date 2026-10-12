import { useState, useEffect } from "react";
import {
  FolderGit2,
  RefreshCw,
  Plus,
  GitBranch,
  X,
  Github,
  AlertCircle
} from "lucide-react";
import { repositoryService } from "../services/repository.service";
import { Badge } from "../components/common/Badge";
import { Button } from "../components/common/Button";
import { useToast } from "../components/common/Toast";
const RepositoriesPage = () => {
  const { showToast } = useToast();
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [syncingRepoId, setSyncingRepoId] = useState(null);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [newRepoName, setNewRepoName] = useState("");
  const [newRepoUrl, setNewRepoUrl] = useState("");
  const [error, setError] = useState(null);
  const loadRepositories = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await repositoryService.getRepositories();
      setRepos(data);
    } catch (err) {
      setError(err.message || "Failed to load repositories");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    loadRepositories();
  }, []);
  const handleSyncRepo = async (id, name) => {
    if (syncingRepoId) return;
    setSyncingRepoId(id);
    showToast(`Syncing ${name}... polling Git tree & chunking deltas`, "info");
    try {
      await repositoryService.syncRepository(id);
      showToast(`${name} synchronization initiated in background.`, "success");
      setTimeout(loadRepositories, 1200);
    } catch (err) {
      showToast(`Sync failed: ${err.message}`, "info");
    } finally {
      setSyncingRepoId(null);
    }
  };
  const handleSyncAll = async () => {
    showToast("Triggering synchronization for all repositories...", "info");
    for (const r of repos) {
      try {
        await repositoryService.syncRepository(r.id);
      } catch {
      }
    }
    showToast("All repositories triggered for background sync.", "success");
    setTimeout(loadRepositories, 1500);
  };
  const handleConnectSubmit = async (e) => {
    e.preventDefault();
    if (!newRepoName.trim()) return;
    try {
      await repositoryService.connectRepository(
        newRepoName.trim(),
        newRepoUrl.trim() || `https://github.com/org/${newRepoName.trim()}`
      );
      showToast(`Repository ${newRepoName} connected! Starting initial ingestion.`, "success");
      setNewRepoName("");
      setNewRepoUrl("");
      setIsConnectModalOpen(false);
      await loadRepositories();
    } catch (err) {
      showToast(`Failed to connect repository: ${err.message}`, "info");
    }
  };
  return <div className="flex flex-col gap-5">
      {
    /* Header */
  }
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="hero-title-group">
          <h1 className="hero-heading">Connected Repositories</h1>
          <p className="hero-subtitle">
            Manage synchronized GitHub codebases, branch trees, and AST neural ingestion jobs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
    variant="secondary"
    size="sm"
    onClick={handleSyncAll}
    disabled={repos.length === 0}
  >
            <RefreshCw size={13} />
            <span>Sync All</span>
          </Button>
          <Button
    variant="primary"
    size="sm"
    onClick={() => setIsConnectModalOpen(true)}
  >
            <Plus size={14} />
            <span>Connect Repository</span>
          </Button>
        </div>
      </div>

      {
    /* Main Repositories List */
  }
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
          <div style={{ fontWeight: 700, fontSize: "14px" }}>Loading repositories from database...</div>
        </div> : error ? <div className="ui-card" style={{ padding: "40px", textAlign: "center", borderColor: "#ef4444" }}>
          <AlertCircle size={28} style={{ color: "#ef4444", margin: "0 auto 12px auto" }} />
          <div style={{ fontWeight: 800, fontSize: "16px", color: "#991b1b", marginBottom: 6 }}>
            Error Loading Repositories
          </div>
          <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: 16 }}>{error}</p>
          <Button variant="secondary" size="sm" onClick={loadRepositories}>
            Retry
          </Button>
        </div> : repos.length === 0 ? <div className="ui-card" style={{ padding: "60px 20px", textAlign: "center" }}>
          <div className="flex flex-col items-center gap-3">
            <div
    style={{
      width: 48,
      height: 48,
      borderRadius: "var(--radius-sm)",
      background: "var(--surface-subtle)",
      border: "2px solid var(--border)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}
  >
              <FolderGit2 size={20} style={{ color: "var(--text-muted)" }} />
            </div>
            <h3 className="type-h3" style={{ fontSize: 16 }}>No repositories connected</h3>
            <p style={{ fontFamily: "var(--font-manrope)", fontSize: "14px", color: "var(--text-secondary)", maxWidth: 420 }}>
              Connect a GitHub repository to start building your personal AI knowledge platform.
            </p>
            <Button
    variant="primary"
    size="sm"
    onClick={() => setIsConnectModalOpen(true)}
  >
              <Plus size={14} />
              <span>Connect Repository</span>
            </Button>
          </div>
        </div> : <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 16 }}>
          {repos.map((repo) => {
    const isSyncing = syncingRepoId === repo.id || repo.status === "syncing";
    return <div
      key={repo.id}
      className="ui-card ui-card--hoverable"
      style={{ padding: "24px", display: "flex", flexDirection: "column" }}
    >
                {
      /* Header */
    }
                <div className="flex items-center justify-between" style={{ marginBottom: 10 }}>
                  <div className="flex items-center gap-2">
                    <FolderGit2 size={18} style={{ color: "var(--color-charcoal-ink)" }} />
                    <span className="type-h3" style={{ fontSize: 15 }}>{repo.name}</span>
                  </div>
                  <Badge
      variant={repo.status === "synced" ? "emerald" : repo.status === "syncing" ? "amber" : repo.status === "needs_attention" ? "rose" : "slate"}
      dot={repo.status === "synced" || repo.status === "syncing"}
    >
                    {repo.status.replace("_", " ")}
                  </Badge>
                </div>

                <p className="type-secondary" style={{ fontSize: 12.5, marginBottom: 16, minHeight: 36 }}>
                  {repo.description || "No description provided."}
                </p>

                {
      /* Metadata Row */
    }
                <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 8,
        padding: "10px 0",
        borderTop: "1.5px solid var(--border)",
        borderBottom: "1.5px solid var(--border)",
        marginBottom: 16
      }}
    >
                  <div>
                    <div className="type-metadata" style={{ fontSize: 11 }}>Files</div>
                    <div style={{ fontWeight: 800, fontSize: 14 }}>{repo.filesCount}</div>
                  </div>
                  <div>
                    <div className="type-metadata" style={{ fontSize: 11 }}>Chunks</div>
                    <div style={{ fontWeight: 800, fontSize: 14 }}>{repo.chunksCount}</div>
                  </div>
                  <div>
                    <div className="type-metadata" style={{ fontSize: 11 }}>Branch</div>
                    <div className="flex items-center gap-1" style={{ fontWeight: 700, fontSize: 13 }}>
                      <GitBranch size={11} />
                      <span>{repo.branch || "main"}</span>
                    </div>
                  </div>
                </div>

                {
      /* Bottom Row */
    }
                <div className="flex items-center justify-between" style={{ marginTop: "auto" }}>
                  <span className="type-metadata" style={{ fontSize: 11 }}>
                    Synced: {repo.lastSyncedAt || "Never"}
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
      variant="secondary"
      size="sm"
      onClick={() => handleSyncRepo(repo.id, repo.name)}
      disabled={isSyncing}
    >
                      <RefreshCw size={12} className={isSyncing ? "animate-spin" : ""} />
                      <span>{isSyncing ? "Syncing..." : "Sync"}</span>
                    </Button>
                    <Button
      variant="secondary"
      size="sm"
      onClick={() => window.location.href = `/repositories/${repo.id}`}
    >
                      Details
                    </Button>
                  </div>
                </div>
              </div>;
  })}
        </div>}

      {
    /* Connect Repository Modal */
  }
      {isConnectModalOpen && <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(26, 26, 26, 0.4)",
      zIndex: 1e3,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20
    }}
    onClick={() => setIsConnectModalOpen(false)}
  >
          <div
    className="ui-card"
    style={{ width: "100%", maxWidth: 460, padding: 28, background: "var(--color-snow)" }}
    onClick={(e) => e.stopPropagation()}
  >
            <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
              <div className="flex items-center gap-2">
                <Github size={20} />
                <h3 className="type-h3" style={{ fontSize: 16 }}>Connect GitHub Repository</h3>
              </div>
              <button
    onClick={() => setIsConnectModalOpen(false)}
    style={{ background: "transparent", border: "none", cursor: "pointer" }}
  >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleConnectSubmit} className="flex flex-col gap-4">
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>
                  Repository Name
                </label>
                <input
    type="text"
    placeholder="e.g. Eillish or fastapi"
    value={newRepoName}
    onChange={(e) => setNewRepoName(e.target.value)}
    required
    style={{
      width: "100%",
      padding: "8px 12px",
      borderRadius: "var(--radius-sm)",
      border: "1.5px solid var(--border)",
      outline: "none",
      fontSize: 13
    }}
  />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>
                  GitHub URL (Optional)
                </label>
                <input
    type="text"
    placeholder="https://github.com/owner/repository"
    value={newRepoUrl}
    onChange={(e) => setNewRepoUrl(e.target.value)}
    style={{
      width: "100%",
      padding: "8px 12px",
      borderRadius: "var(--radius-sm)",
      border: "1.5px solid var(--border)",
      outline: "none",
      fontSize: 13
    }}
  />
              </div>

              <div className="flex items-center justify-end gap-2" style={{ marginTop: 8 }}>
                <Button variant="secondary" size="sm" type="button" onClick={() => setIsConnectModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Connect & Index
                </Button>
              </div>
            </form>
          </div>
        </div>}
    </div>;
};
export {
  RepositoriesPage
};
