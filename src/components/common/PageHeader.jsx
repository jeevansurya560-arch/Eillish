import "./Common.css";
const PageHeader = ({
  title,
  subtitle,
  badge,
  actions,
  className = ""
}) => {
  return <header className={`ui-page-header ${className}`}>
      <div className="ui-page-header-text">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="ui-page-title">{title}</h1>
          {badge}
        </div>
        {subtitle && <p className="ui-page-desc">{subtitle}</p>}
      </div>
      {actions && <div className="ui-page-actions">{actions}</div>}
    </header>;
};
export {
  PageHeader
};
