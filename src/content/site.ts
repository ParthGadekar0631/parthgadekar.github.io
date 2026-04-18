import { EducationEntry, ExperienceEntry, ModuleConfig, ProjectSummary } from "../types";

export const profile = {
  siteName: "Parth Gadekar",
  name: "Parth Gadekar",
  title: "Software Engineer | Systems, Data, Full-Stack, and Cloud-Focused Builder",
  summary:
    "I am an M.S. Computer Science student at Stevens Institute of Technology building software across backend systems, data pipelines, full-stack products, and cloud-connected workflows. My strongest work sits where reliability, clean architecture, and user-facing value all need to work together.",
  shortSummary:
    "Software engineer with experience across backend workflows, ETL pipelines, cloud-connected systems, and product-focused engineering. I build software that is reliable, practical, and easy to reason about.",
  availability:
    "Open to software engineering, data engineering, and AI systems roles in the USA. Based in Hoboken, NJ and open to relocation.",
  email: "parthgadekar060202@gmail.com",
  phone: "+1 (551) 260-5658",
  github: "https://github.com/ParthGadekar0631",
  linkedin: "https://www.linkedin.com/in/parthgadekar622/",
  resume: "Parth_Gadekar_Resume.pdf",
  photo: "parth-profile.jpg",
  location: "Hoboken, NJ",
};

export const requestedStack = [
  "Python",
  "TypeScript",
  "React",
  "Spring Boot",
  "Node.js",
  "FastAPI",
  "MongoDB",
  "PostgreSQL",
  "PySpark",
  "AWS S3",
  "SQL",
  "GitHub Actions",
  "Flutter",
  "Solidity",
  "OpenCV",
  "Tableau",
];

export const moduleConfigs: ModuleConfig[] = [
  {
    id: "about",
    label: "About",
    navLabel: "About",
    path: "/",
    kicker: "Welcome to Parth's portfolio",
    title: "Solve complex problems. Ship reliable systems.",
    summary:
      "A landing page with a clear engineering summary, technical stack, selected projects, measurable outcomes, and quick paths into credentials and contact.",
    heroWords: ["backend systems", "data pipelines", "production-minded software"],
    chips: ["software engineering", "data engineering", "cloud workflows", "full-stack systems"],
    featuredProjectSlugs: ["f1-telemetry", "distributed-pipeline", "fullstack-commerce"],
    theme: {
      accent: "#67e8f9",
      accentSoft: "rgba(103, 232, 249, 0.16)",
      accentGlow: "rgba(14, 165, 233, 0.24)",
      secondary: "#38bdf8",
      panel: "rgba(7, 16, 30, 0.92)",
    },
  },
  {
    id: "projects",
    label: "Projects",
    navLabel: "Projects",
    path: "/projects",
    kicker: "Project showcase",
    title: "Projects",
    summary:
      "A project grid with category filters, dense project cards, GitHub links, technology context, and detailed project pages underneath.",
    heroWords: ["telemetry", "pipelines", "full-stack builds"],
    chips: ["8 projects", "github links", "category filters", "detail pages"],
    featuredProjectSlugs: ["f1-telemetry", "distributed-pipeline", "nyc-taxi"],
    theme: {
      accent: "#7dd3fc",
      accentSoft: "rgba(125, 211, 252, 0.18)",
      accentGlow: "rgba(96, 165, 250, 0.22)",
      secondary: "#a78bfa",
      panel: "rgba(13, 16, 32, 0.94)",
    },
  },
  {
    id: "credentials",
    label: "Credentials",
    navLabel: "Credentials",
    path: "/credentials",
    kicker: "Experience, education, and skills",
    title: "Credentials",
    summary:
      "A single credentials route that groups work experience, education, and technical skills the way recruiters expect to scan them.",
    heroWords: ["work experience", "stevens", "mumbai university"],
    chips: ["3 experiences", "2 education entries", "skills grouped", "quick scan"],
    featuredProjectSlugs: ["land-registry", "medication-adherence-tracker", "spotify-warehouse"],
    theme: {
      accent: "#c084fc",
      accentSoft: "rgba(192, 132, 252, 0.18)",
      accentGlow: "rgba(168, 85, 247, 0.22)",
      secondary: "#60a5fa",
      panel: "rgba(17, 12, 34, 0.94)",
    },
  },
  {
    id: "contact",
    label: "Contact",
    navLabel: "Contact",
    path: "/contact",
    kicker: "Get in touch",
    title: "Contact",
    summary:
      "A direct contact page with a simple form, profile-centered visual panel, and links to email, GitHub, and LinkedIn.",
    heroWords: ["let's connect", "software roles", "project conversations"],
    chips: ["contact form", "email", "github", "linkedin"],
    featuredProjectSlugs: ["f1-telemetry", "fullstack-commerce", "distributed-pipeline"],
    theme: {
      accent: "#f59e0b",
      accentSoft: "rgba(245, 158, 11, 0.18)",
      accentGlow: "rgba(249, 115, 22, 0.22)",
      secondary: "#f97316",
      panel: "rgba(26, 16, 8, 0.94)",
    },
  },
];

