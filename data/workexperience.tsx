import { city_icon, ap_icon, dez_icon } from "./images";

const workexperience = [
  {
    position: "Web Development Intern",
    company: "Unified Mentors",
    href: "https://www.unifiedmentor.com/",
    logo: ap_icon,
    duration: "January 2024 - June 2024",
    tech: ["Python", "Node.js", "AWS S3", "RDS", "GitHub Actions"],
    responsibilities: [
      "Built backend data workflows with Python and Node.js, improving throughput while reducing latency by around 25%.",
      "Implemented CI/CD pipelines for automated testing and deployment, reducing release errors by about 30%.",
    ],
  },
  {
    position: "Data Engineer Intern",
    company: "Agropeeper Technologies",
    href: "https://agropeeper.com/",
    logo: city_icon,
    duration: "April 2023 - September 2023",
    tech: ["Python", "ETL", "Data Validation", "Monitoring", "Retry Logic"],
    responsibilities: [
      "Built pipelines for RGB, thermal, and metadata streams, improving ingestion reliability by around 40%.",
      "Added validation, schema checks, and recovery logic to improve downstream correctness and failure handling.",
    ],
  },
  {
    position: "Information Systems Intern",
    company: "Dezignolics Web and Software Solutions",
    href: "https://www.dezignolics.com/",
    logo: dez_icon,
    duration: "June 2022 - July 2022",
    tech: ["Python", "BeautifulSoup", "SQL", "Parsing", "Data Cleaning"],
    responsibilities: [
      "Built automated web scraping scripts using Python and BeautifulSoup to extract structured data from web sources.",
      "Implemented data cleaning and validation processes using Python and SQL to improve reporting accuracy.",
    ],
  },
];

export default workexperience;
