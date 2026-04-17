export type Metric = {
  value: string;
  label: string;
  detail: string;
};

export type SectionCard = {
  eyebrow: string;
  title: string;
  copy: string;
};

export type Project = {
  title: string;
  timeline: string;
  summary: string;
  stack: string[];
  impact: string[];
  href?: string;
  status: string;
};

export type Experience = {
  company: string;
  role: string;
  timeline: string;
  location: string;
  points: string[];
};

export type ChatPrompt = {
  label: string;
  prompt: string;
};

export type ChatKnowledge = {
  match: string[];
  answer: string;
};

export const profile = {
  name: "Parth Gadekar",
  title: "Software Engineer building observable systems and high-signal products.",
  summary:
    "I am an M.S. Computer Science student at Stevens Institute of Technology focused on software engineering, real-time systems, data platforms, and AI-native product workflows. My work usually sits at the point where performance, reliability, and developer clarity all matter at the same time.",
  availability:
    "Open to software engineering, data engineering, and AI systems roles in the USA. Based in Hoboken, NJ and open to relocation.",
  email: "parthgadekar060202@gmail.com",
  phone: "+1 (551) 260-5658",
  github: "https://github.com/ParthGadekar0631",
  resume: "Parth_Gadekar_Resume.pdf",
};

export const requestedStack = [
  "react",
  "portfolio",
  "typescript",
  "ai",
  "chatbot",
  "observability",
  "claude",
  "tailwindcss",
  "vite",
  "vercel",
  "llm",
  "llmops",
  "langfuse",
];

export const heroMetrics: Metric[] = [
  {
    value: "34",
    label: "Public repos",
    detail: "Active GitHub profile with public projects across systems, vision, and full-stack builds.",
  },
  {
    value: "2",
    label: "Engineering internships",
    detail: "Experience across backend workflows, data pipelines, monitoring, and CI/CD delivery.",
  },
  {
    value: "2026",
    label: "M.S. graduation",
    detail: "Stevens Institute of Technology, Computer Science.",
  },
  {
    value: "3.70",
    label: "Graduate GPA",
    detail: "Supported by coursework in databases, ML, business intelligence, and statistics.",
  },
];

export const focusCards: SectionCard[] = [
  {
    eyebrow: "Systems",
    title: "I like software that stays readable under pressure.",
    copy:
      "Most of my work clusters around APIs, data pipelines, simulation-style workflows, and the debugging discipline needed to keep them stable under changing inputs.",
  },
  {
    eyebrow: "Data",
    title: "I build pipelines with failure handling, validation, and metrics in mind.",
    copy:
      "At Agropeeper and in academic projects, I repeatedly worked on ingestion quality, retry logic, schema checks, monitoring, and the operational layer around data systems.",
  },
  {
    eyebrow: "AI-Native",
    title: "I am intentionally shaping this portfolio around AI, chatbot, and LLMOps patterns.",
    copy:
      "This first release stays static so it can ship free on GitHub Pages today, but the structure is already prepared for a future Claude, observability, and Langfuse-backed assistant.",
  },
];

export const projects: Project[] = [
  {
    title: "F1 Telemetry Simulation System",
    timeline: "2025 - Present",
    summary:
      "A live telemetry environment for race-style data streams with a dashboard layer built for replay, anomaly visibility, and engineering storytelling.",
    stack: ["C++", "Python", "FastAPI", "React", "TypeScript", "PostgreSQL"],
    impact: [
      "Modeled live race data streams to improve responsiveness by roughly 35%.",
      "Designed replay workflows for lap history, sector deltas, and performance comparisons.",
      "Built a dashboard for speed, RPM, thermal signals, and energy monitoring.",
    ],
    status: "Current build",
  },
  {
    title: "Distributed Data Processing Pipeline",
    timeline: "2026 - Present",
    summary:
      "A cloud-oriented ETL workflow focused on scalability, partitioning, scheduling, and fault-tolerant execution patterns.",
    stack: ["Python", "PySpark", "AWS S3", "SQL"],
    impact: [
      "Improved pipeline scalability and reliability by about 40% in the project framing.",
      "Applied partitioning and parallel execution strategies to reduce runtime by roughly 35%.",
      "Integrated monitoring and retry workflows to keep batch jobs observable and resilient.",
    ],
    status: "Academic system",
  },
  {
    title: "Air Canvas",
    timeline: "2021",
    summary:
      "A real-time computer vision project that converts hand movement into a responsive drawing interface.",
    stack: ["Python", "OpenCV", "NumPy", "TensorFlow"],
    impact: [
      "Reached about 95% gesture and motion tracking accuracy.",
      "Reduced frame latency by roughly 30% through tighter tracking and contour logic.",
      "Maintained smooth real-time interaction near 30 FPS.",
    ],
    href: "https://github.com/ParthGadekar0631/Air-Canvas",
    status: "Public repo",
  },
  {
    title: "Land Registry Using Blockchain",
    timeline: "2023",
    summary:
      "A blockchain-backed property transaction concept with an interface built around trust, traceability, and transaction flow clarity.",
    stack: ["Dart", "Flutter", "Solidity", "Web3.js"],
    impact: [
      "Implemented transaction flows on Ethereum for registry-style ownership records.",
      "Built a user-facing interface designed for clarity in property transfer workflows.",
      "Expanded my product thinking around trust-sensitive systems and user confidence.",
    ],
    href: "https://github.com/ParthGadekar0631/Land-Registry-using-Blockchain",
    status: "Public repo",
  },
];

