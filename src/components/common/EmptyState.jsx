import { Inbox } from "lucide-react";
import "./Common.css";
const EmptyState = ({
  title,
  description,
  icon = <Inbox size={26} />,
  action,
  className = ""
}) => {
  return <div className={`ui-empty-state ${className}`}>
      <div className="ui-empty-icon-wrap">{icon}</div>
      <h3 className="ui-empty-title">{title}</h3>
      <p className="ui-empty-desc">{description}</p>
      {action && <div>{action}</div>}
    </div>;
};
export {
  EmptyState
};
