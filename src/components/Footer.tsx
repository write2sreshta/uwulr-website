import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      style={{ backgroundColor: "#2a1850", borderTop: "3px solid #b7a57a" }}
      className="text-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-10" style={{ alignItems: "start", justifyContent: "space-between" }}>
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 mb-1">
              <Image
                src="/logo.png"
                alt="UW Undergraduate Law Review seal"
                width={44}
                height={44}
                className="object-contain"
              />
              <p
                style={{
                  color: "#b7a57a",
                  fontSize: "0.85rem",
                  fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
                  letterSpacing: "0.04em",
                  lineHeight: 1.3,
                }}
              >
                UW Undergraduate<br />Law Review
              </p>
            </div>
            <p
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "1.05rem",
                lineHeight: 1.3,
                fontFamily: "'Anaktoria', Georgia, serif",
              }}
            >
              The University of Washington&apos;s premier forum for publishing<br />rigorous undergraduate legal scholarship.
            </p>
            <p
              style={{
                color: "#b7a57a",
                fontSize: "0.65rem",
                letterSpacing: "0.14em",
                marginTop: "0.15rem",
                fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
              }}
            >
              EST. 2025
            </p>
            <a
              href="https://www.instagram.com/uwuglawreview"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              style={{ color: "rgba(183,165,122,0.6)", display: "flex", alignItems: "center", marginTop: "0.5rem" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>

          {/* Navigation + Contact grouped right */}
          <div className="flex flex-row gap-16">
          <div className="flex flex-col gap-3">
            <p
              style={{
                color: "#b7a57a",
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: "0.25rem",
                fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
              }}
            >
              Pages
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem 2rem" }}>
              {[
                { href: "/", label: "Home" },
                { href: "/op-eds", label: "Op-Eds" },
                { href: "/journal", label: "Journal" },
                { href: "/podcast", label: "Podcast" },
                { href: "/team", label: "Our Team" },
                { href: "/contact", label: "Contact Us" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  style={{
                    color: "rgba(255,255,255,0.65)",
                    fontSize: "0.875rem",
                    textDecoration: "none",
                    fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
                  }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <p
              style={{
                color: "#b7a57a",
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: "0.25rem",
                fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
              }}
            >
              Contact
            </p>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.875rem", fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}>
              University of Washington
            </p>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.875rem", fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}>
              Seattle, WA 98195
            </p>
            <a
              href="mailto:ulawreview@uw.edu"
              style={{ color: "#b7a57a", fontSize: "0.8rem", textDecoration: "none", fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}
            >
              ulawreview@uw.edu
            </a>
            <a
              href="mailto:journal.uwuglawreview@gmail.com"
              style={{ color: "rgba(183,165,122,0.75)", fontSize: "0.8rem", textDecoration: "none", fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}
            >
              journal.uwuglawreview@gmail.com
            </a>
            <a
              href="mailto:oped.uwuglawreview@gmail.com"
              style={{ color: "rgba(183,165,122,0.75)", fontSize: "0.8rem", textDecoration: "none", fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}
            >
              oped.uwuglawreview@gmail.com
            </a>
          </div>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(183,165,122,0.2)",
            marginTop: "2.5rem",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}>
            © 2025 UW Undergraduate Law Review. All rights reserved.
          </p>
          <p
            style={{
              color: "rgba(255,255,255,0.3)",
              fontSize: "0.7rem",
              fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
              letterSpacing: "0.06em",
            }}
          >
            Est. 2025 · Seattle, Washington
          </p>
        </div>
      </div>
    </footer>
  );
}