export const experience: Experience[] = [
  {
    company: "Unified Mentors",
    role: "Web Development Intern",
    timeline: "Jan 2024 - Jun 2024",
    location: "Gurugram, India",
    points: [
      "Developed backend workflows and REST APIs with Python and Node.js, improving throughput while cutting latency by around 25%.",
      "Built cloud-integrated data pipelines with AWS services including S3 and RDS.",
      "Implemented CI/CD pipelines for testing and deployment, improving release reliability and reducing errors by roughly 30%.",
      "Diagnosed production issues through logging and debugging workflows to improve system stability.",
    ],
  },
  {
    company: "Agropeeper Technologies",
    role: "Data Engineer Intern",
    timeline: "Apr 2023 - Sep 2023",
    location: "Mumbai, India",
    points: [
      "Built ETL-style pipelines for RGB, thermal, and metadata streams, improving ingestion reliability by around 40%.",
      "Added validation, schema enforcement, and failure handling to improve downstream correctness by roughly 35%.",
      "Designed modular logging and monitoring flows that improved debugging efficiency and failure isolation.",
      "Engineered retry and recovery logic so large dataset processing stayed consistent under failure conditions.",
    ],
  },
];

export const education = [
  {
    school: "Stevens Institute of Technology",
    degree: "Master of Science in Computer Science",
    timeline: "Expected May 2026",
    detail:
      "GPA 3.70/4.0. Coursework includes Database Systems, Business Intelligence, Machine Learning, Statistics, and Data Analysis.",
  },
  {
    school: "University of Mumbai",
    degree: "Bachelor of Engineering in Information Technology",
    timeline: "Jun 2023",
    detail:
      "GPA 3.92/4.0. Coursework includes Data Structures, Systems Programming, DBMS, Software Engineering, and Web Programming.",
  },
];

export const strengths = [
  "C++, Python, TypeScript, SQL, Bash",
  "Systems design, performance optimization, profiling, benchmarking",
  "Data pipelines, ETL, validation, observability, fault tolerance",
  "React, APIs, backend workflows, developer tooling",
  "AI-native product thinking, chatbot UX, LLMOps-ready architecture",
];

export const chatPrompts: ChatPrompt[] = [
  {
    label: "What kind of engineer is Parth?",
    prompt: "What kind of engineer are you?",
  },
  {
    label: "Tell me about the F1 project",
    prompt: "Tell me about your F1 telemetry simulation system.",
  },
  {
    label: "Why data engineering?",
    prompt: "Why are you interested in data engineering and observability?",
  },
  {
    label: "What roles are you targeting?",
    prompt: "What roles are you currently targeting?",
  },
];

export const chatKnowledge: ChatKnowledge[] = [
  {
    match: ["who are you", "kind of engineer", "about you", "introduce"],
    answer:
      "I am a software engineer with a systems and data bias. My strongest patterns across internships and projects are backend workflows, ETL-style pipelines, monitoring, debugging, and product-minded engineering. I like building software that stays understandable when the workload or complexity goes up.",
  },
  {
    match: ["f1", "telemetry", "simulation", "race"],
    answer:
      "The F1 telemetry project is where a lot of my interests meet: performance, streaming-style data, dashboards, and engineering visibility. I am building it to simulate live race signals, replay laps, surface anomalies, and make system behavior legible instead of opaque.",
  },
  {
    match: ["data engineering", "observability", "monitoring", "pipeline"],
    answer:
      "I keep coming back to data engineering because I enjoy the operational side of software. I like validation, retry logic, metrics, debugging, and designing pipelines that fail predictably instead of silently. That is also why observability and LLMOps are interesting to me: the same discipline applies.",
  },
  {
    match: ["roles", "targeting", "looking for", "job", "opportunities"],
    answer:
      "I am targeting software engineering, data engineering, and AI systems roles where I can work on reliable backends, data-intensive workflows, or AI-native product surfaces. I am based in Hoboken, NJ, open to relocation, and graduating with my M.S. in May 2026.",
  },
  {
    match: ["github", "projects", "repo", "repositories"],
    answer:
      "My GitHub profile currently shows 34 public repositories. The public work that best reflects my range includes Air Canvas, Algorithm Visualizer, Land Registry using Blockchain, Point of Sale System, and several full-stack or systems-heavy builds.",
  },
];
