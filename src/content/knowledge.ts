import { KnowledgeDocument } from "../types";

export const suggestedPrompts = [
  "What kind of engineer is Parth?",
  "Tell me about the F1 telemetry system.",
  "Why is observability a recurring theme in this portfolio?",
  "What roles is Parth currently targeting?",
];

export const knowledgeDocuments: KnowledgeDocument[] = [
  {
    id: "profile-overview",
    title: "Profile Overview",
    moduleId: "about",
    path: "/about",
    summary: "Parth's overall engineering profile and career direction.",
    tags: ["profile", "about", "roles", "summary"],
    content:
      "Parth Gadekar is an M.S. Computer Science student at Stevens Institute of Technology focused on software engineering, data engineering, realtime systems, and AI-native product workflows. He is based in Hoboken, NJ, open to relocation, and targeting software engineering, data engineering, and AI systems roles in the USA. His strongest recurring themes are observability, backend reliability, ETL pipelines, debugging, and systems that remain readable under pressure.",
  },
  {
    id: "f1-telemetry-knowledge",
    title: "F1 Telemetry Simulation System",
    moduleId: "projects",
    path: "/projects/f1-telemetry",
    summary: "Flagship project about telemetry, replay, anomaly visibility, and engineering storytelling.",
    tags: ["f1", "telemetry", "dashboard", "systems", "simulation"],
    content:
      "The F1 Telemetry Simulation System is a flagship project that combines C++, Python, FastAPI, React, TypeScript, and PostgreSQL. The system models live race-style telemetry streams, supports replay workflows for lap history and sector deltas, and surfaces signals such as speed, RPM, thermal data, and energy usage. The project demonstrates Parth's interest in observability, realtime interfaces, and making system behavior inspectable instead of opaque.",
  },
  {
    id: "distributed-pipeline-knowledge",
    title: "Distributed Data Processing Pipeline",
    moduleId: "projects",
    path: "/projects/distributed-pipeline",
    summary: "Distributed ETL project focused on scalability, retries, monitoring, and reliability.",
    tags: ["data", "etl", "pyspark", "aws", "sql", "reliability"],
    content:
      "The Distributed Data Processing Pipeline is a cloud-oriented ETL workflow built with Python, PySpark, AWS S3, and SQL. It focuses on partitioning, scalability, retries, and monitoring across distributed workloads. The project demonstrates Parth's interest in data quality, fault tolerance, and making batch systems resilient and trustworthy rather than fragile and opaque.",
  },
  {
    id: "portfolio-system-knowledge",
    title: "Portfolio Product System",
    moduleId: "copilot",
    path: "/copilot",
    summary: "Why the portfolio was built as a modular product demo with a real AI copilot.",
    tags: ["portfolio", "copilot", "claude", "langfuse", "vercel"],
    content:
      "This portfolio is intentionally built as a modular product system rather than a static landing page. It uses React, TypeScript, Tailwind CSS, Vite, Vercel serverless functions, Claude for the copilot, and Langfuse for tracing and public metrics summaries. The purpose is to demonstrate the same engineering behaviors it describes: modular architecture, AI-native interaction, and observability-aware implementation.",
  },
  {
    id: "experience-knowledge",
    title: "Experience and Internships",
    moduleId: "about",
    path: "/about",
    summary: "Internship work across backend workflows, cloud pipelines, ETL reliability, and monitoring.",
    tags: ["experience", "internships", "aws", "backend", "monitoring"],
    content:
      "At Unified Mentors, Parth developed backend workflows using Python and Node.js, built cloud-integrated data pipelines with AWS services, implemented CI/CD pipelines, and diagnosed production issues using logs and debugging workflows. At Agropeeper Technologies, he built ETL-style pipelines for RGB, thermal, and metadata streams, added validation and schema checks, designed monitoring flows, and implemented retry and recovery mechanisms.",
  },
  {
    id: "role-targeting-knowledge",
    title: "Target Roles",
    moduleId: "about",
    path: "/about",
    summary: "The types of roles and work environments Parth is targeting next.",
    tags: ["roles", "hiring", "fit", "career"],
    content:
      "Parth is targeting software engineering, data engineering, and AI systems roles where he can work on reliable backends, data-intensive workflows, realtime product surfaces, or AI-native applications. He is especially interested in roles where system design, debugging discipline, product execution, and observability all matter together.",
  },
];
