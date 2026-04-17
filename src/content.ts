export type Metric = {
  value: string;
  label: string;
  detail: string;
};

export type Theme = {
  accent: string;
  accentSoft: string;
  accentGlow: string;
  secondary: string;
  panel: string;
};

export type Module = {
  id: string;
  index: string;
  label: string;
  kicker: string;
  title: string;
  intro: string;
  detail: string;
  bullets: string[];
  heroWords: string[];
  metrics: Metric[];
  chips: string[];
  projectIds: string[];
  askPrompt: string;
  theme: Theme;
};

export type Project = {
  id: string;
  title: string;
  timeline: string;
  status: string;
  summary: string;
  stack: string[];
  outcomes: string[];
  href?: string;
};

export type Experience = {
  company: string;
  role: string;
  timeline: string;
  location: string;
  summary: string;
  points: string[];
};

export type Education = {
  school: string;
  degree: string;
  timeline: string;
  detail: string;
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
  title: "Software engineer focused on systems, data, and AI-native product execution.",
  summary:
    "I am an M.S. Computer Science student at Stevens Institute of Technology building software that needs to stay observable, explainable, and useful under real operational pressure.",
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

export const modules: Module[] = [
  {
    id: "systems",
    index: "01",
    label: "Realtime Systems",
    kicker: "Core engineering bias",
    title: "I like software that keeps its shape when the inputs get noisy.",
    intro:
      "This module is about telemetry, performance, debugging, and designing systems that remain legible under stress.",
    detail:
      "The strongest signal in my work is not a specific framework. It is the way I think about moving data, runtime behavior, failure visibility, and engineering tradeoffs when the system has to keep operating.",
    bullets: [
      "Bias toward readable architectures, explicit state, and measurable behavior.",
      "Comfortable around telemetry-style data, replay flows, and operational dashboards.",
      "Interested in the engineering layer where performance and observability meet product value.",
    ],
    heroWords: ["observable systems", "telemetry dashboards", "debuggable backends"],
    metrics: [
      {
        value: "~35%",
        label: "Responsiveness gains",
        detail: "Repeated performance improvements across simulation, ETL, and CV projects.",
      },
      {
        value: "30 FPS",
        label: "Realtime target",
        detail: "Maintained in Air Canvas while handling gesture inference and rendering.",
      },
    ],
    chips: ["performance", "profiling", "simulation", "dashboards", "operability"],
    projectIds: ["f1-telemetry", "air-canvas", "algorithm-visualizer"],
    askPrompt: "What makes you strong in realtime systems work?",
    theme: {
      accent: "#67e8f9",
      accentSoft: "rgba(103, 232, 249, 0.18)",
      accentGlow: "rgba(14, 165, 233, 0.28)",
      secondary: "#38bdf8",
      panel: "rgba(7, 16, 30, 0.9)",
    },
  },
  {
    id: "data",
    index: "02",
    label: "Data Pipelines",
    kicker: "Reliability and throughput",
    title: "My pipeline work is mostly about trust: validation, retries, and clear failure paths.",
    intro:
      "This module centers on ETL systems, distributed processing, schema checks, data quality, and monitoring.",
    detail:
      "At Agropeeper and across project work, I kept coming back to the same operational problems: bad inputs, hidden failures, fragile transformations, and workflows that need better visibility before anyone can improve them.",
    bullets: [
      "Prefer validation and retry logic over optimistic assumptions.",
      "Interested in data platforms that expose quality signals instead of hiding them.",
      "Comfortable with ETL, partitioning, monitoring, and batch reliability patterns.",
    ],
    heroWords: ["fault-tolerant pipelines", "data reliability", "distributed ETL"],
    metrics: [
      {
        value: "~40%",
        label: "Reliability lift",
        detail: "Repeated pipeline robustness gains across internship and project work.",
      },
      {
        value: "~35%",
        label: "Runtime reduction",
        detail: "Applied through partitioning, better transformation flow, and retry design.",
      },
    ],
    chips: ["etl", "sql", "pyspark", "aws", "data quality"],
    projectIds: ["distributed-pipeline", "nyc-taxi", "spotify-warehouse"],
    askPrompt: "Why are you interested in data engineering and observability?",
    theme: {
      accent: "#4ade80",
      accentSoft: "rgba(74, 222, 128, 0.18)",
      accentGlow: "rgba(16, 185, 129, 0.25)",
      secondary: "#34d399",
      panel: "rgba(8, 22, 16, 0.88)",
    },
  },
  {
    id: "ai",
    index: "03",
    label: "AI Workflow",
    kicker: "LLMOps direction",
    title: "I want this portfolio to feel AI-native, but still engineered with restraint.",
    intro:
      "This module is where chatbot UX, observability, Claude-oriented workflows, and future Langfuse instrumentation come together.",
    detail:
      "Right now the portfolio uses a static front-end copilot because GitHub Pages is the fastest free deployment path. The structure is intentional though: it leaves room for a real backend, traces, evaluations, and retrieval without throwing away the design.",
    bullets: [
      "Current version includes a local chat layer and module-driven narrative.",
      "Next logical upgrade is a real Claude-backed copilot with trace visibility and analytics.",
      "The goal is not AI theater. The goal is useful interaction and measurable product behavior.",
    ],
    heroWords: ["agentic workflows", "chatbot surfaces", "llmops-ready products"],
    metrics: [
      {
        value: "1",
        label: "Copilot surface",
        detail: "Already present in the portfolio and ready for a backend upgrade path.",
      },
      {
        value: "3",
        label: "Upgrade layers",
        detail: "Backend inference, observability, and evaluation can be added cleanly next.",
      },
    ],
    chips: ["claude", "chatbot", "observability", "langfuse", "evaluation"],
    projectIds: ["portfolio-system", "f1-telemetry", "distributed-pipeline"],
    askPrompt: "How would you turn this into a real AI portfolio?",
    theme: {
      accent: "#f59e0b",
      accentSoft: "rgba(245, 158, 11, 0.18)",
      accentGlow: "rgba(249, 115, 22, 0.24)",
      secondary: "#fb923c",
      panel: "rgba(28, 16, 6, 0.9)",
    },
  },
  {
    id: "product",
    index: "04",
    label: "Product Builds",
    kicker: "Applied delivery",
    title: "I also care about whether the system is actually useful, not just technically correct.",
    intro:
      "This module covers product-facing builds where APIs, data flow, and user experience need to work together.",
    detail:
      "A strong portfolio should show more than isolated technical feats. It should prove the ability to turn backend logic, interfaces, and delivery constraints into something people can actually use.",
    bullets: [
      "Comfortable crossing frontend, backend, and data concerns when the project needs it.",
      "Interested in roles where architecture and delivery are tightly connected.",
      "Prefer product examples that show ownership rather than isolated feature work.",
    ],
    heroWords: ["full-stack delivery", "usable interfaces", "end-to-end ownership"],
    metrics: [
      {
        value: "~35%",
        label: "Checkout improvement",
        detail: "From the e-commerce platform project through better flows and endpoint design.",
      },
      {
        value: "~25%",
        label: "Latency reduction",
        detail: "Repeated in API and database improvements across internship work.",
      },
    ],
    chips: ["react", "typescript", "apis", "sql", "ownership"],
    projectIds: ["fullstack-commerce", "land-registry", "portfolio-system"],
    askPrompt: "What kind of product engineering roles are you targeting?",
    theme: {
      accent: "#f87171",
      accentSoft: "rgba(248, 113, 113, 0.18)",
      accentGlow: "rgba(251, 113, 133, 0.24)",
      secondary: "#fb7185",
      panel: "rgba(28, 8, 12, 0.9)",
    },
  },
];

export const projects: Project[] = [
  {
    id: "f1-telemetry",
    title: "F1 Telemetry Simulation System",
    timeline: "2025 - Present",
    status: "Current build",
    summary:
      "A race-style telemetry environment for live data streams, replay workflows, anomaly visibility, and performance storytelling.",
    stack: ["C++", "Python", "FastAPI", "React", "TypeScript", "PostgreSQL"],
    outcomes: [
      "Modeled live race data streams and improved responsiveness by roughly 35%.",
      "Built replay and comparison flows for lap history, sector deltas, and trend inspection.",
      "Designed a dashboard layer for speed, RPM, thermal signals, and energy usage.",
    ],
  },
  {
    id: "distributed-pipeline",
    title: "Distributed Data Processing Pipeline",
    timeline: "2026 - Present",
    status: "Academic system",
    summary:
      "A cloud-oriented ETL workflow focused on partitioning, scalability, retries, and monitoring across distributed workloads.",
    stack: ["Python", "PySpark", "AWS S3", "SQL"],
    outcomes: [
      "Improved system scalability and reliability by about 40% in the project framing.",
      "Reduced execution time by roughly 35% with parallel processing and better data flow design.",
      "Integrated monitoring and retry workflows for more resilient batch execution.",
    ],
  },
  {
    id: "air-canvas",
    title: "Air Canvas",
    timeline: "2021",
    status: "Public repo",
    summary:
      "A realtime computer vision canvas that translates hand gestures into responsive drawing behavior.",
    stack: ["Python", "OpenCV", "NumPy", "TensorFlow"],
    outcomes: [
      "Reached about 95% gesture tracking accuracy.",
      "Reduced frame latency by roughly 30% with tighter contour and tracking logic.",
      "Maintained smooth interaction close to 30 FPS.",
    ],
    href: "https://github.com/ParthGadekar0631/Air-Canvas",
  },
  {
    id: "spotify-warehouse",
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
  },
  {
    id: "nyc-taxi",
    title: "NYC Taxi Data Pipeline",
    timeline: "2026 - Present",
    status: "Personal project",
    summary:
      "An end-to-end analytics pipeline for large mobility data, designed around ingestion quality and reliable downstream querying.",
    stack: ["Python", "AWS S3", "PostgreSQL", "SQL", "Tableau"],
    outcomes: [
      "Processed large datasets through a structured ingestion and transformation pipeline.",
      "Improved query responsiveness through optimized SQL and indexing strategy.",
      "Focused on trustworthy downstream analytics rather than raw ingestion alone.",
    ],
  },
  {
    id: "fullstack-commerce",
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
  },
  {
    id: "land-registry",
    title: "Land Registry Using Blockchain",
    timeline: "2023",
    status: "Public repo",
    summary:
      "A blockchain-backed property registry concept focused on trust, traceability, and clear transaction flow for users.",
    stack: ["Dart", "Flutter", "Solidity", "Web3.js"],
    outcomes: [
      "Implemented ownership transaction flows on Ethereum-style infrastructure.",
      "Built a user-facing interface for registry and transfer workflows.",
      "Strengthened my thinking around trust-sensitive systems and product confidence.",
    ],
    href: "https://github.com/ParthGadekar0631/Land-Registry-using-Blockchain",
  },
  {
    id: "algorithm-visualizer",
    title: "Algorithm Visualizer",
    timeline: "2020 - 2021",
    status: "Foundational project",
    summary:
      "A fundamentals-driven build focused on algorithm behavior, visual explanation, and systems-minded learning.",
    stack: ["C++", "CMake"],
    outcomes: [
      "Built visual explanations for algorithms and execution flow.",
      "Strengthened systems fundamentals and low-level debugging discipline.",
      "Served as an early proof of interest in performance-aware engineering.",
    ],
  },
  {
    id: "portfolio-system",
    title: "This Portfolio System",
    timeline: "2026",
    status: "Live artifact",
    summary:
      "A modular portfolio experience built with dynamic themes, typed text, motion, and a static copilot layer designed for future AI upgrades.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    outcomes: [
      "Shifted the site from a flat landing page to a theme-driven module system.",
      "Kept the current deployment GitHub Pages compatible while preserving an AI upgrade path.",
      "Prepared the architecture for future Claude, Langfuse, and observability integration.",
    ],
  },
];

