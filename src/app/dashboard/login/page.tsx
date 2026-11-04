"use client";

import { useActionState, useState } from "react";
import { login } from "@/app/actions/auth";

export default function LoginPage() {
  const [error, action, pending] = useActionState(login, null);
  const [showPw, setShowPw] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f4ff",
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
          backgroundColor: "#ffffff",
          border: "1px solid rgba(75,46,131,0.12)",
          borderRadius: "12px",
          boxShadow: "0 4px 24px rgba(75,46,131,0.08)",
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
              color: "#1a0a3d",
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
                color: "rgba(75,46,131,0.6)",
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
                backgroundColor: "#f8f7ff",
                border: "1px solid rgba(75,46,131,0.2)",
                borderRadius: "6px",
                color: "#1a0a3d",
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
                color: "rgba(75,46,131,0.6)",
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "0.4rem",
                fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                id="password"
                name="password"
                type={showPw ? "text" : "password"}
                autoComplete="current-password"
                required
                style={{
                  width: "100%",
                  padding: "0.65rem 2.6rem 0.65rem 0.85rem",
                  backgroundColor: "#f8f7ff",
                  border: "1px solid rgba(75,46,131,0.2)",
                  borderRadius: "6px",
                  color: "#1a0a3d",
                  fontSize: "0.95rem",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                style={{
                  position: "absolute",
                  right: "0.75rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  color: "rgba(75,46,131,0.45)",
                  display: "flex",
                  alignItems: "center",
                }}
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && (
            <p style={{ color: "#b91c1c", fontSize: "0.85rem", margin: 0 }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            style={{
              marginTop: "0.5rem",
              padding: "0.75rem",
              backgroundColor: "#4b2e83",
              color: "#ffffff",
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
