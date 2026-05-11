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
              <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", lineHeight: 1.75, fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <p>We are excited to announce the first call for submissions to the University of Washington Undergraduate Law Review! 🎉</p>
                <p>As we launch this publication, we are seeking rigorous, original scholarship that reflects analytical depth, intellectual precision, and meaningful engagement with legal questions. Our goal is to showcase the strongest undergraduate legal writing at the University of Washington and to build a journal defined by interdisciplinary excellence from its very first issue.</p>
                <p>As such we welcome and encourage students of all disciplines (including non-legal adjacent majors) to apply.</p>
                <p style={{ color: "#b7a57a", fontWeight: 600 }}>Submission Deadline: May 18 at 11:59 PM PST</p>
                <p>Please review the Journal Submission Guide carefully and ensure that your manuscript adheres strictly to the outlined requirements. Submissions not adhering to the guidelines will not be considered.</p>
                <p>If you have questions specific to this application, please email: <a href="mailto:journal.uwuglawreview@gmail.com" style={{ color: "#b7a57a", textDecoration: "underline" }}>journal.uwuglawreview@gmail.com</a> — We look forward to reading your work!</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", flexShrink: 0, flexWrap: "wrap", alignSelf: "flex-start" }}>
              <a href="https://forms.gle/fwa7eB91p82Uj1Xp7" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", backgroundColor: "#b7a57a", color: "#2a1850", padding: "0.65rem 1.5rem", fontFamily: "'Lovelo Solid', 'Futura', sans-serif", fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", textDecoration: "none" }}>
                Application
              </a>
              <a href="https://docs.google.com/document/d/19A3Edv9IZbDjj4FvCPtfSkY4rFZCehDJ_v5ordqCMoY/edit?pli=1&tab=t.0"
              target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", border: "1px solid rgba(183,165,122,0.6)", color: "#b7a57a", padding: "0.65rem 1.5rem", fontFamily: "'Lovelo Solid', 'Futura', sans-serif", fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", textDecoration: "none" }}>
                Submission Guidelines
              </a>
            </div>
          </div>

          {/* Issue dropdown */}
          <IssueDropdown
            label="Current Issue"
            title="Volume 1, Issue 1 · Spring 2026"
            articleCount={articles.length}
            pages={170}
            articles={articles}
          />

        </div>
      </section>
    </>
  );
}
