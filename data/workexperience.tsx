import { city_icon, ap_icon, dez_icon } from "./images";

const workexperience = [
  {
    position: "Web Development Intern",
    company: "Unified Mentors",
    href: "https://www.unifiedmentor.com/",
    linkedinUrl: "https://www.linkedin.com/in/parthgadekar622/",
    photo: "/assets/unified-mentors-certificate.png",
    logo: ap_icon,
    duration: "January 2024 - June 2024",
    summary:
      "Worked on backend-heavy product workflows and deployment automation, focusing on reliable data movement, API-driven integrations, and CI/CD improvements for day-to-day delivery.",
    tech: ["Python", "Node.js", "AWS S3", "RDS", "GitHub Actions"],
    responsibilities: [
      "Built backend data workflows with Python and Node.js, improving throughput while reducing latency by around 25%.",
      "Implemented CI/CD pipelines for automated testing and deployment, reducing release errors by about 30%.",
      "Supported storage and database operations across AWS-backed environments to keep internal delivery flows stable and easier to manage.",
    ],
  },
  {
    position: "Data Engineer Intern",
    company: "Agropeeper Technologies",
    href: "https://agropeeper.com/",
    linkedinUrl: "https://www.linkedin.com/in/parthgadekar622/",
    photo: "/assets/agropeeper-certificate.png",
    logo: city_icon,
    duration: "April 2023 - September 2023",
    summary:
      "Focused on ingestion reliability and validation across multimodal agricultural datasets, building ETL pipelines that handled RGB, thermal, and metadata streams at production-like scale.",
    tech: ["Python", "ETL", "Data Validation", "Monitoring", "Retry Logic"],
    responsibilities: [
      "Built pipelines for RGB, thermal, and metadata streams, improving ingestion reliability by around 40%.",
      "Added validation, schema checks, and recovery logic to improve downstream correctness and failure handling.",
      "Introduced monitoring-oriented workflows and retry-safe processing so failures could be detected and recovered without breaking downstream usage.",
    ],
  },
  {
    position: "Information Systems Intern",
    company: "Dezignolics Web and Software Solutions",
    href: "https://www.dezignolics.com/",
    linkedinUrl: "https://www.linkedin.com/in/parthgadekar622/",
    photo: "/assets/dezignolics-certificate.jpg",
    logo: dez_icon,
    duration: "June 2022 - July 2022",
    summary:
      "Built automation and structured data extraction workflows for internal information systems use cases, with emphasis on scraping, cleaning, and validation for reporting-ready datasets.",
    tech: ["Python", "BeautifulSoup", "SQL", "Parsing", "Data Cleaning"],
    responsibilities: [
      "Built automated web scraping scripts using Python and BeautifulSoup to extract structured data from web sources.",
      "Implemented data cleaning and validation processes using Python and SQL to improve reporting accuracy.",
      "Helped convert raw web-sourced content into usable structured datasets for downstream business reporting and analysis.",
    ],
  },
];

export default workexperience;
