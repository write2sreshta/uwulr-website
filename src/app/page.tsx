import Link from "next/link";
import Image from "next/image";

const events = [
  {
    label: "Saturday, October 24 · 11:59 PM",
    date: "Oct 24",
    title: "Op-Ed Writers Program Applications Due",
    tag: "Op-Eds",
    href: "https://forms.gle/p459ctpUzL8XUamx5",
  },
  {
    label: "Recurring · Every Friday",
    date: "4–5 PM",
    title: "Exec & Editorial Team Meeting",
    tag: "Internal",
    href: null,
  },
  {
    label: "Wednesday, October 28",
    date: "Oct 28",
    title: "Podcast Episode 1 Drops",
    tag: "Podcast",
    href: null,
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
              fontSize: "clamp(2rem, 9vw, 5.5rem)",
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
              fontSize: "clamp(2rem, 9vw, 5.5rem)",
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
              Read the Journal
            </Link>
            <Link
              href="/op-eds"
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
              Apply to Op-Ed
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
                Op-Ed Writers Program
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
                Apply Now
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
                Join our student commentary program
              </p>
            </div>
            <Link
              href="/op-eds"
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
          src="/events-library.jpg"
          alt="Suzzallo Library reading room"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0" style={{ background: "rgba(20,10,40,0.63)" }} />
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
            {events.map(({ label, date, title, tag, href }) => (
              <div
                key={title}
                style={{
                  backgroundColor: "rgba(42,24,80,0.75)",
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
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#ffffff",
                        fontSize: "1rem",
                        fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
                        letterSpacing: "0.03em",
                        textDecoration: "underline",
                        textDecorationColor: "rgba(183,165,122,0.5)",
                        textUnderlineOffset: "3px",
                      }}
                    >
                      {title} →
                    </a>
                  ) : (
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
                  )}
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

      {/* ── Meet the Team strip ── */}
      <section className="py-16" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-8 flex items-center justify-between gap-6 flex-wrap">
          <div>
            <p
              style={{
                color: "#b7a57a",
                fontSize: "0.65rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
                fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
              }}
            >
              Editorial Board
            </p>
            <h2
              style={{
                color: "#2a1850",
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
                letterSpacing: "0.03em",
              }}
            >
              Meet the Team
            </h2>
          </div>
          <Link
            href="/team"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "#4b2e83",
              color: "#ffffff",
              padding: "0.85rem 2rem",
              fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            Our Team →
          </Link>
        </div>
      </section>

    </>
  );
}
