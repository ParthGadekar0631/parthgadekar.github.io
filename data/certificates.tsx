export type Certificate = {
  id: string;
  name: string;
  issuer: string;
  issueDate?: string;
  expirationDate?: string | null;
  credentialId?: string;
  credentialUrl?: string;
  certificateUrl?: string;
  image?: string;
  skills?: string[];
};

export const certificates: Certificate[] = [
  {
    id: "stevens-ms-computer-science",
    name: "M.S. in Computer Science",
    issuer: "Stevens Institute of Technology",
    issueDate: "2024-08",
    expirationDate: "2026-05",
    skills: ["Machine Learning", "Database Systems", "Business Intelligence", "Statistics", "Data Analysis"],
  },
  {
    id: "mumbai-be-information-technology",
    name: "B.E. in Information Technology",
    issuer: "University of Mumbai",
    issueDate: "2019-08",
    expirationDate: "2023-06",
    skills: ["Software Engineering", "DBMS", "Systems Programming", "Web Programming", "Data Structures"],
  },
  {
    id: "unified-mentors-internship",
    name: "Web Development Internship",
    issuer: "Unified Mentors",
    issueDate: "2024-01",
    expirationDate: "2024-06",
    skills: ["Python", "Node.js", "AWS", "GitHub Actions", "CI/CD"],
    credentialUrl: "https://www.linkedin.com/in/parthgadekar622/",
  },
  {
    id: "agropeeper-data-engineering",
    name: "Data Engineering Internship",
    issuer: "Agropeeper Technologies",
    issueDate: "2023-04",
    expirationDate: "2023-09",
    skills: ["ETL", "Data Validation", "Monitoring", "Python", "Retry Logic"],
    credentialUrl: "https://www.linkedin.com/in/parthgadekar622/",
  },
  {
    id: "dezignolics-information-systems",
    name: "Information Systems Internship",
    issuer: "Dezignolics Web and Software Solutions",
    issueDate: "2022-06",
    expirationDate: "2022-07",
    skills: ["Web Scraping", "BeautifulSoup", "SQL", "Data Cleaning", "Reporting"],
    credentialUrl: "https://www.linkedin.com/in/parthgadekar622/",
  },
  {
    id: "project-portfolio-focus",
    name: "Project Portfolio Focus",
    issuer: "Parth Gadekar",
    issueDate: "2026-04",
    expirationDate: null,
    skills: ["Telemetry", "Data Engineering", "Full-Stack", "Computer Vision", "Blockchain"],
    credentialUrl: "https://github.com/ParthGadekar0631",
  },
];