export const projects: ProjectSummary[] = [
  {
    slug: "land-registry",
    title: "Blockchain in Land Registry Process",
    timeline: "Jul 2022 - May 2023",
    status: "Selected project",
    category: "Full-Stack & Systems",
    context: "A. C. Patil College of Engineering | Ethereum, Solidity, Flutter, Blockchain APIs, SHA-256",
    summary:
      "A blockchain-backed land registry workflow that uses Solidity, Flutter, and SHA-256 validation to improve trust, traceability, and user confidence.",
    stack: ["Ethereum", "Solidity", "Flutter", "Blockchain APIs", "SHA-256"],
    tags: ["Blockchain", "Flutter", "Security"],
    outcomes: [
      "Reduced fraud risk by about 50% through tamper-resistant transfer records.",
      "Improved transparent user verification flows, contributing to roughly 90% testing satisfaction.",
      "Strengthened data integrity with SHA-256 validation and secure on-chain state handling.",
    ],
    detailIntro:
      "This project focused on trust-sensitive software where correctness, validation, and a clear user flow matter as much as the underlying technical architecture.",
    detailSections: [
      {
        title: "System intent",
        body:
          "The registry was designed to make ownership transfer more traceable and harder to manipulate by combining smart contracts, record validation, and a Flutter-based user workflow.",
        bullets: [
          "Ownership history is recorded through Solidity contract flows.",
          "Hash-based validation protects the integrity of submitted records.",
          "The interface is part of the trust model, not just a presentation layer.",
        ],
      },
      {
        title: "Why it matters",
        body:
          "It shows breadth beyond traditional CRUD applications and highlights interest in systems where user confidence and data correctness are tightly connected.",
        bullets: [
          "Trust-sensitive workflows require stronger validation discipline.",
          "User-facing transparency improved verification satisfaction in testing.",
          "Good evidence of product thinking inside a technical system.",
        ],
      },
    ],
    primaryModuleId: "projects",
    href: "https://github.com/ParthGadekar0631/Land-Registry-using-Blockchain",
  },
  {
    slug: "fullstack-commerce",
    title: "Full-Stack E-Commerce Platform",
    timeline: "Sep 2024 - Dec 2024",
    status: "Selected project",
    category: "Full-Stack & Systems",
    context: "Stevens Institute of Technology | React, Spring Boot, MySQL",
    summary:
      "A full-stack shopping application built with React, Spring Boot, and MySQL, centered on checkout performance, modular APIs, and secure session flows.",
    stack: ["React", "Spring Boot", "MySQL", "REST APIs", "Authentication"],
    tags: ["Full-Stack", "APIs", "Systems"],
    outcomes: [
      "Improved checkout completion by about 35% through optimized user flows.",
      "Reduced request latency by about 30% under peak traffic through SQL indexing and modular endpoints.",
      "Lowered security failures by roughly 25% through authentication and session handling improvements.",
    ],
    detailIntro:
      "This project rounds out the portfolio with a product-facing system where frontend experience, backend design, and transactional correctness all matter together.",
    detailSections: [
      {
        title: "System intent",
        body:
          "The platform was designed to create a smoother checkout experience while keeping the backend modular enough to scale with more products, billing features, and user actions.",
        bullets: [
          "React, Spring Boot, and MySQL were combined as one product workflow instead of isolated layers.",
          "Request latency was reduced with indexing and cleaner endpoint boundaries.",
          "Authentication and session handling were treated as core platform concerns.",
        ],
      },
      {
        title: "Why it matters",
        body:
          "It demonstrates that I can build reliable product software, not just engineering demos, and that I think about system design through the user journey.",
        bullets: [
          "Strong signal for full-stack and application engineering roles.",
          "Balances user experience and backend correctness.",
          "Shows comfort with modular service design and debugging.",
        ],
      },
    ],
    primaryModuleId: "projects",
  },
  {
    slug: "medication-adherence-tracker",
    title: "Medication Adherence Tracker",
    timeline: "Sep 2025 - Jan 2026",
    status: "Selected project",
    category: "Full-Stack & Systems",
    context: "Stevens Institute of Technology | Node.js, MongoDB, GitHub Actions, REST APIs",
    summary:
      "A healthcare-oriented adherence tracking system using Node.js, MongoDB, REST APIs, and GitHub Actions for reliable data handling and faster delivery.",
    stack: ["Node.js", "MongoDB", "REST APIs", "GitHub Actions"],
    tags: ["Backend", "Healthcare", "CI/CD"],
    outcomes: [
      "Improved backend request throughput by about 28% with REST APIs and MongoDB-backed handling.",
      "Reduced health data inconsistencies through schema validation and consistency checks.",
      "Improved release stability by about 25% through CI/CD with GitHub Actions.",
    ],
    detailIntro:
      "This project sits at the intersection of backend reliability, data correctness, and delivery discipline, which is exactly the kind of work I enjoy most.",
    detailSections: [
      {
        title: "System intent",
        body:
          "The tracker was built to support real-time medication adherence workflows while keeping data consistency, reliability, and release quality under control.",
        bullets: [
          "REST APIs were structured to support live adherence updates.",
          "MongoDB validation checks protected health tracking consistency.",
          "CI/CD reduced release friction and made delivery more repeatable.",
        ],
      },
      {
        title: "Why it matters",
        body:
          "It shows backend focus, data quality instincts, and practical engineering discipline through API design, indexing, and continuous delivery.",
        bullets: [
          "Health-related data raised the bar for correctness and validation.",
          "GitHub Actions made deployment quality part of the workflow.",
          "Good evidence of production-style backend habits.",
        ],
      },
    ],
    primaryModuleId: "projects",
  },
  {
    slug: "f1-telemetry",
    title: "F1 Telemetry Simulation System",
    timeline: "Jun 2025 - Present",
    status: "Flagship build",
    category: "Full-Stack & Systems",
    context: "Personal Project | C++, Python, FastAPI, React, TypeScript, PostgreSQL",
    summary:
      "A race-style telemetry environment for streaming signals, replay workflows, anomaly visibility, and engineering storytelling.",
    stack: ["C++", "Python", "FastAPI", "React", "TypeScript", "PostgreSQL"],
    tags: ["Systems", "Telemetry", "Realtime"],
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
    timeline: "Feb 2026 - Present",
    status: "Core data project",
    category: "Data Science",
    context: "Stevens Institute of Technology | Python, PySpark, AWS S3, SQL",
    summary:
      "A cloud-oriented ETL workflow focused on partitioning, scalability, retries, and monitoring across distributed workloads.",
    stack: ["Python", "PySpark", "AWS S3", "SQL"],
    tags: ["Data Engineering", "ETL", "Cloud"],
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
    slug: "spotify-warehouse",
    title: "Spotify Data Warehouse and Analytics System",
    timeline: "Jan 2025 - May 2025",
    status: "Analytics project",
    category: "Data Science",
    context: "Stevens Institute of Technology | Python, PostgreSQL, SQL, Tableau",
    summary:
      "An analytics-oriented warehouse project with ETL, star schema modeling, SQL transformations, and dashboard delivery.",
    stack: ["Python", "PostgreSQL", "SQL", "Tableau"],
    tags: ["Analytics", "Warehouse", "Tableau"],
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
    timeline: "Jan 2026 - Present",
    status: "Selected project",
    category: "Data Science",
    context: "Personal Project | Python, AWS S3, PostgreSQL, SQL, Tableau",
    summary:
      "An end-to-end analytics pipeline for large mobility data, designed around ingestion quality and reliable downstream querying.",
    stack: ["Python", "AWS S3", "PostgreSQL", "SQL", "Tableau"],
    tags: ["Data Science", "SQL", "Analytics"],
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
      {
        title: "Why it matters",
        body:
          "It proves comfort with large datasets, structured reporting, and the practical work needed to keep analytics queries fast and decision-ready.",
        bullets: [
          "Built around reliable reporting instead of raw ingestion alone.",
          "SQL tuning and data modeling both mattered here.",
          "Strong signal for data engineering and analytics roles.",
        ],
      },
    ],
    primaryModuleId: "projects",
  },
  {
    slug: "air-canvas",
    title: "Air Canvas",
    timeline: "Jun 2021 - Dec 2021",
    status: "Computer vision project",
    category: "AI & ML",
    context: "A. C. Patil College of Engineering | Python, OpenCV, NumPy, TensorFlow",
    summary:
      "A realtime computer vision canvas that translates hand gestures into responsive drawing behavior.",
    stack: ["Python", "OpenCV", "NumPy", "TensorFlow"],
    tags: ["Machine Learning", "OpenCV", "Computer Vision"],
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
    location: "Hoboken, New Jersey",
    badge: "SIT",
    timeline: "Expected May 2026",
    detail:
      "GPA 3.70/4.0. Coursework includes Database Systems, Business Intelligence, Machine Learning, Statistics, and Data Analysis.",
  },
  {
    school: "University of Mumbai",
    degree: "Bachelor of Engineering in Information Technology",
    location: "Mumbai, Maharashtra",
    badge: "MU",
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
    items: ["Applied AI", "Chatbot UX", "Observability", "Prompt Framing", "AI Product Thinking"],
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

export const homepageProjectSlugs = [
  "land-registry",
  "fullstack-commerce",
  "medication-adherence-tracker",
  "f1-telemetry",
  "distributed-pipeline",
  "nyc-taxi",
];

export const homepageImpactMetrics = [
  {
    value: "50%",
    label: "Fraud risk reduction",
    detail: "Blockchain-backed land registry records improved trust and traceability across transfer workflows.",
  },
  {
    value: "40%",
    label: "Pipeline scalability gain",
    detail: "Distributed ETL workflows on AWS S3 and Python improved reliability under larger workloads.",
  },
  {
    value: "35%",
    label: "Checkout completion lift",
    detail: "React, Spring Boot, and MySQL improvements tightened the e-commerce purchase flow.",
  },
  {
    value: "28%",
    label: "API throughput improvement",
    detail: "Medication adherence APIs and MongoDB-backed handling reduced backend friction in live workflows.",
  },
  {
    value: "30%",
    label: "Analytics latency reduction",
    detail: "NYC Taxi and Spotify analytics work used SQL tuning and structured schemas to speed reporting.",
  },
  {
    value: "95%",
    label: "Gesture accuracy",
    detail: "Air Canvas demonstrated responsive computer vision interaction with smooth tracking performance.",
  },
];

export const capabilitySections = [
  {
    title: "Software Engineering",
    summary:
      "Building production-oriented backend and full-stack systems with strong attention to reliability, modularity, and user-facing product quality.",
    bullets: [
      "REST APIs, backend validation, and modular service design.",
      "Full-stack delivery across React, Spring Boot, Node.js, and SQL systems.",
      "Comfort with debugging, request latency tuning, and secure session flows.",
    ],
  },
  {
    title: "Data & Analytics Systems",
    summary:
      "Designing ETL workflows, analytical data models, and reporting pipelines that stay useful under real operational constraints.",
    bullets: [
      "Batch pipelines with retries, partitioning, and failure recovery.",
      "Data quality validation, schema design, and downstream reporting reliability.",
      "Projects spanning PySpark, AWS S3, PostgreSQL, SQL, and Tableau.",
    ],
  },
  {
    title: "Cloud & Platform Work",
    summary:
      "Using automation, CI/CD, and platform-minded engineering practices to keep systems maintainable and easier to operate over time.",
    bullets: [
      "GitHub Actions, monitoring workflows, and repeatable delivery practices.",
      "Cloud-connected systems with S3, RDS, and service reliability focus.",
      "Engineering habits centered on observability, resilience, and clean architecture.",
    ],
  },
];

export const publicMetricsSeed = {
  totalChats: 12,
  avgLatencyMs: 780,
  popularModule: "Projects",
  serviceStatus: "Static portfolio mode",
  lastUpdated: new Date().toISOString(),
};
