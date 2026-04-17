export type ThemeTokenSet = {
  accent: string;
  accentSoft: string;
  accentGlow: string;
  secondary: string;
  panel: string;
};

export type ModuleConfig = {
  id: string;
  label: string;
  path: string;
  navLabel: string;
  kicker: string;
  title: string;
  summary: string;
  heroWords: string[];
  chips: string[];
  theme: ThemeTokenSet;
  featuredProjectSlugs: string[];
};

export type ProjectSummary = {
  slug: string;
  title: string;
  timeline: string;
  status: string;
  category: "AI & ML" | "Data Science" | "Full-Stack & Systems";
  context: string;
  summary: string;
  stack: string[];
  tags: string[];
  outcomes: string[];
  detailIntro: string;
  detailSections: Array<{
    title: string;
    body: string;
    bullets: string[];
  }>;
  primaryModuleId: string;
  href?: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  status: string;
  moduleId: string;
  summary: string;
  highlight: string;
  sections: Array<{
    title: string;
    body: string;
    bullets: string[];
  }>;
};

export type KnowledgeDocument = {
  id: string;
  title: string;
  moduleId: string;
  path: string;
  summary: string;
  content: string;
  tags: string[];
};

export type ExperienceEntry = {
  company: string;
  role: string;
  timeline: string;
  location: string;
  summary: string;
  bullets: string[];
};

export type EducationEntry = {
  school: string;
  degree: string;
  timeline: string;
  detail: string;
};

export type PublicMetrics = {
  totalChats: number;
  avgLatencyMs: number;
  popularModule: string;
  serviceStatus: string;
  lastUpdated: string;
};

export type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

export type Citation = {
  title: string;
  path: string;
};

export type ChatRequest = {
  message: string;
  module: string;
  page: string;
  history: ChatMessage[];
};

export type ChatResponse = {
  answer: string;
  citations: Citation[];
  suggestedPrompts: string[];
  traceId: string;
};
