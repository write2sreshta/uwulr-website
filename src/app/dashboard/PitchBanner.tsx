"use client";

import { useState, useTransition } from "react";
import { createPitch, claimPitch, deletePitch, savePitchWindow } from "@/app/actions/dashboard";

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
  id?: string;
  opens_at: string;
  closes_at: string;
}

export default function PitchBanner({
  window: pw,
  latestWindow,
  pitches,
  session,
  isEditor,
}: {
  window: PitchWindow | null;
  latestWindow: PitchWindow | null;
  pitches: Pitch[];
  session: { userId: string; role: string };
  isEditor: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showWindowForm, setShowWindowForm] = useState(false);
  const [pending, startTransition] = useTransition();

  const isActive = !!pw;
  const daysLeft = pw
    ? Math.ceil((new Date(pw.closes_at).getTime() - Date.now()) / 86400000)
    : 0;

  // Editor with no active window — show a "Start pitch window" button
  if (isEditor && !isActive) {
    return (
      <div style={{ marginBottom: "1.25rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            padding: "0.75rem 1.25rem",
            border: "1.5px dashed rgba(75,46,131,0.25)",
            borderRadius: "8px",
            backgroundColor: "transparent",
          }}
        >
          <span style={{ color: "#9b8fb8", fontSize: "0.8rem", flex: 1 }}>
            No active pitch window
          </span>
          <button
            style={btnStyle}
            onClick={() => setShowWindowForm((v) => !v)}
          >
            {showWindowForm ? "Cancel" : "Open Pitch Window"}
          </button>
        </div>

        {showWindowForm && (
          <form
            action={async (fd) => {
              startTransition(async () => {
                await savePitchWindow(fd);
                setShowWindowForm(false);
              });
            }}
            style={{ ...cardStyle, marginTop: "0.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            <p style={sectionLabel}>Set Pitch Window Dates</p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: "160px" }}>
                <label style={{ ...sectionLabel, display: "block", marginBottom: "0.3rem" }}>Opens</label>
                <input
                  name="opens_at"
                  type="datetime-local"
                  defaultValue={latestWindow?.opens_at?.slice(0, 16) ?? ""}
                  required
                  style={inputStyle}
                />
              </div>
              <div style={{ flex: 1, minWidth: "160px" }}>
                <label style={{ ...sectionLabel, display: "block", marginBottom: "0.3rem" }}>Closes</label>
                <input
                  name="closes_at"
                  type="datetime-local"
                  defaultValue={latestWindow?.closes_at?.slice(0, 16) ?? ""}
                  required
                  style={inputStyle}
                />
              </div>
            </div>
            <button type="submit" disabled={pending} style={{ ...btnStyle, alignSelf: "flex-start" }}>
              Save Window
            </button>
          </form>
        )}
      </div>
    );
  }

  // Active window — show the full banner
  return (
    <div style={{ marginBottom: "1.25rem" }}>
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
          {pitches.length > 0 && ` · ${pitches.length} pitch${pitches.length !== 1 ? "es" : ""} available`}
        </span>
        <span style={{ color: "#4b2e83", fontSize: "0.72rem" }}>{expanded ? "▲" : "▼"}</span>
      </button>

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
          {/* Editor controls */}
          {isEditor && (
            <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end", marginBottom: "0.75rem" }}>
              <button style={ghostBtnStyle} onClick={() => setShowWindowForm((v) => !v)}>
                {showWindowForm ? "Cancel" : "Edit Window"}
              </button>
              <button style={btnStyle} onClick={() => setShowCreate((v) => !v)}>
                {showCreate ? "Cancel" : "+ Add Pitch"}
              </button>
            </div>
          )}

          {isEditor && showWindowForm && (
            <form
              action={async (fd) => {
                startTransition(async () => {
                  await savePitchWindow(fd);
                  setShowWindowForm(false);
                });
              }}
              style={{ ...cardStyle, marginBottom: "0.75rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}
            >
              <p style={sectionLabel}>Edit Pitch Window Dates</p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: "160px" }}>
                  <label style={{ ...sectionLabel, display: "block", marginBottom: "0.3rem" }}>Opens</label>
                  <input name="opens_at" type="datetime-local" defaultValue={pw?.opens_at?.slice(0, 16) ?? ""} required style={inputStyle} />
                </div>
                <div style={{ flex: 1, minWidth: "160px" }}>
                  <label style={{ ...sectionLabel, display: "block", marginBottom: "0.3rem" }}>Closes</label>
                  <input name="closes_at" type="datetime-local" defaultValue={pw?.closes_at?.slice(0, 16) ?? ""} required style={inputStyle} />
                </div>
              </div>
              <button type="submit" disabled={pending} style={{ ...btnStyle, alignSelf: "flex-start" }}>Save</button>
            </form>
          )}

          {isEditor && showCreate && (
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
              <button type="submit" disabled={pending} style={{ ...btnStyle, alignSelf: "flex-start" }}>
                Create Pitch
              </button>
            </form>
          )}

          {pitches.length === 0 && !showCreate && (
            <p style={{ color: "#9b8fb8", fontSize: "0.85rem" }}>
              {isEditor ? "No pitches yet — add some for writers to claim." : "No pitches available to claim right now."}
            </p>
          )}

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
                        Added by {pitch.users.name}
                      </p>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: "0.4rem", flexShrink: 0 }}>
                    {!isEditor && (
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
  margin: 0,
};
