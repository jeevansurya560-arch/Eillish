import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Github, ArrowRight, AlertCircle, ShieldCheck } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
const SignupPage = () => {
  const { signup, connectGitHub } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [workspace, setWorkspace] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!agreed) {
      setError("Please accept the Terms of Service and Privacy Policy to continue.");
      return;
    }
    setIsSubmitting(true);
    const res = await signup(name, email, password, workspace || "Engineering Core");
    setIsSubmitting(false);
    if (res.success) {
      navigate("/onboarding");
    } else {
      setError(res.error || "Registration failed.");
    }
  };
  const handleGitHubSignup = async () => {
    setIsSubmitting(true);
    await connectGitHub();
    await signup("GitHub Developer", "developer@users.noreply.github.com", "gh-pass-1234", "GitHub Workspace");
    setIsSubmitting(false);
    navigate("/onboarding");
  };
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
      {
    /* Brand Header */
  }
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <Link
    to="/"
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "6px 16px",
      borderRadius: "var(--radius-full)",
      border: "2px solid var(--color-charcoal-ink)",
      background: "var(--color-snow)",
      textDecoration: "none",
      marginBottom: 10
    }}
  >
          <span
    style={{
      fontFamily: "var(--font-display)",
      fontSize: "18px",
      color: "var(--color-charcoal-ink)"
    }}
  >
            Eillish
          </span>
          <span
    style={{
      fontFamily: "var(--font-mono)",
      fontSize: "10px",
      fontWeight: 800,
      padding: "2px 6px",
      borderRadius: "var(--radius-full)",
      background: "var(--color-sunbeam-yellow)",
      border: "1.5px solid var(--color-charcoal-ink)"
    }}
  >
            Neural
          </span>
        </Link>
        <p style={{ margin: 0, fontSize: "13.5px", fontWeight: 700, color: "var(--color-charcoal-ink)" }}>
          Start building your structured engineering knowledge base.
        </p>
      </div>

      {
    /* Main Tactile Signup Card */
  }
      <div
    style={{
      width: "100%",
      maxWidth: "480px",
      background: "var(--color-snow)",
      border: "2px solid var(--color-charcoal-ink)",
      borderRadius: "var(--radius-cards)",
      padding: "36px"
    }}
  >
        <h1
    style={{
      fontFamily: "var(--font-display)",
      fontSize: "24px",
      color: "var(--color-charcoal-ink)",
      margin: "0 0 6px 0"
    }}
  >
          Create account
        </h1>
        <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: "0 0 20px 0" }}>
          Connect your repositories, extract AST boundaries, and ask questions with evidence.
        </p>

        {error && <div
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
      marginBottom: 18
    }}
  >
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {
    /* Full Name */
  }
          <div>
            <label
    htmlFor="signup-name"
    style={{
      display: "block",
      fontSize: "11.5px",
      fontWeight: 800,
      textTransform: "uppercase",
      fontFamily: "var(--font-mono)",
      marginBottom: 6
    }}
  >
              Full Name
            </label>
            <input
    id="signup-name"
    type="text"
    placeholder="Ada Lovelace"
    value={name}
    onChange={(e) => setName(e.target.value)}
    disabled={isSubmitting}
    style={{
      width: "100%",
      padding: "10px 14px",
      borderRadius: "var(--radius-sm)",
      border: "2px solid var(--color-charcoal-ink)",
      background: "var(--color-snow)",
      fontSize: "13.5px",
      fontFamily: "var(--font-manrope)",
      fontWeight: 600,
      outline: "none",
      boxSizing: "border-box"
    }}
  />
          </div>

          {
    /* Email Address */
  }
          <div>
            <label
    htmlFor="signup-email"
    style={{
      display: "block",
      fontSize: "11.5px",
      fontWeight: 800,
      textTransform: "uppercase",
      fontFamily: "var(--font-mono)",
      marginBottom: 6
    }}
  >
              Work Email
            </label>
            <input
    id="signup-email"
    type="email"
    placeholder="ada@company.com"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    disabled={isSubmitting}
    style={{
      width: "100%",
      padding: "10px 14px",
      borderRadius: "var(--radius-sm)",
      border: "2px solid var(--color-charcoal-ink)",
      background: "var(--color-snow)",
      fontSize: "13.5px",
      fontFamily: "var(--font-manrope)",
      fontWeight: 600,
      outline: "none",
      boxSizing: "border-box"
    }}
  />
          </div>

          {
    /* Initial Workspace Name */
  }
          <div>
            <label
    htmlFor="signup-workspace"
    style={{
      display: "block",
      fontSize: "11.5px",
      fontWeight: 800,
      textTransform: "uppercase",
      fontFamily: "var(--font-mono)",
      marginBottom: 6
    }}
  >
              Knowledge Workspace Name (Optional)
            </label>
            <input
    id="signup-workspace"
    type="text"
    placeholder="e.g. Core Infrastructure / API Systems"
    value={workspace}
    onChange={(e) => setWorkspace(e.target.value)}
    disabled={isSubmitting}
    style={{
      width: "100%",
      padding: "10px 14px",
      borderRadius: "var(--radius-sm)",
      border: "2px solid var(--color-charcoal-ink)",
      background: "var(--color-snow)",
      fontSize: "13.5px",
      fontFamily: "var(--font-manrope)",
      fontWeight: 600,
      outline: "none",
      boxSizing: "border-box"
    }}
  />
          </div>

          {
    /* Password & Confirm Grid */
  }
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label
    htmlFor="signup-pass"
    style={{
      display: "block",
      fontSize: "11.5px",
      fontWeight: 800,
      textTransform: "uppercase",
      fontFamily: "var(--font-mono)",
      marginBottom: 6
    }}
  >
                Password
              </label>
              <input
    id="signup-pass"
    type="password"
    placeholder="Min 8 chars"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    disabled={isSubmitting}
    style={{
      width: "100%",
      padding: "10px 14px",
      borderRadius: "var(--radius-sm)",
      border: "2px solid var(--color-charcoal-ink)",
      background: "var(--color-snow)",
      fontSize: "13px",
      fontFamily: "var(--font-manrope)",
      fontWeight: 600,
      outline: "none",
      boxSizing: "border-box"
    }}
  />
            </div>

            <div>
              <label
    htmlFor="signup-confirm-pass"
    style={{
      display: "block",
      fontSize: "11.5px",
      fontWeight: 800,
      textTransform: "uppercase",
      fontFamily: "var(--font-mono)",
      marginBottom: 6
    }}
  >
                Confirm
              </label>
              <input
    id="signup-confirm-pass"
    type="password"
    placeholder="Repeat password"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    disabled={isSubmitting}
    style={{
      width: "100%",
      padding: "10px 14px",
      borderRadius: "var(--radius-sm)",
      border: "2px solid var(--color-charcoal-ink)",
      background: "var(--color-snow)",
      fontSize: "13px",
      fontFamily: "var(--font-manrope)",
      fontWeight: 600,
      outline: "none",
      boxSizing: "border-box"
    }}
  />
            </div>
          </div>

          {
    /* Terms Checkbox */
  }
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginTop: 4 }}>
            <input
    id="signup-terms"
    type="checkbox"
    checked={agreed}
    onChange={(e) => setAgreed(e.target.checked)}
    style={{ marginTop: 3, cursor: "pointer" }}
  />
            <label htmlFor="signup-terms" style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.4, cursor: "pointer" }}>
              I agree to the{" "}
              <Link to="/terms" target="_blank" style={{ color: "var(--color-charcoal-ink)", fontWeight: 700, textDecoration: "underline" }}>
                Terms of Service
              </Link>{" "}
              and acknowledge the{" "}
              <Link to="/privacy" target="_blank" style={{ color: "var(--color-charcoal-ink)", fontWeight: 700, textDecoration: "underline" }}>
                Privacy Policy
              </Link>
              .
            </label>
          </div>

          {
    /* Submit */
  }
          <button
    type="submit"
    disabled={isSubmitting}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      width: "100%",
      padding: "12px 20px",
      borderRadius: "var(--radius-full)",
      border: "2px solid var(--color-charcoal-ink)",
      background: "var(--color-charcoal-ink)",
      color: "var(--color-snow)",
      fontFamily: "var(--font-manrope)",
      fontSize: "13.5px",
      fontWeight: 800,
      cursor: isSubmitting ? "not-allowed" : "pointer",
      marginTop: 6
    }}
  >
            <span>{isSubmitting ? "Creating account..." : "Create Account & Enter"}</span>
            <ArrowRight size={14} />
          </button>
        </form>

        {
    /* Divider */
  }
        <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      margin: "20px 0",
      color: "var(--text-muted)",
      fontSize: "11.5px",
      fontFamily: "var(--font-mono)",
      fontWeight: 700
    }}
  >
          <div style={{ flex: 1, height: 1, background: "var(--color-charcoal-ink)", opacity: 0.2 }} />
          <span>OR</span>
          <div style={{ flex: 1, height: 1, background: "var(--color-charcoal-ink)", opacity: 0.2 }} />
        </div>

        {
    /* GitHub Signup Button */
  }
        <button
    onClick={handleGitHubSignup}
    disabled={isSubmitting}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      width: "100%",
      padding: "11px 18px",
      borderRadius: "var(--radius-full)",
      border: "2px solid var(--color-charcoal-ink)",
      background: "var(--color-snow)",
      color: "var(--color-charcoal-ink)",
      fontFamily: "var(--font-manrope)",
      fontSize: "13px",
      fontWeight: 800,
      cursor: isSubmitting ? "not-allowed" : "pointer"
    }}
  >
          <Github size={16} />
          <span>Sign up with GitHub</span>
        </button>

        <div
    style={{
      textAlign: "center",
      marginTop: 22,
      paddingTop: 16,
      borderTop: "1px solid var(--color-peach-paper)",
      fontSize: "12.5px",
      color: "var(--text-muted)"
    }}
  >
          <span>Already have an account? </span>
          <Link
    to="/auth/login"
    style={{
      color: "var(--color-charcoal-ink)",
      fontWeight: 800,
      textDecoration: "underline"
    }}
  >
            Sign in
          </Link>
        </div>
      </div>

      <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 6,
      marginTop: 20,
      fontSize: "11.5px",
      color: "var(--text-muted)"
    }}
  >
        <ShieldCheck size={14} />
        <span>Enterprise tenant isolation · Zero public model training</span>
      </div>
    </div>;
};
export {
  SignupPage
};
