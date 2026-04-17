import {
  CaseStudy,
  EducationEntry,
  ExperienceEntry,
  ModuleConfig,
  ProjectSummary,
  PublicMetrics,
} from "../types";

export const profile = {
  siteName: "RisksRay",
  name: "Parth Gadekar",
  title: "Software engineer focused on systems, data, and AI-native product execution.",
  summary:
    "I build software that has to stay observable, understandable, and useful under real operational pressure. My strongest work sits where product delivery, backend reliability, and AI-native interaction design meet.",
  availability:
    "Open to software engineering, data engineering, and AI systems roles in the USA. Based in Hoboken, NJ and open to relocation.",
  email: "parthgadekar060202@gmail.com",
  phone: "+1 (551) 260-5658",
  github: "https://github.com/ParthGadekar0631",
  resume: "Parth_Gadekar_Resume.pdf",
  location: "Hoboken, NJ",
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

export const moduleConfigs: ModuleConfig[] = [
  {
    id: "home",
    label: "Portfolio System",
    navLabel: "Home",
    path: "/",
    kicker: "Interactive portfolio",
    title: "A modular AI-native portfolio that behaves more like a product than a landing page.",
    summary:
      "The site is structured as a dynamic system with route-aware themes, content modules, and a real backend copilot instead of a scripted front-end demo.",
    heroWords: ["observable software", "agentic product surfaces", "dynamic modules"],
    chips: ["case studies", "motion system", "typed routes", "vercel runtime"],
    featuredProjectSlugs: ["portfolio-system", "f1-telemetry", "distributed-pipeline"],
    theme: {
      accent: "#67e8f9",
      accentSoft: "rgba(103, 232, 249, 0.16)",
      accentGlow: "rgba(14, 165, 233, 0.24)",
      secondary: "#38bdf8",
      panel: "rgba(7, 16, 30, 0.92)",
    },
  },
  {
    id: "copilot",
    label: "AI Copilot",
    navLabel: "AI Copilot",
    path: "/copilot",
    kicker: "Real backend feature",
    title: "A real Claude-backed copilot with curated retrieval and trace-aware behavior.",
    summary:
      "This module demonstrates a production-style interaction surface: route context, curated knowledge retrieval, best-effort tracing, and public metrics without exposing private logs.",
    heroWords: ["claude responses", "curated RAG", "trace-aware prompts"],
    chips: ["claude", "langfuse", "retrieval", "serverless"],
    featuredProjectSlugs: ["portfolio-system", "f1-telemetry", "distributed-pipeline"],
    theme: {
      accent: "#f59e0b",
      accentSoft: "rgba(245, 158, 11, 0.18)",
      accentGlow: "rgba(249, 115, 22, 0.22)",
      secondary: "#fb923c",
      panel: "rgba(28, 16, 6, 0.9)",
    },
  },
  {
    id: "projects",
    label: "Projects",
    navLabel: "Projects",
    path: "/projects",
    kicker: "Proof of work",
    title: "Projects organized as evidence, not filler.",
    summary:
      "The projects module shows the work through outcomes, operating constraints, and engineering signal rather than generic portfolio card language.",
    heroWords: ["telemetry", "pipelines", "product delivery"],
    chips: ["systems", "data", "frontend", "ownership"],
    featuredProjectSlugs: ["f1-telemetry", "distributed-pipeline", "fullstack-commerce"],
    theme: {
      accent: "#4ade80",
      accentSoft: "rgba(74, 222, 128, 0.16)",
      accentGlow: "rgba(16, 185, 129, 0.22)",
      secondary: "#34d399",
      panel: "rgba(8, 22, 16, 0.9)",
    },
  },
  {
    id: "case-studies",
    label: "Case Studies",
    navLabel: "Case Studies",
    path: "/case-studies",
    kicker: "How I think",
    title: "Case-study routes explain the system decisions behind the projects.",
    summary:
      "V1 keeps this lighter than the reference portfolio, but still establishes the structure for long-form technical storytelling and architecture breakdowns.",
    heroWords: ["architecture", "tradeoffs", "delivery narratives"],
    chips: ["system design", "storytelling", "deep links", "editorial structure"],
    featuredProjectSlugs: ["f1-telemetry", "distributed-pipeline", "portfolio-system"],
    theme: {
      accent: "#f87171",
      accentSoft: "rgba(248, 113, 113, 0.16)",
      accentGlow: "rgba(251, 113, 133, 0.2)",
      secondary: "#fb7185",
      panel: "rgba(28, 8, 12, 0.9)",
    },
  },
  {
    id: "about",
    label: "About",
    navLabel: "About",
    path: "/about",
    kicker: "Context and fit",
    title: "Experience, education, and contact framed around the roles I want next.",
    summary:
      "This module turns the usual about page into a compact fit narrative: where the instincts came from, what roles I am targeting, and how to contact me.",
    heroWords: ["operator mindset", "ownership", "career direction"],
    chips: ["experience", "education", "contact", "fit narrative"],
    featuredProjectSlugs: ["portfolio-system", "f1-telemetry", "spotify-warehouse"],
    theme: {
      accent: "#a78bfa",
      accentSoft: "rgba(167, 139, 250, 0.16)",
      accentGlow: "rgba(139, 92, 246, 0.22)",
      secondary: "#c084fc",
      panel: "rgba(16, 10, 32, 0.9)",
    },
  },
];

export const projects: ProjectSummary[] = [
  {
    slug: "f1-telemetry",
    title: "F1 Telemetry Simulation System",
    timeline: "2025 - Present",
    status: "Flagship build",
    summary:
      "A race-style telemetry environment for streaming signals, replay workflows, anomaly visibility, and engineering storytelling.",
    stack: ["C++", "Python", "FastAPI", "React", "TypeScript", "PostgreSQL"],
    outcomes: [
      "Modeled live race data streams and improved responsiveness by roughly 35%.",
      "Built replay and comparison flows for lap history, sector deltas, and trend inspection.",
      "Designed a dashboard layer for speed, RPM, thermal signals, and energy usage.",
    ],
    detailIntro:
      "This project is the clearest expression of the kind of engineer I want to be: systems-minded, data-aware, and obsessed with making runtime behavior visible instead of mysterious.",
    detailSections: [
      {
        title: "System intent",
        body:
          "The project simulates the kinds of telemetry surfaces that matter in performance environments: live signals, lap replay, comparisons, and anomaly detection for decisions under time pressure.",
        bullets: [
          "Realtime-style dashboarding instead of static reporting.",
          "Strong emphasis on replay and inspection rather than raw data generation only.",
          "Built to show observability instincts, not just frontend polish.",
        ],
      },
      {
        title: "Why it matters",
        body:
          "It proves comfort with backend logic, data movement, UI surfaces, and the narrative layer needed to help people understand the system they are looking at.",
        bullets: [
          "Connects systems work with a product-facing interface.",
          "Shows interest in both speed and engineering visibility.",
          "Creates a natural bridge to AI copilot and observability ideas.",
        ],
      },
    ],
    primaryModuleId: "projects",
  },
  {
    slug: "distributed-pipeline",
    title: "Distributed Data Processing Pipeline",
    timeline: "2026 - Present",
    status: "Core data project",
    summary:
      "A cloud-oriented ETL workflow focused on partitioning, scalability, retries, and monitoring across distributed workloads.",
    stack: ["Python", "PySpark", "AWS S3", "SQL"],
    outcomes: [
      "Improved system scalability and reliability by about 40% in the project framing.",
      "Reduced execution time by roughly 35% with better partitioning and transformation flow.",
      "Integrated retry and monitoring workflows for more resilient batch execution.",
    ],
    detailIntro:
      "This project captures the operational side of software that I enjoy most: handling imperfect inputs, controlling failure behavior, and making pipeline quality visible before something breaks downstream.",
    detailSections: [
      {
        title: "System intent",
        body:
          "The pipeline is designed as a reliability exercise as much as a data exercise. Partitioning, validation, retries, and transparent monitoring matter as much as the raw transformations.",
        bullets: [
          "Structured around fault tolerance and performance together.",
          "Focused on confidence in downstream usage, not just ingesting records.",
          "A strong fit for data engineering and platform-oriented roles.",
        ],
      },
      {
        title: "Why it matters",
        body:
          "It demonstrates that I do not think of data work as isolated scripts. I think about repeatability, safe batch behavior, and the tooling needed to operate pipelines well over time.",
        bullets: [
          "Validates pipeline quality before analytics consumers see issues.",
          "Creates a direct story for observability and LLMOps interest.",
          "Shows the habits that matter in production data systems.",
        ],
      },
    ],
    primaryModuleId: "projects",
  },
  {
    slug: "portfolio-system",
    title: "This Portfolio System",
    timeline: "2026",
    status: "Live product demo",
    summary:
      "A modular portfolio app with a real AI copilot, route-aware themes, case-study routing, and public observability summary panels.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Vite", "Vercel", "Claude", "Langfuse"],
    outcomes: [
      "Reframed the portfolio as a route-based product instead of a single static page.",
      "Added a real server-side copilot endpoint with curated retrieval and safe fallbacks.",
      "Introduced public metrics summaries without exposing raw internal traces.",
    ],
    detailIntro:
      "This site is meant to demonstrate the same ideas it describes: modular thinking, AI-native interaction, observability-aware engineering, and deliberate product framing.",
    detailSections: [
      {
        title: "System intent",
        body:
          "The portfolio exists as both a hiring surface and a product artifact. The point is not to claim AI fluency abstractly; the point is to let a visitor interact with it.",
        bullets: [
          "Real backend copilot rather than a front-end-only scripted demo.",
          "Content modeled as typed route-aware documents for reuse and retrieval.",
          "A clear upgrade path from curated retrieval to richer evaluations later.",
        ],
      },
      {
        title: "Why it matters",
        body:
          "It creates a stronger hiring signal than a template site because the architecture itself becomes part of the portfolio story.",
        bullets: [
          "Shows product execution, not only design taste.",
          "Makes the portfolio itself a case study.",
          "Supports future Claude and Langfuse depth without a redesign.",
        ],
      },
    ],
    primaryModuleId: "copilot",
  },
  {
    slug: "spotify-warehouse",
    title: "Spotify Data Warehouse and Analytics System",
    timeline: "2025",
    status: "Academic project",
    summary:
      "An analytics-oriented warehouse project with ETL, star schema modeling, SQL transformations, and dashboard delivery.",
    stack: ["Python", "PostgreSQL", "SQL", "Tableau"],
    outcomes: [
      "Designed star schema models to improve KPI reporting performance by around 30%.",
      "Improved freshness and reliability of event ingestion with Python ETL workflows.",
      "Reduced reporting latency and manual effort by about 80% through dashboard automation.",
    ],
    detailIntro:
      "This project shows the analytics-facing side of my data work: schema design, reporting performance, and dashboard readiness.",
    detailSections: [
      {
        title: "System intent",
        body: "The design focused on trustworthy KPI reporting and query performance.",
        bullets: [
          "Star schema modeling for cleaner reporting flows.",
          "Repeatable ETL transformations and aggregation logic.",
          "Useful bridge between data engineering and business reporting.",
        ],
      },
    ],
    primaryModuleId: "about",
  },
  {
    slug: "fullstack-commerce",
    title: "Full-Stack E-Commerce Platform",
    timeline: "2024",
    status: "Academic project",
    summary:
      "A full-stack shopping app that ties frontend flows, backend APIs, authentication, and SQL-backed checkout together.",
    stack: ["React", "Spring Boot", "MySQL"],
    outcomes: [
      "Improved checkout completion by about 35% through better interaction flow.",
      "Reduced request latency by roughly 30% with modular endpoints and indexing.",
      "Strengthened security and validation behavior during user sessions and checkout paths.",
    ],
    detailIntro:
      "This project rounds out the portfolio by showing I can connect user-facing experience with backend structure and delivery logic.",
    detailSections: [
      {
        title: "System intent",
        body: "The project aimed to tighten product flow and backend reliability together.",
        bullets: [
          "Frontend and backend built as one coherent user journey.",
          "Validation and performance mattered as much as feature count.",
          "Helpful signal for full-stack engineering roles.",
        ],
      },
    ],
    primaryModuleId: "projects",
  },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "designing-a-portfolio-as-a-product",
    title: "Designing a Portfolio as a Product",
    status: "Published in v1",
    moduleId: "case-studies",
    summary:
      "Why the portfolio was rebuilt as a route-based AI demo instead of a single scrolling page.",
    highlight: "The portfolio itself becomes proof of AI-native product thinking.",
    sections: [
      {
        title: "Problem framing",
        body:
          "A conventional portfolio can describe AI and observability interests, but it does not prove them. The redesign turns the site itself into a working demonstration.",
        bullets: [
          "Shifted from page layout thinking to product surface thinking.",
          "Made interaction, retrieval, and metrics part of the story.",
          "Focused on trust and clarity over gimmicks.",
        ],
      },
      {
        title: "Delivery choices",
        body:
          "The v1 architecture favors typed content, lightweight retrieval, and route-based modules so the site can ship fast while keeping room for deeper LLMOps later.",
        bullets: [
          "Serverless Claude endpoint instead of a front-end-only copilot.",
          "Curated repo-managed knowledge instead of a database dependency.",
          "Public summary metrics with private trace detail.",
        ],
      },
    ],
  },
  {
    slug: "making-telemetry-readable",
    title: "Making Telemetry Readable",
    status: "Published in v1",
    moduleId: "case-studies",
    summary:
      "A short case study on why replay, anomaly visibility, and comparison flows matter as much as raw signal generation.",
    highlight: "Observability is useful only when people can actually reason from it.",
    sections: [
      {
        title: "Problem framing",
        body:
          "Telemetry interfaces often over-index on surface flash and under-deliver on reasoning. The better question is whether the interface helps a user understand system state quickly.",
        bullets: [
          "Replay matters because raw streams disappear.",
          "Comparisons matter because isolated values lack context.",
          "Readable signal is more important than sheer signal volume.",
        ],
      },
      {
        title: "Engineering angle",
        body:
          "This is where systems work and product work meet. The hard part is not only generating data. It is shaping the way humans inspect and act on it.",
        bullets: [
          "Supports dashboard decisions under pressure.",
          "Creates better hooks for future AI explanations.",
          "Shows engineering judgment, not only implementation effort.",
        ],
      },
    ],
  },
];

