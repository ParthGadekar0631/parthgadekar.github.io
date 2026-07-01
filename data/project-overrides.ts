import * as images from "@/data/images";
import type { Project } from "@/data/projects";

export type ProjectOverride = Partial<
  Pick<
    Project,
    | "id"
    | "title"
    | "description"
    | "category"
    | "section"
    | "tags"
    | "tech"
    | "image"
    | "liveUrl"
    | "highlights"
    | "role"
    | "timeframe"
  >
> & {
  featured?: boolean;
  priority?: number;
};

export const projectOverrides: Record<string, ProjectOverride> = {
  "ParthGadekar0631/F1-Telemetry-Simulation-System": {
    image: images.musixPreview,
    featured: true,
    priority: 100,
  },
  "ParthGadekar0631/Distributed-Data-Processing-Pipeline": {
    image: images.movizPreview,
    featured: true,
    priority: 96,
  },
  "ParthGadekar0631/NYC-Taxi_Pipeline": {
    image: images.lungCancerPreview,
    featured: true,
    priority: 94,
  },
  "ParthGadekar0631/Land-Registry-using-Blockchain": {
    image: images.kdramaAnalyticsPreview,
    featured: true,
    priority: 92,
  },
  "ParthGadekar0631/ecommerce-frontend": {
    image: images.gamingTrendsPreview,
    featured: true,
    priority: 90,
  },
  "ParthGadekar0631/Medication-Adherence-Tracker": {
    image: images.forestWatchPreview,
    featured: true,
    priority: 88,
  },
  "ParthGadekar0631/Spotify-BI-Project": {
    image: images.universityRecruitmentPreview,
    priority: 84,
  },
  "ParthGadekar0631/Air-Canvas": {
    image: images.bookRecommenderPreview,
    priority: 82,
  },
  "ParthGadekar0631/Election-Results-Scraper": {
    image: images.electionResultsPreview,
    priority: 80,
  },
  "ParthGadekar0631/Algo-Visualizer-C": {
    image: images.algorithmVisualizerPreview,
    priority: 78,
  },
  "ParthGadekar0631/Customer-Loan-Default-Risk-Analysis": {
    image: images.customerLoanPreview,
    priority: 76,
  },
  "ParthGadekar0631/Anxiety-Attack_Detector": {
    image: images.anxietyAttackPreview,
    priority: 74,
  },
  "ParthGadekar0631/Point-of-Sale-System-using-Java": {
    image: images.pointOfSalePreview,
    priority: 72,
  },
  "ParthGadekar0631/Gold-Price-Prediction-using-Machine-Learning": {
    image: images.goldPricePreview,
    priority: 70,
  },
  "ParthGadekar0631/RentIT": {
    image: images.rentItPreview,
    priority: 68,
  },
  "ParthGadekar0631/Enterprise-Network-Threat-Assessment": {
    image: images.enterpriseThreatPreview,
    priority: 66,
  },
  "ParthGadekar0631/Customer-Segmentation-using-K-means": {
    image: images.clientSegmentationPreview,
    priority: 64,
  },
  "ParthGadekar0631/AI-Powered-Financial-Portfolio-Optimization": {
    image: images.aiFinancialPortfolioPreview,
    priority: 62,
  },
  "ParthGadekar0631/Sales-Performance-Revenue-Trend-Dashboard": {
    image: images.salesRevenuePreview,
    priority: 60,
  },
  "ParthGadekar0631/Cloud-Infrastructure-Deployment-on-AWS": {
    image: images.cloudInfrastructurePreview,
    priority: 58,
  },
  "ParthGadekar0631/Athlete-Performance-Monitoring-Injury-Risk-Analytics-System": {
    image: images.athletePerformancePreview,
    priority: 56,
  },
  "ParthGadekar0631/Real-Time-Conversational-AI-Evaluation-System": {
    image: images.realtimeAiEvaluationPreview,
    priority: 54,
  },
  "ParthGadekar0631/LinkedIn-Content-Automation-Agent": {
    image: images.linkedinAutomationPreview,
    priority: 52,
  },
  "ParthGadekar0631/Automated-Job-Intelligence-Pipeline": {
    image: images.jobIntelligencePreview,
    priority: 50,
  },
  "ParthGadekar0631/VirtualArtGuide-using-QR": {
    image: images.virtualArtGuidePreview,
    category: "Interactive / QR / Experience",
    section: "Web & Frontend",
    priority: 40,
  },
  "ParthGadekar0631/Threat-asset-tool": {
    image: images.threatAssetToolPreview,
    category: "Cybersecurity / Tooling / Systems",
    section: "Cybersecurity",
    priority: 38,
  },
  "ParthGadekar0631/Algorithmic-Trading-System": {
    image: images.algorithmicTradingPreview,
    category: "Finance / Quant / Analytics",
    section: "Data Engineering & Analytics",
    priority: 36,
  },
  "ParthGadekar0631/Generative-AI-for-Personalized-Healthcare-Recommendations": {
    image: images.generativeHealthcarePreview,
    category: "AI / Healthcare / Recommendations",
    section: "AI & ML",
    featured: true,
    priority: 86,
  },
  "ParthGadekar0631/Catering-Reservation-and-Ordering-System": {
    image: images.cateringReservationPreview,
    category: "Application / Full-Stack / Commerce",
    section: "Full-Stack & Systems",
    priority: 34,
  },
  "ParthGadekar0631/Tic-Tac-Toe": {
    image: images.ticTacToePreview,
    category: "Web Application / JavaScript",
    section: "Web & Frontend",
    priority: 32,
  },
  "ParthGadekar0631/To-Do-List": {
    image: images.todoListPreview,
    category: "Web App / Productivity / Frontend",
    section: "Web & Frontend",
    priority: 30,
  },
  "ParthGadekar0631/Algorithm_Visualizer": {
    image: images.algorithmVisualizerRepoPreview,
    category: "Algorithms / Systems / Python",
    section: "Full-Stack & Systems",
    priority: 28,
  },
  "ParthGadekar0631/Algo-Visualizer": {
    image: images.algorithmVisualizerRepoPreview,
    category: "Algorithms / Systems / Python",
    section: "Full-Stack & Systems",
    priority: 26,
  },
  "ParthGadekar0631/Sorting-Algo-Visualizer": {
    image: images.sortingAlgoPreview,
    category: "Algorithms / Visualization / Python",
    section: "Full-Stack & Systems",
    priority: 24,
  },
  "ParthGadekar0631/Corporate-Bankruptcy-Prediction-System": {
    image: images.corporateBankruptcyPreview,
    category: "Forecasting / Finance / ML",
    section: "AI & ML",
    priority: 22,
  },
  "ParthGadekar0631/Simplified-Search-Engine": {
    image: images.simplifiedSearchPreview,
    category: "Search / Information Retrieval / AI",
    section: "AI & ML",
    priority: 20,
  },
  "ParthGadekar0631/Credit-Card-Fraud-Detection": {
    image: images.creditCardFraudPreview,
    category: "Fraud Detection / ML / Finance",
    section: "AI & ML",
    priority: 18,
  },
  "ParthGadekar0631/Heart_Disease_Prediction": {
    image: images.heartDiseasePreview,
    category: "Healthcare / Prediction / ML",
    section: "AI & ML",
    priority: 16,
  },
  "ParthGadekar0631/blockchain-voting-system": {
    image: images.blockchainVotingPreview,
    category: "Blockchain / Security / Voting",
    section: "Blockchain",
    priority: 14,
  },
};
