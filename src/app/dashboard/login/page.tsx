"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/auth";

export default function LoginPage() {
  const [error, action, pending] = useActionState(login, null);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f0a1e",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "2.5rem",
          backgroundColor: "#1a1130",
          border: "1px solid rgba(183,165,122,0.2)",
          borderRadius: "12px",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#b7a57a",
              fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
              marginBottom: "0.5rem",
            }}
          >
            UW Undergraduate Law Review
          </div>
          <h1
            style={{
              color: "#ffffff",
              fontSize: "1.4rem",
              fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
              letterSpacing: "0.05em",
              margin: 0,
            }}
          >
            Writers Dashboard
          </h1>
        </div>

        <form action={action} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label
              htmlFor="username"
              style={{
                display: "block",
                color: "rgba(255,255,255,0.6)",
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "0.4rem",
                fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
              }}
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              style={{
                width: "100%",
                padding: "0.65rem 0.85rem",
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(183,165,122,0.3)",
                borderRadius: "6px",
                color: "#ffffff",
                fontSize: "0.95rem",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              style={{
                display: "block",
                color: "rgba(255,255,255,0.6)",
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "0.4rem",
                fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
              }}
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              style={{
                width: "100%",
                padding: "0.65rem 0.85rem",
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(183,165,122,0.3)",
                borderRadius: "6px",
                color: "#ffffff",
                fontSize: "0.95rem",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          {error && (
            <p style={{ color: "#f87171", fontSize: "0.85rem", margin: 0 }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            style={{
              marginTop: "0.5rem",
              padding: "0.75rem",
              backgroundColor: "#b7a57a",
              color: "#1a1130",
              border: "none",
              borderRadius: "6px",
              fontSize: "0.75rem",
              fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              cursor: pending ? "not-allowed" : "pointer",
              opacity: pending ? 0.7 : 1,
              transition: "opacity 0.2s",
            }}
          >
            {pending ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
