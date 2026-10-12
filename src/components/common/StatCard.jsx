import "./Common.css";
const StatCard = ({
  label,
  value,
  delta,
  icon,
  iconBg,
  className = ""
}) => {
  return <div className={`ui-stat-card ${className}`}>
      <div className="ui-stat-top">
        <span className="ui-stat-label">{label}</span>
        {icon && <div
    className="ui-stat-icon-wrapper"
    style={iconBg ? { backgroundColor: iconBg } : void 0}
  >
            {icon}
          </div>}
      </div>
      <div className="ui-stat-value">{value}</div>
      {delta && <div className="ui-stat-delta">{delta}</div>}
    </div>;
};
export {
  StatCard
};
