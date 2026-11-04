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
          <input name="password" type="password" placeholder="Temporary password" required style={inputStyle} />
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
                    color: "rgba(255,255,255,0.4)",
                    fontSize: "0.62rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    fontFamily: "'Lovelo Solid', sans-serif",
                    textAlign: "left",
                    padding: "0 0 0.75rem",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
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
                  <td style={{ ...tdStyle, color: "rgba(255,255,255,0.5)", fontFamily: "monospace" }}>
                    {u.username}
                  </td>
                  <td style={tdStyle}>
                    <span
                      style={{
                        backgroundColor: "rgba(183,165,122,0.12)",
                        color: "#b7a57a",
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
                          style={{ ...ghostBtnStyle, color: "#f87171", borderColor: "rgba(248,113,113,0.3)" }}
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
                        <input
                          type="password"
                          placeholder="New password"
                          value={newPw}
                          onChange={(e) => setNewPw(e.target.value)}
                          style={{ ...inputStyle, maxWidth: "260px" }}
                        />
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
  backgroundColor: "#1a1130",
  border: "1px solid rgba(183,165,122,0.12)",
  borderRadius: "8px",
  padding: "1.1rem 1.25rem",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.5rem 0.7rem",
  backgroundColor: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(183,165,122,0.2)",
  borderRadius: "5px",
  color: "#ffffff",
  fontSize: "0.88rem",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
};

const btnStyle: React.CSSProperties = {
  padding: "0.4rem 0.9rem",
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
  padding: "0.3rem 0.7rem",
  backgroundColor: "transparent",
  color: "rgba(255,255,255,0.5)",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: "5px",
  fontSize: "0.68rem",
  cursor: "pointer",
};

const tdStyle: React.CSSProperties = {
  color: "#ffffff",
  fontSize: "0.85rem",
  padding: "0.75rem 0",
  borderBottom: "1px solid rgba(255,255,255,0.05)",
  verticalAlign: "middle",
};

const labelStyle: React.CSSProperties = {
  color: "rgba(255,255,255,0.4)",
  fontSize: "0.65rem",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
  whiteSpace: "nowrap",
};
