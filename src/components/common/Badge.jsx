import "./Common.css";
const Badge = ({
  children,
  variant = "slate",
  dot = false,
  className = "",
  icon
}) => {
  return <span className={`ui-badge ui-badge--${variant} ${className}`}>
      {dot && <span className="ui-badge--dot" />}
      {icon && <span className="flex items-center">{icon}</span>}
      <span>{children}</span>
    </span>;
};
export {
  Badge
};
