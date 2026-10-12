import { Link, NavLink } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import "./StaticPageLayout.css";
const StaticPageLayout = ({
  title,
  subtitle,
  badge = "Knowledge Architecture",
  children
}) => {
  return <div className="static-page-container">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {
    /* 52px Compact Navigation */
  }
      <header className="static-nav">
        <div className="static-nav-left">
          <Link to="/" className="landing-nav-brand">
            <span className="landing-brand-mark">Eillish</span>
            <span className="landing-brand-tag">Neural</span>
          </Link>

          <Link to="/" className="static-nav-link" style={{ fontSize: "11.5px" }}>
            <ArrowLeft size={13} />
            <span>Home</span>
          </Link>
        </div>

        <nav className="static-nav-links" aria-label="Static pages navigation">
          <NavLink
    to="/how-it-works"
    className={({ isActive }) => `static-nav-link ${isActive ? "active" : ""}`}
  >
            How It Works
          </NavLink>
          <NavLink
    to="/features"
    className={({ isActive }) => `static-nav-link ${isActive ? "active" : ""}`}
  >
            Features
          </NavLink>
          <NavLink
    to="/security"
    className={({ isActive }) => `static-nav-link ${isActive ? "active" : ""}`}
  >
            Security
          </NavLink>
          <NavLink
    to="/about"
    className={({ isActive }) => `static-nav-link ${isActive ? "active" : ""}`}
  >
            About
          </NavLink>
          <NavLink
    to="/docs"
    className={({ isActive }) => `static-nav-link ${isActive ? "active" : ""}`}
  >
            Docs
          </NavLink>
          <NavLink
    to="/changelog"
    className={({ isActive }) => `static-nav-link ${isActive ? "active" : ""}`}
  >
            Changelog
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/knowledge" className="landing-cta-pill">
            <span>Enter App</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </header>

      {
    /* Main Content */
  }
      <main id="main-content" className="static-main">
        <section className="static-hero">
          {badge && <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "4px 12px",
      borderRadius: "var(--radius-full)",
      border: "2px solid var(--color-charcoal-ink)",
      background: "var(--color-sunbeam-yellow)",
      fontFamily: "var(--font-manrope)",
      fontSize: "11px",
      fontWeight: 800,
      textTransform: "uppercase",
      width: "fit-content"
    }}
  >
              {badge}
            </div>}
          <h1 className="static-title">{title}</h1>
          {subtitle && <p className="static-subtitle">{subtitle}</p>}
        </section>

        {children}
      </main>

      {
    /* Shared Static Footer */
  }
      <footer
    style={{
      borderTop: "2px solid var(--color-charcoal-ink)",
      background: "var(--color-snow)",
      padding: "28px 32px",
      marginTop: "auto"
    }}
  >
        <div
    style={{
      maxWidth: "var(--page-max-width)",
      margin: "0 auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 16,
      fontFamily: "var(--font-manrope)",
      fontSize: "12px",
      fontWeight: 700
    }}
  >
          <span>© 2026 Eillish — Your knowledge, understood.</span>
          <div className="flex items-center gap-4 flex-wrap">
            <Link to="/how-it-works" style={{ textDecoration: "underline" }}>
              How It Works
            </Link>
            <Link to="/features" style={{ textDecoration: "underline" }}>
              Features
            </Link>
            <Link to="/security" style={{ textDecoration: "underline" }}>
              Security
            </Link>
            <Link to="/about" style={{ textDecoration: "underline" }}>
              About
            </Link>
            <Link to="/docs" style={{ textDecoration: "underline" }}>
              Docs
            </Link>
            <Link to="/changelog" style={{ textDecoration: "underline" }}>
              Changelog
            </Link>
            <Link to="/privacy" style={{ textDecoration: "underline" }}>
              Privacy
            </Link>
            <Link to="/terms" style={{ textDecoration: "underline" }}>
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>;
};
export {
  StaticPageLayout
};
