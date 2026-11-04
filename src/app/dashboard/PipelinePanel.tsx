"use client";

import { useState, useTransition } from "react";
import {
  updatePipelineSchedule,
  submitPipelineLink,
  completeEditorStage,
  publishArticle,
} from "@/app/actions/dashboard";

interface PipelineConfig {
  draft_v1_due?: string | null;
  editor_r1_done_by?: string | null;
  draft_v2_due?: string | null;
  final_editor_done_by?: string | null;
  publish_date?: string | null;
}

interface Pipeline {
  id: string;
  writer_id: string;
  pitch_id: string | null;
  draft_v1_link?: string | null;
  draft_v1_submitted_at?: string | null;
  editor_r1_review_link?: string | null;
  editor_r1_notes?: string | null;
  editor_r1_checked_at?: string | null;
  draft_v2_link?: string | null;
  draft_v2_submitted_at?: string | null;
  final_editor_review_link?: string | null;
  final_editor_notes?: string | null;
  final_editor_checked_at?: string | null;
  final_version_link?: string | null;
  final_version_submitted_at?: string | null;
  published_url?: string | null;
  published_at?: string | null;
  users?: { name: string; username: string };
  pitches?: { title: string };
}

function fmt(d: string | null | undefined) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function currentStage(p: Pipeline): number {
  if (p.published_url) return 5;
  if (p.final_version_link) return 4;
  if (p.final_editor_checked_at) return 4;
  if (p.draft_v2_link) return 3;
  if (p.editor_r1_checked_at) return 3;
  if (p.draft_v1_link) return 2;
  return 1;
}

const STAGES = [
  { label: "Pitch Approved", key: "pitch" },
  { label: "Draft V1", key: "draft_v1" },
  { label: "Editor Review R1", key: "editor_r1" },
  { label: "Draft V2", key: "draft_v2" },
  { label: "Final Review", key: "final_editor" },
  { label: "Final Version", key: "final_version" },
  { label: "Published", key: "published" },
];

