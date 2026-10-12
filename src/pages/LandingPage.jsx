import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  BookOpen,
  Search,
  FolderGit2,
  Activity,
  BarChart3,
  ArrowRight,
  Cpu,
  Send,
  Sparkles,
  FileCode,
  FileText,
  Copy,
  Check,
  GitBranch,
  ShieldCheck,
  Database,
  Lock,
  Server,
  Code2,
  Terminal
} from "lucide-react";
import "./LandingPage.css";
const LandingPage = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("TypeScript");
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactEmail, setContactEmail] = useState("");
  const [activeCitationIndex, setActiveCitationIndex] = useState(0);
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeFlowStep, setActiveFlowStep] = useState(0);
  const [activeModelStep, setActiveModelStep] = useState(0);
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState("knowledge");
  const sampleQuestions = [
    "Where do we validate JWT tokens?",
    "How does pgvector hybrid retrieval work?",
    "Show markdown AST chunking strategy"
  ];
  const [currentQuestion, setCurrentQuestion] = useState(sampleQuestions[0]);
  const flowSteps = [
    {
      num: "01",
      badge: "INGESTION",
      name: "Repository Ingestion",
      meta: "Git tree delta, branch heads & markdown sync",
      color: "var(--color-sunbeam-yellow)",
      preview: "git_sync: 12 repositories connected \xB7 1,284 documents parsed \xB7 zero file truncation"
    },
    {
      num: "02",
      badge: "AST CHUNK",
      name: "AST Boundary Preservation",
      meta: "Tree-sitter syntactic scopes & functional units",
      color: "var(--color-mint-wash)",
      preview: "ast_parser: function verify_jwt_token() extracted as isolated unit [L42-L54]"
    },
    {
      num: "03",
      badge: "HYBRID",
      name: "Dual-Vector & Fulltext Index",
      meta: "IVFFlat pgvector embeddings + BM25 tsvector",
      color: "var(--color-powder-blue)",
      preview: "pgvector: 1536d cosine similarity index + PostgreSQL tsvector rank weighting"
    },
    {
      num: "04",
      badge: "REASONING",
      name: "AI Evidence Synthesis",
      meta: "Context-grounded prompt compilation & citations",
      color: "#e69dff",
      preview: "grounding_engine: 3 source chunks retrieved with 94.2% cosine confidence"
    },
    {
      num: "05",
      badge: "PROOF",
      name: "Line-Level Verifiable Citations",
      meta: "Clickable line numbers [auth.ts#L42-L88] & diffs",
      color: "var(--color-ember-orange)",
      preview: "citation: [1] backend/authentication.md#L42-L54 (94.2% verified match)"
    }
  ];
  const citations = [
    {
      title: "authentication.md",
      path: "backend/authentication.md",
      lines: "Lines 42\u201354",
      score: "94.2% match",
      type: "markdown",
      code: `async def verify_jwt_token(request: Request):
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or malformed bearer token")
    
    token = auth_header.split(" ")[1]
    payload = jwt.decode(token, PUBLIC_KEY, algorithms=["RS256"])
    request.state.user = payload
    return payload`
    },
    {
      title: "vector_store.py",
      path: "backend/core/vector_store.py",
      lines: "Lines 12\u201326",
      score: "87.5% match",
      type: "code",
      code: `class PgVectorStore:
    async def hybrid_search(self, query_vector: List[float], query_text: str, top_k: int = 5):
        query = """
        WITH semantic_search AS (
            SELECT id, document_id, content, 1 - (embedding <=> $1::vector) AS score
            FROM document_chunks ORDER BY embedding <=> $1::vector LIMIT $2
        )
        ...`
    },
    {
      title: "rag_pipeline.py",
      path: "ai/rag_pipeline.py",
      lines: "Lines 78\u201388",
      score: "81.0% match",
      type: "code",
      code: `@router.post("/query")
async def execute_rag_pipeline(payload: QueryPayload, user=Depends(verify_jwt_token)):
    # Session verified before triggering semantic AST lookup
    results = await retriever.hybrid_search(payload.query)
    return synthesize_grounded_answer(payload.query, results)`
    }
  ];
  const mentalModelNodes = [
    { tag: "01. ROOT", name: "Repository", detail: "GitHub or local repo: eillish-core with 128 source files." },
    { tag: "02. SOURCE", name: "Documents", detail: "Source files: backend/core/security.py (280 lines)." },
    { tag: "03. SCOPE", name: "AST Chunks", detail: "Function verify_jwt_token() extracted as isolated unit." },
    { tag: "04. EMBED", name: "Concepts", detail: "Asymmetric JWT validation, RS256 decoding, expiry check." },
    { tag: "05. GRAPH", name: "Connections", detail: "Linked to router.py, docs/auth.md and test_auth.py." },
    { tag: "06. ANSWER", name: "Grounded Answer", detail: "Synthesized answer with clickable line citation [L42-L54]." }
  ];
  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (contactEmail.trim()) {
      setContactSubmitted(true);
    }
  };
  const handleCopy = (text) => {
    navigator.clipboard?.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2e3);
  };
  return <div className="landing-container">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {
    /* ==========================================================================
       Section 1: Small Top Navigation Bar (Height: 52px)
       ========================================================================== */
  }
      <header className="landing-nav">
        <Link to="/" className="landing-nav-brand">
          <span className="landing-brand-mark">Eillish</span>
          <span className="landing-brand-tag">Neural</span>
        </Link>

        <nav className="landing-nav-links" aria-label="Main Navigation">
          <Link to="/about" className="landing-nav-pill-btn">
            <span>About</span>
          </Link>
          <Link to="/how-it-works" className="landing-nav-pill-btn">
            <span>How It Works</span>
          </Link>
          <Link to="/features" className="landing-nav-pill-btn">
            <span>Features</span>
          </Link>
          <Link to="/security" className="landing-nav-pill-btn">
            <span>Security</span>
          </Link>
          <Link to="/docs" className="landing-nav-pill-btn">
            <span>Docs</span>
          </Link>
        </nav>

        <div className="landing-nav-actions">
          <Link to="/auth/login" className="landing-nav-pill-btn" style={{ fontWeight: 800 }}>
            <span>Sign in</span>
          </Link>
          <Link to="/auth/signup" className="landing-cta-pill">
            <span>Start Building</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </header>

      <main id="main-content">
        {
    /* ==========================================================================
       Section 2: Opening Hook / The Relatable Hook Card
       ========================================================================== */
  }
        <section className="landing-hook-section">
          <div className="opening-hook-card">
            <div className="opening-hook-top">
              <span className="opening-hook-eyebrow">The Persistent Engineering Problem</span>
              <span className="opening-hook-tagline">Why codebases become black holes over time</span>
            </div>
            <h2 className="opening-hook-quote">
              "You don't forget what you learned. You forget where you put it."
            </h2>
            <p className="opening-hook-explanation">
              You remember writing the authentication middleware, the custom serialization hook, or the exact deployment
              flags six months ago. But it is lost across 14 GitHub repositories, forgotten scratch files, unmerged
              branches, and obsolete Notion docs. Eillish fixes this by turning all of it into a single structured,
              searchable knowledge layer.
            </p>
            <div className="opening-hook-formats">
              <span style={{ fontSize: "12px", fontWeight: 800, fontFamily: "var(--font-manrope)" }}>
                Unified Across:
              </span>
              <span className="opening-format-pill">Git Repositories</span>
              <span className="opening-format-pill">Markdown Documentation</span>
              <span className="opening-format-pill">Local Scratchpads</span>
              <span className="opening-format-pill">AST Code Scopes</span>
              <span className="opening-format-pill">Issue Threads</span>
            </div>
          </div>
        </section>

        {
    /* ==========================================================================
       Section 3: Hero Section (Strict 2-Column Desktop Grid per Section 37)
       ========================================================================== */
  }
        <section className="landing-hero">
          <div className="landing-hero-2col">
            {
    /* Left Column */
  }
            <div className="hero-col-left">
              <div className="landing-hero-tag">
                <span>Personal Knowledge System</span>
              </div>

              <h1 className="landing-hero-title">
                Your knowledge, understood.
              </h1>

              <p className="landing-hero-subtitle">
                Eillish connects your repositories, documents, notes, and code into one searchable knowledge layer—then
                uses retrieval and AI to help you find answers with evidence.
              </p>

              <div className="landing-hero-ctas">
                <Link to="/auth/signup" className="hero-btn-primary">
                  <span>Get Started</span>
                  <ArrowRight size={15} />
                </Link>
                <Link to="/how-it-works" className="hero-btn-secondary">
                  <span>See How It Works</span>
                  <Sparkles size={15} />
                </Link>
                <button
    className="hero-btn-secondary"
    style={{ background: "var(--color-mint-wash)" }}
    onClick={() => navigate("/knowledge")}
  >
                  <span>Explore Knowledge Base</span>
                  <BookOpen size={15} />
                </button>
              </div>

              <div className="hero-quick-command">
                <Terminal size={13} />
                <span>Press ⌘K to ask your knowledge anytime</span>
              </div>

              <div className="hero-specs-row">
                <span className="hero-spec-item">
                  <span className="hero-spec-dot" /> 12+ Language ASTs
                </span>
                <span className="hero-spec-item">
                  <span className="hero-spec-dot" /> pgvector IVFFlat
                </span>
                <span className="hero-spec-item">
                  <span className="hero-spec-dot" /> BM25 Hybrid Retrieval
                </span>
                <span className="hero-spec-item">
                  <span className="hero-spec-dot" /> Zero Model Training
                </span>
              </div>
            </div>

            {
    /* Right Column: Tactile Knowledge Flow Architectural Card */
  }
            <div className="hero-col-right">
              <div className="knowledge-flow-card">
                <div className="flow-card-header">
                  <div className="flow-card-title">EILLISH KNOWLEDGE PIPELINE</div>
                  <div className="flow-status-pill">
                    <span className="flow-pulse-dot" />
                    <span>Live Index Active</span>
                  </div>
                </div>

                <div className="flow-steps-list">
                  {flowSteps.map((step, idx) => <React.Fragment key={step.num}>
                      <div
    className={`flow-step-item ${activeFlowStep === idx ? "active" : ""}`}
    onClick={() => setActiveFlowStep(idx)}
  >
                        <span className="flow-step-badge" style={{ background: step.color }}>
                          {step.badge}
                        </span>
                        <div className="flow-step-content">
                          <div className="flow-step-name">{step.name}</div>
                          <div className="flow-step-meta">{step.meta}</div>
                        </div>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 800 }}>
                          {step.num}
                        </span>
                      </div>
                      {idx < flowSteps.length - 1 && <div className="flow-connector-arrow">
                          <ArrowRight size={13} style={{ transform: "rotate(90deg)" }} />
                        </div>}
                    </React.Fragment>)}
                </div>

                <div className="flow-live-preview-box">
                  <div className="flow-preview-label">Active Node Telemetry:</div>
                  <div>{flowSteps[activeFlowStep].preview}</div>
                </div>
              </div>
            </div>
          </div>

          {
    /* AST Preserved Language Strip */
  }
          <div className="landing-neural-strip">
            <div className="neural-strip-inner">
              <div className="neural-strip-left">
                <div className="neural-strip-icon-box">
                  <Cpu size={20} color="#000000" />
                </div>
                <div style={{ textAlign: "left" }}>
                  <div className="neural-strip-heading">Abstract Syntax Tree (AST) Boundary Preservation</div>
                  <div className="neural-strip-sub">Semantic functions and classes parsed as intact units · Zero arbitrary chunk slicing</div>
                </div>
              </div>

              <div className="neural-strip-pills">
                {["TypeScript", "Python", "Go", "Markdown", "Rust"].map((lang) => <button
    key={lang}
    className={`neural-filter-pill ${activeFilter === lang ? "active" : ""}`}
    onClick={() => setActiveFilter(lang)}
  >
                    {lang} AST
                  </button>)}
              </div>
            </div>
          </div>
        </section>

        {
    /* ==========================================================================
       Section 4: The Problem — Fragmentation ("The Engineering Memory Gap")
       ========================================================================== */
  }
        <section className="landing-section">
          <div className="section-header-block">
            <div className="section-eyebrow">
              <span>The Engineering Memory Gap</span>
            </div>
            <h2 className="section-shouting-title">Why Engineering Knowledge Disappears.</h2>
            <p className="section-desc-text">
              Developers do not lose knowledge because they forget concepts. They lose knowledge because it is
              scattered across disjointed repositories, outdated wikis, and forgotten scratch files.
            </p>
          </div>

          <div className="problem-scatter-strip">
            <span style={{ fontFamily: "var(--font-manrope)", fontSize: "13.5px", fontWeight: 800 }}>
              The Fragmented Reality:
            </span>
            <div className="problem-scatter-tags">
              <span className="problem-scatter-tag">Markdown Notes</span>
              <span className="problem-scatter-tag">GitHub Repos</span>
              <span className="problem-scatter-tag">Notion Pages</span>
              <span className="problem-scatter-tag">Browser Tabs</span>
              <span className="problem-scatter-tag">PDF Specs</span>
              <span className="problem-scatter-tag">Local Code</span>
              <span className="problem-scatter-tag">Slack Threads</span>
            </div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: 800, color: "var(--color-ember-orange)" }}>
              "I know I saved it somewhere."
            </span>
          </div>

          <div className="problem-grid">
            <div className="problem-card">
              <div className="problem-quote-wrap">
                <span className="problem-quote-badge" style={{ background: "var(--color-sunbeam-yellow)" }}>
                  Lost Context
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)" }}>P01</span>
              </div>
              <h3 className="problem-quote">"I know I wrote this function somewhere."</h3>
              <p className="problem-truth">
                It lives in one of 14 repositories or 3 Notion documents. Without cross-repository AST mapping, you end up
                re-implementing code you already wrote six months ago.
              </p>
            </div>

            <div className="problem-card">
              <div className="problem-quote-wrap">
                <span className="problem-quote-badge" style={{ background: "var(--color-mint-wash)" }}>
                  Search Blindness
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)" }}>P02</span>
              </div>
              <h3 className="problem-quote">"I remember the repository. I don't remember the file."</h3>
              <p className="problem-truth">
                Lexical search returns either 200 false positives or zero matches due to synonym mismatches. Semantic
                retrieval bridges the gap between your natural question and exact code syntax.
              </p>
            </div>

            <div className="problem-card">
              <div className="problem-quote-wrap">
                <span className="problem-quote-badge" style={{ background: "var(--color-powder-blue)" }}>
                  Stale Docs
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)" }}>P03</span>
              </div>
              <h3 className="problem-quote">"The documentation changed. My mental model didn't."</h3>
              <p className="problem-truth">
                Markdown documentation drifts away from actual code implementations. Continuous commit ingestion keeps
                your knowledge graph synchronized with actual production pull requests.
              </p>
            </div>

            <div className="problem-card">
              <div className="problem-quote-wrap">
                <span className="problem-quote-badge" style={{ background: "var(--color-ember-orange)" }}>
                  Hallucination Trap
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)" }}>P04</span>
              </div>
              <h3 className="problem-quote">"I got an AI answer. I still don't know where it came from."</h3>
              <p className="problem-truth">
                Standard AI chat gives plausible-sounding answers with no verifiable trail. In software engineering, an
                answer without line-level source citations is not knowledge—it is a liability.
              </p>
            </div>
          </div>
        </section>

        {
    /* ==========================================================================
       Section 5: The Eillish Approach (6-Stage Pipeline + Comparison)
       ========================================================================== */
  }
        <section className="landing-section">
          <div className="section-header-block">
            <div className="section-eyebrow">
              <span>Core Architecture</span>
            </div>
            <h2 className="section-shouting-title">From Raw Files To Grounded Knowledge.</h2>
            <p className="section-desc-text">
              Eillish is not "ChatGPT with file upload." It is an indexing engine that builds a durable, structured
              knowledge layer across your codebase. AI models operate on top of this layer to reason, retrieve, and cite.
            </p>
          </div>

          <div className="approach-pipeline-grid">
            <div className="approach-stage-card">
              <span className="stage-num-badge" style={{ background: "var(--color-sunbeam-yellow)" }}>01. STORE</span>
              <h3 className="stage-card-title">Immutable Ingestion</h3>
              <p className="stage-card-desc">
                Connect GitHub repositories, markdown docs, and notes into an immutable content layer with commit SHA tracking.
              </p>
            </div>

            <div className="approach-stage-card">
              <span className="stage-num-badge" style={{ background: "var(--color-mint-wash)" }}>02. UNDERSTAND</span>
              <h3 className="stage-card-title">Tree-Sitter AST Parsing</h3>
              <p className="stage-card-desc">
                Parse syntactic scopes so functions, classes, and markdown headings remain complete, compilable blocks.
              </p>
            </div>

            <div className="approach-stage-card">
              <span className="stage-num-badge" style={{ background: "var(--color-powder-blue)" }}>03. CONNECT</span>
              <h3 className="stage-card-title">Cross-File Relationships</h3>
              <p className="stage-card-desc">
                Resolve symbol imports, callers, and documentation links to construct a unified multi-repository graph.
              </p>
            </div>

            <div className="approach-stage-card">
              <span className="stage-num-badge" style={{ background: "#e69dff" }}>04. RETRIEVE</span>
              <h3 className="stage-card-title">Hybrid Retrieval Engine</h3>
              <p className="stage-card-desc">
                Combine dense vector cosine similarity (pgvector IVFFlat) with sparse lexical precision (BM25 tsvector).
              </p>
            </div>

            <div className="approach-stage-card">
              <span className="stage-num-badge" style={{ background: "var(--color-ember-orange)" }}>05. REASON</span>
              <h3 className="stage-card-title">Grounded Synthesis</h3>
              <p className="stage-card-desc">
                AI models synthesize answers strictly constrained to retrieved evidence without making unsupported claims.
              </p>
            </div>

            <div className="approach-stage-card">
              <span className="stage-num-badge" style={{ background: "var(--color-sunbeam-yellow)" }}>06. PROVE</span>
              <h3 className="stage-card-title">Line-Level Citations</h3>
              <p className="stage-card-desc">
                Every generated statement points directly to the exact file path and line numbers with interactive previews.
              </p>
            </div>
          </div>

          {
    /* Contrast Box: Generic LLM vs Eillish */
  }
          <div className="approach-contrast-box">
            <div className="contrast-col bad">
              <div className="contrast-header">
                <span style={{ color: "#dc2626" }}>✕</span>
                <span>Generic AI Chatbot</span>
              </div>
              <div className="contrast-list">
                <div className="contrast-item">
                  <span>•</span>
                  <span>Splits code at arbitrary 500-token boundaries, slicing functions in half.</span>
                </div>
                <div className="contrast-item">
                  <span>•</span>
                  <span>Loses import statements, class contexts, and variable scopes.</span>
                </div>
                <div className="contrast-item">
                  <span>•</span>
                  <span>Pure vector search fails completely on exact symbol names (e.g. <code>jwt_decode_rs256</code>).</span>
                </div>
                <div className="contrast-item">
                  <span>•</span>
                  <span>Generates convincing hallucinations with zero inspectable evidence.</span>
                </div>
              </div>
            </div>

            <div className="contrast-col good">
              <div className="contrast-header">
                <span style={{ color: "#16a34a" }}>✓</span>
                <span>Eillish Knowledge Operating System</span>
              </div>
              <div className="contrast-list">
                <div className="contrast-item">
                  <span>•</span>
                  <span>Tree-sitter AST preserves complete functions, classes, and markdown blocks.</span>
                </div>
                <div className="contrast-item">
                  <span>•</span>
                  <span>Captures parent scopes, file paths, and cross-repo dependency trees.</span>
                </div>
                <div className="contrast-item">
                  <span>•</span>
                  <span>Hybrid retrieval combines pgvector embeddings with exact BM25 keyword matching.</span>
                </div>
                <div className="contrast-item">
                  <span>•</span>
                  <span>Every assertion includes verifiable line numbers and git diff links.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {
    /* ==========================================================================
       Section 6: Knowledge Visualization (Mental Model Hierarchy)
       ========================================================================== */
  }
        <section className="landing-section">
          <div className="section-header-block">
            <div className="section-eyebrow">
              <span>Mental Model</span>
            </div>
            <h2 className="section-shouting-title">How Your Codebase Becomes A Knowledge Graph.</h2>
            <p className="section-desc-text">
              Click through the transformation layers below to see how raw repository files are mapped into verifiable
              answers.
            </p>
          </div>

          <div className="mental-model-container">
            <div className="mental-model-steps">
              {mentalModelNodes.map((node, idx) => <div
    key={node.tag}
    className={`mental-model-node ${activeModelStep === idx ? "active" : ""}`}
    onClick={() => setActiveModelStep(idx)}
  >
                  <span className="model-node-tag">{node.tag}</span>
                  <span className="model-node-name">{node.name}</span>
                </div>)}
            </div>

            <div className="mental-model-example-box">
              <div className="model-example-label">
                Transformation Stage: {mentalModelNodes[activeModelStep].name}
              </div>
              <div className="model-example-content">
                {mentalModelNodes[activeModelStep].detail}
              </div>
            </div>
          </div>
        </section>

        {
    /* ==========================================================================
       Section 7: Interactive RAG + Verifiable Citations Demo
       ========================================================================== */
  }
        <section className="landing-section">
          <div className="section-header-block">
            <div className="section-eyebrow">
              <span>Interactive Demonstration</span>
            </div>
            <h2 className="section-shouting-title">AI Reasoning With Verifiable Evidence.</h2>
            <p className="section-desc-text">
              Notice the visual distinction below: on the left is the synthesized reasoning; on the right is the
              verifiable source evidence. Click any citation to inspect the underlying source code.
            </p>
          </div>

          <div className="evidence-demo-layout">
            {
    /* Left Card: Synthesized Answer */
  }
            <div className="evidence-side-card">
              <div className="flex items-center justify-between">
                <span className="evidence-badge-tag" style={{ background: "var(--color-sunbeam-yellow)" }}>
                  Synthesized Answer
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)" }}>
                  Latency: 184ms · Model: Hybrid-v1
                </span>
              </div>

              <div className="evidence-question-box">
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)" }}>
                  ENGINEER QUERY:
                </span>
                <div style={{ fontFamily: "var(--font-alfa-slab-one)", fontSize: "16px" }}>
                  "{currentQuestion}"
                </div>
              </div>

              <div className="evidence-answer-content">
                <p>
                  Authentication in Eillish is implemented through asymmetric JWT (JSON Web Tokens) with RS256 signature
                  verification{" "}
                  <button
    className="evidence-citation-ref"
    onClick={() => setActiveCitationIndex(0)}
    title="Inspect citation 1"
  >
                    [1]
                  </button>
                  .
                </p>
                <p>
                  Incoming HTTP requests pass through the <code>verify_jwt_token</code> middleware, which extracts the
                  Bearer token, validates it against the cluster public key, and attaches the payload to the request
                  state{" "}
                  <button
    className="evidence-citation-ref"
    onClick={() => setActiveCitationIndex(1)}
    title="Inspect citation 2"
  >
                    [2]
                  </button>
                  .
                </p>
                <p>
                  Access tokens have a strict 15-minute lifespan to minimize the attack surface, backed by HTTP-only
                  refresh cookies stored in Redis{" "}
                  <button
    className="evidence-citation-ref"
    onClick={() => setActiveCitationIndex(2)}
    title="Inspect citation 3"
  >
                    [3]
                  </button>
                  .
                </p>
              </div>

              <div
    style={{
      display: "flex",
      gap: "8px",
      flexWrap: "wrap",
      marginTop: "auto",
      paddingTop: "16px",
      borderTop: "1px solid #e0e0e0"
    }}
  >
                <span style={{ fontSize: "12px", fontFamily: "var(--font-manrope)", fontWeight: 700 }}>
                  Sample Queries:
                </span>
                {sampleQuestions.map((q) => <button
    key={q}
    onClick={() => setCurrentQuestion(q)}
    style={{
      fontSize: "11.5px",
      fontFamily: "var(--font-mono)",
      background: currentQuestion === q ? "var(--color-mint-wash)" : "var(--color-snow)",
      border: "1px solid var(--color-charcoal-ink)",
      borderRadius: "var(--radius-full)",
      padding: "3px 10px",
      cursor: "pointer"
    }}
  >
                    {q}
                  </button>)}
              </div>
            </div>

            {
    /* Right Card: Source Evidence Stack */
  }
            <div className="evidence-side-card">
              <div className="flex items-center justify-between">
                <span className="evidence-badge-tag" style={{ background: "var(--color-mint-wash)" }}>
                  Grounded Source Evidence
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)" }}>
                  3 Citations Verified
                </span>
              </div>

              <div className="evidence-sources-stack">
                {citations.map((cit, idx) => <div
    key={cit.path}
    className={`evidence-source-item ${activeCitationIndex === idx ? "active" : ""}`}
    onClick={() => setActiveCitationIndex(idx)}
  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {cit.type === "code" ? <FileCode size={14} /> : <FileText size={14} />}
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: 700 }}>
                          [{idx + 1}] {cit.path}
                        </span>
                      </div>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 700 }}>
                        {cit.lines}
                      </span>
                    </div>
                  </div>)}
              </div>

              {
    /* Active Citation Code Reveal */
  }
              <div className="evidence-code-reveal">
                <div className="flex items-center justify-between mb-2">
                  <span style={{ fontWeight: 700, color: "var(--color-sunbeam-yellow)" }}>
                    {citations[activeCitationIndex].path} ({citations[activeCitationIndex].lines})
                  </span>
                  <button
    onClick={() => handleCopy(citations[activeCitationIndex].code)}
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      fontSize: "11px",
      background: "rgba(255,255,255,0.1)",
      border: "1px solid #444",
      borderRadius: "6px",
      padding: "2px 8px",
      color: "#fff",
      cursor: "pointer"
    }}
  >
                    {copiedCode ? <Check size={12} color="#16a34a" /> : <Copy size={12} />}
                    <span>{copiedCode ? "Copied" : "Copy"}</span>
                  </button>
                </div>
                <pre style={{ margin: 0, overflowX: "auto" }}>
                  <code>{citations[activeCitationIndex].code}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {
    /* ==========================================================================
       Section 8: GitHub Ingestion Flow (6-Step Timeline)
       ========================================================================== */
  }
        <section className="landing-section">
          <div className="section-header-block">
            <div className="section-eyebrow">
              <span>Zero Configuration Ingestion</span>
            </div>
            <h2 className="section-shouting-title">Connect In Seconds. Search Forever.</h2>
            <p className="section-desc-text">
              Eillish integrates directly into your existing development lifecycle. No migrations, no complex manual tagging.
            </p>
          </div>

          <div className="ingestion-timeline-grid">
            <div className="ingestion-step-card">
              <div className="ingestion-step-header">
                <span className="ingestion-badge" style={{ background: "var(--color-sunbeam-yellow)" }}>STEP 01</span>
                <GitBranch size={16} />
              </div>
              <h3 className="ingestion-title">Connect GitHub</h3>
              <p className="ingestion-desc">
                Authorize via GitHub App or personal token. Eillish requests strict read-only permissions on code and metadata.
              </p>
            </div>

            <div className="ingestion-step-card">
              <div className="ingestion-step-header">
                <span className="ingestion-badge" style={{ background: "var(--color-mint-wash)" }}>STEP 02</span>
                <FolderGit2 size={16} />
              </div>
              <h3 className="ingestion-title">Choose Repositories</h3>
              <p className="ingestion-desc">
                Select repositories and branches to track. Set exclusion paths (e.g. <code>vendor/</code>, <code>node_modules/</code>).
              </p>
            </div>

            <div className="ingestion-step-card">
              <div className="ingestion-step-header">
                <span className="ingestion-badge" style={{ background: "var(--color-powder-blue)" }}>STEP 03</span>
                <Code2 size={16} />
              </div>
              <h3 className="ingestion-title">Tree-Sitter Parsing</h3>
              <p className="ingestion-desc">
                Eillish traverses the tree and parses AST boundaries for TypeScript, Python, Go, Rust, and Markdown documents.
              </p>
            </div>

            <div className="ingestion-step-card">
              <div className="ingestion-step-header">
                <span className="ingestion-badge" style={{ background: "#e69dff" }}>STEP 04</span>
                <Database size={16} />
              </div>
              <h3 className="ingestion-title">Hybrid Vector Storage</h3>
              <p className="ingestion-desc">
                Embeddings are inserted into PostgreSQL pgvector IVFFlat indices alongside BM25 tsvector lexicons.
              </p>
            </div>

            <div className="ingestion-step-card">
              <div className="ingestion-step-header">
                <span className="ingestion-badge" style={{ background: "var(--color-ember-orange)" }}>STEP 05</span>
                <Activity size={16} />
              </div>
              <h3 className="ingestion-title">Continuous Commit Sync</h3>
              <p className="ingestion-desc">
                Webhooks trigger differential re-indexing on every merged pull request so your knowledge graph is never stale.
              </p>
            </div>

            <div className="ingestion-step-card">
              <div className="ingestion-step-header">
                <span className="ingestion-badge" style={{ background: "var(--color-sunbeam-yellow)" }}>STEP 06</span>
                <Sparkles size={16} />
              </div>
              <h3 className="ingestion-title">Ready For Questions</h3>
              <p className="ingestion-desc">
                Ask natural language queries via web app, CLI tool, or IDE command palette with verifiable source evidence.
              </p>
            </div>
          </div>
        </section>

        {
    /* ==========================================================================
       Section 9: Who Eillish Is For (4 Use Cases)
       ========================================================================== */
  }
        <section className="landing-section">
          <div className="section-header-block">
            <div className="section-eyebrow">
              <span>Target Practitioners</span>
            </div>
            <h2 className="section-shouting-title">Built For Knowledge-Heavy Workflows.</h2>
            <p className="section-desc-text">
              Eillish is designed for people who write, maintain, and reason over dense technical information.
            </p>
          </div>

          <div className="personas-grid">
            <div className="persona-card">
              <span className="persona-badge" style={{ background: "var(--color-sunbeam-yellow)" }}>DEVELOPERS & ENGINEERS</span>
              <h3 className="persona-title">Software Engineers</h3>
              <div className="persona-quote">
                "Stop rewriting functions you already wrote six months ago."
              </div>
              <div className="persona-bullets">
                <div>• Search across 20+ codebases for utility patterns, auth middleware, and schemas.</div>
                <div>• Trace how external API changes affect downstream microservices.</div>
                <div>• Instant code answers with clickable file and line citations.</div>
              </div>
            </div>

            <div className="persona-card">
              <span className="persona-badge" style={{ background: "var(--color-mint-wash)" }}>LEADS & ARCHITECTS</span>
              <h3 className="persona-title">Technical Leads & Architects</h3>
              <div className="persona-quote">
                "Cut developer onboarding from weeks to a single afternoon."
              </div>
              <div className="persona-bullets">
                <div>• Enable new hires to ask architectural questions with zero team interruption.</div>
                <div>• Audit documentation drift against actual production git commits.</div>
                <div>• Map cross-service dependencies and identify deprecated patterns.</div>
              </div>
            </div>

            <div className="persona-card">
              <span className="persona-badge" style={{ background: "var(--color-powder-blue)" }}>RESEARCHERS & SCIENTISTS</span>
              <h3 className="persona-title">Researchers & Academics</h3>
              <div className="persona-quote">
                "Connect research papers, code experiments, and markdown notes."
              </div>
              <div className="persona-bullets">
                <div>• Unify disparate LaTeX writeups, Jupyter notebooks, and methodology notes.</div>
                <div>• Pinpoint mathematical formulas and algorithm implementations across repos.</div>
                <div>• Verifiable citation audit trails for scientific literature reviews.</div>
              </div>
            </div>

            <div className="persona-card">
              <span className="persona-badge" style={{ background: "#e69dff" }}>STUDENTS & LEARNERS</span>
              <h3 className="persona-title">Students & Lifelong Learners</h3>
              <div className="persona-quote">
                "Build a durable personal brain that compounds over your entire career."
              </div>
              <div className="persona-bullets">
                <div>• Aggregate course assignments, textbook notes, and personal projects.</div>
                <div>• Ask questions to synthesize complex computer science concepts.</div>
                <div>• Retain every project you built so you can reference it on future jobs.</div>
              </div>
            </div>
          </div>
        </section>

        {
    /* ==========================================================================
       Section 10: Product Interface Previews (Interactive Tabbed Showcase)
       ========================================================================== */
  }
        <section className="landing-section">
          <div className="section-header-block">
            <div className="section-eyebrow">
              <span>Workspaces Gateway</span>
            </div>
            <h2 className="section-shouting-title">Explore Your Operating System.</h2>
            <p className="section-desc-text">
              Every workspace is built with high information density, tactile physical borders, and instant keyboard navigation.
            </p>
          </div>

          <div className="workspace-tabs-container">
            <div className="workspace-tabs-header">
              <button
    className={`workspace-tab-btn ${activeWorkspaceTab === "knowledge" ? "active" : ""}`}
    onClick={() => setActiveWorkspaceTab("knowledge")}
  >
                <BookOpen size={14} />
                <span>Knowledge Explorer</span>
              </button>
              <button
    className={`workspace-tab-btn ${activeWorkspaceTab === "search" ? "active" : ""}`}
    onClick={() => setActiveWorkspaceTab("search")}
  >
                <Search size={14} />
                <span>Ask Your Knowledge</span>
              </button>
              <button
    className={`workspace-tab-btn ${activeWorkspaceTab === "repositories" ? "active" : ""}`}
    onClick={() => setActiveWorkspaceTab("repositories")}
  >
                <FolderGit2 size={14} />
                <span>Repositories</span>
              </button>
              <button
    className={`workspace-tab-btn ${activeWorkspaceTab === "analytics" ? "active" : ""}`}
    onClick={() => setActiveWorkspaceTab("analytics")}
  >
                <BarChart3 size={14} />
                <span>RAG Telemetry</span>
              </button>
            </div>

            {
    /* Tab 1: Knowledge Explorer Preview */
  }
            {activeWorkspaceTab === "knowledge" && <div className="workspace-preview-card">
                <div className="preview-card-top">
                  <div>
                    <h3 style={{ fontFamily: "var(--font-alfa-slab-one)", fontSize: "18px", margin: 0 }}>
                      Knowledge Explorer Workspace
                    </h3>
                    <p style={{ fontFamily: "var(--font-manrope)", fontSize: "13px", margin: "4px 0 0", color: "var(--text-muted)" }}>
                      Inspect 1,284 indexed documents, AST chunk boundaries, and vector representations.
                    </p>
                  </div>
                  <Link to="/knowledge" className="preview-launch-btn">
                    <span>Open Knowledge Explorer</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
                <div className="preview-mock-ui">
                  <div className="flex items-center justify-between" style={{ borderBottom: "1px solid #eee", paddingBottom: "8px" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: 800 }}>
                      FILE: backend/core/security.py
                    </span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", background: "var(--color-mint-wash)", padding: "2px 8px", borderRadius: "10px" }}>
                      AST Parsed · 6 Chunks
                    </span>
                  </div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "#444" }}>
                    <div>• Chunk 01: class SecurityConfig (Lines 1–18)</div>
                    <div>• Chunk 02: def verify_jwt_token(request: Request) (Lines 42–54) [Score: 0.942]</div>
                    <div>• Chunk 03: def create_access_token(user_id: str) (Lines 60–75)</div>
                  </div>
                </div>
              </div>}

            {
    /* Tab 2: Ask Your Knowledge Preview */
  }
            {activeWorkspaceTab === "search" && <div className="workspace-preview-card">
                <div className="preview-card-top">
                  <div>
                    <h3 style={{ fontFamily: "var(--font-alfa-slab-one)", fontSize: "18px", margin: 0 }}>
                      AI Query & Search Workspace
                    </h3>
                    <p style={{ fontFamily: "var(--font-manrope)", fontSize: "13px", margin: "4px 0 0", color: "var(--text-muted)" }}>
                      Ask natural language questions across all repositories with line-level citations.
                    </p>
                  </div>
                  <Link to="/search" className="preview-launch-btn">
                    <span>Open AI Search</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
                <div className="preview-mock-ui">
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "12.5px", fontWeight: 700 }}>
                    Q: "How are refresh tokens rotated during session revalidation?"
                  </div>
                  <div style={{ fontFamily: "var(--font-manrope)", fontSize: "13px", color: "#333" }}>
                    A: Refresh tokens are validated via <code>auth.service.ts</code> and immediately invalidated in Redis upon receipt of a new refresh token request...
                  </div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#666" }}>
                    Evidence: [1] auth.service.ts#L88-L104 · [2] redis_store.py#L32-L40
                  </div>
                </div>
              </div>}

            {
    /* Tab 3: Repositories Preview */
  }
            {activeWorkspaceTab === "repositories" && <div className="workspace-preview-card">
                <div className="preview-card-top">
                  <div>
                    <h3 style={{ fontFamily: "var(--font-alfa-slab-one)", fontSize: "18px", margin: 0 }}>
                      Connected Repositories Workspace
                    </h3>
                    <p style={{ fontFamily: "var(--font-manrope)", fontSize: "13px", margin: "4px 0 0", color: "var(--text-muted)" }}>
                      Manage 12 active codebases with branch mapping, file counts, and delta sync triggers.
                    </p>
                  </div>
                  <Link to="/repositories" className="preview-launch-btn">
                    <span>Open Repositories</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
                <div className="preview-mock-ui">
                  <div className="flex items-center justify-between">
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: 800 }}>Eillish-Core (main)</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#16a34a" }}>● 100% Synced</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: 800 }}>Eillish-Docs (production)</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#16a34a" }}>● 100% Synced</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: 800 }}>API-Gateway (v2.4)</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--color-ember-orange)" }}>● Syncing delta...</span>
                  </div>
                </div>
              </div>}

            {
    /* Tab 4: Telemetry Preview */
  }
            {activeWorkspaceTab === "analytics" && <div className="workspace-preview-card">
                <div className="preview-card-top">
                  <div>
                    <h3 style={{ fontFamily: "var(--font-alfa-slab-one)", fontSize: "18px", margin: 0 }}>
                      Telemetry & RAG Analytics Workspace
                    </h3>
                    <p style={{ fontFamily: "var(--font-manrope)", fontSize: "13px", margin: "4px 0 0", color: "var(--text-muted)" }}>
                      Inspect retrieval latencies, chunk hit rates, cosine similarity distributions, and index trends.
                    </p>
                  </div>
                  <Link to="/analytics" className="preview-launch-btn">
                    <span>Open Telemetry</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
                <div className="preview-mock-ui">
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", textAlign: "center" }}>
                    <div>
                      <div style={{ fontFamily: "var(--font-alfa-slab-one)", fontSize: "20px" }}>142ms</div>
                      <div style={{ fontFamily: "var(--font-manrope)", fontSize: "11px", color: "#666" }}>P99 Latency</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: "var(--font-alfa-slab-one)", fontSize: "20px" }}>94.2%</div>
                      <div style={{ fontFamily: "var(--font-manrope)", fontSize: "11px", color: "#666" }}>AST Chunk Hit Rate</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: "var(--font-alfa-slab-one)", fontSize: "20px" }}>0.912</div>
                      <div style={{ fontFamily: "var(--font-manrope)", fontSize: "11px", color: "#666" }}>Mean Cosine Score</div>
                    </div>
                  </div>
                </div>
              </div>}
          </div>
        </section>

        {
    /* ==========================================================================
       Section 11: Trust, Security & Isolation
       ========================================================================== */
  }
        <section className="landing-section">
          <div className="section-header-block">
            <div className="section-eyebrow">
              <span>Security & Governance</span>
            </div>
            <h2 className="section-shouting-title">Your Knowledge Is Yours Alone.</h2>
            <p className="section-desc-text">
              We operate under explicit technical security boundaries, not vague marketing promises.
            </p>
          </div>

          <div className="trust-grid">
            <div className="trust-card">
              <div className="trust-card-top">
                <span className="trust-badge" style={{ background: "var(--color-sunbeam-yellow)" }}>ZERO DATA TRAINING</span>
                <ShieldCheck size={18} />
              </div>
              <h3 className="trust-card-title">Never Used For AI Training</h3>
              <p className="trust-card-desc">
                Your code, documents, and notes are never used to train third-party or foundation models. Vector embeddings
                are stored in your private database partition.
              </p>
            </div>

            <div className="trust-card">
              <div className="trust-card-top">
                <span className="trust-badge" style={{ background: "var(--color-mint-wash)" }}>MULTI-TENANT ISOLATION</span>
                <Lock size={18} />
              </div>
              <h3 className="trust-card-title">Strict Tenancy Boundaries</h3>
              <p className="trust-card-desc">
                Every organization and workspace runs with isolated schema partitions. Cross-tenant retrieval is
                cryptographically and architecturally impossible.
              </p>
            </div>

            <div className="trust-card">
              <div className="trust-card-top">
                <span className="trust-badge" style={{ background: "var(--color-powder-blue)" }}>READ-ONLY ACCESS</span>
                <GitBranch size={18} />
              </div>
              <h3 className="trust-card-title">Read-Only Code Permissions</h3>
              <p className="trust-card-desc">
                Eillish connects via read-only GitHub permissions. It never pushes commits, modifies branches, or closes
                pull requests without your explicit authorization.
              </p>
            </div>

            <div className="trust-card">
              <div className="trust-card-top">
                <span className="trust-badge" style={{ background: "#e69dff" }}>SELF-HOSTABLE</span>
                <Server size={18} />
              </div>
              <h3 className="trust-card-title">Deploy On Your Infrastructure</h3>
              <p className="trust-card-desc">
                Self-host the complete Eillish stack via Docker Compose with local Ollama embeddings and private PostgreSQL
                pgvector instances behind your VPC.
              </p>
            </div>
          </div>
        </section>

        {
    /* ==========================================================================
       Section 12: Final Call To Action & Repository Dispatch
       ========================================================================== */
  }
        <section className="landing-section" id="contact">
          <div className="final-cta-card">
            <h2 className="final-cta-title">
              Your knowledge already exists. Eillish helps you understand it.
            </h2>
            <p className="final-cta-desc">
              Stop losing hours searching through old commits, abandoned branches, and disjointed markdown files.
              Connect your first repository in under two minutes.
            </p>
            <div className="final-cta-actions">
              <Link to="/auth/signup" className="hero-btn-primary">
                <span>Start Building With Eillish</span>
                <ArrowRight size={15} />
              </Link>
              <Link to="/docs" className="hero-btn-secondary">
                <span>Read Architecture Docs</span>
                <BookOpen size={15} />
              </Link>
            </div>

            {
    /* Ingestion Access Request Form */
  }
            <div
    style={{
      width: "100%",
      maxWidth: "540px",
      marginTop: "20px",
      padding: "24px",
      background: "var(--color-peach-paper)",
      border: "2px solid var(--color-charcoal-ink)",
      borderRadius: "20px",
      textAlign: "left"
    }}
  >
              <h3 style={{ fontFamily: "var(--font-alfa-slab-one)", fontSize: "16px", margin: "0 0 8px" }}>
                Request Repository Ingestion Access
              </h3>
              {contactSubmitted ? <div
    style={{
      padding: "12px 16px",
      background: "var(--color-mint-wash)",
      border: "1.5px solid #000000",
      borderRadius: "12px",
      fontFamily: "var(--font-manrope)",
      fontSize: "13px",
      fontWeight: 700
    }}
  >
                  ✓ Dispatch received. Our engineering team will provide repository ingestion credentials to{" "}
                  <code>{contactEmail}</code>.
                </div> : <form
    onSubmit={handleContactSubmit}
    style={{ display: "flex", flexDirection: "column", gap: "10px" }}
  >
                  <input
    type="email"
    className="contact-pill-input"
    placeholder="engineer@company.com"
    required
    value={contactEmail}
    onChange={(e) => setContactEmail(e.target.value)}
    style={{
      width: "100%",
      padding: "10px 16px",
      background: "#ffffff",
      border: "2px solid var(--color-charcoal-ink)",
      borderRadius: "var(--radius-buttons)",
      fontFamily: "var(--font-manrope)",
      fontSize: "13px"
    }}
  />
                  <button
    type="submit"
    className="contact-pill-submit"
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      padding: "10px 20px",
      background: "var(--color-ember-orange)",
      border: "2px solid var(--color-charcoal-ink)",
      borderRadius: "var(--radius-buttons)",
      fontFamily: "var(--font-manrope)",
      fontSize: "13px",
      fontWeight: 800,
      cursor: "pointer"
    }}
  >
                    <span>Request Repository Ingestion</span>
                    <Send size={13} />
                  </button>
                </form>}
            </div>
          </div>
        </section>
      </main>

      {
    /* ==========================================================================
       Section 13: Structured Footer
       ========================================================================== */
  }
      <footer className="landing-footer">
        <div className="landing-footer-box">
          <div className="footer-top-grid">
            <div className="footer-brand-column">
              <h3 className="footer-brand-title">EILLISH</h3>
              <p className="footer-brand-desc">
                Your knowledge, understood. An AI-powered personal knowledge operating system that turns notes, docs,
                and code into a structured, searchable knowledge layer with verifiable line-level citations.
              </p>
            </div>

            <div className="footer-links-group">
              <div className="footer-col">
                <span className="footer-col-header">Workspaces</span>
                <Link to="/knowledge" className="footer-col-link">Knowledge Explorer</Link>
                <Link to="/search" className="footer-col-link">AI Query Search</Link>
                <Link to="/repositories" className="footer-col-link">Repositories</Link>
                <Link to="/dashboard" className="footer-col-link">System Dashboard</Link>
              </div>

              <div className="footer-col">
                <span className="footer-col-header">System</span>
                <Link to="/auth/login" className="footer-col-link">Sign In to Workspace</Link>
                <Link to="/activity" className="footer-col-link">Activity Feed</Link>
                <Link to="/analytics" className="footer-col-link">RAG Analytics</Link>
                <Link to="/settings" className="footer-col-link">Settings</Link>
              </div>

              <div className="footer-col">
                <span className="footer-col-header">Documentation</span>
                <Link to="/how-it-works" className="footer-col-link">How It Works</Link>
                <Link to="/features" className="footer-col-link">Features</Link>
                <Link to="/about" className="footer-col-link">About Eillish</Link>
                <Link to="/docs" className="footer-col-link">Architecture Docs</Link>
                <Link to="/changelog" className="footer-col-link">Changelog</Link>
              </div>

              <div className="footer-col">
                <span className="footer-col-header">Legal & Trust</span>
                <Link to="/security" className="footer-col-link">Security Model</Link>
                <Link to="/privacy" className="footer-col-link">Privacy Policy</Link>
                <Link to="/terms" className="footer-col-link">Terms of Service</Link>
              </div>
            </div>
          </div>

          <div className="footer-bottom-strip">
            <span>© 2026 Eillish — Your knowledge, understood. All rights reserved.</span>
            <div className="footer-status-pill">
              <span className="status-dot-circle" />
              <span>Neural Pipeline Operational · 94.2% Synced</span>
            </div>
          </div>
        </div>
      </footer>
    </div>;
};
export {
  LandingPage
};
