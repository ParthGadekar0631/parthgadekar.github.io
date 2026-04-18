// Tip: in Next.js, assets in /public are referenced WITHOUT "/public"
// e.g. "/icons/ap.svg" not "./public/icons/ap.svg"

export type Tile = {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
};

export const tilesData: Tile[] = [
  {
    id: 1,
    title: 'F1 Telemetry System',
    description: 'Realtime race simulation + observability',
    imageUrl: '/projects-previews/f1-telemetry-preview.svg',
  },
  {
    id: 2,
    title: '40% Scalability Gain',
    description: 'Distributed ETL reliability improvement',
  },
  {
    id: 3,
    title: '35% Checkout Lift',
    description: 'React + Spring Boot commerce flow',
  },
  {
    id: 4,
    title: '50% Fraud Risk Reduction',
    description: 'Blockchain-backed land registry',
  },
  {
    id: 5,
    title: 'Realtime Data Pipelines',
    description: 'Cloud-connected analytics workflows',
  },
  {
    id: 6,
    title: 'Medication Tracker APIs',
    description: 'Backend validation + CI/CD stability',
  },
  {
    id: 7,
    title: 'Stevens Institute of Technology',
    description: 'M.S. Computer Science',
    imageUrl: '/icons/stevens-badge.svg'
  },
  {
    id: 8,
    title: 'OpenCV + TensorFlow',
    description: '95% gesture tracking accuracy',
  },
  {
    id: 9,
    title: 'Unified Mentors',
    description: 'Backend workflows + AWS pipelines',
    imageUrl: '/icons/unified-mentors-badge.svg'
  },
  {
    id: 10,
    title: 'GitHub Actions CI/CD',
    description: 'Automated testing and delivery',
  },
  {
    id: 11,
    title: 'AWS S3 + PySpark',
    description: 'Data engineering at scale',
  },
  {
    id: 12,
    title: 'University of Mumbai',
    description: 'Information Technology foundation',
    imageUrl: '/icons/mumbai-badge.svg',
  },
  {
    id: 13,
    title: 'SQL + Tableau Analytics',
    description: 'Reporting and dashboarding workflows',
    imageUrl:'/projects-previews/spotify-warehouse-preview.svg'
  },
  {
    id: 14,
    title: 'Agropeeper ETL Systems',
    description: 'Validation, monitoring, retry logic',
  },
  {
  id: 15,
  title: 'Full-Stack + Data Engineering',
  description: 'Reliable software with measurable outcomes'
}
];
