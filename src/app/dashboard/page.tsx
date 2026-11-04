import { getSession } from "@/lib/session";
import { db } from "@/lib/supabase";
import { redirect } from "next/navigation";
import AssignmentsPanel from "./AssignmentsPanel";
import PipelinePanel from "./PipelinePanel";
import PitchBanner from "./PitchBanner";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session.isLoggedIn) redirect("/dashboard/login");

  const isEditor = session.role === "admin" || session.role === "editor";

  // Fetch assignments
  const { data: assignments } = await db
    .from("assignments")
    .select("*")
    .order("due_date", { ascending: true });

  // Fetch my submissions (or all if editor)
  const { data: submissions } = isEditor
    ? await db.from("assignment_submissions").select("*")
    : await db.from("assignment_submissions").select("*").eq("writer_id", session.userId);

  // Fetch pipeline config
  const { data: pipelineConfig } = await db
    .from("pipeline_config")
    .select("*")
    .eq("id", "singleton")
    .single();

  // Fetch my pipeline row (or all if editor)
  const { data: pipelines } = isEditor
    ? await db.from("pipelines").select("*, users!writer_id(name, username), pitches(title)").order("updated_at", { ascending: false })
    : await db.from("pipelines").select("*, pitches(title)").eq("writer_id", session.userId);

  // Fetch active pitch window (or most recent for editors to edit)
  const now = new Date().toISOString();
  const { data: pitchWindow } = await db
    .from("pitch_windows")
    .select("*")
    .lte("opens_at", now)
    .gte("closes_at", now)
    .single();

  // Editors also need the latest window (even if not active) to manage it
  const { data: latestWindow } = isEditor
    ? await db.from("pitch_windows").select("*").order("created_at", { ascending: false }).limit(1).single()
    : { data: null };

  // Fetch pitches if window active
  const { data: availablePitches } = pitchWindow
    ? await db.from("pitches").select("*, users!proposed_by_id(name)").eq("status", "available")
    : { data: [] };

  return (
    <div style={{ padding: "1.5rem", maxWidth: "1400px", margin: "0 auto" }}>
      {/* Pitch banner — always visible to editors; writers see it only when window is active */}
      {(isEditor || pitchWindow) && (
        <PitchBanner
          window={pitchWindow ?? null}
          latestWindow={latestWindow ?? null}
          pitches={availablePitches ?? []}
          session={{ userId: session.userId ?? "", role: (session.role ?? "writer") as "admin" | "editor" | "writer" }}
          isEditor={isEditor}
        />
      )}

      {/* Two-column layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "1.5rem",
          marginTop: (isEditor || pitchWindow) ? "1.25rem" : 0,
        }}
        className="dashboard-grid"
      >
        {/* Assignments — left 2/3 */}
        <AssignmentsPanel
          assignments={assignments ?? []}
          submissions={submissions ?? []}
          session={{ userId: session.userId ?? "", role: session.role ?? "writer", name: session.name ?? "" }}
          isEditor={isEditor}
        />

        {/* Pipeline — right 1/3 */}
        <PipelinePanel
          config={pipelineConfig}
          pipelines={pipelines ?? []}
          session={{ userId: session.userId ?? "", role: session.role ?? "writer" }}
          isEditor={isEditor}
        />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .dashboard-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
