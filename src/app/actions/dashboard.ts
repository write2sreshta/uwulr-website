"use server";

import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { db } from "@/lib/supabase";
import { getSession } from "@/lib/session";

async function requireRole(...roles: string[]) {
  const session = await getSession();
  if (!session.isLoggedIn || !session.role || !roles.includes(session.role)) {
    throw new Error("Unauthorized");
  }
  return session;
}

// ── Assignments ──────────────────────────────────────────────────────────────

export async function createAssignment(formData: FormData) {
  await requireRole("admin", "editor");
  await db.from("assignments").insert({
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    due_date: formData.get("due_date") as string,
  });
  revalidatePath("/dashboard");
}

export async function updateAssignment(id: string, formData: FormData) {
  await requireRole("admin", "editor");
  await db.from("assignments").update({
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    due_date: formData.get("due_date") as string,
    updated_at: new Date().toISOString(),
  }).eq("id", id);
  revalidatePath("/dashboard");
}

export async function deleteAssignment(id: string) {
  await requireRole("admin", "editor");
  await db.from("assignments").delete().eq("id", id);
  revalidatePath("/dashboard");
}

export async function submitAssignment(formData: FormData) {
  const session = await requireRole("writer", "admin", "editor");
  const assignmentId = formData.get("assignment_id") as string;
  const docLink = formData.get("doc_link") as string;

  await db.from("assignment_submissions").upsert({
    assignment_id: assignmentId,
    writer_id: session.userId,
    doc_link: docLink,
    submitted_at: new Date().toISOString(),
  }, { onConflict: "assignment_id,writer_id" });
  revalidatePath("/dashboard");
}

// ── Pitch windows ─────────────────────────────────────────────────────────────

export async function savePitchWindow(formData: FormData) {
  await requireRole("admin", "editor");
  const existing = await db.from("pitch_windows").select("id").limit(1).single();
  if (existing.data) {
    await db.from("pitch_windows").update({
      opens_at: formData.get("opens_at") as string,
      closes_at: formData.get("closes_at") as string,
    }).eq("id", existing.data.id);
  } else {
    await db.from("pitch_windows").insert({
      opens_at: formData.get("opens_at") as string,
      closes_at: formData.get("closes_at") as string,
    });
  }
  revalidatePath("/dashboard");
}

// ── Pitches ──────────────────────────────────────────────────────────────────

export async function createPitch(formData: FormData) {
  const session = await requireRole("admin", "editor", "writer");
  const { data: window } = await db.from("pitch_windows").select("id").limit(1).single();
  if (!window) throw new Error("No pitch window");

  const isEditor = session.role === "admin" || session.role === "editor";
  await db.from("pitches").insert({
    pitch_window_id: window.id,
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    proposed_by_id: session.userId,
    proposed_by_role: isEditor ? "editor" : "writer",
    status: isEditor ? "available" : "under_review",
  });
  revalidatePath("/dashboard");
}

export async function approvePitch(id: string) {
  const session = await requireRole("admin", "editor");
  // Get pitch to find who proposed it
  const { data: pitch } = await db.from("pitches").select("proposed_by_id, proposed_by_role").eq("id", id).single();
  if (!pitch) throw new Error("Pitch not found");

  if (pitch.proposed_by_role === "writer") {
    // Auto-claim by the proposing writer
    await db.from("pitches").update({
      status: "claimed",
      claimed_by_id: pitch.proposed_by_id,
    }).eq("id", id);
    // Create their pipeline
    await db.from("pipelines").upsert({
      writer_id: pitch.proposed_by_id,
      pitch_id: id,
    }, { onConflict: "writer_id" });
  } else {
    await db.from("pitches").update({ status: "available" }).eq("id", id);
  }
  revalidatePath("/dashboard");
}

export async function rejectPitch(id: string) {
  await requireRole("admin", "editor");
  await db.from("pitches").update({ status: "rejected" }).eq("id", id);
  revalidatePath("/dashboard");
}

export async function claimPitch(id: string) {
  const session = await requireRole("writer");
  // Check it's still available
  const { data: pitch } = await db.from("pitches").select("status").eq("id", id).single();
  if (!pitch || pitch.status !== "available") throw new Error("Pitch no longer available");

  await db.from("pitches").update({
    status: "claimed",
    claimed_by_id: session.userId,
  }).eq("id", id);

  await db.from("pipelines").upsert({
    writer_id: session.userId,
    pitch_id: id,
  }, { onConflict: "writer_id" });
  revalidatePath("/dashboard");
}

