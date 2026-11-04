"use client";

import { useState, useTransition } from "react";
import { createPitch, claimPitch, deletePitch, approvePitch, rejectPitch } from "@/app/actions/dashboard";

interface Pitch {
  id: string;
  title: string;
  description: string;
  status: string;
  proposed_by_id: string;
  claimed_by_id?: string | null;
  users?: { name: string };
}

interface PitchWindow {
  closes_at: string;
}

export default function PitchBanner({
  window: pw,
  pitches,
  session,
  isEditor,
}: {
  window: PitchWindow;
  pitches: Pitch[];
  session: { userId: string; role: string };
  isEditor: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [pending, startTransition] = useTransition();

  const closesIn = new Date(pw.closes_at);
  const daysLeft = Math.ceil((closesIn.getTime() - Date.now()) / 86400000);

  return (
    <div
      style={{
        backgroundColor: "rgba(183,165,122,0.08)",
        border: "1px solid rgba(183,165,122,0.3)",
        borderRadius: "10px",
        padding: "1rem 1.25rem",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", gap: "1rem", cursor: "pointer" }}
        onClick={() => setExpanded((v) => !v)}
      >
        <span style={{ fontSize: "1rem" }}>📋</span>
        <div style={{ flex: 1 }}>
          <span
            style={{
              color: "#b7a57a",
              fontSize: "0.7rem",
              letterSpacing: "0.18em",
              fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
              textTransform: "uppercase",
            }}
          >
            Pitch Window Open
          </span>
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", marginLeft: "0.75rem" }}>
            {daysLeft > 0 ? `${daysLeft} day${daysLeft !== 1 ? "s" : ""} left` : "Closes today"}
            {" · "}
            {pitches.length} pitch{pitches.length !== 1 ? "es" : ""} available
          </span>
        </div>
        <button style={btnStyle}>
          {expanded ? "Close ▲" : "View Pitches ▼"}
        </button>
        {isEditor && (
          <button
            style={ghostBtnStyle}
            onClick={(e) => { e.stopPropagation(); setShowCreate((v) => !v); }}
          >
            + Add Pitch
          </button>
        )}
      </div>

      {expanded && (
        <div style={{ marginTop: "1rem" }}>
          {showCreate && isEditor && (
            <form
              action={async (fd) => {
                startTransition(async () => {
                  await createPitch(fd);
                  setShowCreate(false);
                });
              }}
              style={{ ...cardStyle, marginBottom: "0.75rem" }}
            >
              <input name="title" placeholder="Pitch title" required style={inputStyle} />
              <textarea name="description" placeholder="Brief description…" rows={2} style={{ ...inputStyle, resize: "vertical" }} />
              <button type="submit" disabled={pending} style={{ ...btnStyle, marginTop: "0.4rem" }}>
                Create Pitch
              </button>
            </form>
          )}

          {pitches.length === 0 && (
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.85rem" }}>No pitches available to claim right now.</p>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {pitches.map((pitch) => (
              <div key={pitch.id} style={cardStyle}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: "#ffffff", fontSize: "0.9rem", margin: "0 0 0.25rem" }}>{pitch.title}</p>
                    {pitch.description && (
                      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", lineHeight: 1.5, margin: 0 }}>{pitch.description}</p>
                    )}
                    {pitch.users?.name && (
                      <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.72rem", marginTop: "0.3rem" }}>
                        Proposed by {pitch.users.name}
                      </p>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: "0.4rem", flexShrink: 0 }}>
                    {/* Writer: claim button */}
                    {!isEditor && pitch.status === "available" && (
                      <form action={async () => { startTransition(async () => { await claimPitch(pitch.id); }); }}>
                        <button type="submit" disabled={pending} style={btnStyle}>
                          Claim
                        </button>
                      </form>
                    )}
                    {/* Editor: approve/reject/delete */}
                    {isEditor && (
                      <>
                        <form action={async () => { startTransition(async () => { await deletePitch(pitch.id); }); }}>
                          <button type="submit" disabled={pending} style={{ ...ghostBtnStyle, color: "#f87171", borderColor: "rgba(248,113,113,0.3)", fontSize: "0.68rem" }}>
                            Remove
                          </button>
                        </form>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  backgroundColor: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "7px",
  padding: "0.75rem 0.9rem",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.45rem 0.65rem",
  backgroundColor: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(183,165,122,0.2)",
  borderRadius: "5px",
  color: "#ffffff",
  fontSize: "0.85rem",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
  display: "block",
  marginBottom: "0.4rem",
};

const btnStyle: React.CSSProperties = {
  padding: "0.38rem 0.85rem",
  backgroundColor: "#b7a57a",
  color: "#1a1130",
  border: "none",
  borderRadius: "5px",
  fontSize: "0.68rem",
  fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  cursor: "pointer",
  whiteSpace: "nowrap",
};

const ghostBtnStyle: React.CSSProperties = {
  padding: "0.35rem 0.75rem",
  backgroundColor: "transparent",
  color: "rgba(255,255,255,0.5)",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: "5px",
  fontSize: "0.72rem",
  cursor: "pointer",
  whiteSpace: "nowrap",
};
