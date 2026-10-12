import { RefreshCw, Layers, FileText, Search, ExternalLink } from "lucide-react";
import "./Common.css";
const ActivityItem = ({ event, className = "" }) => {
  const getIcon = () => {
    switch (event.type) {
      case "repo_sync":
        return <RefreshCw size={15} />;
      case "knowledge_indexed":
        return <Layers size={15} />;
      case "doc_updated":
        return <FileText size={15} />;
      case "ai_query":
        return <Search size={15} />;
      case "citation_clicked":
        return <ExternalLink size={15} />;
      default:
        return <Layers size={15} />;
    }
  };
  const getIconBg = () => {
    switch (event.type) {
      case "repo_sync":
        return "var(--color-mint-wash)";
      case "knowledge_indexed":
        return "var(--color-sunbeam-yellow)";
      case "doc_updated":
        return "var(--color-powder-blue)";
      case "ai_query":
        return "var(--color-lilac-tint)";
      case "citation_clicked":
        return "var(--color-ember-orange)";
      default:
        return "var(--color-snow)";
    }
  };
  return <div className={`ui-activity-item ${className}`}>
      <div className="ui-activity-icon" style={{ backgroundColor: getIconBg() }}>
        {getIcon()}
      </div>
      <div className="ui-activity-content">
        <div className="flex items-center justify-between gap-2">
          <span className="ui-activity-title">{event.title}</span>
          <span className="ui-activity-time">{event.timestamp}</span>
        </div>
        <p className="ui-activity-desc">{event.description}</p>
      </div>
    </div>;
};
export {
  ActivityItem
};
