import { getSession } from "@/lib/session";
import { logout } from "@/app/actions/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session.isLoggedIn) {
    return <>{children}</>;
  }

  const roleLabel: Record<string, string | undefined> = {
    admin: "EIC / Admin",
    editor: "Editor",
    writer: "Writer",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f4ff",
        fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top bar */}
      <header
        style={{
          backgroundColor: "#4b2e83",
          padding: "0 1.5rem",
          height: "56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <span
            style={{
              color: "#e8d9a0",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
            }}
          >
            UWULR · Writers Dashboard
          </span>
          <div style={{ display: "flex", gap: "0.25rem" }}>
            <a
              href="/dashboard"
              style={{
                color: "rgba(255,255,255,0.8)",
                fontSize: "0.78rem",
                textDecoration: "none",
                padding: "0.3rem 0.7rem",
                borderRadius: "4px",
                transition: "background 0.15s",
              }}
            >
              Dashboard
            </a>
            <a
              href="/dashboard/profile"
              style={{
                color: "rgba(255,255,255,0.8)",
                fontSize: "0.78rem",
                textDecoration: "none",
                padding: "0.3rem 0.7rem",
                borderRadius: "4px",
              }}
            >
              Profile
            </a>
            {session.role === "admin" && (
              <a
                href="/dashboard/admin"
                style={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "0.78rem",
                  textDecoration: "none",
                  padding: "0.3rem 0.7rem",
                  borderRadius: "4px",
                }}
              >
                Team
              </a>
            )}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.8rem" }}>
            {session.name}
          </span>
          <span
            style={{
              backgroundColor: "rgba(232,217,160,0.2)",
              color: "#e8d9a0",
              fontSize: "0.6rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "0.2rem 0.5rem",
              borderRadius: "4px",
              fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
            }}
          >
            {session.role ? (roleLabel[session.role] ?? session.role) : ""}
          </span>
          <form action={logout}>
            <button
              type="submit"
              style={{
                background: "none",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "rgba(255,255,255,0.65)",
                fontSize: "0.72rem",
                padding: "0.25rem 0.65rem",
                borderRadius: "4px",
                cursor: "pointer",
                letterSpacing: "0.08em",
              }}
            >
              Sign out
            </button>
          </form>
        </div>
      </header>

      <main style={{ flex: 1, overflow: "auto" }}>{children}</main>
    </div>
  );
}
