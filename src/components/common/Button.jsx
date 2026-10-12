import "./Common.css";
const Button = ({
  children,
  variant = "secondary",
  size = "md",
  icon,
  className = "",
  ...props
}) => {
  return <button
    className={`ui-button ui-button--${variant} ui-button--${size} ${className}`}
    {...props}
  >
      {icon && <span className="flex items-center">{icon}</span>}
      <span>{children}</span>
    </button>;
};
export {
  Button
};
