import type { Metadata } from "next";
import Image from "next/image";
import IssueDropdown from "@/components/IssueDropdown";

export const metadata: Metadata = {
  title: "Journal | UW Undergraduate Law Review",
};

const articles = [
  {
    title: "Constitutional Constraints on Algorithmic Governance",
    author: "Author Name",
    year: "Class of 2026",
    abstract:
      "This note examines the constitutional implications of delegating administrative decision-making to algorithmic systems, arguing that non-delegation doctrine and due process principles impose underappreciated limits on the scope of automated governance.",
    category: "Administrative Law",
    pages: "pp. 1–42",
    volume: "Vol. 1, Issue 1",
    pdfUrl: null,
  },
  {
    title: "Originalism, History, and the Right to Bear Arms: A Textual Reconsideration",
    author: "Author Name",
    year: "Class of 2026",
    abstract:
      "Engaging with the Supreme Court's recent historical methodology in Second Amendment cases, this article challenges the internal consistency of the Court's approach and proposes a more coherent framework for constitutional arms regulation.",
    category: "Constitutional Law",
    pages: "pp. 43–89",
    volume: "Vol. 1, Issue 1",
    pdfUrl: null,
  },
  {
    title: "The Paradox of Plea Bargaining: Efficiency, Coercion, and the Sixth Amendment",
    author: "Author Name",
    year: "Class of 2027",
    abstract:
      "This note argues that the structural incentives embedded in plea bargaining systematically undermine the right to trial, and that current doctrine fails to account for coercive pressure as a form of constitutional infirmity.",
    category: "Criminal Procedure",
    pages: "pp. 90–127",
    volume: "Vol. 1, Issue 1",
    pdfUrl: null,
  },
  {
    title: "Corporate Personhood and Political Speech After Citizens United",
    author: "Author Name",
    year: "Class of 2026",
    abstract:
      "A critical evaluation of the theoretical premises underlying corporate constitutional rights, with particular attention to the coherence of extending First Amendment political speech protections to non-natural persons.",
    category: "First Amendment",
    pages: "pp. 128–170",
    volume: "Vol. 1, Issue 1",
    pdfUrl: null,
  },
];

export default function JournalPage() {
  return (
    <>
      {/* Header with campus photo */}
      <section className="relative overflow-hidden" style={{ minHeight: "280px" }}>
        <Image
          src="/journal-campus.jpeg"
          alt="University of Washington campus with cherry blossoms"
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
            Journal
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
            Peer-reviewed long-form legal scholarship authored by University of Washington undergraduates.
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="py-16" style={{ backgroundColor: "#f5f2ee" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-8">

          {/* Submit callout */}
          <div style={{ backgroundColor: "#4b2e83", padding: "1.5rem 2rem", marginBottom: "2rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1.5rem", flexWrap: "wrap" }}>
            <div>
              <h2 style={{ color: "#ffffff", fontSize: "1.1rem", fontFamily: "'Lovelo Solid', 'Futura', sans-serif", letterSpacing: "0.04em", marginBottom: "0.85rem" }}>
                Submit Your Paper
              </h2>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", lineHeight: 1.65, fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}>
                The UW Undergraduate Law Review publishes long-form, research-driven student scholarship on relevant and pressing questions of law. We accept submissions every quarter. Sign up for our <a href="https://docs.google.com/forms/d/e/1FAIpQLSflxjw9T6pUTOm0HO55cc6n0Tlh6mPHGC91SIccy2672eVy5w/viewform" target="_blank" rel="noopener noreferrer" style={{ color: "#b7a57a", textDecoration: "underline" }}>mailing list</a> to be notified when applications open up again!
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.4rem", flexShrink: 0, alignSelf: "flex-start" }}>
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <span style={{ display: "inline-block", backgroundColor: "rgba(183,165,122,0.3)", color: "rgba(255,255,255,0.35)", padding: "0.65rem 1.5rem", fontFamily: "'Lovelo Solid', 'Futura', sans-serif", fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", cursor: "not-allowed" }}>
                  Application
                </span>
                <span style={{ display: "inline-block", backgroundColor: "rgba(183,165,122,0.15)", color: "rgba(255,255,255,0.25)", padding: "0.65rem 1.5rem", fontFamily: "'Lovelo Solid', 'Futura', sans-serif", fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", cursor: "not-allowed" }}>
                  Submission Guidelines
                </span>
              </div>
              <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.75rem", fontStyle: "italic", fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}>
                Fall &apos;26 applications not opened yet
              </span>
            </div>
          </div>

          {/* Current Issue — Volume 1, Spring 2026 */}
          <div style={{ marginTop: "0.5rem" }}>
            <p style={{ color: "#b7a57a", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "'Lovelo Solid', 'Futura', sans-serif", marginBottom: "0.75rem" }}>
              Current Issue · Volume 1, Spring 2026
            </p>
            <iframe
              src="/journal-spring-2026.pdf"
              width="100%"
              style={{ height: "80vh", border: "1px solid #e8e2d8", display: "block" }}
              title="UWULR Spring 2026 Journal Inaugural Edition"
            />
          </div>

        </div>
      </section>
    </>
  );
}
