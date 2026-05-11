import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Contact Us | UW Undergraduate Law Review",
};

const contacts = [
  {
    type: "General Inquiries",
    email: "ulawreview@uw.edu",
    description:
      "For general questions about the UW Undergraduate Law Review, membership, events, or anything else.",
    icon: "✉",
  },
  {
    type: "Journal Submissions",
    email: "journal.uwuglawreview@gmail.com",
    description:
      "For inquiries related to long-form journal paper submissions, the review process, or publication status.",
    icon: "§",
  },
  {
    type: "Op-Ed Submissions",
    email: "oped.uwuglawreview@gmail.com",
    description:
      "For inquiries related to op-ed submissions, commentary pitches, or the op-ed editorial process.",
    icon: "✦",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden" style={{ minHeight: "280px" }}>
        <Image
          src="/campus.jpg"
          alt="University of Washington campus"
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
            Contact Us
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
            Reach out to the right inbox — we have dedicated addresses for general inquiries, journal submissions, and op-ed submissions.
          </p>
        </div>
      </section>

      {/* Contact cards */}
      <section className="py-20" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-8">

          {/* Purple callout */}
          <div
            style={{
              backgroundColor: "#4b2e83",
              padding: "1.5rem 2rem",
              marginBottom: "1.75rem",
            }}
          >
            <h2
              style={{
                color: "#ffffff",
                fontSize: "1.1rem",
                fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
                letterSpacing: "0.04em",
                marginBottom: "0.4rem",
              }}
            >
              We&apos;d Love to Hear From You
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "1rem",
                lineHeight: 1.65,
                fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
              }}
            >
              Whether you&apos;re a student interested in joining, a faculty member looking to collaborate, or a reader with a question — don&apos;t hesitate to reach out.
            </p>
            <p
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "1rem",
                lineHeight: 1.65,
                fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
                marginTop: "0.65rem",
              }}
            >
              To stay informed about future submission cycles, calls for op-ed writers, and opportunities to join our editorial team, please fill out our{" "}
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSflxjw9T6pUTOm0HO55cc6n0Tlh6mPHGC91SIccy2672eVy5w/viewform"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#b7a57a", textDecoration: "underline" }}
              >
                Mailing List
              </a>{" "}
              and follow us on Instagram:{" "}
              <a
                href="https://www.instagram.com/uwuglawreview"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#b7a57a", textDecoration: "underline" }}
              >
                @uwuglawreview
              </a>
            </p>
          </div>

          {/* General Inquiries — full width */}
          {(() => {
            const main = contacts[0];
            return (
              <div
                style={{
                  border: "1px solid #e8e2d8",
                                    backgroundColor: "#faf8f4",
                  padding: "2rem 2.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div className="flex items-center gap-3 mb-1">
                  <p style={{ color: "#b7a57a", fontSize: "0.8rem", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "'Lovelo Solid', 'Futura', sans-serif" }}>
                    {main.type}
                  </p>
                </div>
                <a href={`mailto:${main.email}`} style={{ fontFamily: "'Lovelo Solid', 'Futura', sans-serif", color: "#2a1850", fontSize: "clamp(1rem, 2vw, 1.3rem)", letterSpacing: "0.03em", textDecoration: "none", borderBottom: "2px solid #b7a57a", paddingBottom: "1px", alignSelf: "flex-start" }}>
                  {main.email}
                </a>
                <p style={{ color: "#666", fontSize: "0.95rem", lineHeight: 1.75, marginTop: "0.5rem", fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}>
                  {main.description}
                </p>
              </div>
            );
          })()}

          {/* Journal + Op-Ed — side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contacts.slice(1).map(({ type, email, description, icon }) => (
              <div
                key={type}
                style={{
                  border: "1px solid #e8e2d8",
                                    backgroundColor: "#faf8f4",
                  padding: "2rem 2.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <div className="flex items-center gap-3 mb-1">
                  <p
                    style={{
                      color: "#b7a57a",
                      fontSize: "0.8rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
                    }}
                  >
                    {type}
                  </p>
                </div>

                <a
                  href={`mailto:${email}`}
                  style={{
                    fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
                    color: "#2a1850",
                    fontSize: "1rem",
                    letterSpacing: "0.03em",
                    textDecoration: "none",
                    borderBottom: "2px solid #b7a57a",
                    paddingBottom: "1px",
                    alignSelf: "flex-start",
                    wordBreak: "break-all",
                  }}
                >
                  {email}
                </a>

                <p
                  style={{
                    color: "#666",
                    fontSize: "0.95rem",
                    lineHeight: 1.75,
                    marginTop: "0.5rem",
                    fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
                  }}
                >
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
