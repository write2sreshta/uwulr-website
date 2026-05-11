"use client";

import { useState } from "react";

interface Article {
  title: string;
  author: string;
  year: string;
  abstract: string;
  category: string;
  pages: string;
  volume: string;
  pdfUrl: string | null;
}

interface Props {
  label: string;
  title: string;
  articleCount: number;
  pages: number;
  articles: Article[];
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <article
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid #e8e2d8",
        borderTop: "3px solid #4b2e83",
      }}
    >
      <div style={{ padding: "2rem 2rem 1.5rem" }}>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span
            style={{
              display: "inline-block",
              backgroundColor: "#faf8f4",
              border: "1px solid #e8e2d8",
              color: "#4b2e83",
              fontSize: "0.6rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "0.25rem 0.65rem",
              fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
            }}
          >
            {article.category}
          </span>
          <span style={{ color: "#aaa", fontSize: "0.75rem", fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}>
            {article.volume}
          </span>
          <span style={{ color: "#aaa", fontSize: "0.75rem", fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}>
            {article.pages}
          </span>
        </div>

        <h2
          style={{
            color: "#2a1850",
            fontSize: "1.2rem",
            lineHeight: 1.3,
            marginBottom: "0.75rem",
            fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
            letterSpacing: "0.02em",
          }}
        >
          {article.title}
        </h2>

        <div className="flex items-center gap-3 mb-4">
          <span style={{ color: "#4b2e83", fontSize: "0.875rem", fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif", fontStyle: "italic" }}>
            {article.author}
          </span>
          <span style={{ color: "#ccc" }}>·</span>
          <span style={{ color: "#aaa", fontSize: "0.875rem", fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}>
            {article.year}
          </span>
        </div>

        <p style={{ color: "#666", fontSize: "1rem", lineHeight: 1.85, fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}>
          <span style={{ fontWeight: 600, color: "#555" }}>Abstract. </span>
          {article.abstract}
        </p>
      </div>

      <div style={{ borderTop: "1px solid #e8e2d8" }}>
        {article.pdfUrl ? (
          <div>
            <div style={{ padding: "0.75rem 2rem", backgroundColor: "#faf8f4", borderBottom: "1px solid #e8e2d8", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ color: "#555", fontSize: "0.8rem", fontFamily: "'Lovelo Solid', 'Futura', sans-serif", letterSpacing: "0.05em" }}>
                Full Article PDF
              </span>
              <a href={article.pdfUrl} download style={{ color: "#b7a57a", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'Lovelo Solid', 'Futura', sans-serif", textDecoration: "none", borderBottom: "1px solid #b7a57a" }}>
                Download PDF
              </a>
            </div>
            <iframe src={article.pdfUrl} title={article.title} style={{ width: "100%", height: "640px", display: "block", border: "none" }} />
          </div>
        ) : (
          <div style={{ padding: "2rem", backgroundColor: "#faf8f4", display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ width: "40px", height: "50px", border: "2px solid #d8d0c8", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ color: "#b7a57a", fontSize: "0.65rem", fontFamily: "'Lovelo Solid', 'Futura', sans-serif", letterSpacing: "0.05em" }}>PDF</span>
            </div>
            <div>
              <p style={{ color: "#888", fontSize: "0.875rem", fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif", marginBottom: "0.25rem" }}>
                Full text coming soon
              </p>
              <p style={{ color: "#bbb", fontSize: "0.8rem", fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}>
                Contact{" "}
                <a href="mailto:ulawreview@uw.edu" style={{ color: "#b7a57a", textDecoration: "none" }}>
                  ulawreview@uw.edu
                </a>{" "}
                to request an advance copy
              </p>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

export default function IssueDropdown({ label, title, articleCount, pages, articles }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ marginBottom: "2rem" }}>
      {/* Header row — always visible */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#faf8f4",
          border: "1px solid #e8e2d8",
          borderLeft: "3px solid #b7a57a",
          padding: "1.25rem 1.5rem",
          cursor: "pointer",
          textAlign: "left",
          gap: "1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
          <div>
            <p style={{ color: "#b7a57a", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.2rem", fontFamily: "'Lovelo Solid', 'Futura', sans-serif" }}>
              {label}
            </p>
            <p style={{ color: "#2a1850", fontSize: "1.05rem", fontFamily: "'Lovelo Solid', 'Futura', sans-serif", letterSpacing: "0.03em" }}>
              {title}
            </p>
          </div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <div style={{ textAlign: "center" }}>
              <p style={{ color: "#4b2e83", fontSize: "1.2rem", fontFamily: "'Lovelo Solid', 'Futura', sans-serif", lineHeight: 1 }}>{articleCount}</p>
              <p style={{ color: "#aaa", fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'Lovelo Solid', 'Futura', sans-serif" }}>Articles</p>
            </div>
            <div style={{ width: "1px", backgroundColor: "#e8e2d8" }} />
            <div style={{ textAlign: "center" }}>
              <p style={{ color: "#4b2e83", fontSize: "1.2rem", fontFamily: "'Lovelo Solid', 'Futura', sans-serif", lineHeight: 1 }}>{pages}</p>
              <p style={{ color: "#aaa", fontSize: "0.55rem", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'Lovelo Solid', 'Futura', sans-serif" }}>Pages</p>
            </div>
          </div>
        </div>
        <span
          style={{
            color: "#4b2e83",
            fontSize: "1.1rem",
            flexShrink: 0,
            transition: "transform 0.25s",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            display: "inline-block",
          }}
        >
          ▾
        </span>
      </button>

      {/* Expandable articles */}
      {open && (
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem", marginTop: "1.5rem" }}>
          {articles.map((article) => (
            <ArticleCard key={article.title} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
