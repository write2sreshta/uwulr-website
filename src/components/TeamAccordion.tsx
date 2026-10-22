"use client";
import { useState } from "react";
import MemberCard from "./MemberCard";

type Officer = {
  name: string;
  role: string;
  photo: string | null;
  initials: string;
  bio: string;
  photoZoom?: number;
  photoOrigin?: string;
  photoOffsetY?: string;
};

type MastheadEntry = {
  name: string;
  role: string;
};

export default function TeamAccordion({
  officers,
  pastLeadership,
}: {
  officers: Officer[];
  pastLeadership: MastheadEntry[];
}) {
  const [pastOpen, setPastOpen] = useState(false);

  return (
    <section className="py-20" style={{ backgroundColor: "#ffffff" }}>
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* 26-27 Officers */}
        <div className="mb-12 text-center">
          <p
            style={{
              color: "#b7a57a",
              fontSize: "0.65rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginBottom: "0.5rem",
              fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
            }}
          >
            2026-27 Officers
          </p>
          <h2
            style={{
              color: "#2a1850",
              fontSize: "clamp(1.5rem, 3vw, 1.9rem)",
              fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
              letterSpacing: "0.04em",
            }}
          >
            Executive &amp; Editorial Officers
          </h2>
        </div>

        {/* Co-Editors-in-Chief centered row */}
        <div
          className="grid grid-cols-2 gap-6 mb-6"
          style={{ maxWidth: "560px", margin: "0 auto 1.5rem" }}
        >
          {officers.slice(0, 2).map((member) => (
            <MemberCard key={member.name + member.role} {...member} />
          ))}
        </div>

        {/* Remaining officers */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6" style={{ marginBottom: "3rem" }}>
          {officers.slice(2).map((member) => (
            <MemberCard key={member.name + member.role} {...member} />
          ))}
        </div>

        {/* 25-26 Leadership accordion */}
        <div style={{ borderTop: "1px solid #e8e2d8", paddingTop: "2rem" }}>
          <button
            onClick={() => setPastOpen(!pastOpen)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.75rem 0",
              textAlign: "left",
            }}
          >
            <div>
              <p
                style={{
                  color: "#b7a57a",
                  fontSize: "0.65rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  marginBottom: "0.25rem",
                  fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
                }}
              >
                Previous Year
              </p>
              <span
                style={{
                  color: "#2a1850",
                  fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                  fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
                  letterSpacing: "0.04em",
                }}
              >
                2025-26 Leadership
              </span>
            </div>
            <span
              style={{
                color: "#b7a57a",
                fontSize: "1rem",
                fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
                transition: "transform 0.2s",
                transform: pastOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              ▾
            </span>
          </button>

          {pastOpen && (
            <div style={{ marginTop: "1.25rem", borderTop: "1px solid #e8e2d8", paddingTop: "1.5rem" }}>
              {pastLeadership.map(({ name, role }) => (
                <div
                  key={name}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    gap: "1rem",
                    padding: "0.55rem 0",
                    borderBottom: "1px solid #f0ece6",
                  }}
                >
                  <span
                    style={{
                      color: "#2a1850",
                      fontSize: "0.9rem",
                      fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
                      letterSpacing: "0.03em",
                    }}
                  >
                    {name}
                  </span>
                  <span
                    style={{
                      color: "#b7a57a",
                      fontSize: "0.7rem",
                      fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
                      letterSpacing: "0.04em",
                      textAlign: "right",
                      flexShrink: 0,
                    }}
                  >
                    {role}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
