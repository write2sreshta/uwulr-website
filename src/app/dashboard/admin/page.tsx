import { getSession } from "@/lib/session";
import { db } from "@/lib/supabase";
import { redirect } from "next/navigation";
import AdminPanel from "./AdminPanel";

export default async function AdminPage() {
  const session = await getSession();
  if (!session.isLoggedIn || session.role !== "admin") redirect("/dashboard");

  const { data: users } = await db
    .from("users")
    .select("id, name, username, role, created_at")
    .order("created_at", { ascending: true });

  return (
    <div style={{ padding: "1.5rem", maxWidth: "900px", margin: "0 auto" }}>
      <h1
        style={{
          color: "#ffffff",
          fontSize: "0.65rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
          marginBottom: "1.5rem",
        }}
      >
        Team Management
      </h1>
      <AdminPanel users={users ?? []} />
    </div>
  );
}
