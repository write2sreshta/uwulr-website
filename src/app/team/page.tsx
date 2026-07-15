import type { Metadata } from "next";
import Image from "next/image";
import MemberCard from "@/components/MemberCard";

export const metadata: Metadata = {
  title: "Our Team | UW Undergraduate Law Review",
};

const members = [
  {
    name: "Sreshta Appalabattula",
    role: "Co-Editor-in-Chief",
    photo: "/team-sreshta.png",
    initials: "SA",
    bio: "Oversees the editorial direction, publication standards, and strategic vision of the Law Review.",
    photoZoom: 1.7,
    photoOrigin: "center top",
    photoOffsetY: "-15%",
  },
  {
    name: "Syd Sabourin",
    role: "Co-Editor-in-Chief",
    photo: null,
    initials: "SS",
    bio: "Oversees the editorial direction, publication standards, and strategic vision of the Law Review.",
  },
  {
    name: "Montana LaBarge",
    role: "Co-Lead Editor, Journal Publications",
    photo: "/team-montana.png",
    initials: "M",
    bio: "Leads the peer-review process for long-form journal submissions and guides authors through substantive revisions.",
  },
  {
    name: "Evan Maudlin",
    role: "Co-Lead Editor, Journal Publications",
    photo: null,
    initials: "EM",
    bio: "Leads the peer-review process for long-form journal submissions and guides authors through substantive revisions.",
  },
  {
    name: "Tate Parker",
    role: "Co-Lead Editor, Journal Publications",
    photo: null,
    initials: "TP",
    bio: "Leads the peer-review process for long-form journal submissions and guides authors through substantive revisions.",
  },
  {
    name: "Isabelle Greenberg",
    role: "Co-Lead Editor, Op-Eds",
    photo: "/team-isabelle.jpeg",
    initials: "IG",
    bio: "Manages the op-ed submission pipeline, works with contributors on commentary pieces, and oversees the editorial review process.",
  },
  {
    name: "Katharine Rigsby",
    role: "Co-Lead Editor, Op-Eds",
    photo: "/team-katharine.png",
    initials: "KR",
    bio: "Manages the op-ed submission pipeline, works with contributors on commentary pieces, and oversees the editorial review process.",
  },
  {
    name: "Paarth Gupta",
    role: "Co-Lead Editor, Op-Eds",
    photo: null,
    initials: "PG",
    bio: "Manages the op-ed submission pipeline, works with contributors on commentary pieces, and oversees the editorial review process.",
  },
  {
    name: "Tova Korry",
    role: "Podcast Producer",
    photo: "/team-tova.jpeg",
    initials: "TK",
    bio: "Produces and hosts the Law Review podcast, coordinating guest interviews and audio production.",
  },
  {
    name: "Faith McHugh",
    role: "Director of Events",
    photo: "/team-faith.jpeg",
    initials: "FM",
    bio: "Plans and executes Law Review events, from speaker panels to tabling and outreach initiatives.",
  },
  {
    name: "Delaney Haye",
    role: "Director of Marketing",
    photo: null,
    initials: "DH",
    bio: "Manages the Law Review's social media presence, outreach strategy, and brand communications.",
  },
];


function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: "280px" }}>
      <Image
        src="/team-campus.webp"
        alt="Students walking on UW campus"
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
          {title}
        </h1>
        {subtitle && (
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
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

export default function TeamPage() {
  return (
    <>
      <PageHeader
        title="Our Team"
        subtitle="The UW Undergraduate Law Review is run entirely by undergraduate students dedicated to elevating legal scholarship on campus."
      />

      {/* All Officers */}
      <section className="py-20" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="mb-12 text-center">
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
              2025-26 Leadership
            </p>
            <h2
              style={{
                color: "#2a1850",
                fontSize: "clamp(1.5rem, 3vw, 1.9rem)",
                fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
                letterSpacing: "0.04em",
              }}
            >
              Executive &amp; Editorial Officers
            </h2>
          </div>

          {/* Co-Editors-in-Chief centered row */}
          <div className="grid grid-cols-2 gap-6 mb-6" style={{ maxWidth: "560px", margin: "0 auto 1.5rem" }}>
            {members.slice(0, 2).map((member) => (
              <MemberCard key={member.name + member.role} {...member} />
            ))}
          </div>

          {/* All remaining members */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {members.slice(2).map((member) => (
              <MemberCard key={member.name + member.role} {...member} />
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="relative py-24 overflow-hidden text-center">
        <Image
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920&q=80"
          alt="UW campus"
          fill
          className="object-cover"
          unoptimized
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(75,46,131,0.94)", borderTop: "3px solid #b7a57a" }}
        />
        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <h2
            style={{
              color: "#ffffff",
              fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
              marginBottom: "1rem",
              fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
              letterSpacing: "0.04em",
            }}
          >
            Interested in Joining?
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: "1rem",
              lineHeight: 1.85,
              marginBottom: "2rem",
              fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
            }}
          >
            We welcome applications from motivated undergraduates across all disciplines who
            share a passion for legal scholarship and academic rigor.
          </p>
          <a
            href="mailto:ulawreview@uw.edu"
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
            Get in Touch
          </a>
        </div>
      </section>
    </>
  );
}
