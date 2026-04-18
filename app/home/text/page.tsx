import React from "react";
import styles from "./texts.module.css";

const items: Array<{ label: string; special?: boolean; bold?: boolean }> = [
  { label: "Python" },
  { label: "TypeScript" },
  { label: "Java" },
  { label: "SQL" },
  { label: "Bash" },
  { label: "React" },
  { label: "TailwindCSS" },
  { label: "Node.js" },
  { label: "Spring Boot" },
  { label: "FastAPI" },
  { label: "PostgreSQL" },
  { label: "MySQL" },
  { label: "MongoDB" },
  { label: "RESTful APIs" },
  { label: "PySpark" },
  { label: "Tableau" },
  { label: "Matplotlib" },
  { label: "Seaborn" },
  { label: "TensorFlow" },
  { label: "scikit-learn" },
  { label: "OpenCV" },
  { label: "AWS S3" },
  { label: "AWS RDS" },
  { label: "Docker" },
  { label: "GitHub Actions" },
  { label: "Linux/Unix" },
  { label: "Software Engineer", special: true, bold: true },
];

export default function Page(): React.ReactElement {
  return (
    <main className={styles.page}>
      <div className={styles.stuckGridWrapper}>
        <div className={styles.stuckGrid}>
          {items.map((item, idx) => {
            const cn = `${styles.gridItem} ${item.special ? styles.special : ""}`;
            return (
              <div key={`${item.label}-${idx}`} className={cn}>
                {item.bold ? <b>{item.label}</b> : item.label}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