export const experienceEntries: ExperienceEntry[] = [
  {
    company: "Unified Mentors",
    role: "Web Development Intern",
    timeline: "Jan 2024 - Jun 2024",
    location: "Gurugram, India",
    summary:
      "Worked on backend workflows, cloud-connected data movement, CI/CD, and production issue handling.",
    bullets: [
      "Developed backend data workflows with Python and Node.js, improving throughput while reducing latency by around 25%.",
      "Built cloud-integrated pipelines with AWS services including S3 and RDS.",
      "Implemented CI/CD pipelines for automated testing and deployment, reducing release errors by about 30%.",
      "Diagnosed production pipeline and system issues through logs and debugging tooling to improve stability.",
    ],
  },
  {
    company: "Agropeeper Technologies",
    role: "Data Engineer Intern",
    timeline: "Apr 2023 - Sep 2023",
    location: "Mumbai, India",
    summary:
      "Focused on ingestion quality, ETL reliability, schema discipline, and failure recovery across multimodal data streams.",
    bullets: [
      "Built pipelines for RGB, thermal, and metadata streams, improving ingestion reliability by around 40%.",
      "Added validation, schema checks, and failure handling to improve downstream correctness by roughly 35%.",
      "Designed modular logging and monitoring flows that improved debugging and isolation of failure points.",
      "Engineered retry and recovery mechanisms to keep large-scale processing consistent under failure conditions.",
    ],
  },
];

export const educationEntries: EducationEntry[] = [
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

export const publicMetricsSeed: PublicMetrics = {
  totalChats: 0,
  avgLatencyMs: 0,
  popularModule: "AI Copilot",
  serviceStatus: "Awaiting runtime configuration",
  lastUpdated: "Not yet connected",
};

export const homeHighlights = [
  {
    value: "34",
    label: "Public repos",
    detail: "A visible GitHub footprint across systems, dashboards, vision work, and full-stack delivery.",
  },
  {
    value: "2",
    label: "Engineering internships",
    detail: "Backend workflows, monitoring, data reliability, and cloud-connected shipping experience.",
  },
  {
    value: "2026",
    label: "M.S. graduation",
    detail: "Stevens Institute of Technology, Computer Science.",
  },
  {
    value: "3.70",
    label: "Graduate GPA",
    detail: "Built on coursework in databases, ML, statistics, and business intelligence.",
  },
];
