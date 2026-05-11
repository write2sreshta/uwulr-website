"use client";

import Image from "next/image";
import { useState } from "react";

interface Props {
  name: string;
  role: string;
  photo: string | null;
  initials: string;
  bio: string;
  photoZoom?: number;
  photoOrigin?: string;
  photoOffsetY?: string;
}

export default function MemberCard({ name, role, photo, initials, bio, photoZoom = 1, photoOrigin = "center top", photoOffsetY = "0px" }: Props) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      style={{
        height: "300px",
        perspective: "1000px",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.55s cubic-bezier(0.4, 0.2, 0.2, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            backgroundColor: "#faf8f4",
            border: "1px solid #e8e2d8",
            padding: "1.25rem 1rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "160px",
              height: "160px",
              borderRadius: "50%",
              overflow: "hidden",
              backgroundColor: "#4b2e83",
              marginBottom: "0.85rem",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {photo ? (
              <Image
                src={photo}
                alt={name}
                fill
                sizes="(max-width: 768px) 45vw, 30vw"
                className="object-cover object-top"
                style={{ transform: `scale(${photoZoom}) translateY(${photoOffsetY})`, transformOrigin: photoOrigin }}
              />
            ) : (
              <span
                style={{
                  color: "#b7a57a",
                  fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
                  fontSize: "1.75rem",
                  letterSpacing: "0.05em",
                }}
              >
                {initials}
              </span>
            )}
          </div>
          <p
            style={{
              color: "#b7a57a",
              fontSize: "0.52rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
              lineHeight: 1.5,
              marginBottom: "0.25rem",
            }}
          >
            {role}
          </p>
          <h3
            style={{
              color: "#2a1850",
              fontSize: "1rem",
              fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
              letterSpacing: "0.03em",
              lineHeight: 1.2,
            }}
          >
            {name}
          </h3>
        </div>

        {/* Back */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            backgroundColor: "#4b2e83",
            border: "1px solid #3a2266",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "#b7a57a",
              fontSize: "0.52rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
              marginBottom: "0.5rem",
            }}
          >
            {role}
          </p>
          <h3
            style={{
              color: "#ffffff",
              fontSize: "0.95rem",
              fontFamily: "'Lovelo Solid', 'Futura', sans-serif",
              letterSpacing: "0.03em",
              lineHeight: 1.2,
              marginBottom: "0.85rem",
            }}
          >
            {name}
          </h3>
          <div
            style={{
              width: "30px",
              height: "1px",
              backgroundColor: "#b7a57a",
              marginBottom: "0.85rem",
            }}
          />
          <p
            style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "0.85rem",
              lineHeight: 1.7,
              fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
            }}
          >
            {bio}
          </p>
        </div>
      </div>
    </div>
  );
}
