import { KnowledgeDocument } from "../types";

export const suggestedPrompts = [
  "Give me a quick summary of Parth.",
  "What work experience does Parth have?",
  "Tell me about the F1 telemetry project.",
  "What skills does Parth use most?",
];

export const knowledgeDocuments: KnowledgeDocument[] = [
  {
    id: "profile-overview",
    title: "Profile Overview",
    moduleId: "home",
    path: "/",
    summary: "Parth's overall engineering profile and current focus.",
    tags: ["profile", "summary", "roles", "landing"],
    content:
      "Parth Gadekar is an M.S. Computer Science student at Stevens Institute of Technology focused on software engineering, data engineering, realtime systems, and AI-native product workflows. He is based in Hoboken, New Jersey, open to relocation, and targeting software engineering, data engineering, and AI systems roles in the USA.",
  },
  {
    id: "experience-overview",
    title: "Experience Overview",
    moduleId: "experience",
    path: "/experience",
    summary: "Three internship experiences across backend, ETL, and information systems work.",
    tags: ["experience", "work", "internships", "backend", "etl"],
    content:
      "Parth has three work experiences: Unified Mentors where he worked on backend workflows, AWS-connected pipelines, and CI/CD; Agropeeper Technologies where he focused on ETL reliability, validation, and recovery logic; and Dezignolics where he built scraping, parsing, and data cleaning workflows.",
  },
  {
    id: "f1-telemetry-knowledge",
    title: "F1 Telemetry Simulation System",
    moduleId: "projects",
    path: "/projects/f1-telemetry",
    summary: "Race-style telemetry environment for streaming signals, replay workflows, and anomaly visibility.",
    tags: ["f1", "telemetry", "realtime", "dashboard", "systems"],
    content:
      "The F1 Telemetry Simulation System models race-style live data streams, lap replay, comparisons, and anomaly visibility. It uses C plus plus, Python, FastAPI, React, TypeScript, and PostgreSQL, and is one of the clearest examples of Parth's interest in systems visibility and product-oriented engineering.",
  },
  {
    id: "distributed-pipeline-knowledge",
    title: "Distributed Data Processing Pipeline",
    moduleId: "projects",
    path: "/projects/distributed-pipeline",
    summary: "Cloud-oriented ETL workflow focused on partitioning, retries, and monitoring.",
    tags: ["pipeline", "etl", "pyspark", "aws", "data"],
    content:
      "The Distributed Data Processing Pipeline is a cloud-oriented ETL workflow that emphasizes partitioning, retries, validation, monitoring, and operational reliability. It reflects Parth's interest in repeatable data systems instead of isolated scripts.",
  },
  {
    id: "portfolio-system-knowledge",
    title: "Parth Gadekar Portfolio System",
    moduleId: "home",
    path: "/",
    summary: "A modular portfolio app with dynamic routes, branding, and product-style information architecture.",
    tags: ["portfolio", "react", "github-pages", "routing", "product"],
    content:
      "Parth Gadekar's portfolio is designed as a modular site instead of one overloaded page. It uses dedicated routes for home, experience, projects, skills, education, and contact, along with route-aware theming, dynamic motion, and a stronger landing-page presentation.",
  },
  {
    id: "skills-overview",
    title: "Skills Overview",
    moduleId: "skills",
    path: "/skills",
    summary: "Programming, frontend, backend, data, AI, and engineering practice skills.",
    tags: ["skills", "typescript", "python", "react", "aws", "observability"],
    content:
      "Parth's skills include Python, TypeScript, C plus plus, SQL, React, Tailwind CSS, Vite, FastAPI, REST APIs, PySpark, PostgreSQL, AWS services, CI/CD, debugging, monitoring, Claude-oriented product thinking, and observability-aware engineering habits.",
  },
  {
    id: "education-overview",
    title: "Education Overview",
    moduleId: "education",
    path: "/education",
    summary: "Graduate and undergraduate education in computer science and information technology.",
    tags: ["education", "stevens", "mumbai", "coursework"],
    content:
      "Parth is pursuing a Master of Science in Computer Science at Stevens Institute of Technology with expected graduation in May 2026 and completed a Bachelor of Engineering in Information Technology from the University of Mumbai in June 2023.",
  },
  {
    id: "contact-overview",
    title: "Contact Overview",
    moduleId: "contact",
    path: "/contact",
    summary: "Direct contact information and form-based outreach route.",
    tags: ["contact", "email", "github", "resume"],
    content:
      "The contact route lets visitors enter a name, email, and message, then open a ready-to-send email to Parth. The page also links directly to GitHub, email, phone, and resume access.",
  },
];
