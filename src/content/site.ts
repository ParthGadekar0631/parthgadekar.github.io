import { EducationEntry, ExperienceEntry, ModuleConfig, ProjectSummary } from "../types";

export const profile = {
  siteName: "Parth Gadekar",
  name: "Parth Gadekar",
  title: "Software Engineer | Systems, Data, Full Stack, and AI-Native Product Thinking",
  summary:
    "I am an M.S. Computer Science student at Stevens Institute of Technology building software across realtime systems, data pipelines, full-stack products, and AI-native experiences. My work is strongest when reliability, clear architecture, and user-facing product value all matter together.",
  shortSummary:
    "Software engineer with experience across backend workflows, ETL pipelines, cloud-connected systems, and product-focused engineering. I enjoy building software that is observable, practical, and easy to reason about.",
  availability:
    "Open to software engineering, data engineering, and AI systems roles in the USA. Based in Hoboken, NJ and open to relocation.",
  email: "parthgadekar060202@gmail.com",
  phone: "+1 (551) 260-5658",
  github: "https://github.com/ParthGadekar0631",
  resume: "Parth_Gadekar_Resume.pdf",
  photo: "parth-profile.jpg",
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
    label: "Home",
    navLabel: "Home",
    path: "/",
    kicker: "Landing page",
    title: "A dynamic engineering portfolio built to feel like a real product.",
    summary:
      "The homepage gives a clear overview of who I am, what I build, and where to explore the rest of the portfolio.",
    heroWords: ["systems that scale", "projects with signal", "software with clarity"],
    chips: ["landing page", "summary", "navigation", "product feel"],
    featuredProjectSlugs: ["f1-telemetry", "distributed-pipeline", "portfolio-system"],
    theme: {
      accent: "#67e8f9",
      accentSoft: "rgba(103, 232, 249, 0.16)",
      accentGlow: "rgba(14, 165, 233, 0.24)",
      secondary: "#38bdf8",
      panel: "rgba(7, 16, 30, 0.92)",
    },
  },
  {
    id: "experience",
    label: "Experience",
    navLabel: "Experience",
    path: "/experience",
    kicker: "Work history",
    title: "Three roles that shaped my engineering instincts.",
    summary:
      "This route focuses on internships and practical work where I built backend systems, data workflows, and debugging discipline.",
    heroWords: ["backend workflows", "pipeline reliability", "shipping under constraints"],
    chips: ["3 experiences", "cloud", "debugging", "delivery"],
    featuredProjectSlugs: ["f1-telemetry", "distributed-pipeline", "spotify-warehouse"],
    theme: {
      accent: "#4ade80",
      accentSoft: "rgba(74, 222, 128, 0.16)",
      accentGlow: "rgba(16, 185, 129, 0.22)",
      secondary: "#34d399",
      panel: "rgba(8, 22, 16, 0.9)",
    },
  },
  {
    id: "projects",
    label: "Projects",
    navLabel: "Projects",
    path: "/projects",
    kicker: "Eight selected projects",
    title: "Eight projects that show systems, data, product, and engineering depth.",
    summary:
      "This route is the proof-of-work layer: eight project cards with descriptions, outcomes, and detailed routes for deeper reading.",
    heroWords: ["telemetry", "pipelines", "products"],
    chips: ["8 projects", "detail pages", "evidence", "engineering"],
    featuredProjectSlugs: ["f1-telemetry", "distributed-pipeline", "fullstack-commerce"],
    theme: {
      accent: "#f59e0b",
      accentSoft: "rgba(245, 158, 11, 0.18)",
      accentGlow: "rgba(249, 115, 22, 0.22)",
      secondary: "#fb923c",
      panel: "rgba(28, 16, 6, 0.9)",
    },
  },
  {
    id: "skills",
    label: "Skills",
    navLabel: "Skills",
    path: "/skills",
    kicker: "Technical stack",
    title: "Skills grouped by how I actually use them, not by keyword stuffing.",
    summary:
      "This route organizes programming languages, frameworks, cloud tools, data tooling, and AI/LLMOps interests into meaningful groups.",
    heroWords: ["typescript", "python", "observability"],
    chips: ["languages", "frameworks", "cloud", "AI workflows"],
    featuredProjectSlugs: ["portfolio-system", "f1-telemetry", "distributed-pipeline"],
    theme: {
      accent: "#f87171",
      accentSoft: "rgba(248, 113, 113, 0.16)",
      accentGlow: "rgba(251, 113, 133, 0.2)",
      secondary: "#fb7185",
      panel: "rgba(28, 8, 12, 0.9)",
    },
  },
  {
    id: "education",
    label: "Education",
    navLabel: "Education",
    path: "/education",
    kicker: "Academic context",
    title: "Education that supports the engineering foundations behind the work.",
    summary:
      "This route covers graduate and undergraduate education, coursework, and academic grounding.",
    heroWords: ["computer science", "databases", "machine learning"],
    chips: ["M.S. CS", "B.E. IT", "coursework", "foundation"],
    featuredProjectSlugs: ["spotify-warehouse", "nyc-taxi", "distributed-pipeline"],
    theme: {
      accent: "#a78bfa",
      accentSoft: "rgba(167, 139, 250, 0.16)",
      accentGlow: "rgba(139, 92, 246, 0.22)",
      secondary: "#c084fc",
      panel: "rgba(16, 10, 32, 0.9)",
    },
  },
  {
    id: "contact",
    label: "Contact",
    navLabel: "Contact",
    path: "/contact",
    kicker: "Get in touch",
    title: "A direct contact route with form fields, not just a static email link.",
    summary:
      "This route lets visitors enter a name, email, and message, then open a ready-to-send email to me.",
    heroWords: ["let's connect", "software roles", "project discussions"],
    chips: ["contact form", "email", "github", "resume"],
    featuredProjectSlugs: ["portfolio-system", "f1-telemetry", "fullstack-commerce"],
    theme: {
      accent: "#22d3ee",
      accentSoft: "rgba(34, 211, 238, 0.16)",
      accentGlow: "rgba(6, 182, 212, 0.22)",
      secondary: "#06b6d4",
      panel: "rgba(8, 18, 28, 0.92)",
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
          "The project simulates telemetry surfaces that matter in performance environments: live signals, lap replay, comparisons, and anomaly detection for decisions under time pressure.",
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
    title: "RisksRay Portfolio System",
    timeline: "2026",
    status: "Live product demo",
    summary:
      "A modular portfolio app with dynamic routes, richer motion, branding, and product-style information architecture.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Vite", "Vercel"],
    outcomes: [
      "Reframed the portfolio as a route-based product instead of a single static page.",
      "Added dedicated pages for experience, projects, skills, education, and contact.",
      "Introduced stronger branding, dynamic themes, and a cleaner portfolio shell.",
    ],
    detailIntro:
      "This site is designed to feel like a product, not a resume dump. The architecture itself is part of the portfolio story.",
    detailSections: [
      {
        title: "Design intent",
        body:
          "The site uses multiple routes, a persistent shell, and theme shifts so visitors can move through the portfolio as a system instead of one overloaded page.",
        bullets: [
          "Dedicated pages instead of one long scroll.",
          "Consistent product-style navigation and CTA structure.",
          "Visual identity built around RisksRay branding.",
        ],
      },
      {
        title: "Why it matters",
        body:
          "A portfolio that demonstrates organization, UX judgment, and implementation quality is stronger than one that only lists technologies.",
        bullets: [
          "Shows frontend architecture and product framing.",
          "Demonstrates how I think about user flow and clarity.",
          "Acts as a living proof-of-work artifact.",
        ],
      },
    ],
    primaryModuleId: "home",
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
    primaryModuleId: "projects",
  },
  {
    slug: "nyc-taxi",
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
    detailIntro:
      "This project extends my data engineering work into analytics-heavy public datasets and operational reporting.",
    detailSections: [
      {
        title: "System intent",
        body: "The project connects ingestion quality, SQL performance, and reporting usefulness.",
        bullets: [
          "End-to-end pipeline design instead of isolated scripts.",
          "Built around downstream confidence and query clarity.",
          "Strong evidence for data engineering fit.",
        ],
      },
    ],
    primaryModuleId: "projects",
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
  {
    slug: "air-canvas",
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
    detailIntro:
      "Air Canvas shows my earlier interest in realtime systems and visual feedback loops through computer vision.",
    detailSections: [
      {
        title: "System intent",
        body: "The project focused on live gesture detection and responsive visual feedback.",
        bullets: [
          "Realtime input handling matters more than static model output.",
          "Performance and UX are tightly connected here.",
          "Good evidence of experimentation with CV systems.",
        ],
      },
    ],
    primaryModuleId: "projects",
    href: "https://github.com/ParthGadekar0631/Air-Canvas",
  },
  {
    slug: "land-registry",
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
    detailIntro:
      "This project explores systems where correctness, user trust, and transaction clarity matter together.",
    detailSections: [
      {
        title: "System intent",
        body: "The project focused on transparent property transaction workflows and digital trust.",
        bullets: [
          "Traceability and user confidence were key design concerns.",
          "The interface was part of the trust model, not just decoration.",
          "Shows breadth across product and systems ideas.",
        ],
      },
    ],
    primaryModuleId: "projects",
    href: "https://github.com/ParthGadekar0631/Land-Registry-using-Blockchain",
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
  {
    company: "Dezignolics Web and Software Solutions",
    role: "Information Systems Intern",
    timeline: "Jun 2022 - Jul 2022",
    location: "Thane, India",
    summary:
      "Worked on web scraping, data extraction, parsing workflows, and data cleaning for structured reporting use cases.",
    bullets: [
      "Built automated web scraping scripts using Python and BeautifulSoup to extract structured data from web sources.",
      "Designed parsing workflows for dynamic HTML content to improve reliability across multiple sources.",
      "Implemented data cleaning and validation processes using Python and SQL to improve reporting accuracy.",
      "Optimized scraping and retrieval workflows to reduce execution time and improve efficiency by about 25%.",
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

export const skillsGroups = [
  {
    title: "Programming Languages",
    items: ["Python", "TypeScript", "C++", "SQL", "JavaScript", "Bash", "Java"],
  },
  {
    title: "Frontend and Product",
    items: ["React", "Tailwind CSS", "Vite", "Responsive UI", "Routing", "Product UX"],
  },
  {
    title: "Backend and APIs",
    items: ["FastAPI", "REST APIs", "Node.js", "Spring Boot", "Authentication", "System Design"],
  },
  {
    title: "Data and Cloud",
    items: ["PySpark", "PostgreSQL", "MySQL", "AWS S3", "RDS", "ETL Pipelines", "Data Validation"],
  },
  {
    title: "AI and LLMOps Direction",
    items: ["Claude", "Chatbot UX", "Observability", "Langfuse", "Prompt Framing", "AI Product Thinking"],
  },
  {
    title: "Engineering Practices",
    items: ["CI/CD", "Debugging", "Monitoring", "Reliability", "Git", "Docker", "Linux"],
  },
];

export const homeHighlights = [
  {
    value: "3",
    label: "Work experiences",
    detail: "Internship experience across backend workflows, ETL reliability, and information systems work.",
  },
  {
    value: "8",
    label: "Selected projects",
    detail: "Projects spanning realtime systems, data engineering, full-stack builds, analytics, and blockchain.",
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

export const publicMetricsSeed = {
  totalChats: 12,
  avgLatencyMs: 780,
  popularModule: "Projects",
  serviceStatus: "Configured for Vercel",
  lastUpdated: new Date().toISOString(),
};
