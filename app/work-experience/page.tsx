"use client";

import React from "react";
import { useTheme } from "next-themes";
import LenisProvider from "../components/LenisProvider";
import workexperience from "@/data/workexperience";
import styles from "./experience.module.css";

const accents = ["#8b5cf6", "#38bdf8", "#f97316"];
const certificates = [
  "/assets/unified-mentors-certificate.png",
  "/assets/agropeeper-certificate.png",
  "/assets/dezignolics-certificate.jpg",
];

export default function WorkExperiencePage() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className={`${styles.root} min-h-screen ${isDark ? "dark" : ""}`}>
      <LenisProvider />

      <header className={styles.hero}>
        <p className={styles.eyebrow}>Professional timeline</p>
        <h1 className={styles.heroTitle}>Work Experience</h1>
        <p className={styles.heroSubtitle}>
          Three internships across web engineering, data engineering, and
          information systems work. Each role sharpened a different part of my
          approach: building reliable flows, improving data quality, and
          turning manual work into repeatable systems.
        </p>
      </header>

      <main>
        {workexperience.map((item, index) => (
          <section
            className={styles.section}
            key={`${item.company}-${item.duration}`}
            style={
              {
                ["--accent" as string]: accents[index % accents.length],
                ["--accent-soft" as string]: `${accents[index % accents.length]}33`,
                ["--certificate-image" as string]: `url('${certificates[index] ?? certificates[0]}')`,
              } as React.CSSProperties
            }
          >
            <figure className={styles.imageContainer}>
              <div className={styles.certificateBackdrop} />
              <div className={styles.companyStage}>
                <div className={styles.brandGlow} />
                <div className={styles.brandShell}>
                  <div className={styles.brandBadge}>
                    <img
                      src={item.logo}
                      alt={`${item.company} logo`}
                      className={styles.heroLogo}
                    />
                  </div>
                  <div className={styles.brandMeta}>
                    <p className={styles.brandEyebrow}>Internship Experience</p>
                    <h2 className={styles.brandLabel}>{item.company}</h2>
                  </div>
                </div>

                <div className={styles.stageTags}>
                  {item.tech.slice(0, 4).map((tech) => (
                    <span key={tech} className={styles.stageTag}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.imageOverlay} />
            </figure>

            <article className={`glass-container ${styles.content}`}>
              <div className={styles.cardHeader}>
                <div className={styles.logoWrap}>
                  <img
                    src={item.logo}
                    alt={`${item.company} logo`}
                    className={styles.logo}
                  />
                </div>

                <div className={styles.meta}>
                  <h2 className={styles.role}>{item.position}</h2>
                  <p className={styles.company}>{item.company}</p>
                  <p className={styles.duration}>{item.duration}</p>
                </div>
              </div>

              {"summary" in item && item.summary ? (
                <p className={styles.summary}>{item.summary}</p>
              ) : null}

              <div className={styles.grid}>
                <section className={styles.detailCard}>
                  <h3 className={styles.detailTitle}>What I worked on</h3>
                  <ul className={styles.highlights}>
                    {item.responsibilities.map((responsibility) => (
                      <li key={responsibility} className={styles.highlight}>
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className={styles.detailCard}>
                  <h3 className={styles.detailTitle}>Core tools</h3>
                  <div className={styles.techWrap}>
                    {item.tech.map((tech) => (
                      <span key={tech} className={styles.tech}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkButton}
                  >
                    Visit {item.company}
                  </a>
                </section>
              </div>
            </article>
          </section>
        ))}
      </main>
    </div>
  );
}
