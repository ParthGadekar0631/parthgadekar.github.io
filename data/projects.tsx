export type Project = {
  id: string;
  title: string;
  description: string;
  tags?: string[];
  githubRepo?: string;
  liveUrl?: string;
  image?: string;
  tech?: string[];
  highlights?: string[];
  role?: string;
  timeframe?: string;
  category?: string;
  notebookUrl?: string;
  emoji?: string;
  section?: string;
};

export const projects: Project[] = [
  {
    id: "land-registry",
    title: "Blockchain in Land Registry Process",
    emoji: "⛓️",
    description: "Ethereum-based property registry using Solidity and Flutter for tamper-resistant transfers and transparent verification.",
    tags: ["Blockchain", "Full-Stack", "Security"],
    githubRepo: "ParthGadekar0631/Land-Registry-using-Blockchain",
    tech: ["Ethereum", "Solidity", "Flutter", "Blockchain APIs", "SHA-256"],
    highlights: [
      "Reduced fraud risk by about 50% through tamper-proof transfer records end-to-end.",
      "Improved transparent user verification flows, contributing to roughly 90% test satisfaction.",
      "Strengthened record integrity using SHA-256 validation and on-chain transfer state checks.",
    ],
    role: "Full-Stack Engineer",
    timeframe: "2022 - 2023",
    category: "Blockchain / Full-Stack / Systems",
    section: "Full-Stack & Systems",
  },
  {
    id: "fullstack-commerce",
    title: "Full-Stack E-Commerce Platform",
    emoji: "🛒",
    description: "React, Spring Boot, and MySQL commerce platform focused on checkout performance, modular APIs, and secure sessions.",
    tags: ["Full-Stack", "APIs", "Systems"],
    githubRepo: "ParthGadekar0631/Full-Stack-E-Commerce-Platform",
    tech: ["React", "Spring Boot", "MySQL", "REST APIs", "Authentication"],
    highlights: [
      "Improved checkout completion by about 35% via optimized user flows.",
      "Reduced request latency by around 30% under peak load through SQL indexing and modular endpoints.",
      "Improved backend validation and session handling to reduce system failures across checkout workflows.",
    ],
    role: "Full-Stack Engineer",
    timeframe: "2024",
    category: "Full-Stack / Systems / Commerce",
    section: "Full-Stack & Systems",
  },
  {
    id: "medication-tracker",
    title: "Medication Adherence Tracker",
    emoji: "💊",
    description: "Healthcare adherence platform using Node.js, MongoDB, and GitHub Actions for reliable APIs and release stability.",
    tags: ["Backend", "Healthcare", "CI/CD"],
    githubRepo: "ParthGadekar0631/Medication-Adherence-Tracker",
    tech: ["Node.js", "MongoDB", "REST APIs", "GitHub Actions"],
    highlights: [
      "Improved backend request throughput by about 28% with Node.js REST APIs and MongoDB.",
      "Reduced data inconsistencies through schema validation and consistency checks.",
      "Improved release stability by about 25% through CI/CD pipelines with GitHub Actions.",
    ],
    role: "Backend Engineer",
    timeframe: "2025 - 2026",
    category: "Backend / Healthcare / Systems",
    section: "Full-Stack & Systems",
  },
  {
    id: "f1-telemetry",
    title: "F1 Telemetry Simulation System",
    emoji: "🏎️",
    description: "Realtime telemetry environment for streaming race signals, replay workflows, track visualization, and anomaly visibility.",
    tags: ["Systems", "Realtime", "Full-Stack"],
    githubRepo: "ParthGadekar0631/F1-Telemetry-Simulation-System",
    tech: ["C++", "Python", "FastAPI", "React", "TypeScript", "PostgreSQL"],
    highlights: [
      "Improved simulation responsiveness by roughly 35% while modeling live race data streams.",
      "Built replay flows for lap history, sector deltas, and performance trend analysis.",
      "Designed live charts and track-map visualization for speed, RPM, temperature, and energy usage.",
    ],
    role: "Systems Engineer",
    timeframe: "2025 - Present",
    category: "Realtime / Telemetry / Full-Stack",
    section: "Full-Stack & Systems",
  },
  {
    id: "distributed-pipeline",
    title: "Distributed Data Processing Pipeline",
    emoji: "☁️",
    description: "Cloud-based ETL pipeline on AWS S3 and PySpark with partitioning, retries, and monitoring across distributed jobs.",
    tags: ["ETL", "Data Engineering", "Cloud"],
    githubRepo: "ParthGadekar0631/Distributed-Data-Processing-Pipeline",
    tech: ["Python", "PySpark", "AWS S3", "SQL"],
    highlights: [
      "Improved system scalability and reliability by about 40% using cloud-based ETL design.",
      "Reduced execution time by roughly 35% through partitioning and parallel processing strategies.",
      "Integrated retry logic and monitoring workflows to detect failures and improve observability.",
    ],
    role: "Data Engineer",
    timeframe: "2026 - Present",
    category: "Data Engineering / Cloud / ETL",
    section: "Data Science",
  },
  {
    id: "nyc-taxi",
    title: "NYC Taxi Data Pipeline",
    emoji: "🚕",
    description: "End-to-end analytics pipeline using Python, AWS S3, PostgreSQL, SQL, and Tableau for large-scale mobility data.",
    tags: ["Data Science", "SQL", "Analytics"],
    githubRepo: "ParthGadekar0631/NYC-Taxi-Data-Pipeline",
    tech: ["Python", "AWS S3", "PostgreSQL", "SQL", "Tableau"],
    highlights: [
      "Built ingestion, transformation, and validation workflows for large datasets used in analytics reporting.",
      "Improved query performance through optimized SQL and indexing strategies.",
      "Generated analytical reports and trend insights from large datasets to improve reporting efficiency.",
    ],
    role: "Data Engineer",
    timeframe: "2026 - Present",
    category: "Data Pipeline / Analytics / SQL",
    section: "Data Science",
  },
  {
    id: "spotify-warehouse",
    title: "Spotify Data Warehouse & Analytics",
    emoji: "🎧",
    description: "Revenue analytics warehouse with star-schema models, SQL transformations, ETL pipelines, and Tableau dashboards.",
    tags: ["Data Science", "Warehouse", "Analytics"],
    githubRepo: "ParthGadekar0631/Spotify-Data-Warehouse-Analytics-System",
    tech: ["Python", "PostgreSQL", "SQL", "Tableau"],
    highlights: [
      "Improved KPI reporting accuracy and query performance by about 30% with star-schema data models.",
      "Built Python ETL pipelines for financial event ingestion to improve freshness and reliability.",
      "Reduced manual reporting effort by around 80% through dashboard-based KPI monitoring.",
    ],
    role: "Analytics Engineer",
    timeframe: "2025",
    category: "Warehouse / Analytics / BI",
    section: "Data Science",
  },
  {
    id: "air-canvas",
    title: "Air Canvas",
    emoji: "🖐️",
    description: "Realtime computer vision drawing system using OpenCV and TensorFlow for gesture-based interaction.",
    tags: ["Computer Vision", "AI", "Machine Learning"],
    githubRepo: "ParthGadekar0631/Air-Canvas",
    tech: ["Python", "OpenCV", "NumPy", "TensorFlow"],
    highlights: [
      "Achieved about 95% gesture motion accuracy in interactive testing.",
      "Reduced frame latency by roughly 30% with optimized contour tracking.",
      "Maintained smooth realtime inference and rendering close to 30 FPS.",
    ],
    role: "ML Engineer",
    timeframe: "2021",
    category: "Computer Vision / AI / Realtime",
    section: "AI & ML",
  },
];