export async function deletePitch(id: string) {
  await requireRole("admin", "editor");
  await db.from("pitches").delete().eq("id", id);
  revalidatePath("/dashboard");
}

// ── Pipeline ─────────────────────────────────────────────────────────────────

export async function updatePipelineSchedule(formData: FormData) {
  await requireRole("admin", "editor");
  await db.from("pipeline_config").upsert({
    id: "singleton",
    draft_v1_due: formData.get("draft_v1_due") || null,
    editor_r1_done_by: formData.get("editor_r1_done_by") || null,
    draft_v2_due: formData.get("draft_v2_due") || null,
    final_editor_done_by: formData.get("final_editor_done_by") || null,
    final_version_due: formData.get("final_version_due") || null,
    publish_date: formData.get("publish_date") || null,
    updated_at: new Date().toISOString(),
  }, { onConflict: "id" });
  revalidatePath("/dashboard");
}

export async function submitPipelineLink(stage: string, link: string, writerId?: string) {
  const session = await requireRole("writer", "admin", "editor");
  const targetId = writerId || session.userId;

  const updateMap: Record<string, string> = {
    draft_v1: "draft_v1_link",
    draft_v2: "draft_v2_link",
    final_version: "final_version_link",
  };
  const timestampMap: Record<string, string> = {
    draft_v1: "draft_v1_submitted_at",
    draft_v2: "draft_v2_submitted_at",
    final_version: "final_version_submitted_at",
  };

  if (!updateMap[stage]) throw new Error("Invalid stage");

  await db.from("pipelines").update({
    [updateMap[stage]]: link,
    [timestampMap[stage]]: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }).eq("writer_id", targetId);
  revalidatePath("/dashboard");
}

export async function completeEditorStage(stage: "r1" | "final", writerId: string, reviewLink: string, notes: string) {
  await requireRole("admin", "editor");

  const fields = stage === "r1" ? {
    editor_r1_review_link: reviewLink,
    editor_r1_notes: notes,
    editor_r1_checked_at: new Date().toISOString(),
  } : {
    final_editor_review_link: reviewLink,
    final_editor_notes: notes,
    final_editor_checked_at: new Date().toISOString(),
  };

  await db.from("pipelines").update({
    ...fields,
    updated_at: new Date().toISOString(),
  }).eq("writer_id", writerId);
  revalidatePath("/dashboard");
}

export async function publishArticle(writerId: string, publishedUrl: string) {
  await requireRole("admin", "editor");
  await db.from("pipelines").update({
    published_url: publishedUrl,
    published_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }).eq("writer_id", writerId);
  revalidatePath("/dashboard");
}

// ── Profile ──────────────────────────────────────────────────────────────────

export async function updateProfile(formData: FormData) {
  const session = await requireRole("admin", "editor", "writer");
  await db.from("users").update({
    name: (formData.get("name") as string)?.trim() || undefined,
    email: (formData.get("email") as string)?.trim() || null,
    avatar_url: (formData.get("avatar_url") as string)?.trim() || null,
  }).eq("id", session.userId);
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/profile");
}

export async function changeOwnPassword(formData: FormData) {
  const session = await requireRole("admin", "editor", "writer");
  const current = formData.get("current_password") as string;
  const next = formData.get("new_password") as string;

  const { data: user } = await db.from("users").select("password_hash").eq("id", session.userId).single();
  if (!user) throw new Error("User not found");

  const valid = await bcrypt.compare(current, user.password_hash);
  if (!valid) return "Current password is incorrect";

  const hash = await bcrypt.hash(next, 12);
  await db.from("users").update({ password_hash: hash }).eq("id", session.userId);
  revalidatePath("/dashboard/profile");
  return null;
}

// ── Admin: users ─────────────────────────────────────────────────────────────

export async function createUser(formData: FormData) {
  await requireRole("admin");
  const password = formData.get("password") as string;
  const hash = await bcrypt.hash(password, 12);

  await db.from("users").insert({
    name: formData.get("name") as string,
    username: (formData.get("username") as string).trim().toLowerCase(),
    password_hash: hash,
    role: formData.get("role") as string,
  });
  revalidatePath("/dashboard/admin");
}

export async function deleteUser(id: string) {
  await requireRole("admin");
  await db.from("users").delete().eq("id", id);
  revalidatePath("/dashboard/admin");
}

export async function resetPassword(id: string, newPassword: string) {
  await requireRole("admin");
  const hash = await bcrypt.hash(newPassword, 12);
  await db.from("users").update({ password_hash: hash }).eq("id", id);
  revalidatePath("/dashboard/admin");
}
