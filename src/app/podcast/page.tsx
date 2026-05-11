import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Podcast | UW Undergraduate Law Review",
};

const episodes = [
  {
    title: "Episode Title",
    guest: "Guest Name",
    guestTitle: "Guest Title / Affiliation",
    description:
      "A brief description of what was discussed in this episode — the legal topic, key arguments, and why it matters.",
    spotifyUrl: null,
    photo: null,
    initials: "GN",
    episode: "Ep. 1",
    date: "Spring 2026",
  },
];

function EpisodeCard({ ep }: { ep: typeof episodes[number] }) {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid #e8e2d8",
        borderLeft: "4px solid #4b2e83",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "2rem",
          padding: "2rem 2.5rem",
          alignItems: "flex-start",
        }}
      >
        {/* Guest photo */}
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            overflow: "hidden",
            border: "2px solid #b7a57a",
            backgroundColor: "#4b2e83",
            flexShrink: 0,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {ep.photo ? (
            <Image
              src={ep.photo}
              alt={ep.guest}
              fill
              sizes="100px"
              className="object-cover object-top"
            />
          ) : (
            <span
              style={{
                color: "#b7a57a",
                fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
                fontSize: "1.4rem",
                letterSpacing: "0.05em",
              }}
            >
              {ep.initials}
            </span>
          )}
        </div>

        {/* Episode info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
            <span
              style={{
                display: "inline-block",
                backgroundColor: "#faf8f4",
                border: "1px solid #e8e2d8",
                color: "#4b2e83",
                fontSize: "0.6rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "0.25rem 0.65rem",
                fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
              }}
            >
              {ep.episode}
            </span>
            <span
              style={{
                color: "#aaa",
                fontSize: "0.75rem",
                fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
              }}
            >
              {ep.date}
            </span>
          </div>

          <h2
            style={{
              color: "#2a1850",
              fontSize: "1.2rem",
              lineHeight: 1.3,
              marginBottom: "0.4rem",
              fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
              letterSpacing: "0.02em",
            }}
          >
            {ep.title}
          </h2>

          <p
            style={{
              color: "#4b2e83",
              fontSize: "0.875rem",
              fontStyle: "italic",
              marginBottom: "0.1rem",
              fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
            }}
          >
            {ep.guest}
          </p>
          <p
            style={{
              color: "#aaa",
              fontSize: "0.8rem",
              marginBottom: "1rem",
              fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
            }}
          >
            {ep.guestTitle}
          </p>

          <p
            style={{
              color: "#666",
              fontSize: "1rem",
              lineHeight: 1.8,
              fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
            }}
          >
            {ep.description}
          </p>
        </div>
      </div>

      {/* Listen bar */}
      <div
        style={{
          borderTop: "1px solid #e8e2d8",
          backgroundColor: "#faf8f4",
          padding: "1rem 2.5rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        {/* Spotify icon + label */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#1DB954" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
        <span
          style={{
            color: "#555",
            fontSize: "0.8rem",
            fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
            letterSpacing: "0.05em",
          }}
        >
          Available on Spotify
        </span>

        {ep.spotifyUrl ? (
          <a
            href={ep.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginLeft: "auto",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              backgroundColor: "#1DB954",
              color: "#ffffff",
              padding: "0.5rem 1.25rem",
              fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            Listen Now →
          </a>
        ) : (
          <span
            style={{
              marginLeft: "auto",
              color: "#bbb",
              fontSize: "0.75rem",
              fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
              fontStyle: "italic",
            }}
          >
            Coming soon
          </span>
        )}
      </div>
    </div>
  );
}

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

          <div className="flex flex-col gap-8">
            {episodes.map((ep) => (
              <EpisodeCard key={ep.episode} ep={ep} />
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
