import { Search, X } from "lucide-react";
import "./Common.css";
const SearchInput = ({
  value,
  onChange,
  placeholder = "Search knowledge, code, or documentation...",
  onClear,
  className = "",
  autoFocus = false
}) => {
  return <div className={`ui-search-box ${className}`}>
      <Search size={16} className="ui-search-icon" />
      <input
    type="text"
    className="ui-search-field"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    autoFocus={autoFocus}
  />
      {value && <button
    type="button"
    className="ui-search-clear"
    onClick={() => {
      onChange("");
      if (onClear) onClear();
    }}
    aria-label="Clear search input"
  >
          <X size={14} />
        </button>}
    </div>;
};
export {
  SearchInput
};
