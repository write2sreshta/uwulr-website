import { getSession } from "@/lib/session";
import { db } from "@/lib/supabase";
import { redirect } from "next/navigation";
import ProfileClient from "./ProfileClient";

export default async function ProfilePage() {
  const session = await getSession();
  if (!session.isLoggedIn) redirect("/dashboard/login");

  const { data: baseUser } = await db
    .from("users")
    .select("id, name, username, role")
    .eq("id", session.userId)
    .single();

  if (!baseUser) redirect("/dashboard/login");

  // email/avatar_url exist after running: ALTER TABLE users ADD COLUMN email text; ALTER TABLE users ADD COLUMN avatar_url text;
  const { data: extUser } = await db
    .from("users")
    .select("email, avatar_url")
    .eq("id", session.userId)
    .single();

  const user = { ...baseUser, email: extUser?.email ?? null, avatar_url: extUser?.avatar_url ?? null };

  return <ProfileClient user={user} />;
}
