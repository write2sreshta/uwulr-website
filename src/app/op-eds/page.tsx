import type { Metadata } from "next";
import Image from "next/image";
import OpEdsList from "@/components/OpEdsList";

export const metadata: Metadata = {
  title: "Op-Eds | UW Undergraduate Law Review",
};

const opeds = [
  {
    title: "The Limits of Executive Power in a Post-Pandemic World",
    author: "Contributor Name",
    year: "Class of 2026",
    date: "Spring 2026",
    category: "Constitutional Law",
    excerpt:
      "An examination of the constitutional tensions exposed by emergency executive orders and the judiciary's reluctance to curtail executive overreach during times of crisis.",
    readTime: "8 min read",
  },
  {
    title: "Mandatory Minimums and the Myth of Deterrence",
    author: "Contributor Name",
    year: "Class of 2027",
    date: "Spring 2026",
    category: "Criminal Justice",
    excerpt:
      "Revisiting the empirical evidence on mandatory minimum sentencing, this piece argues that deterrence rationales have consistently failed to withstand scrutiny.",
    readTime: "10 min read",
  },
  {
    title: "Standing Doctrine and Climate Litigation",
    author: "Contributor Name",
    year: "Class of 2026",
    date: "Spring 2026",
    category: "Environmental Law",
    excerpt:
      "As federal courts narrow standing doctrine, environmental plaintiffs face mounting procedural barriers — threatening the viability of climate litigation as a policy lever.",
    readTime: "9 min read",
  },
  {
    title: "Facial Recognition, Probable Cause, and the Fourth Amendment",
    author: "Contributor Name",
    year: "Class of 2028",
    date: "Spring 2026",
    category: "Technology & Privacy",
    excerpt:
      "Law enforcement's growing reliance on facial recognition software raises urgent questions about whether existing Fourth Amendment frameworks can account for algorithmic error.",
    readTime: "7 min read",
  },
  {
    title: "Title IX's Contested Legacy: Equity, Due Process, and Campus Adjudication",
    author: "Contributor Name",
    year: "Class of 2027",
    date: "Spring 2026",
    category: "Civil Rights",
    excerpt:
      "Regulatory shifts under successive administrations have produced an unstable equilibrium in campus sexual misconduct procedures, raising concerns from across the ideological spectrum.",
    readTime: "12 min read",
  },
  {
    title: "International Courts and the Enforcement Gap",
    author: "Contributor Name",
    year: "Class of 2026",
    date: "Spring 2026",
    category: "International Law",
    excerpt:
      "The International Court of Justice and the ICC remain structurally dependent on state cooperation — a dependency that renders them partially impotent against powerful violators.",
    readTime: "9 min read",
  },
];

export default function OpEdsPage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden" style={{ minHeight: "280px" }}>
        <Image
          src="/opeds-library.jpg"
          alt="Suzzallo Library reading room"
          fill
          className="object-cover object-top"
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
            Op-Eds
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
            Timely student commentary on law, policy, and justice,{" "}<br />written to inform and engage a broad audience.
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="py-16" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-8">

          {/* Submit callout */}
          <div style={{ backgroundColor: "#4b2e83", padding: "1.5rem 2rem", marginBottom: "2rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1.5rem", flexWrap: "wrap" }}>
            <div>
              <h2 style={{ color: "#ffffff", fontSize: "1.1rem", fontFamily: "'Lovelo Solid', 'Futura', sans-serif", letterSpacing: "0.04em", marginBottom: "0.35rem" }}>
                🎉 26-27 OP-ED Writers Program
              </h2>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", lineHeight: 1.65, fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif" }}>
                Starting this year, we will be offering a select group of students the opportunity to develop their skills in legal writing, research, and investigation through our training program. Admitted students are expected to attend all training programs and write at least 4 articles across winter and spring. After a successful assessment of skills by the editorial team, they may continue as writers for the Law Review for as long as they remain active thereafter. Once admitted, students do not need to reapply to the program and have lifetime access to ULR programming and publishing/career opportunities as long as they are in good standing.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.4rem", flexShrink: 0 }}>
              <a href="https://forms.gle/p459ctpUzL8XUamx5" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", backgroundColor: "#b7a57a", color: "#2a1850", padding: "1rem 2.2rem", fontFamily: "'Lovelo Solid', 'Futura', sans-serif", fontSize: "0.75rem", letterSpacing: "0.16em", textTransform: "uppercase", textDecoration: "none", fontWeight: 700 }}>
                Apply Now →
              </a>
            </div>
          </div>

          {/* Filter + articles — hidden until first op-eds publish */}
          {/* <OpEdsList opeds={opeds} /> */}

          {/* Empty state */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "4rem 0", position: "relative" }}>
            <div style={{ position: "absolute", width: "160px", height: "160px", borderRadius: "50%", backgroundColor: "rgba(183,165,122,0.25)" }} />
            <span style={{ position: "relative", fontSize: "2rem", opacity: 0.5, color: "#4b2e83" }}>✦</span>
            <p style={{ position: "relative", marginTop: "0.35rem", color: "rgba(75,46,131,0.75)", fontSize: "0.95rem", fontFamily: "'Anaktoria', Georgia, serif", fontStyle: "italic", textAlign: "center", lineHeight: 1.2 }}>
              currently no student<br />works available
            </p>
          </div>

        </div>
      </section>
    </>
  );
}
