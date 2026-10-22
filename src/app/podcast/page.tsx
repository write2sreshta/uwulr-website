import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Podcast | UW Undergraduate Law Review",
};


export default function PodcastPage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden" style={{ minHeight: "280px" }}>
        <Image
          src="/podcast-campus.jpg"
          alt="University of Washington campus in winter"
          fill
          className="object-cover object-center"
          priority
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(20,10,40,0.63)" }}
        />
        <div className="absolute inset-0" style={{ borderBottom: "3px solid #b7a57a" }} />
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 py-20">
          <h1
            style={{
              color: "#ffffff",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              lineHeight: 1.1,
              fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
              letterSpacing: "0.05em",
            }}
          >
            Podcast
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: "1.4rem",
              marginTop: "0.35rem",
              lineHeight: 1.2,
              maxWidth: "540px",
              fontFamily: "'Anaktoria', Georgia, serif",
            }}
          >
            Conversations with legal scholars, practitioners, and thinkers, hosted by the UW Undergraduate Law Review.
          </p>
          {/* Spotify badge */}
          <a
            href="https://open.spotify.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginTop: "1.5rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "#1DB954",
              color: "#ffffff",
              padding: "0.6rem 1.4rem",
              fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            Follow on Spotify
          </a>
        </div>
      </section>

      {/* Episodes */}
      <section className="py-16" style={{ backgroundColor: "#f5f2ee" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-8">

          {/* Guest callout */}
          <div style={{ backgroundColor: "#4b2e83", padding: "1.5rem 2rem", marginBottom: "2rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1.5rem", flexWrap: "wrap" }}>
            <div>
              <h2 style={{ color: "#ffffff", fontSize: "1.1rem", fontFamily: "'Lovelo Solid', 'Futura', sans-serif", letterSpacing: "0.04em", marginBottom: "0.35rem" }}>
                Want to Be a Guest?
              </h2>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", lineHeight: 1.55, fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}>
                We welcome legal scholars, practitioners, and advocates who want to share their perspectives with our audience.
              </p>
            </div>
            <a href="mailto:ulawreview@uw.edu?subject=Podcast Guest Inquiry" style={{ flexShrink: 0, display: "inline-block", backgroundColor: "#b7a57a", color: "#2a1850", padding: "0.65rem 1.5rem", fontFamily: "'Lovelo Solid', 'Futura', sans-serif", fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", textDecoration: "none" }}>
              Get in Touch
            </a>
          </div>

          {/* Empty state */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "4rem 0", position: "relative" }}>
            <div style={{ position: "absolute", width: "160px", height: "160px", borderRadius: "50%", backgroundColor: "rgba(183,165,122,0.25)" }} />
            <span style={{ position: "relative", fontSize: "2rem", opacity: 0.5, color: "#4b2e83" }}>✦</span>
            <p style={{ position: "relative", marginTop: "0.35rem", color: "rgba(75,46,131,0.75)", fontSize: "0.95rem", fontFamily: "'Anaktoria', Georgia, serif", fontStyle: "italic", textAlign: "center", lineHeight: 1.2 }}>
              episodes coming soon
            </p>
          </div>
        </div>
      </section>

    </>
  );
}
