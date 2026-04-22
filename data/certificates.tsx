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
  summary?: string;
};

export const certificates: Certificate[] = [
  {
    id: "lean-six-sigma-white-belt",
    name: "Lean Six Sigma White Belt Certification",
    issuer: "CSSC",
    issueDate: "2024-04",
    expirationDate: null,
    credentialId: "ByqC2Z0FZT",
    credentialUrl: "https://www.linkedin.com/in/parthgadekar622/",
    skills: ["Process Improvement", "Quality", "Operations", "Analytics"],
    summary:
      "Foundation certification covering process improvement vocabulary, quality mindset, and structured problem-solving principles.",
  },
  {
    id: "aws-educate-generative-ai",
    name: "AWS Educate Introduction to Generative AI - Training Badge",
    issuer: "Amazon Web Services (AWS)",
    issueDate: "2024-11",
    expirationDate: null,
    credentialUrl: "https://www.linkedin.com/in/parthgadekar622/",
    skills: ["Generative AI", "AWS", "Cloud", "AI Fundamentals"],
    summary:
      "Introductory cloud credential focused on generative AI concepts, model capabilities, and practical AWS learning pathways.",
  },
  {
    id: "aakaar-iitb",
    name: "Aakaar Participation Certificate",
    issuer: "IIT Bombay",
    certificateUrl: "/certificates/aakaar-iitb.pdf",
    skills: ["Innovation", "Engineering", "Design", "Teamwork"],
    summary:
      "Participation credential tied to the Aakaar technical event at IIT Bombay, reflecting hands-on engineering exposure and competition-oriented problem solving.",
  },
  {
    id: "aavishkar-parth-gadekar",
    name: "Aavishkar Certificate",
    issuer: "Aavishkar",
    certificateUrl: "/certificates/aavishkar-parth-gadekar.pdf",
    skills: ["Innovation", "Project Presentation", "Research", "Engineering"],
    summary:
      "Innovation and project-showcase certificate reflecting early work in presenting technical ideas and competing in academic event environments.",
  },
  {
    id: "coursera-google-crash-course-python",
    name: "Crash Course on Python",
    issuer: "Google / Coursera",
    certificateUrl: "/certificates/coursera-google-crash-course-python.pdf",
    skills: ["Python", "Programming", "Automation", "Problem Solving"],
    summary:
      "Foundational Python certificate covering programming basics, scripting patterns, and practical workflow automation concepts.",
  },
  {
    id: "coursera-michigan-python-for-everyone",
    name: "Python for Everybody",
    issuer: "University of Michigan / Coursera",
    certificateUrl: "/certificates/coursera-michigan-python-for-everyone.pdf",
    skills: ["Python", "Programming", "Data Handling", "Foundations"],
    summary:
      "Course certificate focused on Python fundamentals, data-oriented programming, and beginner-to-intermediate problem-solving patterns.",
  },
  {
    id: "coursera-ust-python",
    name: "Python Certificate",
    issuer: "UST / Coursera",
    certificateUrl: "/certificates/coursera-ust-python.pdf",
    skills: ["Python", "Programming", "Logic", "Scripting"],
    summary:
      "Python coursework credential reinforcing practical scripting, programming logic, and language fluency across common development tasks.",
  },
  {
    id: "csi-heisenbug",
    name: "CSI Heisenbug Certificate",
    issuer: "Computer Society of India",
    certificateUrl: "/certificates/csi-heisenbug-parth-gadekar.pdf",
    skills: ["Debugging", "Problem Solving", "Programming", "Competitive Events"],
    summary:
      "Technical event certificate associated with debugging and competitive coding-style challenges under the CSI banner.",
  },
  {
    id: "google-developer-student-club",
    name: "Google Developer Student Club Certificate",
    issuer: "Google Developer Student Clubs",
    certificateUrl: "/certificates/google-developer-student-club.pdf",
    skills: ["Developer Community", "Projects", "Collaboration", "Engineering Growth"],
    summary:
      "Student developer community credential highlighting participation in developer-focused learning, collaboration, and project-driven growth.",
  },
  {
    id: "guvi-certification",
    name: "GUVI Certification",
    issuer: "GUVI",
    certificateUrl: "/certificates/guvi-certification.pdf",
    skills: ["Programming", "Problem Solving", "Technical Learning"],
    summary:
      "General technical certification from GUVI supporting hands-on platform-based learning and skill development.",
  },
  {
    id: "guvi-certification-ai",
    name: "GUVI AI Certification",
    issuer: "GUVI",
    certificateUrl: "/certificates/guvi-certification-ai.pdf",
    skills: ["AI", "Machine Learning", "Analytics", "Modeling"],
    summary:
      "AI-focused GUVI credential covering introductory machine learning and analytics-oriented concepts.",
  },
  {
    id: "hackerrank-java-basic",
    name: "HackerRank Java (Basic)",
    issuer: "HackerRank",
    certificateUrl: "/certificates/hackerrank-java-basic.pdf",
    skills: ["Java", "Core Programming", "Problem Solving", "Syntax"],
    summary:
      "Basic Java certification validating core language knowledge and coding fundamentals through the HackerRank assessment platform.",
  },
];
