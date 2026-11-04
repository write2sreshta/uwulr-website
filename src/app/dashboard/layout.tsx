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
        backgroundColor: "#0f0a1e",
        fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top bar */}
      <header
        style={{
          backgroundColor: "#1a1130",
          borderBottom: "1px solid rgba(183,165,122,0.2)",
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
              color: "#b7a57a",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
            }}
          >
            UWULR · Writers Dashboard
          </span>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <a
              href="/dashboard"
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "0.78rem",
                textDecoration: "none",
                padding: "0.3rem 0.6rem",
                borderRadius: "4px",
                transition: "color 0.15s",
              }}
            >
              Dashboard
            </a>
            {(session.role === "admin" || session.role === "editor") && (
              <a
                href="/dashboard/pitches"
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "0.78rem",
                  textDecoration: "none",
                  padding: "0.3rem 0.6rem",
                  borderRadius: "4px",
                }}
              >
                Pitches
              </a>
            )}
            {session.role === "admin" && (
              <a
                href="/dashboard/admin"
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "0.78rem",
                  textDecoration: "none",
                  padding: "0.3rem 0.6rem",
                  borderRadius: "4px",
                }}
              >
                Team
              </a>
            )}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>
            {session.name}
          </span>
          <span
            style={{
              backgroundColor: "rgba(183,165,122,0.15)",
              color: "#b7a57a",
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
                border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.5)",
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
