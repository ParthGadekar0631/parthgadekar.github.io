export type Publication = {
  id: string;
  title: string;
  venue: string;
  date: string;
  pages?: string;
  isbn?: string;
  summary: string;
  focus: string[];
  profileUrl?: string;
  projectUrl?: string;
};

export const publications: Publication[] = [
  {
    id: "blockchain-land-registry-paper",
    title: "Implementing Blockchain in Land Registry Process",
    venue: "International Conference on Recent Multidisciplinary Research and Innovation (ICRMIR-2023)",
    date: "May 2023",
    pages: "654-658",
    isbn: "978-81-951319-8-3",
    summary:
      "Published research paper exploring how blockchain can strengthen land-registry workflows through tamper-resistant records, transparent verification, and more reliable transfer state management.",
    focus: ["Blockchain", "Land Registry", "Security", "Distributed Systems"],
    profileUrl: "https://www.linkedin.com/in/parthgadekar622/",
    projectUrl: "https://github.com/ParthGadekar0631/Land-Registry-using-Blockchain",
  },
];
