"use client";

import { useState, useTransition, useRef } from "react";
import { updateProfile, changeOwnPassword } from "@/app/actions/dashboard";

interface ProfilePageProps {
  user: {
    id: string;
    name: string;
    username: string;
    role: string;
    email?: string | null;
    avatar_url?: string | null;
  };
}

function EyeIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export default function ProfileClient({ user }: ProfilePageProps) {
  const [profileSaved, setProfileSaved] = useState(false);
  const [pwError, setPwError] = useState<string | null>(null);
  const [pwSaved, setPwSaved] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [pending, startTransition] = useTransition();
  const pwFormRef = useRef<HTMLFormElement>(null);

  const ROLE_LABELS: Record<string, string> = {
    admin: "EIC / Admin",
    editor: "Editor",
    writer: "Writer",
  };

  return (
    <div style={{ padding: "1.5rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ color: "#4b2e83", fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", fontFamily: "'Lovelo Solid', 'Futura', sans-serif", marginBottom: "1.5rem" }}>
        Profile
      </h2>

      {/* Avatar + name section */}
      <div style={cardStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "1.5rem" }}>
          {user.avatar_url ? (
            <img
              src={user.avatar_url}
              alt={user.name}
              style={{ width: "64px", height: "64px", borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(75,46,131,0.15)" }}
            />
          ) : (
            <div style={{
              width: "64px", height: "64px", borderRadius: "50%",
              backgroundColor: "rgba(75,46,131,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#4b2e83", fontSize: "1.4rem", fontFamily: "'Lovelo Solid', sans-serif",
              border: "2px solid rgba(75,46,131,0.15)",
            }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <div style={{ color: "#1a0a3d", fontSize: "1rem", fontWeight: 600 }}>{user.name}</div>
            <div style={{ color: "#9b8fb8", fontSize: "0.78rem", fontFamily: "monospace" }}>@{user.username}</div>
            <div style={{
              display: "inline-block",
              marginTop: "0.3rem",
              backgroundColor: "rgba(75,46,131,0.08)",
              color: "#4b2e83",
              fontSize: "0.6rem",
              padding: "0.15rem 0.5rem",
              borderRadius: "4px",
              fontFamily: "'Lovelo Solid', sans-serif",
              letterSpacing: "0.08em",
            }}>
              {ROLE_LABELS[user.role] ?? user.role}
            </div>
          </div>
        </div>

        <form
          action={async (fd) => {
            startTransition(async () => {
              await updateProfile(fd);
              setProfileSaved(true);
              setTimeout(() => setProfileSaved(false), 3000);
            });
          }}
          style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}
        >
          <div>
            <label style={labelStyle}>Display Name</label>
            <input name="name" defaultValue={user.name} required style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Email Address</label>
            <input name="email" type="email" defaultValue={user.email ?? ""} placeholder="your@email.com" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Profile Photo URL</label>
            <input name="avatar_url" type="url" defaultValue={user.avatar_url ?? ""} placeholder="https://…" style={inputStyle} />
            <p style={{ color: "#9b8fb8", fontSize: "0.75rem", marginTop: "0.3rem" }}>
              Paste a direct image URL — shown when you claim pitches
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <button type="submit" disabled={pending} style={btnStyle}>
              Save Profile
            </button>
            {profileSaved && <span style={{ color: "#166534", fontSize: "0.8rem" }}>Saved ✓</span>}
          </div>
        </form>
      </div>

      {/* Change password */}
      <div style={{ ...cardStyle, marginTop: "1.25rem" }}>
        <h3 style={{ ...labelStyle, margin: "0 0 1rem" }}>Change Password</h3>
        <form
          ref={pwFormRef}
          action={async (fd) => {
            startTransition(async () => {
              const err = await changeOwnPassword(fd);
              if (err) {
                setPwError(err);
              } else {
                setPwError(null);
                setPwSaved(true);
                pwFormRef.current?.reset();
                setTimeout(() => setPwSaved(false), 3000);
              }
            });
          }}
          style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}
        >
          <div>
            <label style={labelStyle}>Current Password</label>
            <div style={{ position: "relative" }}>
              <input
                name="current_password"
                type={showCurrent ? "text" : "password"}
                required
                placeholder="Your current password"
                style={{ ...inputStyle, paddingRight: "2.4rem" }}
              />
              <button type="button" onClick={() => setShowCurrent((v) => !v)} style={eyeBtnStyle} aria-label="Toggle">
                <EyeIcon open={showCurrent} />
              </button>
            </div>
          </div>
          <div>
            <label style={labelStyle}>New Password</label>
            <div style={{ position: "relative" }}>
              <input
                name="new_password"
                type={showNew ? "text" : "password"}
                required
                placeholder="New password"
                style={{ ...inputStyle, paddingRight: "2.4rem" }}
              />
              <button type="button" onClick={() => setShowNew((v) => !v)} style={eyeBtnStyle} aria-label="Toggle">
                <EyeIcon open={showNew} />
              </button>
            </div>
          </div>
          {pwError && <p style={{ color: "#b91c1c", fontSize: "0.82rem", margin: 0 }}>{pwError}</p>}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <button type="submit" disabled={pending} style={btnStyle}>Update Password</button>
            {pwSaved && <span style={{ color: "#166534", fontSize: "0.8rem" }}>Updated ✓</span>}
          </div>
        </form>
      </div>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  backgroundColor: "#ffffff",
  border: "1px solid rgba(75,46,131,0.1)",
  borderRadius: "10px",
  padding: "1.5rem",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.55rem 0.8rem",
  backgroundColor: "#f8f7ff",
  border: "1px solid rgba(75,46,131,0.2)",
  borderRadius: "6px",
  color: "#1a0a3d",
  fontSize: "0.9rem",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
  marginTop: "0.3rem",
  display: "block",
};

const btnStyle: React.CSSProperties = {
  padding: "0.5rem 1.1rem",
  backgroundColor: "#4b2e83",
  color: "#ffffff",
  border: "none",
  borderRadius: "6px",
  fontSize: "0.72rem",
  fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  cursor: "pointer",
};

const labelStyle: React.CSSProperties = {
  color: "#9b8fb8",
  fontSize: "0.65rem",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
  display: "block",
};

const eyeBtnStyle: React.CSSProperties = {
  position: "absolute",
  right: "0.65rem",
  top: "50%",
  transform: "translateY(-50%)",
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: 0,
  color: "rgba(75,46,131,0.4)",
  display: "flex",
  alignItems: "center",
};
