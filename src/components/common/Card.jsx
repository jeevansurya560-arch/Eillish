import "./Common.css";
const Card = ({
  children,
  hoverable = false,
  interactive = false,
  className = "",
  ...props
}) => {
  return <div
    className={`ui-card ${hoverable ? "ui-card--hoverable" : ""} ${interactive ? "ui-card--interactive" : ""} ${className}`}
    {...props}
  >
      {children}
    </div>;
};
const CardHeader = ({
  children,
  className = ""
}) => <div className={`ui-card-header ${className}`}>{children}</div>;
const CardBody = ({
  children,
  className = ""
}) => <div className={`ui-card-body ${className}`}>{children}</div>;
export {
  Card,
  CardBody,
  CardHeader
};