export default function PipelinePanel({
  config,
  pipelines,
  session,
  isEditor,
}: {
  config: PipelineConfig | null;
  pipelines: Pipeline[];
  session: { userId: string; role: string };
  isEditor: boolean;
}) {
  const [editConfig, setEditConfig] = useState(false);
  const [expandedWriter, setExpandedWriter] = useState<string | null>(null);
  const [linkInputs, setLinkInputs] = useState<Record<string, string>>({});
  const [notesInputs, setNotesInputs] = useState<Record<string, string>>({});
  const [pending, startTransition] = useTransition();

  const myPipeline = pipelines.find((p) => p.writer_id === session.userId);

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
          Article Pipeline
        </h2>
        {isEditor && (
          <button onClick={() => setEditConfig((v) => !v)} style={ghostBtnStyle}>
            {editConfig ? "Cancel" : "Edit Timeline"}
          </button>
        )}
      </div>

      {/* Timeline config edit */}
      {editConfig && isEditor && (
        <form
          action={async (fd) => {
            startTransition(async () => {
              await updatePipelineSchedule(fd);
              setEditConfig(false);
            });
          }}
          style={{ ...cardStyle, marginBottom: "1rem" }}
        >
          {[
            { name: "draft_v1_due", label: "Draft V1 Due", val: config?.draft_v1_due },
            { name: "editor_r1_done_by", label: "Editor R1 Done By", val: config?.editor_r1_done_by },
            { name: "draft_v2_due", label: "Draft V2 Due", val: config?.draft_v2_due },
            { name: "final_editor_done_by", label: "Final Review Done By", val: config?.final_editor_done_by },
            { name: "publish_date", label: "Publish Date", val: config?.publish_date },
          ].map(({ name, label, val }) => (
            <div key={name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <label style={labelStyle}>{label}</label>
              <input name={name} type="date" defaultValue={val?.slice(0, 10) ?? ""} style={{ ...inputStyle, width: "140px" }} />
            </div>
          ))}
          <button type="submit" disabled={pending} style={{ ...btnStyle, width: "100%", marginTop: "0.5rem" }}>
            Save Timeline
          </button>
        </form>
      )}

      {/* Global timeline dates */}
      {!editConfig && (
        <div style={{ ...cardStyle, marginBottom: "1rem" }}>
          <p style={{ ...labelStyle, marginBottom: "0.6rem" }}>Program Timeline</p>
          {STAGES.slice(1).map((s, i) => {
            const dateMap: Record<string, string | null | undefined> = {
              draft_v1: config?.draft_v1_due,
              editor_r1: config?.editor_r1_done_by,
              draft_v2: config?.draft_v2_due,
              final_editor: config?.final_editor_done_by,
              final_version: null,
              published: config?.publish_date,
            };
            const d = dateMap[s.key];
            return (
              <div key={s.key} style={{ display: "flex", justifyContent: "space-between", padding: "0.3rem 0", borderBottom: i < 5 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8rem" }}>{s.label}</span>
                <span style={{ color: d ? "#b7a57a" : "rgba(255,255,255,0.2)", fontSize: "0.78rem" }}>{d ? fmt(d) : "TBD"}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Writer's own pipeline */}
      {!isEditor && myPipeline && (
        <WriterPipelineCard
          pipeline={myPipeline}
          session={session}
          pending={pending}
          startTransition={startTransition}
          linkInputs={linkInputs}
          setLinkInputs={setLinkInputs}
          notesInputs={notesInputs}
          setNotesInputs={setNotesInputs}
          isEditor={false}
        />
      )}

      {!isEditor && !myPipeline && (
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.85rem" }}>
          No pitch claimed yet. Claim a pitch during the pitch window to start your pipeline.
        </p>
      )}

      {/* Editor: list all writers */}
      {isEditor && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {pipelines.length === 0 && (
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.85rem" }}>No writers in pipeline yet.</p>
          )}
          {pipelines.map((p) => {
            const stage = currentStage(p);
            const writerName = p.users?.name ?? p.writer_id.slice(0, 8);
            const pitchTitle = p.pitches?.title ?? "Untitled";
            const open = expandedWriter === p.writer_id;

            return (
              <div key={p.writer_id} style={cardStyle}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }}
                  onClick={() => setExpandedWriter(open ? null : p.writer_id)}
                >
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem" }}>{open ? "▾" : "▸"}</span>
                  <span style={{ color: "#ffffff", fontSize: "0.88rem", flex: 1 }}>{writerName}</span>
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
                    Stage {stage + 1}/{STAGES.length}
                  </span>
                </div>
                {open && (
                  <div style={{ marginTop: "0.75rem" }}>
                    <p style={{ ...labelStyle, marginBottom: "0.4rem" }}>Pitch: {pitchTitle}</p>
                    <WriterPipelineCard
                      pipeline={p}
                      session={session}
                      pending={pending}
                      startTransition={startTransition}
                      linkInputs={linkInputs}
                      setLinkInputs={setLinkInputs}
                      notesInputs={notesInputs}
                      setNotesInputs={setNotesInputs}
                      isEditor={true}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function WriterPipelineCard({
  pipeline,
  session,
  pending,
  startTransition,
  linkInputs,
  setLinkInputs,
  notesInputs,
  setNotesInputs,
  isEditor,
}: {
  pipeline: Pipeline;
  session: { userId: string; role: string };
  pending: boolean;
  startTransition: (fn: () => void) => void;
  linkInputs: Record<string, string>;
  setLinkInputs: (u: (p: Record<string, string>) => Record<string, string>) => void;
  notesInputs: Record<string, string>;
  setNotesInputs: (u: (p: Record<string, string>) => Record<string, string>) => void;
  isEditor: boolean;
}) {
  const wid = pipeline.writer_id;
  const stage = currentStage(pipeline);

  const rows = [
    {
      label: "Draft V1",
      done: !!pipeline.draft_v1_link,
      link: pipeline.draft_v1_link,
      date: pipeline.draft_v1_submitted_at,
      inputKey: `${wid}-draft_v1`,
      stageIdx: 1,
      canSubmit: !isEditor && stage === 1,
      onSubmit: (link: string) => submitPipelineLink("draft_v1", link, isEditor ? wid : undefined),
    },
    {
      label: "Editor R1 Review",
      done: !!pipeline.editor_r1_checked_at,
      link: pipeline.editor_r1_review_link,
      date: pipeline.editor_r1_checked_at,
      notes: pipeline.editor_r1_notes,
      inputKey: `${wid}-editor_r1`,
      stageIdx: 2,
      canSubmit: isEditor && stage === 2,
      onEditorStage: "r1" as const,
    },
    {
      label: "Draft V2",
      done: !!pipeline.draft_v2_link,
      link: pipeline.draft_v2_link,
      date: pipeline.draft_v2_submitted_at,
      inputKey: `${wid}-draft_v2`,
      stageIdx: 3,
      canSubmit: !isEditor && stage === 3,
      onSubmit: (link: string) => submitPipelineLink("draft_v2", link, isEditor ? wid : undefined),
    },
    {
      label: "Final Editor Review",
      done: !!pipeline.final_editor_checked_at,
      link: pipeline.final_editor_review_link,
      date: pipeline.final_editor_checked_at,
      notes: pipeline.final_editor_notes,
      inputKey: `${wid}-final_editor`,
      stageIdx: 4,
      canSubmit: isEditor && stage === 4,
      onEditorStage: "final" as const,
    },
    {
      label: "Final Version",
      done: !!pipeline.final_version_link,
      link: pipeline.final_version_link,
      date: pipeline.final_version_submitted_at,
      inputKey: `${wid}-final_version`,
      stageIdx: 5,
      canSubmit: !isEditor && stage === 5,
      onSubmit: (link: string) => submitPipelineLink("final_version", link, isEditor ? wid : undefined),
    },
    {
      label: "Published",
      done: !!pipeline.published_url,
      link: pipeline.published_url,
      date: pipeline.published_at,
      inputKey: `${wid}-published`,
      stageIdx: 6,
      canSubmit: isEditor && stage === 5,
      isPublish: true,
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
      {rows.map((row) => (
        <div
          key={row.label}
          style={{
            padding: "0.6rem 0.75rem",
            backgroundColor: row.done ? "rgba(74,222,128,0.06)" : stage === row.stageIdx ? "rgba(183,165,122,0.07)" : "rgba(255,255,255,0.03)",
            borderRadius: "6px",
            border: `1px solid ${row.done ? "rgba(74,222,128,0.15)" : stage === row.stageIdx ? "rgba(183,165,122,0.2)" : "rgba(255,255,255,0.05)"}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: row.canSubmit || row.link ? "0.4rem" : 0 }}>
            <span style={{ fontSize: "0.75rem", color: row.done ? "#4ade80" : stage === row.stageIdx ? "#b7a57a" : "rgba(255,255,255,0.3)" }}>
              {row.done ? "✓" : stage === row.stageIdx ? "●" : "○"}
            </span>
            <span style={{ color: row.done ? "rgba(255,255,255,0.7)" : stage === row.stageIdx ? "#ffffff" : "rgba(255,255,255,0.35)", fontSize: "0.82rem", flex: 1 }}>
              {row.label}
            </span>
            {row.date && <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.72rem" }}>{fmt(row.date)}</span>}
          </div>

          {row.link && (
            <a href={row.link} target="_blank" rel="noopener noreferrer" style={{ ...linkStyle, fontSize: "0.75rem", display: "block", marginLeft: "1.25rem", marginBottom: row.notes ? "0.3rem" : 0 }}>
              View document ↗
            </a>
          )}

          {row.notes && (
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.78rem", marginLeft: "1.25rem", lineHeight: 1.5 }}>
              {row.notes}
            </p>
          )}

          {row.canSubmit && row.onSubmit && (
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.4rem", marginLeft: "1.25rem" }}>
              <input
                placeholder="Paste Google Doc link…"
                value={linkInputs[row.inputKey] ?? ""}
                onChange={(e) => setLinkInputs((p) => ({ ...p, [row.inputKey]: e.target.value }))}
                style={{ ...inputStyle, flex: 1 }}
              />
              <button
                disabled={pending || !linkInputs[row.inputKey]}
                onClick={() => {
                  const link = linkInputs[row.inputKey];
                  if (!link) return;
                  startTransition(async () => {
                    await row.onSubmit!(link);
                    setLinkInputs((p) => ({ ...p, [row.inputKey]: "" }));
                  });
                }}
                style={btnStyle}
              >
                Submit
              </button>
            </div>
          )}

          {row.canSubmit && row.onEditorStage && (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.4rem", marginLeft: "1.25rem" }}>
              <input
                placeholder="Annotated doc link…"
                value={linkInputs[row.inputKey] ?? ""}
                onChange={(e) => setLinkInputs((p) => ({ ...p, [row.inputKey]: e.target.value }))}
                style={inputStyle}
              />
              <textarea
                placeholder="General notes for writer (optional)…"
                rows={2}
                value={notesInputs[row.inputKey] ?? ""}
                onChange={(e) => setNotesInputs((p) => ({ ...p, [row.inputKey]: e.target.value }))}
                style={{ ...inputStyle, resize: "vertical" }}
              />
              <button
                disabled={pending || !linkInputs[row.inputKey]}
                onClick={() => {
                  const link = linkInputs[row.inputKey];
                  if (!link) return;
                  startTransition(async () => {
                    await completeEditorStage(row.onEditorStage!, wid, link, notesInputs[row.inputKey] ?? "");
                    setLinkInputs((p) => ({ ...p, [row.inputKey]: "" }));
                    setNotesInputs((p) => ({ ...p, [row.inputKey]: "" }));
                  });
                }}
                style={btnStyle}
              >
                Mark Complete
              </button>
            </div>
          )}

          {row.canSubmit && row.isPublish && (
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.4rem", marginLeft: "1.25rem" }}>
              <input
                placeholder="Published article URL…"
                value={linkInputs[row.inputKey] ?? ""}
                onChange={(e) => setLinkInputs((p) => ({ ...p, [row.inputKey]: e.target.value }))}
                style={{ ...inputStyle, flex: 1 }}
              />
              <button
                disabled={pending || !linkInputs[row.inputKey]}
                onClick={() => {
                  const url = linkInputs[row.inputKey];
                  if (!url) return;
                  startTransition(async () => {
                    await publishArticle(wid, url);
                    setLinkInputs((p) => ({ ...p, [row.inputKey]: "" }));
                  });
                }}
                style={btnStyle}
              >
                Publish
              </button>
            </div>
          )}
        </div>
      ))}
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
  padding: "0.4rem 0.6rem",
  backgroundColor: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(183,165,122,0.2)",
  borderRadius: "5px",
  color: "#ffffff",
  fontSize: "0.82rem",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
};

const btnStyle: React.CSSProperties = {
  padding: "0.38rem 0.8rem",
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

const labelStyle: React.CSSProperties = {
  color: "rgba(255,255,255,0.4)",
  fontSize: "0.65rem",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
};

const linkStyle: React.CSSProperties = {
  color: "#b7a57a",
  fontSize: "0.8rem",
  textDecoration: "none",
};
