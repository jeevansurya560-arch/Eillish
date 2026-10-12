import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Github, AlertCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
const GitHubCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, connectGitHub } = useAuth();
  const [status, setStatus] = useState("verifying");
  const [errorMessage, setErrorMessage] = useState(null);
  useEffect(() => {
    let isMounted = true;
    async function handleOAuthExchange() {
      try {
        const code = searchParams.get("code") || "mock_oauth_code_" + Math.random().toString(36).substring(2, 8);
        const error = searchParams.get("error");
        if (error) {
          if (isMounted) {
            setStatus("error");
            setErrorMessage(searchParams.get("error_description") || "GitHub authorization was denied.");
          }
          return;
        }
        if (isMounted) setStatus("exchanging");
        await new Promise((resolve) => setTimeout(resolve, 600));
        await connectGitHub();
        await login(`gh-user-${code.substring(0, 5)}@github.internal`);
        if (isMounted) {
          setStatus("success");
          setTimeout(() => {
            navigate("/dashboard", { replace: true });
          }, 400);
        }
      } catch {
        if (isMounted) {
          setStatus("error");
          setErrorMessage("Failed to complete GitHub OAuth session establishment.");
        }
      }
    }
    handleOAuthExchange();
    return () => {
      isMounted = false;
    };
  }, [searchParams, navigate, login, connectGitHub]);
  return <div
    style={{
      minHeight: "100vh",
      background: "var(--color-peach-paper)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      fontFamily: "var(--font-manrope)"
    }}
  >
      <div
    style={{
      width: "100%",
      maxWidth: "420px",
      background: "var(--color-snow)",
      border: "2px solid var(--color-charcoal-ink)",
      borderRadius: "var(--radius-cards)",
      padding: "36px",
      textAlign: "center"
    }}
  >
        <div
    style={{
      width: 48,
      height: 48,
      borderRadius: "var(--radius-sm)",
      border: "2px solid var(--color-charcoal-ink)",
      background: "var(--color-sunbeam-yellow)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 16px auto"
    }}
  >
          <Github size={24} />
        </div>

        <h1
    style={{
      fontFamily: "var(--font-display)",
      fontSize: "20px",
      color: "var(--color-charcoal-ink)",
      margin: "0 0 8px 0"
    }}
  >
          {status === "error" ? "Authorization Error" : "Connecting to GitHub"}
        </h1>

        {status === "error" ? <div>
            <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "10px 14px",
      background: "#fef2f2",
      border: "2px solid #ef4444",
      borderRadius: "var(--radius-sm)",
      color: "#991b1b",
      fontSize: "12.5px",
      fontWeight: 600,
      margin: "16px 0",
      textAlign: "left"
    }}
  >
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{errorMessage}</span>
            </div>
            <button
    onClick={() => navigate("/auth/login")}
    style={{
      padding: "10px 20px",
      borderRadius: "var(--radius-full)",
      border: "2px solid var(--color-charcoal-ink)",
      background: "var(--color-charcoal-ink)",
      color: "var(--color-snow)",
      fontSize: "13px",
      fontWeight: 800,
      cursor: "pointer"
    }}
  >
              Return to Login
            </button>
          </div> : <div>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: "0 0 20px 0" }}>
              {status === "verifying" ? "Validating state parameter..." : "Exchanging authorization code for session token..."}
            </p>
            <div
    style={{
      width: 32,
      height: 32,
      border: "3px solid var(--color-charcoal-ink)",
      borderTopColor: "transparent",
      borderRadius: "50%",
      margin: "0 auto",
      animation: "spin 0.8s linear infinite"
    }}
  />
          </div>}
      </div>
    </div>;
};
export {
  GitHubCallbackPage
};
