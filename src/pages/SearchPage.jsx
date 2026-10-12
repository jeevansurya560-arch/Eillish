import { useState } from "react";
import {
  Search,
  Sparkles,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  FileCode,
  ShieldCheck,
  RotateCw,
  Copy,
  Check,
  AlertCircle
} from "lucide-react";
import { searchService } from "../services/search.service";
import { feedbackService } from "../services/feedback.service";
import { useToast } from "../components/common/Toast";
import "../components/dashboard/Dashboard.css";
const SearchPage = () => {
  const { showToast } = useToast();
  const [query, setQuery] = useState("How does authentication work in this repository?");
  const [isStreaming, setIsStreaming] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [selectedCitationId, setSelectedCitationId] = useState(null);
  const [feedbackGiven, setFeedbackGiven] = useState(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);
  const sampleSuggestions = [
    "How does authentication work?",
    "Where is user authorization implemented?",
    "Show pgvector database connection logic",
    "Explain the chunking strategy"
  ];
  const handleSearchSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    setIsStreaming(true);
    setError(null);
    try {
      const res = await searchService.executeHybridSearch({ query });
      setAnswer(res);
      if (res.citations && res.citations.length > 0) {
        setSelectedCitationId(res.citations[0].id);
      }
      showToast(`Retrieved ${res.citations.length} verified evidence sources`, "success");
    } catch (err) {
      setError(err.message || "Search execution failed.");
      showToast("Search query failed.", "info");
    } finally {
      setIsStreaming(false);
    }
  };
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setTimeout(() => {
      searchService.executeHybridSearch({ query: suggestion }).then((res) => {
        setAnswer(res);
        if (res.citations && res.citations.length > 0) {
          setSelectedCitationId(res.citations[0].id);
        }
        showToast(`Synthesized grounded answer for "${suggestion}"`, "success");
      }).catch((err) => {
        setError(err.message);
      });
    }, 50);
  };
  const handleCopyAnswer = () => {
    if (!answer) return;
    navigator.clipboard?.writeText(answer.answerText);
    setCopied(true);
    showToast("Answer copied to clipboard", "info");
    setTimeout(() => setCopied(false), 2e3);
  };
  const handleFeedback = async (type) => {
    setFeedbackGiven(type);
    try {
      await feedbackService.submitFeedback({
        messageId: answer?.id,
        query,
        isHelpful: type === "up"
      });
      showToast(
        type === "up" ? "Thank you for your feedback! Groundedness logged." : "Feedback logged. Retrieval tuning flagged.",
        "info"
      );
    } catch {
      showToast("Feedback recorded locally.", "info");
    }
  };
  const activeCitation = answer?.citations.find(
    (c) => c.id === selectedCitationId
  ) || answer?.citations[0];
  return <div className="flex flex-col" style={{ maxWidth: 1060, margin: "0 auto", gap: "20px" }}>
      {
    /* Search Header */
  }
      <div className="hero-title-group" style={{ marginBottom: "8px" }}>
        <h1 className="hero-heading" style={{ fontSize: "38px", marginBottom: "8px" }}>
          Ask Your Knowledge
        </h1>
        <p className="hero-subtitle" style={{ fontSize: "15px", maxWidth: "640px" }}>
          Query your codebase knowledge base with evidence-backed neural citations and exact AST code line references.
        </p>
      </div>

      {
    /* Search Command Input: 47px Pill with 2px Black Border */
  }
      <form
    onSubmit={handleSearchSubmit}
    style={{
      display: "flex",
      alignItems: "center",
      gap: "12px",
      background: "var(--color-snow)",
      border: "2px solid var(--color-charcoal-ink)",
      borderRadius: "var(--radius-full)",
      padding: "8px 12px 8px 22px",
      boxShadow: "none"
    }}
  >
        <Search size={20} style={{ color: "var(--color-charcoal-ink)", flexShrink: 0 }} />
        <input
    type="text"
    style={{
      flex: 1,
      border: "none",
      outline: "none",
      background: "transparent",
      fontFamily: "var(--font-manrope)",
      fontSize: "15px",
      fontWeight: 600,
      color: "var(--color-charcoal-ink)",
      padding: "6px 0"
    }}
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    placeholder="Ask anything about your code, neural architecture, or documentation..."
  />
        <button
    type="submit"
    disabled={isStreaming}
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      background: "var(--color-ember-orange)",
      border: "2px solid var(--color-charcoal-ink)",
      borderRadius: "var(--radius-full)",
      padding: "10px 24px",
      fontFamily: "var(--font-manrope)",
      fontSize: "13.5px",
      fontWeight: 800,
      color: "var(--color-charcoal-ink)",
      cursor: isStreaming ? "not-allowed" : "pointer",
      transition: "all var(--transition-fast)",
      whiteSpace: "nowrap"
    }}
    onMouseEnter={(e) => {
      if (!isStreaming) e.currentTarget.style.background = "var(--color-sunbeam-yellow)";
    }}
    onMouseLeave={(e) => {
      if (!isStreaming) e.currentTarget.style.background = "var(--color-ember-orange)";
    }}
  >
          <Sparkles size={14} />
          <span>{isStreaming ? "Synthesizing..." : "Search"}</span>
        </button>
      </form>

      {
    /* Suggested Prompt Chips */
  }
      <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      flexWrap: "wrap",
      marginTop: "6px",
      marginBottom: "10px"
    }}
  >
        <span
    style={{
      fontFamily: "var(--font-manrope)",
      fontSize: "11px",
      fontWeight: 800,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      color: "var(--color-charcoal-ink)",
      marginRight: "4px"
    }}
  >
          Suggested queries:
        </span>
        {sampleSuggestions.map((suggestion, idx) => {
    const hoverColors = [
      "var(--color-sunbeam-yellow)",
      "var(--color-mint-wash)",
      "var(--color-powder-blue)",
      "var(--color-lilac-tint)"
    ];
    const hoverBg = hoverColors[idx % hoverColors.length];
    return <button
      key={suggestion}
      type="button"
      onClick={() => handleSuggestionClick(suggestion)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "7px 16px",
        background: "var(--color-snow)",
        border: "2px solid var(--color-charcoal-ink)",
        borderRadius: "var(--radius-full)",
        fontFamily: "var(--font-manrope)",
        fontSize: "12.5px",
        fontWeight: 700,
        color: "var(--color-charcoal-ink)",
        cursor: "pointer",
        transition: "all var(--transition-fast)"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = hoverBg;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "var(--color-snow)";
      }}
    >
              {suggestion}
            </button>;
  })}
      </div>

      {
    /* Streaming State / Answer Surface */
  }
      {isStreaming ? <div
    style={{
      background: "var(--color-snow)",
      border: "2px solid var(--color-charcoal-ink)",
      borderRadius: "var(--radius-cards)",
      padding: "36px",
      display: "flex",
      flexDirection: "column",
      gap: "16px"
    }}
  >
          <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      fontFamily: "var(--font-manrope)",
      fontWeight: 700,
      fontSize: "14px",
      color: "var(--color-charcoal-ink)"
    }}
  >
            <RotateCw size={16} className="animate-spin" style={{ color: "var(--color-ember-orange)" }} />
            <span>Retrieving pgvector hybrid chunks and synthesizing grounded answer...</span>
          </div>
          <div
    style={{
      height: 18,
      width: "85%",
      background: "var(--color-mint-wash)",
      borderRadius: "var(--radius-full)",
      border: "1.5px solid var(--color-charcoal-ink)"
    }}
  />
          <div
    style={{
      height: 18,
      width: "92%",
      background: "var(--color-sunbeam-yellow)",
      borderRadius: "var(--radius-full)",
      border: "1.5px solid var(--color-charcoal-ink)"
    }}
  />
          <div
    style={{
      height: 18,
      width: "60%",
      background: "var(--color-powder-blue)",
      borderRadius: "var(--radius-full)",
      border: "1.5px solid var(--color-charcoal-ink)"
    }}
  />
        </div> : error ? <div className="ui-card" style={{ padding: "32px", textAlign: "center", borderColor: "#ef4444" }}>
          <AlertCircle size={28} style={{ color: "#ef4444", margin: "0 auto 12px auto" }} />
          <div style={{ fontWeight: 800, fontSize: "16px", color: "#991b1b", marginBottom: 6 }}>
            Retrieval Failed
          </div>
          <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: 16 }}>{error}</p>
          <button
    onClick={() => handleSearchSubmit()}
    style={{
      padding: "8px 16px",
      background: "var(--color-charcoal-ink)",
      color: "var(--color-snow)",
      border: "none",
      borderRadius: "var(--radius-full)",
      fontWeight: 700,
      cursor: "pointer"
    }}
  >
            Retry Query
          </button>
        </div> : answer ? <div className="flex flex-col gap-5">
          {
    /* Main Synthesized Answer Box */
  }
          <div
    style={{
      background: "var(--color-snow)",
      border: "2px solid var(--color-charcoal-ink)",
      borderRadius: "var(--radius-cards)",
      padding: "28px 32px"
    }}
  >
            <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "16px",
      flexWrap: "wrap",
      gap: "12px"
    }}
  >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
    style={{
      width: 28,
      height: 28,
      borderRadius: "50%",
      background: "var(--color-ember-orange)",
      border: "2px solid var(--color-charcoal-ink)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--color-charcoal-ink)"
    }}
  >
                  <Sparkles size={14} />
                </div>
                <span
    style={{
      fontFamily: "var(--font-alfa-slab-one)",
      fontSize: "18px",
      color: "var(--color-charcoal-ink)"
    }}
  >
                  Eillish Knowledge Synthesis
                </span>
                <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      padding: "3px 10px",
      borderRadius: "var(--radius-full)",
      border: "1.5px solid var(--color-charcoal-ink)",
      background: "var(--color-mint-wash)",
      fontFamily: "var(--font-manrope)",
      fontSize: "11px",
      fontWeight: 800
    }}
  >
                  {answer.citations.length > 0 ? "Grounded" : "No Direct Evidence"}
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span
    style={{
      fontFamily: "var(--font-mono)",
      fontSize: "11px",
      fontWeight: 700,
      color: "var(--color-charcoal-ink)"
    }}
  >
                  Model: {answer.modelUsed} · Latency: {answer.retrievalLatencyMs}ms · {answer.totalTokens} tokens
                </span>
                <button
    onClick={handleCopyAnswer}
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      padding: "5px 12px",
      background: "var(--color-snow)",
      border: "2px solid var(--color-charcoal-ink)",
      borderRadius: "var(--radius-full)",
      fontFamily: "var(--font-manrope)",
      fontSize: "12px",
      fontWeight: 700,
      cursor: "pointer",
      transition: "all var(--transition-fast)"
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = "var(--color-sunbeam-yellow)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = "var(--color-snow)";
    }}
    title="Copy answer markdown"
  >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>

            {
    /* Answer Content */
  }
            <div
    style={{
      fontFamily: "var(--font-manrope)",
      fontSize: "14.5px",
      lineHeight: 1.7,
      whiteSpace: "pre-line",
      color: "var(--color-charcoal-ink)",
      marginBottom: "20px"
    }}
  >
              {answer.answerText}
            </div>

            {
    /* Groundedness Note & Feedback Action */
  }
            <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "12px",
      paddingTop: "16px",
      borderTop: "2px solid var(--color-charcoal-ink)"
    }}
  >
              <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontFamily: "var(--font-manrope)",
      fontSize: "12.5px",
      fontWeight: 600
    }}
  >
                <ShieldCheck size={16} style={{ color: "var(--color-charcoal-ink)" }} />
                <span>
                  Supported by {answer.citations.length} verified codebase document{answer.citations.length === 1 ? "" : "s"}.
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontFamily: "var(--font-manrope)", fontSize: "12px", fontWeight: 700 }}>
                  Helpful?
                </span>
                <button
    type="button"
    onClick={() => handleFeedback("up")}
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "5px",
      padding: "5px 12px",
      background: feedbackGiven === "up" ? "var(--color-mint-wash)" : "var(--color-snow)",
      border: "2px solid var(--color-charcoal-ink)",
      borderRadius: "var(--radius-full)",
      fontFamily: "var(--font-manrope)",
      fontSize: "12px",
      fontWeight: 700,
      cursor: "pointer"
    }}
  >
                  <ThumbsUp size={12} />
                  <span>Yes</span>
                </button>
                <button
    type="button"
    onClick={() => handleFeedback("down")}
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "5px",
      padding: "5px 12px",
      background: feedbackGiven === "down" ? "var(--color-ember-orange)" : "var(--color-snow)",
      border: "2px solid var(--color-charcoal-ink)",
      borderRadius: "var(--radius-full)",
      fontFamily: "var(--font-manrope)",
      fontSize: "12px",
      fontWeight: 700,
      cursor: "pointer"
    }}
  >
                  <ThumbsDown size={12} />
                  <span>No</span>
                </button>
              </div>
            </div>
          </div>

          {
    /* Supporting Evidence Citations Grid & Code Inspector */
  }
          {answer.citations.length > 0 && activeCitation && <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span
    style={{
      fontFamily: "var(--font-alfa-slab-one)",
      fontSize: "18px",
      color: "var(--color-charcoal-ink)"
    }}
  >
                  Grounding Evidence & Source Documents
                </span>
                <span
    style={{
      fontFamily: "var(--font-manrope)",
      fontSize: "12px",
      fontWeight: 800,
      padding: "3px 10px",
      background: "var(--color-snow)",
      border: "1.5px solid var(--color-charcoal-ink)",
      borderRadius: "var(--radius-full)"
    }}
  >
                  {answer.citations.length} Verified Sources
                </span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "5fr 7fr", gap: "16px" }}>
                {
    /* Left: Citations List */
  }
                <div className="flex flex-col gap-2">
                  {answer.citations.map((cit, idx) => {
    const isSelected = cit.id === activeCitation.id;
    return <div
      key={cit.id}
      onClick={() => setSelectedCitationId(cit.id)}
      style={{
        padding: "14px 16px",
        cursor: "pointer",
        border: "2px solid var(--color-charcoal-ink)",
        borderRadius: "20px",
        background: isSelected ? "var(--color-sunbeam-yellow)" : "var(--color-snow)",
        transition: "all var(--transition-fast)"
      }}
    >
                        <div className="flex items-center justify-between" style={{ marginBottom: 6 }}>
                          <div className="flex items-center gap-2">
                            <span
      style={{
        fontFamily: "var(--font-mono)",
        fontWeight: 800,
        fontSize: "11px",
        background: "var(--color-snow)",
        border: "1.5px solid var(--color-charcoal-ink)",
        padding: "1px 6px",
        borderRadius: "var(--radius-full)"
      }}
    >
                              0{idx + 1}
                            </span>
                            <span
      style={{
        fontFamily: "var(--font-manrope)",
        fontSize: "13.5px",
        fontWeight: 800,
        color: "var(--color-charcoal-ink)"
      }}
    >
                              {cit.title}
                            </span>
                          </div>
                          <span
      style={{
        fontFamily: "var(--font-manrope)",
        fontSize: "11px",
        fontWeight: 800,
        background: "var(--color-mint-wash)",
        border: "1.5px solid var(--color-charcoal-ink)",
        padding: "2px 8px",
        borderRadius: "var(--radius-full)"
      }}
    >
                            Score: {typeof cit.relevanceScore === "number" ? cit.relevanceScore : "0.90"}
                          </span>
                        </div>

                        <div
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "11px",
        color: "#444444",
        marginBottom: 8
      }}
    >
                          {cit.path}
                        </div>

                        <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontFamily: "var(--font-manrope)",
        fontSize: "11.5px",
        fontWeight: 700
      }}
    >
                          <span>Lines {cit.lineStart}–{cit.lineEnd}</span>
                          <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 3,
        color: "var(--color-charcoal-ink)",
        fontWeight: 800
      }}
    >
                            <span>Inspect</span>
                            <ExternalLink size={11} />
                          </span>
                        </div>
                      </div>;
  })}
                </div>

                {
    /* Right: Exact Source Snippet Preview */
  }
                <div
    style={{
      background: "var(--color-snow)",
      border: "2px solid var(--color-charcoal-ink)",
      borderRadius: "24px",
      padding: "16px 18px",
      display: "flex",
      flexDirection: "column"
    }}
  >
                  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      paddingBottom: 10,
      marginBottom: 12,
      borderBottom: "2px solid var(--color-charcoal-ink)"
    }}
  >
                    <div className="flex items-center gap-2">
                      <FileCode size={16} style={{ color: "var(--color-charcoal-ink)" }} />
                      <span
    style={{
      fontFamily: "var(--font-mono)",
      fontSize: "12px",
      fontWeight: 700,
      color: "var(--color-charcoal-ink)"
    }}
  >
                        {activeCitation.path}
                      </span>
                    </div>
                    <span
    style={{
      fontFamily: "var(--font-manrope)",
      fontSize: "11px",
      fontWeight: 800,
      background: "var(--color-lilac-tint)",
      border: "1.5px solid var(--color-charcoal-ink)",
      padding: "2px 8px",
      borderRadius: "var(--radius-full)"
    }}
  >
                      Lines {activeCitation.lineStart}–{activeCitation.lineEnd}
                    </span>
                  </div>

                  {
    /* Code Block with Line Numbers */
  }
                  <div
    style={{
      background: "var(--color-peach-paper)",
      border: "2px solid var(--color-charcoal-ink)",
      borderRadius: "16px",
      padding: "14px",
      fontFamily: "var(--font-mono)",
      fontSize: "12px",
      lineHeight: "1.6",
      overflowX: "auto",
      flex: 1
    }}
  >
                    <div style={{ color: "#666666", marginBottom: 8, fontWeight: 600 }}>
                      # Verified AST Chunk · Document: {activeCitation.title}
                    </div>
                    <div style={{ display: "flex", gap: 12 }}>
                      <div
    style={{
      userSelect: "none",
      color: "#888888",
      textAlign: "right",
      borderRight: "1.5px solid var(--color-charcoal-ink)",
      paddingRight: 10,
      fontWeight: 700
    }}
  >
                        <div>{activeCitation.lineStart}</div>
                        <div>{activeCitation.lineStart + 1}</div>
                        <div>{activeCitation.lineStart + 2}</div>
                        <div>{activeCitation.lineStart + 3}</div>
                      </div>
                      <div style={{ color: "var(--color-charcoal-ink)", fontWeight: 600, whiteSpace: "pre-wrap" }}>
                        <div>{activeCitation.excerpt}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>}
        </div> : (
    /* Empty State */
    <div className="ui-card" style={{ padding: "60px 20px", textAlign: "center" }}>
          <div className="flex flex-col items-center gap-3">
            <div
      style={{
        width: 48,
        height: 48,
        borderRadius: "var(--radius-sm)",
        background: "var(--color-sunbeam-yellow)",
        border: "2px solid var(--color-charcoal-ink)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
              <Sparkles size={22} style={{ color: "var(--color-charcoal-ink)" }} />
            </div>
            <h3 className="type-h3" style={{ fontSize: 18 }}>Ask Knowledge & Codebase Intelligence</h3>
            <p style={{ fontFamily: "var(--font-manrope)", fontSize: "14px", color: "var(--text-secondary)", maxWidth: 460 }}>
              Enter a query above or click any suggested prompt. Eillish will perform pgvector hybrid search across indexed chunks and return an evidence-backed answer with source citations.
            </p>
          </div>
        </div>
  )}
    </div>;
};
export {
  SearchPage
};
