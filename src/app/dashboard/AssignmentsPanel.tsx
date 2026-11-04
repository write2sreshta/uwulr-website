"use client";

import { useState, useTransition } from "react";
import {
  createAssignment,
  deleteAssignment,
  submitAssignment,
  updateAssignment,
} from "@/app/actions/dashboard";

interface Assignment {
  id: string;
  title: string;
  description: string;
  due_date: string | null;
  created_at: string;
}

interface Submission {
  id: string;
  assignment_id: string;
  writer_id: string;
  doc_link: string;
  submitted_at: string;
}

interface Session {
  userId: string;
  role: string;
  name: string;
}

function isOverdue(dueDate: string | null) {
  if (!dueDate) return false;
  return new Date(dueDate) < new Date();
}

function formatDate(d: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function AssignmentsPanel({
  assignments,
  submissions,
  session,
  isEditor,
}: {
  assignments: Assignment[];
  submissions: Submission[];
  session: Session;
  isEditor: boolean;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [linkInputs, setLinkInputs] = useState<Record<string, string>>({});
  const [pending, startTransition] = useTransition();

  const submissionMap: Record<string, Submission[]> = {};
  for (const s of submissions) {
    if (!submissionMap[s.assignment_id]) submissionMap[s.assignment_id] = [];
    submissionMap[s.assignment_id].push(s);
  }

  function mySubmission(aId: string) {
    return (submissionMap[aId] ?? []).find((s) => s.writer_id === session.userId);
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
        <h2
          style={{
            color: "#ffffff",
            fontSize: "0.65rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
            margin: 0,
          }}
        >
          Assignments
        </h2>
        {isEditor && (
          <button
            onClick={() => setShowCreate((v) => !v)}
            style={btnStyle}
          >
            {showCreate ? "Cancel" : "+ New Assignment"}
          </button>
        )}
      </div>

      {/* Create form */}
      {showCreate && isEditor && (
        <form
          action={async (fd) => {
            startTransition(async () => {
              await createAssignment(fd);
              setShowCreate(false);
            });
          }}
          style={cardStyle}
        >
          <input name="title" placeholder="Title" required style={inputStyle} />
          <textarea name="description" placeholder="Description (optional)" rows={3} style={{ ...inputStyle, resize: "vertical" }} />
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
            <label style={labelStyle}>Due date</label>
            <input name="due_date" type="date" style={inputStyle} />
            <button type="submit" disabled={pending} style={{ ...btnStyle, marginLeft: "auto" }}>
              Create
            </button>
          </div>
        </form>
      )}

      {/* Assignment list */}
      {assignments.length === 0 && (
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.85rem" }}>No assignments yet.</p>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {assignments.map((a) => {
          const open = expanded === a.id;
          const overdue = isOverdue(a.due_date);
          const mySubmit = mySubmission(a.id);
          const allSubmits = submissionMap[a.id] ?? [];
          const editing = editingId === a.id;

          return (
            <div key={a.id} style={cardStyle}>
              {/* Header row */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }}
                onClick={() => setExpanded(open ? null : a.id)}
              >
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem" }}>{open ? "▾" : "▸"}</span>
                <span style={{ color: "#ffffff", fontSize: "0.95rem", flex: 1 }}>{a.title}</span>
                {a.due_date && (
                  <span
                    style={{
                      fontSize: "0.72rem",
                      color: overdue ? "#f87171" : "rgba(255,255,255,0.45)",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {overdue ? "Overdue · " : "Due "}{formatDate(a.due_date)}
                  </span>
                )}
                {overdue && (
                  <span
                    style={{
                      backgroundColor: "rgba(248,113,113,0.15)",
                      color: "#f87171",
                      fontSize: "0.6rem",
                      letterSpacing: "0.1em",
                      padding: "0.15rem 0.5rem",
                      borderRadius: "4px",
                      fontFamily: "'Lovelo Solid', sans-serif",
                    }}
                  >
                    OVERDUE
                  </span>
                )}
                {mySubmit && !overdue && (
                  <span
                    style={{
                      backgroundColor: "rgba(74,222,128,0.12)",
                      color: "#4ade80",
                      fontSize: "0.6rem",
                      letterSpacing: "0.1em",
                      padding: "0.15rem 0.5rem",
                      borderRadius: "4px",
                      fontFamily: "'Lovelo Solid', sans-serif",
                    }}
                  >
                    SUBMITTED
                  </span>
                )}
              </div>

              {/* Expanded content */}
              {open && (
                <div style={{ marginTop: "0.85rem", paddingTop: "0.85rem", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                  {editing && isEditor ? (
                    <form
                      action={async (fd) => {
                        startTransition(async () => {
                          await updateAssignment(a.id, fd);
                          setEditingId(null);
                        });
                      }}
                      style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}
                    >
                      <input name="title" defaultValue={a.title} required style={inputStyle} />
                      <textarea name="description" defaultValue={a.description} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
                      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                        <label style={labelStyle}>Due</label>
                        <input name="due_date" type="date" defaultValue={a.due_date ?? ""} style={inputStyle} />
                        <button type="submit" disabled={pending} style={{ ...btnStyle, marginLeft: "auto" }}>Save</button>
                        <button type="button" onClick={() => setEditingId(null)} style={ghostBtnStyle}>Cancel</button>
                      </div>
                    </form>
                  ) : (
                    <>
                      {a.description && (
                        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.88rem", lineHeight: 1.6, marginBottom: "1rem" }}>
                          {a.description}
                        </p>
                      )}

                      {/* Editor: see all submissions */}
                      {isEditor && allSubmits.length > 0 && (
                        <div style={{ marginBottom: "1rem" }}>
                          <p style={{ ...labelStyle, marginBottom: "0.4rem" }}>Submissions</p>
                          {allSubmits.map((s) => (
                            <div key={s.id} style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.3rem" }}>
                              <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.78rem", minWidth: "90px" }}>
                                {/* show writer_id short — real name shown in admin */}
                                writer
                              </span>
                              <a href={s.doc_link} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                                View doc ↗
                              </a>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Writer: submit link */}
                      {!isEditor && (
                        <form
                          action={async (fd) => {
                            startTransition(async () => {
                              await submitAssignment(fd);
                              setLinkInputs((p) => ({ ...p, [a.id]: "" }));
                            });
                          }}
                          style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}
                        >
                          <input type="hidden" name="assignment_id" value={a.id} />
                          <input
                            name="doc_link"
                            placeholder={mySubmit ? mySubmit.doc_link : "Paste Google Doc link…"}
                            value={linkInputs[a.id] ?? ""}
                            onChange={(e) => setLinkInputs((p) => ({ ...p, [a.id]: e.target.value }))}
                            style={{ ...inputStyle, flex: 1, minWidth: "200px" }}
                          />
                          <button type="submit" disabled={pending} style={btnStyle}>
                            {mySubmit ? "Update" : "Submit"}
                          </button>
                          {mySubmit && (
                            <a href={mySubmit.doc_link} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                              View current ↗
                            </a>
                          )}
                        </form>
                      )}

                      {/* Editor controls */}
                      {isEditor && (
                        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
                          <button onClick={() => setEditingId(a.id)} style={ghostBtnStyle}>Edit</button>
                          <form action={async () => { startTransition(async () => { await deleteAssignment(a.id); }); }}>
                            <button type="submit" disabled={pending} style={{ ...ghostBtnStyle, color: "#f87171", borderColor: "rgba(248,113,113,0.3)" }}>
                              Delete
                            </button>
                          </form>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  backgroundColor: "#1a1130",
  border: "1px solid rgba(183,165,122,0.12)",
  borderRadius: "8px",
  padding: "1rem 1.1rem",
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
  fontSize: "0.72rem",
  fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  cursor: "pointer",
  whiteSpace: "nowrap",
};

const ghostBtnStyle: React.CSSProperties = {
  padding: "0.35rem 0.8rem",
  backgroundColor: "transparent",
  color: "rgba(255,255,255,0.5)",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: "5px",
  fontSize: "0.72rem",
  cursor: "pointer",
};

const labelStyle: React.CSSProperties = {
  color: "rgba(255,255,255,0.4)",
  fontSize: "0.68rem",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
};

const linkStyle: React.CSSProperties = {
  color: "#b7a57a",
  fontSize: "0.8rem",
  textDecoration: "none",
};
