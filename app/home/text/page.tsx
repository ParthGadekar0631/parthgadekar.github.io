'use client';

import React from "react";
import styles from "./texts.module.css";

const rows = [
  [
    "Python",
    "TypeScript",
    "React",
    "FastAPI",
    "PostgreSQL",
    "AWS S3",
    "GitHub Actions",
    "Docker",
  ],
  [
    "Node.js",
    "Spring Boot",
    "MongoDB",
    "RESTful APIs",
    "PySpark",
    "Tableau",
    "TailwindCSS",
    "SQL",
  ],
  [
    "Matplotlib",
    "Seaborn",
    "TensorFlow",
    "scikit-learn",
    "OpenCV",
    "AWS RDS",
    "Linux/Unix",
    "Java",
  ],
];

export default function Page(): React.ReactElement {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const total = rect.height + viewportHeight;
      const next = Math.min(
        Math.max((viewportHeight - rect.top) / total, 0),
        1,
      );

      setProgress(next);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.page}>
      <div className={styles.stickyPanel}>
        <div className={styles.backdropGlow} />
        <div className={styles.headingBlock}>
          <p className={styles.eyebrow}>Core stack</p>
          <h2 className={styles.title}>Software Engineer</h2>
          <p className={styles.subtitle}>
            Building full-stack products, telemetry systems, data pipelines,
            and ML-backed workflows with clean engineering foundations.
          </p>
        </div>

        <div className={styles.rows}>
          {rows.map((row, rowIndex) => {
            const direction = rowIndex % 2 === 0 ? 1 : -1;
            const shift = (progress - 0.5) * direction * 200;
            const depth = 1 - Math.abs(progress - 0.5) * 0.12;

            return (
              <div
                key={`row-${rowIndex}`}
                className={styles.rowShell}
                style={{
                  transform: `translate3d(${shift}px, 0, 0) scale(${depth})`,
                  opacity: 0.62 + progress * 0.38,
                }}
              >
                <div className={styles.rowTrack}>
                  {[...row, ...row].map((label, labelIndex) => (
                    <span
                      key={`${label}-${labelIndex}`}
                      className={styles.skillChip}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
