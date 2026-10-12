import "./Common.css";
const LoadingState = ({
  label = "Retrieving knowledge...",
  lines = 3,
  height = 90,
  className = ""
}) => {
  return <div className={`flex flex-col gap-3 w-full ${className}`} role="status" aria-label={label}>
      <span className="sr-only">{label}</span>
      {Array.from({ length: lines }).map((_, idx) => <div
    key={idx}
    className="ui-skeleton"
    style={{
      height: height + (idx % 2 === 0 ? 0 : -20),
      width: "100%"
    }}
  />)}
    </div>;
};
export {
  LoadingState
};
