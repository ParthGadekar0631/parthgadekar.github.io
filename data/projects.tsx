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
    id: "interactive-financial-dashboard",
    title: "Interactive Financial Dashboard",
    description:
      "Personal finance and KPI dashboard focused on interactive charts, portfolio breakdowns, and decision-ready reporting views.",
    tags: ["Data Science", "Dashboard", "Analytics", "BI"],
    tech: ["Python", "SQL", "Visualization", "Dashboarding"],
    highlights: [
      "Built a finance-focused reporting interface around interactive metrics and trend views.",
      "Designed the project as a personal analytics dashboard for exploratory decision support.",
    ],
    role: "Data Analyst",
    timeframe: "2025",
    category: "Dashboard / Analytics / BI",
    section: "Data Science",
  },
  {
    id: "ai-financial-portfolio-optimization",
    title: "AI-Powered Financial Portfolio Optimization",
    description:
      "Machine learning driven portfolio optimization workflow for analyzing risk, allocation, and financial strategy scenarios.",
    tags: ["AI", "Machine Learning", "Finance", "Optimization"],
    githubRepo: "ParthGadekar0631/AI-Powered-Financial-Portfolio-Optimization",
    tech: ["Python", "Machine Learning", "Portfolio Optimization", "Finance"],
    highlights: [
      "Modeled portfolio allocation and optimization scenarios with a Python-based ML workflow.",
      "Focused on risk-aware investment analysis and automated financial decision support.",
    ],
    role: "ML Engineer",
    timeframe: "2024",
    category: "AI / Finance / Optimization",
    section: "AI & ML",
  },
  {
    id: "land-registry",
    title: "Blockchain in Land Registry Process",
    description:
      "Ethereum-based property registry using Solidity and Flutter for tamper-resistant transfers and transparent verification.",
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
    category: "Blockchain / Full-Stack / Security",
    section: "Full-Stack & Systems",
  },
  {
    id: "fullstack-commerce",
    title: "Full-Stack E-Commerce Platform",
    description:
      "Commerce platform centered on secure shopping flows, modular APIs, and responsive web experiences for checkout-driven applications.",
    tags: ["Full-Stack", "Web", "Commerce", "APIs"],
    githubRepo: "ParthGadekar0631/ecommerce-frontend",
    tech: ["React", "Spring Boot", "MySQL", "REST APIs", "Authentication"],
    highlights: [
      "Built the project around product browsing, cart workflows, and secure checkout journeys.",
      "Structured the system as a full-stack commerce application with modular API integration.",
    ],
    role: "Full-Stack Engineer",
    timeframe: "2024",
    category: "Web / Full-Stack / Commerce",
    section: "Full-Stack & Systems",
  },
  {
    id: "medication-tracker",
    title: "Medication Adherence Tracker",
    description:
      "Healthcare adherence platform using Node.js, MongoDB, and GitHub Actions for reliable APIs and release stability.",
    tags: ["Backend", "Healthcare", "CI/CD", "APIs"],
    githubRepo: "ParthGadekar0631/Medication-Adherence-Tracker",
    tech: ["Node.js", "MongoDB", "REST APIs", "GitHub Actions"],
    highlights: [
      "Improved backend request throughput by about 28% with Node.js REST APIs and MongoDB.",
      "Reduced data inconsistencies through schema validation and consistency checks.",
      "Improved release stability by about 25% through CI/CD pipelines with GitHub Actions.",
    ],
    role: "Backend Engineer",
    timeframe: "2025 - 2026",
    category: "Backend / Healthcare / APIs",
    section: "Full-Stack & Systems",
  },
  {
    id: "task-management-system",
    title: "Task Management System",
    description:
      "Productivity system for task planning and workflow management with backend persistence, containerized services, and structured project tracking.",
    tags: ["Web", "Backend", "Productivity", "Systems"],
    tech: ["Python", "Flask", "SQLAlchemy", "Docker"],
    highlights: [
      "Designed the system for task creation, tracking, and project organization workflows.",
      "Used a backend-driven architecture suited for containerized local development.",
    ],
    role: "Backend Engineer",
    timeframe: "2025",
    category: "Web App / Productivity / Backend",
    section: "Full-Stack & Systems",
  },
  {
    id: "ai-thermal-imaging-system",
    title: "AI-Powered Thermal Imaging System",
    description:
      "Thermal image analysis workflow using AI methods for temperature-aware visual interpretation and detection support.",
    tags: ["AI", "Computer Vision", "Imaging", "Python"],
    tech: ["Python", "Image Processing", "Machine Learning", "Thermal Imaging"],
    highlights: [
      "Applied AI workflows to thermal image interpretation and anomaly-focused analysis.",
      "Focused on imaging quality, detection logic, and model-assisted visual insights.",
    ],
    role: "AI Engineer",
    timeframe: "2023",
    category: "AI / Computer Vision / Imaging",
    section: "AI & ML",
  },
  {
    id: "f1-telemetry",
    title: "F1 Telemetry Simulation System",
    description:
      "Realtime telemetry environment for streaming race signals, replay workflows, track visualization, and anomaly visibility.",
    tags: ["Systems", "Realtime", "Full-Stack", "Telemetry"],
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
    description:
      "Cloud-based ETL pipeline on AWS S3 and PySpark with partitioning, retries, and monitoring across distributed jobs.",
    tags: ["ETL", "Data Engineering", "Cloud", "PySpark"],
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
    description:
      "End-to-end analytics pipeline using Python, AWS S3, PostgreSQL, SQL, and Tableau for large-scale mobility data.",
    tags: ["Data Science", "SQL", "Analytics", "ETL"],
    githubRepo: "ParthGadekar0631/NYC-Taxi_Pipeline",
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
    id: "election-results-monitoring-system",
    title: "Election Results Monitoring System",
    description:
      "Monitoring and scraping workflow for collecting election result updates, automating data capture, and tracking changes over time.",
    tags: ["Scraping", "Automation", "Data Engineering", "Monitoring"],
    githubRepo: "ParthGadekar0631/Election-Results-Scraper",
    tech: ["Python", "BeautifulSoup", "Selenium", "Automation"],
    highlights: [
      "Built a scraper-oriented monitoring flow for live election result collection.",
      "Automated repeated data extraction and update tracking for public result sources.",
    ],
    role: "Data Engineer",
    timeframe: "2025",
    category: "Web Scraping / Monitoring / Automation",
    section: "Data Science",
  },
  {
    id: "algorithm-visualizer-cpp",
    title: "Algorithm Visualizer (C++)",
    description:
      "Algorithm visualization toolkit in C++ for demonstrating data structure and algorithm behavior with performance-oriented rendering.",
    tags: ["Algorithms", "C++", "Systems", "Visualization"],
    githubRepo: "ParthGadekar0631/Algo-Visualizer-C",
    tech: ["C++", "CMake", "Algorithms", "Visualization"],
    highlights: [
      "Implemented visualization flows to make algorithm execution easier to inspect and explain.",
      "Focused on systems-style performance and structured C++ implementation.",
    ],
    role: "Software Engineer",
    timeframe: "2021",
    category: "Algorithms / C++ / Visualization",
    section: "Full-Stack & Systems",
  },
  {
    id: "spotify-data-warehouse",
    title: "Spotify Data Warehouse & Analytics System",
    description:
      "Revenue analytics warehouse with star-schema models, SQL transformations, ETL pipelines, and Tableau dashboards.",
    tags: ["Data Science", "Warehouse", "Analytics", "BI"],
    githubRepo: "ParthGadekar0631/Spotify-BI-Project",
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
    id: "customer-loan-default-risk-analysis",
    title: "Customer Loan Default Risk Analysis",
    description:
      "Risk modeling project focused on default prediction, feature-driven analysis, and interpretable credit risk insights.",
    tags: ["Machine Learning", "Risk", "Finance", "Analytics"],
    githubRepo: "ParthGadekar0631/Customer-Loan-Default-Risk-Analysis",
    tech: ["Python", "Scikit-learn", "Pandas", "Modeling"],
    highlights: [
      "Built a credit risk workflow around default prediction and feature-based analysis.",
      "Used model-driven insights to evaluate customer loan risk patterns.",
    ],
    role: "ML Engineer",
    timeframe: "2023",
    category: "ML / Risk Modeling / Finance",
    section: "AI & ML",
  },
  {
    id: "air-canvas",
    title: "Air Canvas - Real-Time Computer Vision System",
    description:
      "Realtime computer vision drawing system using OpenCV and TensorFlow for gesture-based interaction.",
    tags: ["Computer Vision", "AI", "Machine Learning", "Realtime"],
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
  {
    id: "anxiety-attack-detection-system",
    title: "Anxiety Attack Detection System",
    description:
      "In-progress health-focused detection system for identifying anxiety-related risk signals and surfacing timely alerts.",
    tags: ["AI", "Healthcare", "Detection", "Monitoring"],
    githubRepo: "ParthGadekar0631/Anxiety-Attack_Detector",
    tech: ["TypeScript", "Detection Logic", "Health Monitoring"],
    highlights: [
      "Structured as an in-progress system for mental health event detection and response support.",
      "Focused on turning risk signals into trackable detection workflows.",
    ],
    role: "AI Engineer",
    timeframe: "2026",
    category: "AI / Healthcare / Detection",
    section: "AI & ML",
  },
  {
    id: "course-feedback-analysis-system",
    title: "Course Feedback Analysis System",
    description:
      "Feedback analysis workflow for processing course reviews, extracting patterns, and summarizing teaching or curriculum trends.",
    tags: ["Data Science", "NLP", "Analytics", "Feedback"],
    tech: ["Python", "SQL", "Text Analysis", "Analytics"],
    highlights: [
      "Analyzed feedback data to surface patterns and structured course insights.",
      "Positioned as a reporting and text-analysis system for academic feedback workflows.",
    ],
    role: "Data Analyst",
    timeframe: "2025",
    category: "NLP / Analytics / Education",
    section: "Data Science",
  },
  {
    id: "point-of-sale-system",
    title: "Point of Sale System for Supermarket",
    description:
      "Java-based retail billing and inventory management system designed for transactional workflows and operational stability.",
    tags: ["Java", "Full-Stack", "Retail", "Systems"],
    githubRepo: "ParthGadekar0631/Point-of-Sale-System-using-Java",
    tech: ["Java", "Spring Boot", "SQL", "Billing"],
    highlights: [
      "Built a retail checkout and inventory flow for supermarket operations.",
      "Focused on transaction handling, product management, and operational reliability.",
    ],
    role: "Software Engineer",
    timeframe: "2021",
    category: "Retail / Java / Systems",
    section: "Full-Stack & Systems",
  },
  {
    id: "gold-price-prediction",
    title: "Gold Price Prediction using Machine Learning",
    description:
      "Time-series forecasting project for gold market behavior using machine learning models and financial indicators.",
    tags: ["Machine Learning", "Forecasting", "Finance", "Time Series"],
    githubRepo: "ParthGadekar0631/Gold-Price-Prediction-using-Machine-Learning",
    tech: ["Python", "ML", "Time Series", "Financial Indicators"],
    highlights: [
      "Modeled gold price forecasting with ML-driven time-series experimentation.",
      "Used market indicators and engineered signals to study predictive performance.",
    ],
    role: "ML Engineer",
    timeframe: "2025",
    category: "ML / Forecasting / Finance",
    section: "AI & ML",
  },
  {
    id: "sales-performance-revenue-dashboard",
    title: "Sales Performance & Revenue Trend Dashboard",
    description:
      "Business dashboard for tracking revenue movement, sales health, and trend-driven performance reporting.",
    tags: ["Dashboard", "Analytics", "Revenue", "BI"],
    tech: ["SQL", "Visualization", "Dashboarding", "Reporting"],
    highlights: [
      "Built KPI-oriented revenue and sales trend views for business reporting.",
      "Designed the project for faster visibility into operational and commercial performance.",
    ],
    role: "Data Analyst",
    timeframe: "2023",
    category: "Dashboard / Revenue Analytics / BI",
    section: "Data Science",
  },
  {
    id: "rent-it",
    title: "Rent It: An Accommodation Website",
    description:
      "Accommodation booking website focused on listings, browsing flows, and web-based rental interactions.",
    tags: ["Web", "Frontend", "Full-Stack", "Marketplace"],
    githubRepo: "ParthGadekar0631/RentIT",
    tech: ["JavaScript", "Web Development", "Frontend", "Listings"],
    highlights: [
      "Built a rental-focused web experience around accommodation discovery and browsing.",
      "Designed the project as a property-style marketplace application.",
    ],
    role: "Frontend Engineer",
    timeframe: "2022",
    category: "Web / Marketplace / Frontend",
    section: "Full-Stack & Systems",
  },
  {
    id: "enterprise-network-threat-assessment",
    title: "Enterprise Network Threat Assessment",
    description:
      "Security-focused assessment project for analyzing enterprise network risks, threat surfaces, and defensive posture.",
    tags: ["Security", "Networking", "Cybersecurity", "Assessment"],
    githubRepo: "ParthGadekar0631/Enterprise-Network-Threat-Assessment",
    tech: ["Security Analysis", "Networking", "Threat Assessment"],
    highlights: [
      "Explored enterprise threat modeling and risk analysis for network environments.",
      "Focused on identifying security exposures and defensive considerations.",
    ],
    role: "Security Analyst",
    timeframe: "2025",
    category: "Cybersecurity / Networking / Risk",
    section: "Full-Stack & Systems",
  },
  {
    id: "personalized-recommendation-engine-independent",
    title: "Personalized Recommendation Engine (Independent Project)",
    description:
      "Independent recommendation system project focused on personalization logic, ranking signals, and user preference modeling.",
    tags: ["AI", "Recommender", "Machine Learning", "Personalization"],
    tech: ["Python", "Recommendation Systems", "Ranking", "ML"],
    highlights: [
      "Designed a recommender workflow for personalized suggestions and ranking quality.",
      "Focused on user preference modeling and recommendation relevance.",
    ],
    role: "ML Engineer",
    timeframe: "2025",
    category: "Recommender Systems / AI / Personalization",
    section: "AI & ML",
  },
  {
    id: "personalized-streaming-recommendation-system",
    title: "Personalized Streaming Recommendation System",
    description:
      "Recommendation engine for streaming-style content discovery using preference patterns, ranking, and personalized retrieval.",
    tags: ["AI", "Recommender", "Streaming", "Machine Learning"],
    tech: ["Python", "Recommendation Systems", "Personalization", "Ranking"],
    highlights: [
      "Built for content recommendation and personalized streaming discovery scenarios.",
      "Focused on preference-aware suggestion quality and ranking behavior.",
    ],
    role: "ML Engineer",
    timeframe: "2024",
    category: "Streaming / Recommender Systems / AI",
    section: "AI & ML",
  },
  {
    id: "personalized-recommendation-engine-ml",
    title: "Personalized Recommendation Engine (ML)",
    description:
      "Machine learning based recommendation engine centered on model-driven personalization and ranking optimization.",
    tags: ["AI", "Machine Learning", "Recommender", "Personalization"],
    tech: ["Python", "ML", "Ranking", "Recommendation Systems"],
    highlights: [
      "Explored ML-based recommendation techniques for personalized suggestions.",
      "Positioned around ranking quality and adaptive user preference modeling.",
    ],
    role: "ML Engineer",
    timeframe: "2024",
    category: "ML / Recommender Systems / Personalization",
    section: "AI & ML",
  },
  {
    id: "agropeeper-imaging-etl-validation-system",
    title: "Agropeeper Imaging ETL & Validation System",
    description:
      "Imaging ETL and validation workflow for transforming, checking, and preparing agriculture-focused image data for downstream use.",
    tags: ["ETL", "Data Engineering", "Imaging", "Validation"],
    tech: ["Python", "Pandas", "NumPy", "OpenCV"],
    highlights: [
      "Built data validation and transformation steps for imaging-heavy ETL workflows.",
      "Focused on reliable preprocessing and quality checks before downstream analysis.",
    ],
    role: "Data Engineer",
    timeframe: "2024",
    category: "Imaging ETL / Validation / Data Engineering",
    section: "Data Science",
  },
  {
    id: "personalized-recommendation-engine-python-ml",
    title: "Personalized Recommendation Engine (Python + ML)",
    description:
      "Python-based recommendation engine using ML workflows to score, rank, and personalize outputs for end users.",
    tags: ["AI", "Machine Learning", "Recommender", "Python"],
    tech: ["Python", "ML", "Recommendation Systems", "Ranking"],
    highlights: [
      "Built the recommendation logic around Python-based ML experimentation.",
      "Focused on personalization, ranking, and user-centric relevance signals.",
    ],
    role: "ML Engineer",
    timeframe: "2024",
    category: "Python / ML / Recommender Systems",
    section: "AI & ML",
  },
  {
    id: "client-segmentation-analytics",
    title: "Client Segmentation & Analytics",
    description:
      "Customer segmentation project using clustering-driven analytics to group users and surface behavior-based business insights.",
    tags: ["Machine Learning", "Analytics", "Clustering", "Data Science"],
    githubRepo: "ParthGadekar0631/Customer-Segmentation-using-K-means",
    tech: ["Python", "K-Means", "Analytics", "Customer Segmentation"],
    highlights: [
      "Used clustering methods to segment customers into behavior-driven groups.",
      "Focused on turning segmentation outputs into actionable business insights.",
    ],
    role: "Data Scientist",
    timeframe: "2023",
    category: "Customer Analytics / Clustering / ML",
    section: "Data Science",
  },
];
