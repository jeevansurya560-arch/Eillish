import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  BookOpen,
  Search,
  FolderGit2,
  Activity,
  BarChart3,
  Settings,
  ArrowRight,
  Cpu,
  Send,
} from 'lucide-react';
import './LandingPage.css';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('TypeScript');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactEmail, setContactEmail] = useState('');

  const insidePages = [
    {
      num: '01',
      title: 'Knowledge Explorer',
      desc: 'Browse and inspect 1,284 indexed code documents, AST chunk boundaries, and vector representations.',
      to: '/knowledge',
      badge: '1,284 Docs',
      icon: BookOpen,
      accent: 'var(--color-sunbeam-yellow)',
    },
    {
      num: '02',
      title: 'AI Query Search',
      desc: 'Semantic retrieval across multi-repository codebases with precise syntax citations and reasoning.',
      to: '/search',
      badge: 'Neural Retrieval',
      icon: Search,
      accent: 'var(--color-mint-wash)',
    },
    {
      num: '03',
      title: 'Repositories',
      desc: '12 active codebases tracked, synced, and partitioned into AST structures in real time.',
      to: '/repositories',
      badge: '12 Repos',
      icon: FolderGit2,
      accent: 'var(--color-powder-blue)',
    },
    {
      num: '04',
      title: 'Activity Timeline',
      desc: 'Real-time telemetry stream of git commits, ingestion jobs, vector embeddings, and chunk diffs.',
      to: '/activity',
      badge: 'Live Stream',
      icon: Activity,
      accent: 'var(--color-lilac-tint)',
    },
    {
      num: '05',
      title: 'RAG Analytics',
      desc: 'Telemetry on chunk hit rates, cosine similarity metrics, query latency, and index health.',
      to: '/analytics',
      badge: 'Telemetry',
      icon: BarChart3,
      accent: 'var(--color-ember-orange)',
    },
    {
      num: '06',
      title: 'System Settings',
      desc: 'Configure vector indexing thresholds, embedding model parameters, and repository sync filters.',
      to: '/settings',
      badge: 'Preferences',
      icon: Settings,
      accent: 'var(--color-snow)',
    },
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactEmail.trim()) {
      setContactSubmitted(true);
    }
  };

  return (
    <div className="landing-container">
      {/* Small, Compact Top Navigation Bar (Height: 52px) */}
      <header className="landing-nav">
        <Link to="/" className="landing-nav-brand">
          <span className="landing-brand-mark">Eillish</span>
          <span className="landing-brand-tag">Neural</span>
        </Link>

        <nav className="landing-nav-links">
          <button className="landing-nav-pill-btn" onClick={() => navigate('/knowledge')}>
            <span>Knowledge</span>
            <span className="landing-nav-badge">1,284</span>
          </button>
          <button className="landing-nav-pill-btn" onClick={() => navigate('/search')}>
            <span>AI Search</span>
            <span className="landing-nav-badge">AI</span>
          </button>
          <button className="landing-nav-pill-btn" onClick={() => navigate('/repositories')}>
            <span>Repositories</span>
            <span className="landing-nav-badge">12</span>
          </button>
          <button className="landing-nav-pill-btn" onClick={() => navigate('/activity')}>
            <span>Activity</span>
          </button>
          <button className="landing-nav-pill-btn" onClick={() => navigate('/analytics')}>
            <span>Analytics</span>
          </button>
        </nav>

        <div className="landing-nav-actions">
          <button className="landing-cta-pill" onClick={() => navigate('/knowledge')}>
            <span>Enter System</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </header>

      {/* Hero Section: Photo-Free, Storybook Typographic Presentation */}
      <section className="landing-hero">
        {/* Decorative Floating Line-Art SVG Doodles (Zero Photos) */}
        <div className="doodle-wrap doodle-1">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#000000" strokeWidth="2">
            <circle cx="24" cy="24" r="18" />
            <circle cx="24" cy="24" r="6" fill="#ef724f" />
            <line x1="24" y1="6" x2="24" y2="18" />
            <line x1="24" y1="30" x2="24" y2="42" />
          </svg>
        </div>
        <div className="doodle-wrap doodle-2">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#000000" strokeWidth="2">
            <rect x="8" y="8" width="32" height="32" rx="10" fill="#ace2df" />
            <path d="M16 24L22 30L32 18" />
          </svg>
        </div>
        <div className="doodle-wrap doodle-3">
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="#000000" strokeWidth="2">
            <polygon points="22 4 38 38 6 38" fill="#e7db4c" />
            <circle cx="22" cy="26" r="3" fill="#000000" />
          </svg>
        </div>
        <div className="doodle-wrap doodle-4">
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="#000000" strokeWidth="2">
            <circle cx="22" cy="22" r="14" fill="#e69dff" />
            <line x1="12" y1="22" x2="32" y2="22" />
            <line x1="22" y1="12" x2="22" y2="32" />
          </svg>
        </div>

        <div className="landing-hero-tag">
          <span>Neural Architecture System · Live Platform</span>
        </div>

        <h1 className="landing-hero-title">
          Neural Architecture For Complex Engineering Codebases.
        </h1>

        <p className="landing-hero-subtitle">
          Eillish maps your distributed repositories, abstract syntax trees, and engineering
          documentation into a living vector space. Reason over code dependencies with machine precision.
        </p>

        <div className="landing-hero-ctas">
          <button className="hero-btn-primary" onClick={() => navigate('/knowledge')}>
            <span>Explore Knowledge Base</span>
            <ArrowRight size={15} />
          </button>
          <button className="hero-btn-secondary" onClick={() => navigate('/search')}>
            <span>Launch AI Query Search</span>
            <Search size={15} />
          </button>
          <button className="hero-btn-secondary" onClick={() => navigate('/repositories')}>
            <span>View 12 Repositories</span>
            <FolderGit2 size={15} />
          </button>
        </div>

        {/* Interactive Neural Vector Waveform Strip */}
        <div className="landing-neural-strip">
          <div className="neural-strip-left">
            <div className="neural-strip-icon-box">
              <Cpu size={22} color="#000000" />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div className="neural-strip-heading">Abstract Syntax Tree (AST) Vectorization</div>
              <div className="neural-strip-sub">Semantic boundaries preserved · Zero hallucination context</div>
            </div>
          </div>

          <div className="neural-strip-pills">
            {['TypeScript', 'Python', 'Go', 'Markdown', 'Rust'].map((lang) => (
              <button
                key={lang}
                className={`neural-filter-pill ${activeFilter === lang ? 'active' : ''}`}
                onClick={() => setActiveFilter(lang)}
              >
                {lang} AST
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Specification Matrix (4 Outline Cards) */}
      <section className="landing-specs-grid">
        <div className="landing-spec-card">
          <span className="spec-card-num">94.2%</span>
          <span className="spec-card-label">AST Index Density</span>
          <span className="spec-card-sub">Semantic code tree indexed</span>
        </div>

        <div className="landing-spec-card">
          <span className="spec-card-num">142ms</span>
          <span className="spec-card-label">Retrieval Latency</span>
          <span className="spec-card-sub">P99 cosine search response</span>
        </div>

        <div className="landing-spec-card">
          <span className="spec-card-num">12 Repos</span>
          <span className="spec-card-label">Active Git Mirrors</span>
          <span className="spec-card-sub">Continuous tree synchronization</span>
        </div>

        <div className="landing-spec-card">
          <span className="spec-card-num">Zero</span>
          <span className="spec-card-label">Queue Backpressure</span>
          <span className="spec-card-sub">Real-time vector ingestion</span>
        </div>
      </section>

      {/* What We Are Working On (4 Chunky Outline Cards) */}
      <section className="landing-section" id="working-on">
        <div className="section-header-block">
          <div className="section-eyebrow">
            <span>Our Core Focus</span>
          </div>
          <h2 className="section-shouting-title">What We Are Working On.</h2>
          <p className="section-desc-text">
            We are engineering the foundational neural architecture for modern software engineering teams.
            Here are the four pillars currently active in development:
          </p>
        </div>

        <div className="pillars-grid">
          {/* Pillar 1 */}
          <div className="pillar-card">
            <div className="pillar-card-top">
              <span className="pillar-card-badge pillar-card-badge--orange">Multi-Repo Ingestion</span>
              <span className="pillar-card-num">01</span>
            </div>
            <div>
              <h3 className="pillar-card-title">Distributed Git Tree Synchronization</h3>
              <p className="pillar-card-desc">
                Continuously mirrors and tracks 12 engineering repositories across microservices.
                Delta webhooks compute structural code differences on every commit, refreshing
                vector indexes without full repository re-scans.
              </p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="pillar-card">
            <div className="pillar-card-top">
              <span className="pillar-card-badge pillar-card-badge--mint">Semantic AST Chunking</span>
              <span className="pillar-card-num">02</span>
            </div>
            <div>
              <h3 className="pillar-card-title">Boundary-Preserving Code Parsing</h3>
              <p className="pillar-card-desc">
                Traditional chunking chops code at arbitrary line limits. Eillish parses full Abstract
                Syntax Trees, preserving function scopes, class interfaces, and decorator contexts
                so the language model receives coherent, compilable units.
              </p>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="pillar-card">
            <div className="pillar-card-top">
              <span className="pillar-card-badge pillar-card-badge--blue">Vector Retrieval & Reranker</span>
              <span className="pillar-card-num">03</span>
            </div>
            <div>
              <h3 className="pillar-card-title">Hybrid BM25 + Cosine Re-Ranking</h3>
              <p className="pillar-card-desc">
                Combines exact keyword tokens with high-dimensional vector embeddings. A secondary
                cross-encoder re-ranks the top-k snippets in 142ms, ensuring exact variable names
                and semantic intent match flawlessly.
              </p>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="pillar-card">
            <div className="pillar-card-top">
              <span className="pillar-card-badge pillar-card-badge--yellow">Telemetry & Diagnostics</span>
              <span className="pillar-card-num">04</span>
            </div>
            <div>
              <h3 className="pillar-card-title">Real-Time Vector Drift Monitoring</h3>
              <p className="pillar-card-desc">
                Live telemetry tracks chunk hit ratios, query response distributions, and embedding
                drift across repository branches. Engineers inspect exactly which knowledge items
                were accessed and cited during AI reasoning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Workspaces Gateway (Individual Inside Pages) */}
      <section className="landing-section" id="workspaces">
        <div className="section-header-block">
          <div className="section-eyebrow">
            <span>System Workspaces</span>
          </div>
          <h2 className="section-shouting-title">Individual Workspaces.</h2>
          <p className="section-desc-text">
            Each page is an independent workspace designed for focused engineering tasks.
            Click any module below to enter directly:
          </p>
        </div>

        <div className="gateway-grid">
          {insidePages.map((page) => (
            <div
              key={page.num}
              className="gateway-card"
              onClick={() => navigate(page.to)}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span
                    style={{
                      fontFamily: 'var(--font-manrope)',
                      fontSize: '11px',
                      fontWeight: 800,
                      padding: '3px 10px',
                      borderRadius: 'var(--radius-full)',
                      background: page.accent,
                      border: '1.5px solid #000000',
                    }}
                  >
                    {page.badge}
                  </span>
                  <span style={{ fontFamily: 'var(--font-alfa-slab-one)', fontSize: '15px' }}>
                    {page.num}
                  </span>
                </div>
                <h3 className="gateway-card-title">{page.title}</h3>
                <p className="gateway-card-desc">{page.desc}</p>
              </div>

              <div>
                <button className="gateway-card-btn">
                  <span>Open Workspace</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture & Engineering Guidelines Section */}
      <section className="landing-section" id="guidelines">
        <div className="section-header-block">
          <div className="section-eyebrow">
            <span>System Standards</span>
          </div>
          <h2 className="section-shouting-title">Architecture Guidelines.</h2>
          <p className="section-desc-text">
            Core principles governing our neural indexing pipeline and design philosophy:
          </p>
        </div>

        <div className="guidelines-grid">
          <div className="guideline-card">
            <span className="guideline-pill" style={{ background: 'var(--color-sunbeam-yellow)' }}>
              Principle 01
            </span>
            <h3 className="guideline-title">Neural Rigor Over Hype</h3>
            <p className="guideline-body">
              All vector distances and AST chunk boundaries are mathematically verifiable.
              We reject opaque 'magic AI' claims in favor of inspectable embeddings, exact citations,
              and deterministic tree parsing.
            </p>
          </div>

          <div className="guideline-card">
            <span className="guideline-pill" style={{ background: 'var(--color-mint-wash)' }}>
              Principle 02
            </span>
            <h3 className="guideline-title">Zero Artificial Friction</h3>
            <p className="guideline-body">
              Interfaces must load immediately with zero animation bloat, zero drop-shadow clutter,
              and crisp 2px borders. Every component sits directly on the canvas without fake depth.
            </p>
          </div>

          <div className="guideline-card">
            <span className="guideline-pill" style={{ background: 'var(--color-lilac-tint)' }}>
              Principle 03
            </span>
            <h3 className="guideline-title">Strict Language Prohibitions</h3>
            <p className="guideline-body">
              We prohibit vacuous marketing filler words in our telemetry and documentation:
              terms like 'elevate', 'seamless', 'game-changer', and 'unleash' are banned across
              all system copy.
            </p>
          </div>
        </div>
      </section>

      {/* Contact & Consultation Section */}
      <section className="landing-section" id="contact" style={{ marginBottom: '60px' }}>
        <div className="section-header-block">
          <div className="section-eyebrow">
            <span>Direct Line</span>
          </div>
          <h2 className="section-shouting-title">Contact & Lab Channels.</h2>
          <p className="section-desc-text">
            Connect with our engineering and research team regarding repository integration or custom model deployment:
          </p>
        </div>

        <div className="contact-layout">
          {/* Contact Direct Channels */}
          <div className="contact-card">
            <h3 style={{ fontFamily: 'var(--font-alfa-slab-one)', fontSize: '20px' }}>
              Direct Engineering Inquiries
            </h3>
            <p style={{ fontFamily: 'var(--font-manrope)', fontSize: '14px', lineHeight: '1.6' }}>
              We collaborate closely with engineering teams navigating massive polyglot codebases.
            </p>

            <div className="contact-channel-item">
              <span>Engineering Dispatch:</span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>engineering@eillish.ai</span>
            </div>

            <div className="contact-channel-item">
              <span>Repository Integrations:</span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>git-sync@eillish.ai</span>
            </div>

            <div className="contact-channel-item">
              <span>Research Lab Office:</span>
              <span>450 Mission St, San Francisco, CA</span>
            </div>
          </div>

          {/* Quick Dispatch Form */}
          <div className="contact-card">
            <h3 style={{ fontFamily: 'var(--font-alfa-slab-one)', fontSize: '20px' }}>
              Connect Repository
            </h3>
            {contactSubmitted ? (
              <div
                style={{
                  padding: '24px',
                  background: 'var(--color-mint-wash)',
                  border: '2px solid #000000',
                  borderRadius: '20px',
                  fontFamily: 'var(--font-manrope)',
                  fontWeight: 700,
                }}
              >
                ✓ Dispatch received. Our neural architecture engineers will follow up within 24 hours.
              </div>
            ) : (
              <form className="contact-form-group" onSubmit={handleContactSubmit}>
                <p style={{ fontFamily: 'var(--font-manrope)', fontSize: '13.5px' }}>
                  Enter your engineering email to request repository connection credentials:
                </p>
                <input
                  type="email"
                  className="contact-pill-input"
                  placeholder="name@company.com"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                />
                <button type="submit" className="contact-pill-submit">
                  <span className="flex items-center justify-center gap-2">
                    <span>Request Repository Ingestion</span>
                    <Send size={14} />
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="landing-footer">
        <div className="landing-footer-box">
          <div className="footer-top-grid">
            <div className="footer-brand-column">
              <h3 className="footer-brand-title">EILLISH</h3>
              <p className="footer-brand-desc">
                Neural architecture and vector codebase intelligence.
                2px solid geometry, warm peach paper, zero artificial hype.
              </p>
            </div>

            <div className="footer-links-group">
              <div className="footer-col">
                <span className="footer-col-header">Workspaces</span>
                <Link to="/knowledge" className="footer-col-link">Knowledge Explorer</Link>
                <Link to="/search" className="footer-col-link">AI Query Search</Link>
                <Link to="/repositories" className="footer-col-link">Repositories</Link>
              </div>

              <div className="footer-col">
                <span className="footer-col-header">System</span>
                <Link to="/activity" className="footer-col-link">Activity Feed</Link>
                <Link to="/analytics" className="footer-col-link">RAG Analytics</Link>
                <Link to="/settings" className="footer-col-link">Settings</Link>
              </div>

              <div className="footer-col">
                <span className="footer-col-header">Sections</span>
                <a href="#working-on" className="footer-col-link">What We Are Working On</a>
                <a href="#guidelines" className="footer-col-link">Guidelines</a>
                <a href="#contact" className="footer-col-link">Contact</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom-strip">
            <span>© 2026 Eillish Neural Systems Inc. All rights reserved.</span>
            <div className="footer-status-pill">
              <span className="status-dot-circle" />
              <span>Neural Pipeline Operational · 94.2% Synced</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
