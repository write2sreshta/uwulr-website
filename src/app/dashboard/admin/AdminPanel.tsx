"use client";

import { useState, useTransition } from "react";
import { createUser, deleteUser, resetPassword } from "@/app/actions/dashboard";

interface User {
  id: string;
  name: string;
  username: string;
  role: string;
  created_at: string;
}

const ROLE_LABELS: Record<string, string> = {
  admin: "EIC / Admin",
  editor: "Editor",
  writer: "Writer",
};

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

function PasswordInput({ name, placeholder, value, onChange }: {
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (v: string) => void;
}) {
  const [show, setShow] = useState(false);
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <input
        name={name}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        required
        style={{ ...inputStyle, paddingRight: "2.4rem" }}
      />
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        style={{
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
        }}
        aria-label={show ? "Hide password" : "Show password"}
      >
        <EyeIcon open={show} />
      </button>
    </div>
  );
}

export default function AdminPanel({ users }: { users: User[] }) {
  const [showCreate, setShowCreate] = useState(false);
  const [resetingId, setResetingId] = useState<string | null>(null);
  const [newPw, setNewPw] = useState("");
  const [pending, startTransition] = useTransition();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
        <button onClick={() => setShowCreate((v) => !v)} style={btnStyle}>
          {showCreate ? "Cancel" : "+ Add User"}
        </button>
      </div>

      {showCreate && (
        <form
          action={async (fd) => {
            startTransition(async () => {
              await createUser(fd);
              setShowCreate(false);
            });
          }}
          style={{ ...cardStyle, marginBottom: "1.5rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}
        >
          <h3 style={{ color: "#b7a57a", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "'Lovelo Solid', sans-serif", margin: 0 }}>
            New User
          </h3>
          <input name="name" placeholder="Full name" required style={inputStyle} />
          <input name="username" placeholder="Username (they'll use this to log in)" required style={inputStyle} />
          <PasswordInput name="password" placeholder="Temporary password" />
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <label style={labelStyle}>Role</label>
            <select name="role" defaultValue="writer" style={inputStyle}>
              <option value="writer">Writer</option>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" disabled={pending} style={btnStyle}>
            Create Account
          </button>
        </form>
      )}

      {/* Users table */}
      <div style={cardStyle}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["Name", "Username", "Role", "Actions"].map((h) => (
                <th
                  key={h}
                  style={{
                    color: "#9b8fb8",
                    fontSize: "0.62rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    fontFamily: "'Lovelo Solid', sans-serif",
                    textAlign: "left",
                    padding: "0 0 0.75rem",
                    borderBottom: "1px solid rgba(75,46,131,0.08)",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <>
                <tr key={u.id}>
                  <td style={tdStyle}>{u.name}</td>
                  <td style={{ ...tdStyle, color: "#6b5f8a", fontFamily: "monospace" }}>
                    {u.username}
                  </td>
                  <td style={tdStyle}>
                    <span
                      style={{
                        backgroundColor: "rgba(75,46,131,0.08)",
                        color: "#4b2e83",
                        fontSize: "0.6rem",
                        padding: "0.15rem 0.5rem",
                        borderRadius: "4px",
                        fontFamily: "'Lovelo Solid', sans-serif",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {ROLE_LABELS[u.role] ?? u.role}
                    </span>
                  </td>
                  <td style={{ ...tdStyle, display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    <button
                      onClick={() => setResetingId(resetingId === u.id ? null : u.id)}
                      style={ghostBtnStyle}
                    >
                      Reset PW
                    </button>
                    {u.username !== "eic" && (
                      <form action={async () => { startTransition(async () => { await deleteUser(u.id); }); }}>
                        <button
                          type="submit"
                          disabled={pending}
                          style={{ ...ghostBtnStyle, color: "#b91c1c", borderColor: "rgba(185,28,28,0.3)" }}
                        >
                          Delete
                        </button>
                      </form>
                    )}
                  </td>
                </tr>
                {resetingId === u.id && (
                  <tr key={`${u.id}-reset`}>
                    <td colSpan={4} style={{ padding: "0.5rem 0 0.75rem" }}>
                      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                        <div style={{ maxWidth: "260px", width: "100%" }}>
                          <PasswordInput
                            placeholder="New password"
                            value={newPw}
                            onChange={setNewPw}
                          />
                        </div>
                        <button
                          disabled={pending || !newPw}
                          onClick={() => {
                            const pw = newPw;
                            startTransition(async () => {
                              await resetPassword(u.id, pw);
                              setResetingId(null);
                              setNewPw("");
                            });
                          }}
                          style={btnStyle}
                        >
                          Save
                        </button>
                        <button onClick={() => setResetingId(null)} style={ghostBtnStyle}>
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  backgroundColor: "#ffffff",
  border: "1px solid rgba(75,46,131,0.1)",
  borderRadius: "8px",
  padding: "1.1rem 1.25rem",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.5rem 0.7rem",
  backgroundColor: "#f8f7ff",
  border: "1px solid rgba(75,46,131,0.2)",
  borderRadius: "5px",
  color: "#1a0a3d",
  fontSize: "0.88rem",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
};

const btnStyle: React.CSSProperties = {
  padding: "0.4rem 0.9rem",
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
  padding: "0.3rem 0.7rem",
  backgroundColor: "transparent",
  color: "#6b5f8a",
  border: "1px solid rgba(75,46,131,0.2)",
  borderRadius: "5px",
  fontSize: "0.68rem",
  cursor: "pointer",
};

const tdStyle: React.CSSProperties = {
  color: "#1a0a3d",
  fontSize: "0.85rem",
  padding: "0.75rem 0",
  borderBottom: "1px solid rgba(75,46,131,0.06)",
  verticalAlign: "middle",
};

const labelStyle: React.CSSProperties = {
  color: "#9b8fb8",
  fontSize: "0.65rem",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
  whiteSpace: "nowrap",
};
