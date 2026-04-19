"use client";

import React from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { syr, sppu, syr_icon, sppu_icon } from "../../../data/images";
import styles from "../Details/details.module.css";

const education = [
  {
    icon: syr_icon,
    image: syr,
    color: "#a855f7",
    title: "Stevens Institute of Technology",
    subtitle: "Master of Science in Computer Science",
    description:
      "My graduate studies at Stevens focus on software systems, data engineering, analytics, and machine learning. Coursework in Database Systems, Business Intelligence, Machine Learning, Statistics, and Data Analysis has helped me connect theory with production-minded projects in telemetry, ETL, backend systems, and applied AI.",
  },
  {
    icon: sppu_icon,
    image: sppu,
    color: "#f59e0b",
    title: "University of Mumbai",
    subtitle: "A.C. Patil College of Engineering · Bachelor of Engineering in Information Technology",
    description:
      "I completed my bachelor's degree at A.C. Patil College of Engineering under the University of Mumbai. This phase built the foundation behind my engineering work through data structures, systems programming, DBMS, software engineering, and web programming, and it was where I started building full-stack systems, computer vision projects, backend-heavy applications, and analytics workflows that shaped my direction as a software engineer.",
  },
];

export default function Details() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className={`${styles.root} min-h-screen flex flex-col ${isDark ? "dark" : ""}`}>
      <main className={`${styles.main} flex-1`}>
        {education.map((item, idx) => (
          <section className={styles.section} key={`${item.title}-${idx}`}>
            <figure className={styles.imageContainer}>
              <Image
                src={item.image}
                alt={`${item.title} campus`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={`${styles.heroImage} ${!isDark ? styles.brightImage : ""}`}
                priority={idx === 0}
              />
            </figure>

            <article className={`glass-container rounded-2xl p-6 md:p-8 ${styles.content} ${isDark ? "dark" : ""}`}>
              <div className={styles.headerBlock}>
                {item.icon && (
                  <Image src={item.icon} alt="" width={150} height={150} className={styles.schoolIcon} aria-hidden="true" />
                )}
                <h2
                  className={`${styles.sectionTitle} ${!isDark ? styles["text-shadow-light"] : ""}`}
                  style={
                    !isDark
                      ? {
                          color: "#FFFFFF",
                          textShadow: "2px 2px 4px #000000, 4px 4px 8px rgba(0,0,0,0.5)",
                        }
                      : undefined
                  }
                >
                  {item.title}
                </h2>
              </div>

              <h3
                className={`${styles.sectionSubtitle} ${!isDark ? styles["text-shadow-light"] : ""}`}
                style={
                  !isDark
                    ? {
                        color: "#FFFFFF",
                        textShadow: "2px 2px 4px #000000, 4px 4px 8px rgba(0,0,0,0.5)",
                      }
                    : undefined
                }
              >
                {item.subtitle}
              </h3>
              <p
                className={`${styles.description} ${!isDark ? styles["text-shadow-light"] : ""}`}
                style={
                  !isDark
                    ? {
                        color: "#FFFFFF",
                        textShadow: "2px 2px 4px #000000, 4px 4px 8px rgba(0,0,0,0.5)",
                      }
                    : undefined
                }
              >
                {item.description}
              </p>
            </article>
          </section>
        ))}
      </main>
    </div>
  );
}
