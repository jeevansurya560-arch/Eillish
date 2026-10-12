import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  Github,
  ArrowRight,
  AlertCircle,
  Sparkles,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  ArrowLeft,
  KeyRound,
  Check
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
const DEMO_PERSONAS = [
  {
    name: "Alex Rivera",
    role: "Lead Architect",
    email: "alex.rivera@eillish.internal",
    badge: "Aero Dynamics",
    accentColor: "var(--color-sunbeam-yellow)"
  },
  {
    name: "Sarah Chen",
    role: "Security Officer",
    email: "sarah.chen@eillish.internal",
    badge: "Compliance",
    accentColor: "var(--color-mint-wash)"
  },
  {
    name: "Elena Rostova",
    role: "Staff Engineer",
    email: "elena.rostova@eillish.internal",
    badge: "Core Engine",
    accentColor: "var(--color-lilac-tint)"
  }
];
const REMEMBER_EMAIL_KEY = "eillish_remembered_email";
const REMEMBER_ME_KEY = "eillish_remember_login";
const LoginPage = () => {
  const { login, connectGitHub } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnUrl = searchParams.get("from") ? decodeURIComponent(searchParams.get("from")) : "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    try {
      const savedRemember = localStorage.getItem(REMEMBER_ME_KEY) === "true";
      setRememberMe(savedRemember);
      if (savedRemember) {
        const savedEmail = localStorage.getItem(REMEMBER_EMAIL_KEY);
        if (savedEmail) {
          setEmail(savedEmail);
        }
      }
    } catch {
    }
  }, []);
  const clearError = () => {
    if (error) setError(null);
  };
  const handlePasswordKeyEvents = (e) => {
    if (typeof e.getModifierState === "function") {
      setCapsLockOn(e.getModifierState("CapsLock"));
    }
  };
  const handleSelectPersona = (persona) => {
    setSelectedPersona(persona.email);
    setEmail(persona.email);
    setPassword("demo-access-2026");
    clearError();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    if (!email.trim()) {
      setError("Please enter your work or developer email address.");
      return;
    }
    if (!password) {
      setError("Please enter your workspace password.");
      return;
    }
    setIsSubmitting(true);
    try {
      if (rememberMe) {
        localStorage.setItem(REMEMBER_ME_KEY, "true");
        localStorage.setItem(REMEMBER_EMAIL_KEY, email.trim());
      } else {
        localStorage.removeItem(REMEMBER_ME_KEY);
        localStorage.removeItem(REMEMBER_EMAIL_KEY);
      }
    } catch {
    }
    const res = await login(email.trim(), password);
    setIsSubmitting(false);
    if (res.success) {
      navigate(returnUrl, { replace: true });
    } else {
      setError(res.error || "Failed to authenticate. Please verify your credentials or use a demo account.");
    }
  };
  const handleQuickDemoLogin = async (personaEmail) => {
    clearError();
    setIsSubmitting(true);
    const targetEmail = personaEmail || "alex.rivera@eillish.internal";
    const res = await login(targetEmail, "demo-secret-pass");
    setIsSubmitting(false);
    if (res.success) {
      navigate(returnUrl, { replace: true });
    } else {
      setError("Demo login initialization failed. Please try again.");
    }
  };
  const handleGitHubOAuth = async () => {
    clearError();
    setIsSubmitting(true);
    await connectGitHub();
    await login("github.user@users.noreply.github.com", "gh-oauth-session");
    setIsSubmitting(false);
    navigate(returnUrl, { replace: true });
  };
  return <div
    style={{
      minHeight: "100vh",
      background: "var(--color-peach-paper)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "32px 16px",
      fontFamily: "var(--font-manrope)"
    }}
  >
      {
    /* Top Back Navigation Pill */
  }
      <div style={{ marginBottom: 20 }}>
        <Link
    to="/"
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "7px 16px",
      borderRadius: "var(--radius-full)",
      border: "2px solid var(--color-charcoal-ink)",
      background: "var(--color-snow)",
      color: "var(--color-charcoal-ink)",
      textDecoration: "none",
      fontSize: "12.5px",
      fontWeight: 800,
      boxShadow: "2px 2px 0 var(--color-charcoal-ink)",
      transition: "transform 0.15s ease"
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = "translate(-1px, -1px)"}
    onMouseLeave={(e) => e.currentTarget.style.transform = "translate(0, 0)"}
  >
          <ArrowLeft size={13} />
          <span>Return to Homepage</span>
        </Link>
      </div>

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
      marginBottom: 10,
      boxShadow: "2px 2px 0 var(--color-charcoal-ink)"
    }}
  >
          <span
    style={{
      fontFamily: "var(--font-display)",
      fontSize: "20px",
      fontWeight: 800,
      color: "var(--color-charcoal-ink)",
      letterSpacing: "-0.5px"
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
      border: "1.5px solid var(--color-charcoal-ink)",
      textTransform: "uppercase"
    }}
  >
            Neural Auth
          </span>
        </Link>
        <p
    style={{
      margin: 0,
      fontSize: "13.5px",
      fontWeight: 700,
      color: "var(--color-charcoal-ink)"
    }}
  >
          Your knowledge, understood. Sign in to your workspace.
        </p>
      </div>

      {
    /* Main Tactile Login Card */
  }
      <div
    style={{
      width: "100%",
      maxWidth: "460px",
      background: "var(--color-snow)",
      border: "2px solid var(--color-charcoal-ink)",
      borderRadius: "var(--radius-cards)",
      padding: "36px 32px",
      boxShadow: "4px 4px 0 var(--color-charcoal-ink)",
      boxSizing: "border-box"
    }}
  >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <h1
    style={{
      fontFamily: "var(--font-display)",
      fontSize: "24px",
      fontWeight: 800,
      color: "var(--color-charcoal-ink)",
      margin: 0,
      letterSpacing: "-0.5px"
    }}
  >
            Sign in
          </h1>
          <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      fontSize: "11px",
      fontWeight: 800,
      fontFamily: "var(--font-mono)",
      padding: "3px 8px",
      borderRadius: "var(--radius-full)",
      background: "var(--color-mint-wash)",
      border: "1.5px solid var(--color-charcoal-ink)"
    }}
  >
            <ShieldCheck size={12} />
            <span>256-BIT JWT</span>
          </span>
        </div>

        <p
    style={{
      fontSize: "13px",
      color: "var(--text-muted)",
      margin: "0 0 20px 0"
    }}
  >
          Enter your credentials to access your indexed workspaces and neural search.
        </p>

        {
    /* Quick Demo Persona Chips */
  }
        <div style={{ marginBottom: 20 }}>
          <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 8
    }}
  >
            <span
    style={{
      fontSize: "11px",
      fontWeight: 800,
      fontFamily: "var(--font-mono)",
      textTransform: "uppercase",
      color: "var(--color-charcoal-ink)"
    }}
  >
              Demo Personas (1-Click Fill)
            </span>
            <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>Click to autofill</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
            {DEMO_PERSONAS.map((p) => {
    const isSelected = selectedPersona === p.email;
    return <button
      key={p.email}
      type="button"
      onClick={() => handleSelectPersona(p)}
      style={{
        padding: "8px 6px",
        borderRadius: "var(--radius-sm)",
        border: `1.5px solid var(--color-charcoal-ink)`,
        background: isSelected ? p.accentColor : "var(--surface-subtle)",
        cursor: "pointer",
        textAlign: "center",
        boxShadow: isSelected ? "2px 2px 0 var(--color-charcoal-ink)" : "none",
        transition: "all 0.15s ease"
      }}
      title={`Fill as ${p.name} (${p.role})`}
    >
                  <div
      style={{
        fontSize: "11.5px",
        fontWeight: 800,
        color: "var(--color-charcoal-ink)",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }}
    >
                    {p.name.split(" ")[0]}
                  </div>
                  <div
      style={{
        fontSize: "9.5px",
        fontFamily: "var(--font-mono)",
        color: "var(--text-muted)",
        marginTop: 2
      }}
    >
                    {p.badge}
                  </div>
                </button>;
  })}
          </div>
        </div>

        {
    /* Error Notification */
  }
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

        {
    /* Form */
  }
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {
    /* Email Field */
  }
          <div>
            <label
    htmlFor="login-email"
    style={{
      display: "flex",
      alignItems: "center",
      gap: 5,
      fontSize: "12px",
      fontWeight: 800,
      textTransform: "uppercase",
      fontFamily: "var(--font-mono)",
      marginBottom: 6
    }}
  >
              <Mail size={13} />
              <span>Email Address</span>
            </label>
            <input
    id="login-email"
    type="email"
    placeholder="you@company.com"
    value={email}
    onChange={(e) => {
      setEmail(e.target.value);
      clearError();
    }}
    disabled={isSubmitting}
    autoComplete="username"
    style={{
      width: "100%",
      padding: "12px 14px",
      borderRadius: "var(--radius-sm)",
      border: "2px solid var(--color-charcoal-ink)",
      background: "var(--color-snow)",
      fontSize: "13.5px",
      fontFamily: "var(--font-manrope)",
      fontWeight: 600,
      outline: "none",
      boxSizing: "border-box",
      transition: "box-shadow 0.15s ease"
    }}
    onFocus={(e) => e.target.style.boxShadow = "3px 3px 0 var(--color-charcoal-ink)"}
    onBlur={(e) => e.target.style.boxShadow = "none"}
  />
          </div>

          {
    /* Password Field */
  }
          <div>
            <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 6
    }}
  >
              <label
    htmlFor="login-password"
    style={{
      display: "flex",
      alignItems: "center",
      gap: 5,
      fontSize: "12px",
      fontWeight: 800,
      textTransform: "uppercase",
      fontFamily: "var(--font-mono)"
    }}
  >
                <KeyRound size={13} />
                <span>Password</span>
              </label>
              <Link
    to="/auth/forgot-password"
    style={{
      fontSize: "11.5px",
      fontWeight: 700,
      color: "var(--color-charcoal-ink)",
      textDecoration: "underline"
    }}
  >
                Forgot password?
              </Link>
            </div>

            <div style={{ position: "relative" }}>
              <input
    id="login-password"
    type={showPassword ? "text" : "password"}
    placeholder="••••••••••••"
    value={password}
    onChange={(e) => {
      setPassword(e.target.value);
      clearError();
    }}
    onKeyDown={handlePasswordKeyEvents}
    onKeyUp={handlePasswordKeyEvents}
    disabled={isSubmitting}
    autoComplete="current-password"
    style={{
      width: "100%",
      padding: "12px 42px 12px 14px",
      borderRadius: "var(--radius-sm)",
      border: "2px solid var(--color-charcoal-ink)",
      background: "var(--color-snow)",
      fontSize: "13.5px",
      fontFamily: "var(--font-manrope)",
      fontWeight: 600,
      outline: "none",
      boxSizing: "border-box",
      transition: "box-shadow 0.15s ease"
    }}
    onFocus={(e) => e.target.style.boxShadow = "3px 3px 0 var(--color-charcoal-ink)"}
    onBlur={(e) => e.target.style.boxShadow = "none"}
  />

              {
    /* Password visibility toggle */
  }
              <button
    type="button"
    onClick={() => setShowPassword((prev) => !prev)}
    aria-label={showPassword ? "Hide password" : "Show password"}
    style={{
      position: "absolute",
      right: 10,
      top: "50%",
      transform: "translateY(-50%)",
      background: "none",
      border: "none",
      padding: 4,
      cursor: "pointer",
      color: "var(--color-charcoal-ink)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}
  >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {
    /* Caps Lock Warning Banner */
  }
            {capsLockOn && <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      marginTop: 6,
      padding: "3px 8px",
      background: "var(--color-sunbeam-yellow)",
      border: "1.5px solid var(--color-charcoal-ink)",
      borderRadius: "var(--radius-full)",
      fontSize: "11px",
      fontWeight: 700,
      fontFamily: "var(--font-mono)",
      color: "var(--color-charcoal-ink)"
    }}
  >
                <Lock size={11} />
                <span>Caps Lock is ON</span>
              </div>}
          </div>

          {
    /* Remember Me Checkbox */
  }
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <label
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      fontSize: "12.5px",
      fontWeight: 700,
      color: "var(--color-charcoal-ink)",
      cursor: "pointer",
      userSelect: "none"
    }}
  >
              <div
    onClick={() => setRememberMe((prev) => !prev)}
    style={{
      width: 18,
      height: 18,
      borderRadius: 4,
      border: "2px solid var(--color-charcoal-ink)",
      background: rememberMe ? "var(--color-charcoal-ink)" : "var(--color-snow)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "background 0.15s ease"
    }}
  >
                {rememberMe && <Check size={12} color="#ffffff" strokeWidth={3} />}
              </div>
              <span>Remember me on this workstation</span>
            </label>
          </div>

          {
    /* Submit Button */
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
      padding: "13px 20px",
      borderRadius: "var(--radius-full)",
      border: "2px solid var(--color-charcoal-ink)",
      background: "var(--color-charcoal-ink)",
      color: "var(--color-snow)",
      fontFamily: "var(--font-manrope)",
      fontSize: "14px",
      fontWeight: 800,
      cursor: isSubmitting ? "not-allowed" : "pointer",
      marginTop: 4,
      boxShadow: "3px 3px 0 var(--color-charcoal-ink)",
      transition: "transform 0.15s ease, box-shadow 0.15s ease"
    }}
    onMouseEnter={(e) => {
      if (!isSubmitting) {
        e.currentTarget.style.transform = "translate(-1px, -1px)";
        e.currentTarget.style.boxShadow = "4px 4px 0 var(--color-charcoal-ink)";
      }
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translate(0, 0)";
      e.currentTarget.style.boxShadow = "3px 3px 0 var(--color-charcoal-ink)";
    }}
  >
            <span>{isSubmitting ? "Authenticating..." : "Sign in to Workspace"}</span>
            <ArrowRight size={15} />
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
      margin: "22px 0",
      color: "var(--text-muted)",
      fontSize: "11.5px",
      fontFamily: "var(--font-mono)",
      fontWeight: 700
    }}
  >
          <div style={{ flex: 1, height: 1, background: "var(--color-charcoal-ink)", opacity: 0.2 }} />
          <span>OR QUICK ACCESS</span>
          <div style={{ flex: 1, height: 1, background: "var(--color-charcoal-ink)", opacity: 0.2 }} />
        </div>

        {
    /* 1-Click Instant Demo Login Pill */
  }
        <button
    type="button"
    onClick={() => handleQuickDemoLogin(selectedPersona || "alex.rivera@eillish.internal")}
    disabled={isSubmitting}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      width: "100%",
      padding: "11px 16px",
      borderRadius: "var(--radius-full)",
      border: "2px solid var(--color-charcoal-ink)",
      background: "var(--color-sunbeam-yellow)",
      color: "var(--color-charcoal-ink)",
      fontFamily: "var(--font-manrope)",
      fontSize: "12.5px",
      fontWeight: 800,
      cursor: isSubmitting ? "not-allowed" : "pointer",
      marginBottom: 10,
      boxShadow: "3px 3px 0 var(--color-charcoal-ink)",
      transition: "transform 0.15s ease"
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = "translate(-1px, -1px)"}
    onMouseLeave={(e) => e.currentTarget.style.transform = "translate(0, 0)"}
  >
          <Sparkles size={14} />
          <span>1-Click Instant Architect Sign-In</span>
        </button>

        {
    /* GitHub OAuth Button */
  }
        <button
    type="button"
    onClick={handleGitHubOAuth}
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
      cursor: isSubmitting ? "not-allowed" : "pointer",
      boxShadow: "2px 2px 0 var(--color-charcoal-ink)",
      transition: "transform 0.15s ease"
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = "translate(-1px, -1px)"}
    onMouseLeave={(e) => e.currentTarget.style.transform = "translate(0, 0)"}
  >
          <Github size={16} />
          <span>Continue with GitHub</span>
        </button>

        {
    /* Bottom Signup Link */
  }
        <div
    style={{
      textAlign: "center",
      marginTop: 24,
      paddingTop: 18,
      borderTop: "1px solid var(--color-peach-paper)",
      fontSize: "12.5px",
      color: "var(--text-muted)"
    }}
  >
          <span>Need a new team workspace? </span>
          <Link
    to="/auth/signup"
    style={{
      color: "var(--color-charcoal-ink)",
      fontWeight: 800,
      textDecoration: "underline"
    }}
  >
            Create an account
          </Link>
        </div>
      </div>

      {
    /* Security note footer */
  }
      <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
      gap: 14,
      marginTop: 20,
      fontSize: "11.5px",
      color: "var(--text-muted)",
      textAlign: "center"
    }}
  >
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <CheckCircle2 size={13} color="var(--success)" />
          <span>Read-only GitHub OAuth</span>
        </div>
        <span>•</span>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <ShieldCheck size={13} />
          <span>SOC2 Type II Ready</span>
        </div>
        <span>•</span>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <Lock size={13} />
          <span>Zero-Knowledge Tokens</span>
        </div>
      </div>
    </div>;
};
export {
  LoginPage
};
