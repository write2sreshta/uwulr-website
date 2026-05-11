import Link from "next/link";
import Image from "next/image";

const events = [
  {
    label: "Recurring · Every Tuesday",
    date: "8:30 PM",
    title: "Executive Board Meeting",
    tag: "Internal",
  },
  {
    label: "Friday, May 15",
    date: "May 15",
    title: "Op-Ed Writers Program — First Pitch Doc Releases",
    tag: "Op-Eds",
  },
  {
    label: "Sunday, May 18",
    date: "May 18",
    title: "Long-Form Spring '26 Applications Due",
    tag: "Journal · 11:59 PM",
  },
];

const highlights = [
  { number: "2025", label: "Est." },
  { number: "UW", label: "Seattle" },
  { number: "Open", label: "Submissions" },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero with UW campus background ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "88vh" }}>
        {/* Campus background photo */}
        <Image
          src="/campus.jpg"
          alt="University of Washington campus aerial view"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Dark purple gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "rgba(20,10,40,0.63)",
          }}
        />

        {/* Hero content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 lg:px-8"
          style={{ minHeight: "88vh" }}>

          {/* Seal */}
          <div className="mb-8">
            <Image
              src="/logo.png"
              alt="UW Undergraduate Law Review seal"
              width={130}
              height={130}
              className="object-contain mx-auto"
              style={{ filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.5))" }}
            />
          </div>

          {/* Above title */}
          <p
            style={{
              color: "#b7a57a",
              fontSize: "1.35rem",
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
              marginBottom: "0.15rem",
            }}
          >
            University of Washington
          </p>

          <h1
            style={{
              color: "#ffffff",
              fontSize: "clamp(3.5rem, 8vw, 5.5rem)",
              lineHeight: 1,
              letterSpacing: "0.06em",
              marginBottom: 0,
              fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
              textTransform: "uppercase",
            }}
          >
            Undergraduate
          </h1>
          <h1
            style={{
              color: "#ffffff",
              fontSize: "clamp(3.5rem, 8vw, 5.5rem)",
              lineHeight: 1,
              letterSpacing: "0.06em",
              marginBottom: "0.15rem",
              fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
              textTransform: "uppercase",
            }}
          >
            Law Review
          </h1>

          {/* Below title */}
          <p
            style={{
              color: "#ffffff",
              fontSize: "1rem",
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
              marginBottom: "1.75rem",
            }}
          >
            Est. 2025
          </p>

          <p
            style={{
              color: "rgba(255,255,255,0.78)",
              fontSize: "1.4rem",
              lineHeight: 1.2,
              maxWidth: "600px",
              margin: "0 auto 2.5rem",
              fontStyle: "italic",
              fontFamily: "'Anaktoria', Georgia, serif",
            }}
          >
            The University of Washington&apos;s premier forum for publishing
            <br />
            rigorous undergraduate legal scholarship.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/journal"
              style={{
                display: "inline-block",
                backgroundColor: "#b7a57a",
                color: "#2a1850",
                padding: "0.9rem 2.4rem",
                fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              Read the Journal
            </Link>
            <Link
              href="/op-eds"
              style={{
                display: "inline-block",
                border: "1px solid rgba(183,165,122,0.7)",
                color: "#b7a57a",
                padding: "0.9rem 2.4rem",
                fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              Browse Op-Eds
            </Link>
          </div>
        </div>
      </section>

      {/* ── Call for Submissions ── */}
      <section style={{ backgroundColor: "#4b2e83" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-8 py-8">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "2rem",
              flexWrap: "wrap",
            }}
          >
            <div>
              <p
                style={{
                  color: "#b7a57a",
                  fontSize: "0.6rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
                  marginBottom: "0.35rem",
                }}
              >
                Journal Vol. 1 · Spring 2026
              </p>
              <h2
                style={{
                  color: "#ffffff",
                  fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
                  fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
                  letterSpacing: "0.04em",
                  marginBottom: "0.4rem",
                }}
              >
                Now Accepting Submissions
              </h2>
              <p
                style={{
                  color: "#b7a57a",
                  fontSize: "1.05rem",
                  fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
                  letterSpacing: "0.04em",
                  fontWeight: 700,
                }}
              >
                Deadline: May 18 at 11:59 PM
              </p>
            </div>
            <Link
              href="/journal"
              style={{
                color: "#b7a57a",
                fontSize: "1.6rem",
                textDecoration: "none",
                flexShrink: 0,
                lineHeight: 1,
              }}
            >
              →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p
                style={{
                  color: "#b7a57a",
                  fontSize: "0.65rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                  fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
                }}
              >
                Our Mission
              </p>
              <h2
                style={{
                  color: "#2a1850",
                  fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)",
                  lineHeight: 1.2,
                  marginBottom: "1.5rem",
                  fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
                  letterSpacing: "0.03em",
                }}
              >
                Elevating Undergraduate Legal Scholarship
              </h2>
              <div style={{ width: "48px", height: "2px", backgroundColor: "#b7a57a", marginBottom: "1.5rem" }} />
              <p
                style={{
                  color: "#555",
                  fontSize: "1rem",
                  lineHeight: 1.9,
                  marginBottom: "1.25rem",
                  fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
                }}
              >
                The purpose of the University of Washington Undergraduate Law Review is to serve as
                the institution&apos;s premier forum for undergraduate legal scholarship. Our mission
                is to uphold the highest standards of academic rigor, editorial integrity, and
                intellectual curiosity as we publish original research on law and policy.
              </p>
              <p
                style={{
                  color: "#555",
                  fontSize: "1rem",
                  lineHeight: 1.9,
                  fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
                }}
              >
                By fostering connections with faculty, legal professionals, and interdisciplinary
                departments across campus, we cultivate a community where undergraduate voices
                contribute meaningfully to national conversations about law, justice, and policy.
              </p>
            </div>

            {/* Quote block with campus accent image */}
            <div className="relative">
              {/* Accent campus photo */}
              <div className="relative w-full mb-6 overflow-hidden" style={{ height: "200px" }}>
                <Image
                  src="/tabling.jpeg"
                  alt="UW Undergraduate Law Review tabling event"
                  fill
                  className="object-cover object-center"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(180deg, transparent 65%, rgba(250,248,244,0.45) 100%)" }}
                />
              </div>

              <div
                style={{
                  backgroundColor: "#faf8f4",
                  border: "1px solid #e8e2d8",
                  borderLeft: "4px solid #b7a57a",
                  padding: "2rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
                    fontSize: "4rem",
                    color: "#b7a57a",
                    opacity: 0.35,
                    lineHeight: 1,
                    display: "block",
                    marginBottom: "0.5rem",
                  }}
                >
                  &ldquo;
                </span>
                <p
                  style={{
                    fontFamily: "'Anaktoria', Georgia, serif",
                    color: "#3a2266",
                    fontSize: "1.1rem",
                    lineHeight: 1.75,
                    fontStyle: "italic",
                  }}
                >
                  The University of Washington&apos;s premier forum for publishing rigorous
                  undergraduate legal scholarship.
                </p>
                <div style={{ marginTop: "1.25rem", borderTop: "1px solid #e8e2d8", paddingTop: "0.85rem" }}>
                  <p
                    style={{
                      color: "#b7a57a",
                      fontSize: "0.6rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
                    }}
                  >
                    UW Undergraduate Law Review · Est. 2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Upcoming Events ── */}
      <section className="relative py-28 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1920&q=80"
          alt="University campus"
          fill
          className="object-cover object-center"
          unoptimized
        />
        <div className="absolute inset-0" style={{ background: "rgba(42,24,80,0.92)" }} />
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <p
              style={{
                color: "#b7a57a",
                fontSize: "0.65rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
                fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
              }}
            >
              Calendar
            </p>
            <h2
              style={{
                color: "#ffffff",
                fontSize: "clamp(1.6rem, 3.5vw, 2.3rem)",
                fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
                letterSpacing: "0.04em",
              }}
            >
              Upcoming Events & Deadlines
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {events.map(({ label, date, title, tag }) => (
              <div
                key={title}
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(183,165,122,0.25)",
                  borderLeft: "4px solid #b7a57a",
                  padding: "1.5rem 2rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "2rem",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    minWidth: "60px",
                    textAlign: "center",
                    flexShrink: 0,
                  }}
                >
                  <p
                    style={{
                      color: "#b7a57a",
                      fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
                      fontSize: "1.3rem",
                      lineHeight: 1,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {date}
                  </p>
                </div>
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.45)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
                      marginBottom: "0.3rem",
                    }}
                  >
                    {label}
                  </p>
                  <h3
                    style={{
                      color: "#ffffff",
                      fontSize: "1rem",
                      fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
                      letterSpacing: "0.03em",
                    }}
                  >
                    {title}
                  </h3>
                </div>
                <span
                  style={{
                    display: "inline-block",
                    border: "1px solid rgba(183,165,122,0.4)",
                    color: "#b7a57a",
                    fontSize: "0.55rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "0.25rem 0.65rem",
                    fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
                    flexShrink: 0,
                  }}
                >
                  {tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Publication cards ── */}
      <section className="py-24" style={{ backgroundColor: "#faf8f4" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <p
              style={{
                color: "#b7a57a",
                fontSize: "0.65rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
                fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
              }}
            >
              Explore
            </p>
            <h2
              style={{
                color: "#2a1850",
                fontSize: "clamp(1.6rem, 3.5vw, 2.3rem)",
                fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
                letterSpacing: "0.04em",
              }}
            >
              Our Publications
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Op-Eds card */}
            <Link href="/op-eds" style={{ textDecoration: "none" }}>
              <div
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e8e2d8",
                  overflow: "hidden",
                  height: "100%",
                  cursor: "pointer",
                }}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative w-full" style={{ height: "180px" }}>
                  <Image
                    src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80"
                    alt="Law books"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0" style={{ background: "rgba(42,24,80,0.3)" }} />
                </div>
                <div style={{ padding: "2rem" }}>
                  <p
                    style={{
                      color: "#b7a57a",
                      fontSize: "0.6rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      marginBottom: "0.75rem",
                      fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
                    }}
                  >
                    Commentary
                  </p>
                  <h3
                    style={{
                      color: "#2a1850",
                      fontSize: "1.4rem",
                      marginBottom: "0.75rem",
                      fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
                    }}
                  >
                    Op-Eds
                  </h3>
                  <p
                    style={{
                      color: "#666",
                      fontSize: "1rem",
                      lineHeight: 1.8,
                      marginBottom: "1.25rem",
                      fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
                    }}
                  >
                    Timely student commentary on legal issues, policy debates, and matters of
                    public concern — written for a broad, engaged audience.
                  </p>
                  <span
                    style={{
                      color: "#4b2e83",
                      fontSize: "0.7rem",
                      fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      borderBottom: "2px solid #b7a57a",
                      paddingBottom: "1px",
                    }}
                  >
                    Browse Op-Eds →
                  </span>
                </div>
              </div>
            </Link>

            {/* Journal card */}
            <Link href="/journal" style={{ textDecoration: "none" }}>
              <div
                style={{
                  overflow: "hidden",
                  height: "100%",
                  cursor: "pointer",
                  backgroundColor: "#2a1850",
                }}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative w-full" style={{ height: "180px" }}>
                  <Image
                    src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80"
                    alt="Legal library"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0" style={{ background: "rgba(42,24,80,0.5)" }} />
                </div>
                <div style={{ padding: "2rem" }}>
                  <p
                    style={{
                      color: "#b7a57a",
                      fontSize: "0.6rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      marginBottom: "0.75rem",
                      fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
                    }}
                  >
                    Scholarship
                  </p>
                  <h3
                    style={{
                      color: "#ffffff",
                      fontSize: "1.4rem",
                      marginBottom: "0.75rem",
                      fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
                    }}
                  >
                    Journal
                  </h3>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.65)",
                      fontSize: "1rem",
                      lineHeight: 1.8,
                      marginBottom: "1.25rem",
                      fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
                    }}
                  >
                    Peer-reviewed long-form legal scholarship authored by University of Washington
                    undergraduates — our flagship academic publication.
                  </p>
                  <span
                    style={{
                      color: "#b7a57a",
                      fontSize: "0.7rem",
                      fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      borderBottom: "2px solid #b7a57a",
                      paddingBottom: "1px",
                    }}
                  >
                    Read the Journal →
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Team CTA with campus photo strip ── */}
      <section className="relative py-24 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1920&q=80"
          alt="University of Washington Red Square"
          fill
          className="object-cover object-center"
          unoptimized
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(20,10,40,0.63)" }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2
            style={{
              color: "#ffffff",
              fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
              marginBottom: "1rem",
              fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
              letterSpacing: "0.04em",
            }}
          >
            Meet the Editors
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "1rem",
              lineHeight: 1.85,
              marginBottom: "2rem",
              fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
            }}
          >
            The UW Undergraduate Law Review is led by a dedicated team of student editors
            committed to excellence in legal scholarship.
          </p>
          <Link
            href="/team"
            style={{
              display: "inline-block",
              backgroundColor: "#4b2e83",
              color: "#ffffff",
              padding: "0.9rem 2.4rem",
              fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
              fontSize: "0.7rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            View Our Team
          </Link>
        </div>
      </section>
    </>
  );
}
