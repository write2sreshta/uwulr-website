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
  pendingPitches,
  session,
  isEditor,
}: {
  window: PitchWindow;
  pitches: Pitch[];
  pendingPitches: Pitch[];
  session: { userId: string; role: string };
  isEditor: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [pending, startTransition] = useTransition();

  const closesIn = new Date(pw.closes_at);
  const daysLeft = Math.ceil((closesIn.getTime() - Date.now()) / 86400000);
  const totalCount = pitches.length + (isEditor ? pendingPitches.length : 0);

  return (
    <div style={{ marginBottom: "1.25rem" }}>
      {/* Dashed CTA button */}
      <button
        onClick={() => setExpanded((v) => !v)}
        style={{
          width: "100%",
          padding: "0.75rem 1.25rem",
          backgroundColor: expanded ? "rgba(75,46,131,0.04)" : "transparent",
          border: "1.5px dashed rgba(75,46,131,0.35)",
          borderRadius: "8px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          transition: "background 0.15s",
        }}
      >
        <span style={{ fontSize: "1rem" }}>📋</span>
        <span
          style={{
            color: "#4b2e83",
            fontSize: "0.72rem",
            letterSpacing: "0.16em",
            fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
            textTransform: "uppercase",
          }}
        >
          Pitch Window Open
        </span>
        <span style={{ color: "#6b5f8a", fontSize: "0.8rem", flex: 1, textAlign: "left" }}>
          {daysLeft > 0 ? `${daysLeft} day${daysLeft !== 1 ? "s" : ""} left` : "Closes today"}
          {totalCount > 0 && ` · ${totalCount} pitch${totalCount !== 1 ? "es" : ""}`}
        </span>
        <span style={{ color: "#4b2e83", fontSize: "0.72rem" }}>
          {expanded ? "▲" : "▼"}
        </span>
      </button>

      {/* Expanded panel */}
      {expanded && (
        <div
          style={{
            marginTop: "0.5rem",
            padding: "1rem 1.25rem",
            backgroundColor: "#ffffff",
            border: "1px solid rgba(75,46,131,0.1)",
            borderRadius: "8px",
          }}
        >
          {/* Propose / Add button — everyone */}
          <div style={{ marginBottom: "0.75rem", display: "flex", justifyContent: "flex-end" }}>
            <button style={btnStyle} onClick={() => setShowCreate((v) => !v)}>
              {showCreate ? "Cancel" : isEditor ? "+ Add Pitch" : "+ Propose a Pitch"}
            </button>
          </div>

          {showCreate && (
            <form
              action={async (fd) => {
                startTransition(async () => {
                  await createPitch(fd);
                  setShowCreate(false);
                });
              }}
              style={{ ...cardStyle, marginBottom: "0.75rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}
            >
              <input name="title" placeholder="Pitch title" required style={inputStyle} />
              <textarea name="description" placeholder="Brief description…" rows={2} style={{ ...inputStyle, resize: "vertical" }} />
              {!isEditor && (
                <p style={{ color: "#9b8fb8", fontSize: "0.75rem", margin: 0 }}>
                  Your pitch will be sent to editors for review before it&apos;s listed.
                </p>
              )}
              <button type="submit" disabled={pending} style={{ ...btnStyle, alignSelf: "flex-start" }}>
                {isEditor ? "Create Pitch" : "Submit for Review"}
              </button>
            </form>
          )}

          {/* Editor: pending approval */}
          {isEditor && pendingPitches.length > 0 && (
            <div style={{ marginBottom: "1rem" }}>
              <p style={{ ...sectionLabel, marginBottom: "0.4rem" }}>Awaiting Approval</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                {pendingPitches.map((pitch) => (
                  <div key={pitch.id} style={{ ...cardStyle, borderColor: "rgba(183,165,122,0.3)", backgroundColor: "#fffdf5" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                      <div style={{ flex: 1 }}>
                        <p style={{ color: "#1a0a3d", fontSize: "0.9rem", margin: "0 0 0.2rem", fontWeight: 500 }}>{pitch.title}</p>
                        {pitch.description && (
                          <p style={{ color: "#6b5f8a", fontSize: "0.8rem", lineHeight: 1.5, margin: 0 }}>{pitch.description}</p>
                        )}
                        {pitch.users?.name && (
                          <p style={{ color: "#9b8fb8", fontSize: "0.72rem", marginTop: "0.25rem" }}>
                            Proposed by {pitch.users.name}
                          </p>
                        )}
                      </div>
                      <div style={{ display: "flex", gap: "0.4rem", flexShrink: 0 }}>
                        <form action={async () => { startTransition(async () => { await approvePitch(pitch.id); }); }}>
                          <button type="submit" disabled={pending} style={btnStyle}>Approve</button>
                        </form>
                        <form action={async () => { startTransition(async () => { await rejectPitch(pitch.id); }); }}>
                          <button type="submit" disabled={pending} style={{ ...ghostBtnStyle, color: "#b91c1c", borderColor: "rgba(185,28,28,0.3)" }}>Reject</button>
                        </form>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Available pitches to claim */}
          {pitches.length === 0 && pendingPitches.length === 0 && !showCreate && (
            <p style={{ color: "#9b8fb8", fontSize: "0.85rem" }}>No pitches available yet.</p>
          )}

          {pitches.length > 0 && (
            <div>
              {isEditor && <p style={{ ...sectionLabel, marginBottom: "0.4rem" }}>Available to Claim</p>}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {pitches.map((pitch) => (
                  <div key={pitch.id} style={cardStyle}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                      <div style={{ flex: 1 }}>
                        <p style={{ color: "#1a0a3d", fontSize: "0.9rem", margin: "0 0 0.25rem", fontWeight: 500 }}>{pitch.title}</p>
                        {pitch.description && (
                          <p style={{ color: "#6b5f8a", fontSize: "0.8rem", lineHeight: 1.5, margin: 0 }}>{pitch.description}</p>
                        )}
                        {pitch.users?.name && (
                          <p style={{ color: "#9b8fb8", fontSize: "0.72rem", marginTop: "0.3rem" }}>
                            Proposed by {pitch.users.name}
                          </p>
                        )}
                      </div>
                      <div style={{ display: "flex", gap: "0.4rem", flexShrink: 0 }}>
                        {!isEditor && pitch.status === "available" && (
                          <form action={async () => { startTransition(async () => { await claimPitch(pitch.id); }); }}>
                            <button type="submit" disabled={pending} style={btnStyle}>Claim</button>
                          </form>
                        )}
                        {isEditor && (
                          <form action={async () => { startTransition(async () => { await deletePitch(pitch.id); }); }}>
                            <button type="submit" disabled={pending} style={{ ...ghostBtnStyle, color: "#b91c1c", borderColor: "rgba(185,28,28,0.3)" }}>
                              Remove
                            </button>
                          </form>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  backgroundColor: "#f8f7ff",
  border: "1px solid rgba(75,46,131,0.1)",
  borderRadius: "7px",
  padding: "0.75rem 0.9rem",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.45rem 0.65rem",
  backgroundColor: "#ffffff",
  border: "1px solid rgba(75,46,131,0.2)",
  borderRadius: "5px",
  color: "#1a0a3d",
  fontSize: "0.85rem",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
  display: "block",
};

const btnStyle: React.CSSProperties = {
  padding: "0.38rem 0.85rem",
  backgroundColor: "#4b2e83",
  color: "#ffffff",
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
  color: "#6b5f8a",
  border: "1px solid rgba(75,46,131,0.2)",
  borderRadius: "5px",
  fontSize: "0.72rem",
  cursor: "pointer",
  whiteSpace: "nowrap",
};

const sectionLabel: React.CSSProperties = {
  color: "#9b8fb8",
  fontSize: "0.62rem",
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
};