export const experience: Experience[] = [
  {
    company: "Unified Mentors",
    role: "Web Development Intern",
    timeline: "Jan 2024 - Jun 2024",
    location: "Gurugram, India",
    summary:
      "Worked on backend workflows, cloud-connected data movement, CI/CD, and production issue handling.",
    points: [
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
    points: [
      "Built pipelines for RGB, thermal, and metadata streams, improving ingestion reliability by around 40%.",
      "Added validation, schema checks, and failure handling to improve downstream correctness by roughly 35%.",
      "Designed modular logging and monitoring flows that improved debugging and isolation of failure points.",
      "Engineered retry and recovery mechanisms to keep large-scale processing consistent under failure conditions.",
    ],
  },
];

export const education: Education[] = [
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
    label: "How would you upgrade this portfolio?",
    prompt: "How would you turn this into a real AI portfolio?",
  },
];

export const chatKnowledge: ChatKnowledge[] = [
  {
    match: ["who are you", "kind of engineer", "about you", "introduce"],
    answer:
      "I am a software engineer with a systems and data bias. My strongest patterns across internships and projects are backend workflows, ETL pipelines, monitoring, debugging, and product-minded execution.",
  },
  {
    match: ["f1", "telemetry", "simulation", "race"],
    answer:
      "The F1 telemetry project is where a lot of my interests meet: performance, streaming-style data, dashboards, and engineering visibility. It is built to simulate live race signals, replay laps, compare runs, and make system behavior easy to inspect.",
  },
  {
    match: ["data engineering", "observability", "monitoring", "pipeline"],
    answer:
      "I keep coming back to data engineering because I like the operational layer of software. Validation, retries, metrics, debugging, and trustworthy data flow all matter to me, and the same mindset carries into observability and LLMOps.",
  },
  {
    match: ["ai portfolio", "real ai", "upgrade", "claude", "langfuse", "chatbot"],
    answer:
      "The current site uses a static front-end copilot because GitHub Pages is the simplest free host. The next upgrade path is a real backend that calls Claude, records traces with Langfuse, adds evaluations, and turns the copilot into a measurable product surface instead of a scripted one.",
  },
  {
    match: ["roles", "targeting", "looking for", "job", "opportunities"],
    answer:
      "I am targeting software engineering, data engineering, and AI systems roles where I can work on reliable backends, data-intensive workflows, or AI-native product surfaces. I am based in Hoboken, NJ, open to relocation, and graduating with my M.S. in May 2026.",
  },
  {
    match: ["github", "projects", "repo", "repositories"],
    answer:
      "My GitHub profile shows active public work across systems, vision, and full-stack builds. The strongest portfolio projects for hiring conversations are F1 Telemetry, Air Canvas, the distributed pipeline work, and now this modular portfolio itself.",
  },
];
