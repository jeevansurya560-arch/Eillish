import { FolderGit2, GitBranch, RefreshCw, FileText, Layers } from "lucide-react";
import { Badge } from "./Badge";
import { Button } from "./Button";
import "./Common.css";
const RepositoryCard = ({
  repository,
  onSync,
  isSyncing = false,
  className = ""
}) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case "synced":
        return <Badge variant="emerald" dot>Synced</Badge>;
      case "syncing":
        return <Badge variant="blue" dot>Syncing</Badge>;
      case "needs_attention":
        return <Badge variant="amber" dot>Needs Attention</Badge>;
      case "error":
        return <Badge variant="rose" dot>Error</Badge>;
      default:
        return <Badge variant="slate" dot>Connected</Badge>;
    }
  };
  return <div className={`ui-repo-card ${className}`}>
      <div className="ui-repo-header">
        <div className="flex flex-col gap-1">
          <div className="ui-repo-name">
            <FolderGit2 size={20} />
            <span>{repository.name}</span>
            {repository.branch && <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 3,
      fontSize: "12px",
      fontFamily: "var(--font-mono)",
      fontWeight: 600,
      color: "var(--text-secondary)",
      marginLeft: 6
    }}
  >
                <GitBranch size={13} />
                {repository.branch}
              </span>}
          </div>
          <p className="ui-repo-desc">{repository.description}</p>
        </div>
        <div>{getStatusBadge(isSyncing ? "syncing" : repository.status)}</div>
      </div>

      <div className="ui-repo-stats-row">
        <div className="ui-repo-stat-item">
          <FileText size={14} />
          <span>{repository.filesCount} Files</span>
        </div>
        <div className="ui-repo-stat-item">
          <Layers size={14} />
          <span>{repository.chunksCount} AST Chunks</span>
        </div>
        <div className="ui-repo-stat-item" style={{ marginLeft: "auto" }}>
          <span>Synced {repository.lastSyncedAt}</span>
        </div>
      </div>

      <div className="ui-repo-footer">
        <span
    style={{
      fontSize: "12px",
      fontFamily: "var(--font-mono)",
      color: "var(--text-muted)"
    }}
  >
          Provider: {repository.provider.toUpperCase()}
        </span>

        {onSync && <Button
    variant="secondary"
    size="sm"
    icon={<RefreshCw size={13} className={isSyncing ? "animate-spin" : ""} />}
    disabled={isSyncing}
    onClick={() => onSync(repository.id)}
  >
            {isSyncing ? "Synchronizing..." : "Sync Repository"}
          </Button>}
      </div>
    </div>;
};
export {
  RepositoryCard
};
