import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  FolderGit2,
  RefreshCw,
  GitBranch,
  FileCode,
  Clock,
  Sparkles,
  AlertCircle
} from "lucide-react";
import { repositoryService } from "../services/repository.service";
import { knowledgeService } from "../services/knowledge.service";
import { Button } from "../components/common/Button";
import { Badge } from "../components/common/Badge";
import { useToast } from "../components/common/Toast";
const RepositoryDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [repo, setRepo] = useState(null);
  const [docs, setDocs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState(null);
  const loadRepoDetails = async () => {
    if (!id) return;
    try {
      setIsLoading(true);
      setError(null);
      const repoData = await repositoryService.getRepositoryById(id);
      if (repoData) {
        setRepo(repoData);
        const docsData = await knowledgeService.getDocuments({ repository: repoData.name });
        setDocs(docsData);
      } else {
        setError("Repository not found in database.");
      }
    } catch (err) {
      setError(err.message || "Failed to load repository");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    loadRepoDetails();
  }, [id]);
  const handleManualSync = async () => {
    if (!repo) return;
    setIsSyncing(true);
    showToast(`Polling git tree diffs for ${repo.name}...`, "info");
    try {
      await repositoryService.syncRepository(repo.id);
      showToast(`${repo.name} synchronization initiated in background.`, "success");
      setTimeout(loadRepoDetails, 1500);
    } catch (err) {
      showToast(`Sync failed: ${err.message}`, "info");
    } finally {
      setIsSyncing(false);
    }
  };
  if (isLoading) {
    return <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 24px", textAlign: "center" }}>
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
        <div style={{ fontWeight: 700, fontSize: "14px" }}>Loading repository metadata...</div>
      </div>;
  }
  if (error || !repo) {
    return <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px", textAlign: "center" }}>
        <div className="ui-card" style={{ padding: "40px", borderColor: "#ef4444" }}>
          <AlertCircle size={32} style={{ color: "#ef4444", margin: "0 auto 12px auto" }} />
          <h2 className="type-h2" style={{ color: "#991b1b", marginBottom: 8 }}>Repository Not Found</h2>
          <p className="type-secondary" style={{ marginBottom: 20 }}>
            {error || "The requested repository does not exist."}
          </p>
          <Button variant="primary" size="sm" onClick={() => navigate("/repositories")}>
            Return to Repositories
          </Button>
        </div>
      </div>;
  }
  return <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px", fontFamily: "var(--font-manrope)" }}>
      {
    /* Breadcrumbs */
  }
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "12.5px", marginBottom: 20 }}>
        <Link to="/repositories" style={{ color: "var(--color-charcoal-ink)", textDecoration: "none", display: "flex", alignItems: "center", gap: 4, fontWeight: 700 }}>
          <ArrowLeft size={14} />
          <span>Repositories</span>
        </Link>
        <span style={{ color: "var(--text-muted)" }}>/</span>
        <span style={{ fontWeight: 800, color: "var(--color-charcoal-ink)" }}>{repo.name}</span>
      </div>

      {
    /* Header Banner */
  }
      <div
    style={{
      background: "var(--color-snow)",
      border: "2px solid var(--color-charcoal-ink)",
      borderRadius: "var(--radius-cards)",
      padding: "32px",
      marginBottom: 24
    }}
  >
        <div
    style={{
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 16,
      marginBottom: 20
    }}
  >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
    style={{
      width: 48,
      height: 48,
      borderRadius: "var(--radius-sm)",
      border: "2px solid var(--color-charcoal-ink)",
      background: "var(--color-sunbeam-yellow)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}
  >
              <FolderGit2 size={24} />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                <h1 style={{ fontFamily: "var(--font-display)", fontSize: "24px", margin: 0 }}>
                  {repo.name}
                </h1>
                <Badge
    variant={repo.status === "synced" ? "emerald" : "amber"}
    dot={repo.status === "synced" || repo.status === "syncing"}
  >
                  {repo.status}
                </Badge>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "12.5px", color: "var(--text-muted)" }}>
                <span className="flex items-center gap-1">
                  <GitBranch size={12} />
                  <span>{repo.branch || "main"}</span>
                </span>
                <span>·</span>
                <span>Provider: {repo.provider}</span>
                <span>·</span>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Clock size={12} />
                  <span>Last synced: {repo.lastSyncedAt || "Never"}</span>
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Button
    variant="secondary"
    size="sm"
    icon={<RefreshCw size={13} className={isSyncing ? "animate-spin" : ""} />}
    onClick={handleManualSync}
    disabled={isSyncing}
  >
              {isSyncing ? "Syncing..." : "Sync Now"}
            </Button>
            <Button
    variant="primary"
    size="sm"
    icon={<Sparkles size={13} />}
    onClick={() => navigate(`/search?repo=${encodeURIComponent(repo.name)}`)}
  >
              Ask About Repo
            </Button>
          </div>
        </div>

        {
    /* Stats Grid */
  }
        <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
      gap: 12,
      padding: "16px",
      background: "var(--surface-subtle)",
      border: "1.5px solid var(--border)",
      borderRadius: "var(--radius-sm)"
    }}
  >
          <div>
            <div className="type-metadata">Verified Files</div>
            <div style={{ fontWeight: 800, fontSize: 18 }}>{repo.filesCount}</div>
          </div>
          <div>
            <div className="type-metadata">pgvector Chunks</div>
            <div style={{ fontWeight: 800, fontSize: 18 }}>{repo.chunksCount}</div>
          </div>
          <div>
            <div className="type-metadata">Vector Status</div>
            <div style={{ fontWeight: 800, fontSize: 14, color: "#059669" }}>1,536-dim HNSW</div>
          </div>
          <div>
            <div className="type-metadata">Repository URL</div>
            <div style={{ fontWeight: 700, fontSize: 12, wordBreak: "break-all" }}>
              {repo.url ? <a href={repo.url} target="_blank" rel="noreferrer" style={{ color: "inherit" }}>
                  {repo.url}
                </a> : "Local Ingestion"}
            </div>
          </div>
        </div>
      </div>

      {
    /* Indexed Documents Table */
  }
      <div className="ui-card" style={{ padding: "24px" }}>
        <h3 className="type-h3" style={{ marginBottom: 16 }}>Indexed Documents in {repo.name}</h3>

        {docs.length === 0 ? <div style={{ textAlign: "center", padding: "40px 0", color: "var(--text-muted)" }}>
            No documents indexed for this repository yet. Click "Sync Now" to start AST ingestion.
          </div> : <div className="flex flex-col gap-2">
            {docs.map((d) => <div
    key={d.id}
    onClick={() => navigate(`/knowledge/${d.id}`)}
    className="knowledge-row"
    style={{ padding: "12px 14px", cursor: "pointer" }}
  >
                <div className="flex items-center gap-2">
                  <FileCode size={16} />
                  <div>
                    <span style={{ fontWeight: 700, fontSize: 13 }}>{d.title}</span>
                    <span className="type-path" style={{ marginLeft: 8 }}>{d.path}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="type-metadata">{d.chunksCount} chunks</span>
                  <Badge variant="emerald" dot>Indexed</Badge>
                </div>
              </div>)}
          </div>}
      </div>
    </div>;
};
export {
  RepositoryDetailPage
};
