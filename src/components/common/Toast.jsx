import { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
const ToastContext = createContext(null);
const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};
const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const showToast = useCallback((message, type = "success") => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);
  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };
  return <ToastContext.Provider value={{ showToast }}>
      {children}
      {
    /* Toast container floating at bottom right */
  }
      <div
    style={{
      position: "fixed",
      bottom: 24,
      right: 24,
      display: "flex",
      flexDirection: "column",
      gap: 8,
      zIndex: 100,
      pointerEvents: "none"
    }}
  >
        {toasts.map((toast) => <div
    key={toast.id}
    className="animate-slide-up"
    style={{
      pointerEvents: "auto",
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "10px 14px",
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-md)",
      boxShadow: "var(--shadow-md)",
      fontSize: "13px",
      color: "var(--text-primary)",
      minWidth: 260,
      maxWidth: 380
    }}
  >
            {toast.type === "success" && <CheckCircle2 size={16} style={{ color: "var(--success)", flexShrink: 0 }} />}
            {toast.type === "error" && <AlertCircle size={16} style={{ color: "var(--danger)", flexShrink: 0 }} />}
            {toast.type === "info" && <Info size={16} style={{ color: "var(--accent)", flexShrink: 0 }} />}
            <span style={{ flex: 1 }}>{toast.message}</span>
            <button
    onClick={() => removeToast(toast.id)}
    style={{ color: "var(--text-muted)", display: "flex", padding: 2 }}
  >
              <X size={13} />
            </button>
          </div>)}
      </div>
    </ToastContext.Provider>;
};
export {
  ToastProvider,
  useToast
};
