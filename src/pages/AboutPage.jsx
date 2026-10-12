import { StaticPageLayout } from "../components/layout/StaticPageLayout";
import { Shield, BookOpen, Layers, Terminal, ArrowRight } from "lucide-react";
import { Button } from "../components/common/Button";
import { useNavigate } from "react-router-dom";
const AboutPage = () => {
  const navigate = useNavigate();
  return <StaticPageLayout
    title="About Eillish."
    subtitle="The personal knowledge layer designed for engineering teams that value verifiable source evidence over artificial hype."
    badge="Philosophy & Principles"
  >
      <div className="static-content-card">
        <div className="static-prose">
          <h2>The Problem with Modern Engineering Knowledge</h2>
          <p>
            Software teams spend up to 20% of their working hours hunting for information they already wrote.
            Code lives in 15 separate repositories, architecture decisions sit in forgotten Notion pages, and critical
            workarounds are buried in commit messages from two years ago.
          </p>
          <p>
            When engineers turn to standard AI tools, they run into a dangerous trap: answers that sound confident but
            cannot be verified. An answer without the exact file path and line numbers is not knowledge—it is a guess.
          </p>

          <h2>What Eillish Actually Is</h2>
          <p>
            Eillish is an AI-powered personal knowledge operating system. It ingests your engineering notes, markdown
            documentation, and source code repositories, parsing them through real Abstract Syntax Trees (ASTs) rather than
            arbitrary text chunking.
          </p>
          <p>
            The result is a unified, living knowledge layer. You can ask architectural questions across multi-repo codebases,
            explore cross-repo dependencies, and receive precise reasoning with verifiable line-level citations attached to
            every statement.
          </p>

          <h2>Core Engineering Principles</h2>
          <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "16px",
      margin: "24px 0"
    }}
  >
            <div
    style={{
      background: "var(--color-peach-paper)",
      border: "2px solid var(--color-charcoal-ink)",
      borderRadius: "24px",
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      gap: "10px"
    }}
  >
              <div className="flex items-center gap-2">
                <Shield size={18} />
                <h3 style={{ margin: 0, fontSize: "16px" }}>Evidence Over Hallucination</h3>
              </div>
              <p style={{ margin: 0, fontSize: "13.5px", lineHeight: 1.55 }}>
                If Eillish cannot trace an answer directly to an indexed line in your codebase, it tells you clearly. We
                refuse to generate fabricated code advice.
              </p>
            </div>

            <div
    style={{
      background: "var(--color-mint-wash)",
      border: "2px solid var(--color-charcoal-ink)",
      borderRadius: "24px",
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      gap: "10px"
    }}
  >
              <div className="flex items-center gap-2">
                <Layers size={18} />
                <h3 style={{ margin: 0, fontSize: "16px" }}>Boundary-Preserving ASTs</h3>
              </div>
              <p style={{ margin: 0, fontSize: "13.5px", lineHeight: 1.55 }}>
                We do not chop code into arbitrary token windows. Functions, classes, and markdown sections are indexed as
                coherent, compilable semantic units.
              </p>
            </div>

            <div
    style={{
      background: "var(--color-sunbeam-yellow)",
      border: "2px solid var(--color-charcoal-ink)",
      borderRadius: "24px",
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      gap: "10px"
    }}
  >
              <div className="flex items-center gap-2">
                <BookOpen size={18} />
                <h3 style={{ margin: 0, fontSize: "16px" }}>The Knowledge Layer is the Product</h3>
              </div>
              <p style={{ margin: 0, fontSize: "13.5px", lineHeight: 1.55 }}>
                AI models come and go. Your structured knowledge graph, index schemas, and document connections remain your
                permanent intellectual asset.
              </p>
            </div>

            <div
    style={{
      background: "var(--color-powder-blue)",
      border: "2px solid var(--color-charcoal-ink)",
      borderRadius: "24px",
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      gap: "10px"
    }}
  >
              <div className="flex items-center gap-2">
                <Terminal size={18} />
                <h3 style={{ margin: 0, fontSize: "16px" }}>Tactile & Transparent</h3>
              </div>
              <p style={{ margin: 0, fontSize: "13.5px", lineHeight: 1.55 }}>
                Our design system, Lpalo, reflects our philosophy: honest 2px solid outlines, warm paper surfaces, and zero
                decorative smoke and mirrors.
              </p>
            </div>
          </div>

          <h2>Security & Privacy First</h2>
          <p>
            Your code and documentation never leave your authorized boundaries for training purposes. The vector embeddings
            and indices are stored in self-hosted or dedicated pgvector instances with end-to-end encryption.
          </p>
        </div>

        <div
    style={{
      marginTop: "20px",
      paddingTop: "20px",
      borderTop: "2px solid var(--color-charcoal-ink)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "16px"
    }}
  >
          <span style={{ fontFamily: "var(--font-manrope)", fontSize: "14px", fontWeight: 700 }}>
            Curious to see Eillish in action?
          </span>
          <Button
    variant="primary"
    size="md"
    icon={<ArrowRight size={14} />}
    onClick={() => navigate("/knowledge")}
  >
            Explore Knowledge Base
          </Button>
        </div>
      </div>
    </StaticPageLayout>;
};
export {
  AboutPage
};
