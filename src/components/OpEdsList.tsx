"use client";

import { useState } from "react";

interface OpEd {
  title: string;
  author: string;
  year: string;
  date: string;
  category: string;
  excerpt: string;
  readTime: string;
}

const categories = ["All", "Constitutional Law", "Criminal Justice", "Environmental Law", "Civil Rights", "International Law", "Technology & Privacy"];

export default function OpEdsList({ opeds }: { opeds: OpEd[] }) {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? opeds : opeds.filter((o) => o.category === active);

  return (
    <>
      {/* Category filter bar */}
      <div style={{ backgroundColor: "#faf8f4", borderBottom: "1px solid #e8e2d8", marginBottom: "2rem" }}>
        <div className="flex gap-2 py-4 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                display: "inline-block",
                padding: "0.4rem 1rem",
                fontSize: "0.65rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
                whiteSpace: "nowrap",
                fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
                backgroundColor: active === cat ? "#4b2e83" : "#ffffff",
                color: active === cat ? "#ffffff" : "#4b2e83",
                border: "1px solid",
                borderColor: active === cat ? "#4b2e83" : "#d8d0c8",
                transition: "background-color 0.15s, color 0.15s",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles */}
      <div className="flex flex-col gap-0 divide-y divide-stone-200">
        {filtered.length === 0 ? (
          <p style={{ color: "#aaa", fontSize: "1rem", fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif", padding: "2rem 0" }}>
            No op-eds in this category yet.
          </p>
        ) : (
          filtered.map((piece) => (
            <article key={piece.title} className="py-10 group" style={{ cursor: "pointer" }}>
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
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
                      {piece.category}
                    </span>
                    <span style={{ color: "#aaa", fontSize: "0.75rem", fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}>
                      {piece.date}
                    </span>
                  </div>

                  <h2
                    style={{
                      color: "#2a1850",
                      fontSize: "1.25rem",
                      lineHeight: 1.3,
                      marginBottom: "0.75rem",
                      fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {piece.title}
                  </h2>

                  <p style={{ color: "#666", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "1rem", fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}>
                    {piece.excerpt}
                  </p>

                  <div className="flex items-center gap-4">
                    <span style={{ color: "#4b2e83", fontSize: "0.8rem", fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif", fontStyle: "italic" }}>
                      {piece.author}
                    </span>
                    <span style={{ color: "#ccc" }}>·</span>
                    <span style={{ color: "#aaa", fontSize: "0.8rem", fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}>{piece.year}</span>
                    <span style={{ color: "#ccc" }}>·</span>
                    <span style={{ color: "#aaa", fontSize: "0.8rem", fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}>{piece.readTime}</span>
                  </div>
                </div>

                <div className="md:w-32 md:text-right flex md:flex-col justify-start items-start md:items-end pt-1">
                  <span
                    style={{
                      color: "#b7a57a",
                      fontSize: "0.65rem",
                      fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      borderBottom: "1px solid #b7a57a",
                      paddingBottom: "1px",
                    }}
                  >
                    Read →
                  </span>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </>
  );
}
