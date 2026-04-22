"use client";

import { Analytics } from "@vercel/analytics/next";
import LenisProvider from "../components/LenisProvider";
import { memo, useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import type { Project } from "@/data/projects";
import { projects } from "@/data/projects";
import * as images from "@/data/images";
import { FaGithub } from "react-icons/fa";

type GitHubRepo = {
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  homepage?: string | null;
  language?: string | null;
  topics?: string[];
  stargazers_count: number;
  pushed_at?: string;
};

type Enriched = {
  project: Project;
  roles: string[];
  gh: GitHubRepo | null;
  isAutoImported?: boolean;
};

const GITHUB_REPOS_ENDPOINT =
  "https://api.github.com/users/ParthGadekar0631/repos?per_page=100&sort=updated";

const EXCLUDED_REPO_NAMES = new Set([
  "parthgadekar.github.io",
  "parthgadekar0631",
  "aai-595_homeworks",
  "cs-513_kdd_homeworks",
  "certificates",
  "hacktoberfest2021",
  "frontend-nanodegree-resume",
  "oep-frontend",
  "security_hacking_scripts",
]);

const projectPreviewMap: Record<string, string | undefined> = {
  "f1-telemetry": images.musixPreview,
  "distributed-pipeline": images.movizPreview,
  "fullstack-commerce": images.gamingTrendsPreview,
  "land-registry": images.kdramaAnalyticsPreview,
  "nyc-taxi": images.lungCancerPreview,
  "medication-tracker": images.forestWatchPreview,
  "spotify-data-warehouse": images.universityRecruitmentPreview,
  "air-canvas": images.bookRecommenderPreview,
  "election-results-monitoring-system": images.electionResultsPreview,
  "algorithm-visualizer-cpp": images.algorithmVisualizerPreview,
  "customer-loan-default-risk-analysis": images.customerLoanPreview,
  "anxiety-attack-detection-system": images.anxietyAttackPreview,
  "point-of-sale-system": images.pointOfSalePreview,
  "gold-price-prediction": images.goldPricePreview,
  "rent-it": images.rentItPreview,
  "enterprise-network-threat-assessment": images.enterpriseThreatPreview,
  "client-segmentation-analytics": images.clientSegmentationPreview,
  "ai-financial-portfolio-optimization": images.aiFinancialPortfolioPreview,
};

const repoPreviewMap: Record<string, string | undefined> = {
  "virtualartguide-using-qr": images.virtualArtGuidePreview,
  "threat-asset-tool": images.threatAssetToolPreview,
  "algorithmic-trading-system": images.algorithmicTradingPreview,
  "generative-ai-for-personalized-healthcare-recommendations": images.generativeHealthcarePreview,
  "catering-reservation-and-ordering-system": images.cateringReservationPreview,
  "tic-tac-toe": images.ticTacToePreview,
  "to-do-list": images.todoListPreview,
  "algorithm-visualizer": images.algorithmVisualizerRepoPreview,
  "algo-visualizer": images.algorithmVisualizerRepoPreview,
  "sorting-algo-visualizer": images.sortingAlgoPreview,
  "corporate-bankruptcy-prediction-system": images.corporateBankruptcyPreview,
  "simplified-search-engine": images.simplifiedSearchPreview,
  "credit-card-fraud-detection": images.creditCardFraudPreview,
  "heart-disease-prediction": images.heartDiseasePreview,
  "heart_disease_prediction": images.heartDiseasePreview,
  "blockchain-voting-system": images.blockchainVotingPreview,
};

function normalizePreviewKey(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function buildSource(project: Partial<Project>, repo?: GitHubRepo | null): string {
  return [
    project.title,
    project.description,
    project.category,
    project.section,
    ...(project.tags ?? []),
    ...(project.tech ?? []),
    repo?.name,
    repo?.description ?? "",
    ...(repo?.topics ?? []),
    repo?.language ?? "",
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function shouldIncludeRepo(repo: GitHubRepo): boolean {
  const name = repo.name.toLowerCase();
  const source = `${repo.name} ${repo.description ?? ""} ${(repo.topics ?? []).join(" ")}`.toLowerCase();

  if (EXCLUDED_REPO_NAMES.has(name)) return false;
  if (name.includes("homework")) return false;
  if (name.includes("github.io")) return false;
  if (source.includes("nanodegree resume")) return false;
  if (source.includes("certificate")) return false;
  if (source.includes("hacktoberfest")) return false;
  if (source.includes("oep frontend")) return false;
  if (source.includes("security hacking scripts")) return false;

  return true;
}

function getTitleSizingClasses(title: string): string {
  const length = title.trim().length;

  if (length > 42) {
    return "text-[clamp(1rem,0.9rem+0.45vw,1.45rem)] leading-[1.12]";
  }
  if (length > 30) {
    return "text-[clamp(1.05rem,0.94rem+0.55vw,1.6rem)] leading-[1.14]";
  }
  return "text-[clamp(1.15rem,1.02rem+0.7vw,1.85rem)] leading-[1.15]";
}

function getDescriptionSizingClasses(description: string): string {
  const length = description.trim().length;

  if (length > 130) {
    return "text-[0.94rem] leading-7";
  }
  if (length > 105) {
    return "text-[0.98rem] leading-7";
  }
  return "text-[1rem] leading-8";
}

function inferProjectRoles(project: Project): string[] {
  const roles = new Set<string>();
  const source = buildSource(project);
  const tags = (project.tags ?? []).map((tag) => tag.toLowerCase());

  if (source.includes("ai") || source.includes("machine learning") || source.includes("ml")) {
    roles.add("AI/ML");
  }
  if (source.includes("recommender")) {
    roles.add("Recommender Systems");
  }
  if (source.includes("nlp") || source.includes("sentiment")) {
    roles.add("NLP");
  }
  if (source.includes("computer vision") || source.includes("vision")) {
    roles.add("Computer Vision");
  }
  if (
    source.includes("etl") ||
    source.includes("pipeline") ||
    source.includes("warehouse") ||
    source.includes("analytics") ||
    source.includes("dashboard") ||
    source.includes("scrap")
  ) {
    roles.add("Data/Analytics");
  }
  if (
    source.includes("full-stack") ||
    source.includes("full stack") ||
    source.includes("frontend") ||
    source.includes("backend") ||
    source.includes("web")
  ) {
    roles.add("Full-Stack");
  }
  if (source.includes("security") || source.includes("threat") || source.includes("cyber")) {
    roles.add("Security");
  }
  if (source.includes("blockchain")) {
    roles.add("Blockchain");
  }
  if (roles.size === 0) {
    roles.add("Software");
  }

  return Array.from(roles);
}

function titleCaseWord(word: string): string {
  const uppercaseWords = new Set([
    "ai",
    "ml",
    "nlp",
    "etl",
    "sql",
    "aws",
    "api",
    "apis",
    "iot",
    "kdd",
    "f1",
    "qr",
    "bi",
    "ui",
    "ux",
  ]);

  if (uppercaseWords.has(word)) {
    return word.toUpperCase();
  }

  if (/^[a-z]\d+$/i.test(word)) {
    return word.toUpperCase();
  }

  return word.charAt(0).toUpperCase() + word.slice(1);
}

function humanizeRepoName(name: string): string {
  return name
    .replace(/[-_]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((word) => titleCaseWord(word.toLowerCase()))
    .join(" ");
}

function inferSectionFromRepo(repo: GitHubRepo): string {
  return inferSection(buildAutoProject(repo), repo);
}

function inferSection(project: Partial<Project>, repo?: GitHubRepo | null): string {
  const source = buildSource(project, repo);

  if (source.includes("blockchain")) return "Blockchain";
  if (source.includes("security") || source.includes("threat") || source.includes("cyber")) {
    return "Cybersecurity";
  }
  if (
    source.includes("ai") ||
    source.includes("machine learning") ||
    source.includes("ml") ||
    source.includes("vision") ||
    source.includes("prediction") ||
    source.includes("recommend")
  ) {
    return "AI & ML";
  }
  if (
    source.includes("data") ||
    source.includes("pipeline") ||
    source.includes("analytics") ||
    source.includes("warehouse") ||
    source.includes("dashboard") ||
    source.includes("etl") ||
    source.includes("sql") ||
    source.includes("segmentation") ||
    source.includes("scraper")
  ) {
    return "Data Engineering & Analytics";
  }
  if (
    source.includes("frontend") ||
    source.includes("website") ||
    source.includes("web") ||
    source.includes("react") ||
    source.includes("javascript") ||
    source.includes("html")
  ) {
    return "Web & Frontend";
  }
  return "Full-Stack & Systems";
}

function inferCategory(project: Partial<Project>, section: string, repo?: GitHubRepo | null): string {
  const source = buildSource(project, repo);

  if (section === "AI & ML") {
    if (source.includes("vision")) return "Computer Vision / AI";
    if (source.includes("recommend")) return "Recommender Systems / AI";
    if (source.includes("forecast") || source.includes("prediction")) return "Forecasting / ML";
    if (source.includes("health")) return "Healthcare / AI";
    if (source.includes("finance") || source.includes("loan") || source.includes("portfolio")) return "Finance / ML";
    return "AI / Machine Learning";
  }

  if (section === "Data Engineering & Analytics") {
    if (source.includes("warehouse")) return "Data Warehouse / BI";
    if (source.includes("dashboard")) return "Dashboard / Analytics";
    if (source.includes("pipeline") || source.includes("etl")) return "Data Pipeline / ETL";
    if (source.includes("scraper") || source.includes("monitor")) return "Data Collection / Automation";
    return "Data Engineering / Analytics";
  }

  if (section === "Blockchain") return "Blockchain / Full-Stack";
  if (section === "Cybersecurity") return "Cybersecurity / Systems";
  if (section === "Web & Frontend") return source.includes("frontend") ? "Web / Frontend" : "Web Application";
  if (source.includes("telemetry")) return "Realtime / Telemetry / Systems";
  if (source.includes("java")) return "Java / Systems";
  if (source.includes("retail") || source.includes("reservation") || source.includes("commerce")) return "Application / Full-Stack";
  return "Full-Stack / Systems";
}

function inferTagsFromRepo(repo: GitHubRepo, section: string): string[] {
  const source = `${repo.name} ${repo.description ?? ""} ${(repo.topics ?? []).join(" ")}`.toLowerCase();
  const tags: string[] = [];

  const push = (value: string) => {
    if (!tags.includes(value)) tags.push(value);
  };

  if (section === "AI & ML") {
    push("AI");
    push(source.includes("recommend") ? "Recommender" : "Machine Learning");
  } else if (section === "Data Science") {
    push(source.includes("warehouse") ? "Warehouse" : "Analytics");
    push(source.includes("pipeline") ? "ETL" : "Data Science");
  } else {
    push(source.includes("frontend") || source.includes("website") ? "Web" : "Systems");
    push(source.includes("blockchain") ? "Blockchain" : "Full-Stack");
  }

  if (source.includes("vision")) push("Computer Vision");
  if (source.includes("security") || source.includes("threat")) push("Security");
  if (source.includes("finance") || source.includes("portfolio") || source.includes("loan")) push("Finance");
  if (source.includes("sql")) push("SQL");
  if (source.includes("dashboard")) push("Dashboard");
  if (source.includes("pipeline")) push("Pipeline");
  if (source.includes("java")) push("Java");
  if (source.includes("python") || (repo.language ?? "").toLowerCase() === "python") push("Python");
  if (source.includes("javascript") || (repo.language ?? "").toLowerCase() === "javascript") push("JavaScript");

  if (repo.language && !tags.includes(repo.language) && tags.length < 4) {
    push(repo.language);
  }

  return tags.slice(0, 4);
}

function buildFallbackDescription(repo: GitHubRepo, category: string): string {
  if (repo.description?.trim()) {
    return repo.description.trim();
  }

  const language = repo.language ? ` built with ${repo.language}` : "";
  return `Public GitHub project covering ${category.toLowerCase()}${language}, included from the live repository portfolio.`;
}

function buildAutoProject(repo: GitHubRepo): Project {
  const projectBase: Project = {
    id: `github-${repo.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    title: humanizeRepoName(repo.name),
    description: "",
    githubRepo: repo.full_name,
  };
  const section = inferSection(projectBase, repo);
  const category = inferCategory(projectBase, section, repo);

  return {
    ...projectBase,
    description: buildFallbackDescription(repo, category),
    tags: inferTagsFromRepo(repo, section),
    githubRepo: repo.full_name,
    tech: repo.language ? [repo.language] : undefined,
    role:
      section === "AI & ML"
        ? "ML Engineer"
        : section === "Data Science"
          ? "Data Engineer"
          : "Software Engineer",
    category,
    section,
  };
}

function buildInitialItems(): Enriched[] {
  return projects
    .filter((project) => project.githubRepo)
    .map((project) => {
      const normalizedSection = inferSection(project, null);
      const normalizedProject = {
        ...project,
        section: normalizedSection,
        category: inferCategory(project, normalizedSection, null),
      };
      return { project: normalizedProject, roles: inferProjectRoles(normalizedProject), gh: null as GitHubRepo | null };
    });
}

function mergeProjects(curatedItems: Enriched[], repos: GitHubRepo[]): Enriched[] {
  const filteredRepos = repos.filter(shouldIncludeRepo);
  const repoMap = new Map(filteredRepos.map((repo) => [repo.full_name.toLowerCase(), repo]));
  const curatedRepoNames = new Set<string>();

  const mergedCurated = curatedItems.map((item) => {
    const repoKey = item.project.githubRepo?.toLowerCase();
    if (repoKey) {
      curatedRepoNames.add(repoKey);
    }

    const section = inferSection(item.project, repoKey ? repoMap.get(repoKey) ?? null : null);
    const normalizedProject = {
      ...item.project,
      section,
      category: inferCategory(item.project, section, repoKey ? repoMap.get(repoKey) ?? null : null),
    };

    return {
      ...item,
      project: normalizedProject,
      roles: inferProjectRoles(normalizedProject),
      gh: repoKey ? repoMap.get(repoKey) ?? item.gh : item.gh,
    };
  });

  const importedRepos = filteredRepos
    .filter((repo) => !curatedRepoNames.has(repo.full_name.toLowerCase()))
    .map((repo) => {
      const project = buildAutoProject(repo);
      return {
        project,
        roles: inferProjectRoles(project),
        gh: repo,
        isAutoImported: true,
      };
    });

  importedRepos.sort((left, right) => {
    const leftTime = left.gh?.pushed_at ? new Date(left.gh.pushed_at).getTime() : 0;
    const rightTime = right.gh?.pushed_at ? new Date(right.gh.pushed_at).getTime() : 0;
    return rightTime - leftTime;
  });

  return [...mergedCurated, ...importedRepos];
}

async function fetchGitHubRepos(signal?: AbortSignal): Promise<GitHubRepo[]> {
  const response = await fetch(GITHUB_REPOS_ENDPOINT, {
    headers: {
      Accept: "application/vnd.github+json",
    },
    signal,
  });

  if (!response.ok) {
    throw new Error(`GitHub repo sync failed: ${response.status}`);
  }

  const raw = (await response.json()) as GitHubRepo[];
  return raw;
}

export default function Projects() {
  const [items] = useState<Enriched[]>(() => buildInitialItems());

  return (
    <>
      <ProjectsClient items={items} />
      <Analytics />
    </>
  );
}

function ProjectsClient({ items: initialItems }: { items: Enriched[] }) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const [colors, setColors] = useState<{ primary: string; secondary: string }>({ primary: "", secondary: "" });
  const [items, setItems] = useState<Enriched[]>(initialItems);

  useEffect(() => {
    const controller = new AbortController();

    fetchGitHubRepos(controller.signal)
      .then((repos) => {
        setItems(mergeProjects(initialItems, repos));
      })
      .catch(() => {
        setItems(initialItems);
      });

    return () => controller.abort();
  }, [initialItems]);

  const sectionOptions = useMemo(() => {
    const sections = new Set<string>();
    items.forEach(({ project }) => {
      if (project.section) {
        sections.add(project.section);
      }
    });
    return ["All", ...Array.from(sections).sort()];
  }, [items]);

  const [selectedSection, setSelectedSection] = useState<string>("All");

  const visible = useMemo(() => {
    if (selectedSection === "All") {
      return items;
    }
    return items.filter(({ project }) => project.section === selectedSection);
  }, [items, selectedSection]);

  useEffect(() => {
    let isMounted = true;
    requestAnimationFrame(() => {
      if (isMounted) setMounted(true);
      const warmPrimaryShades = ["bg-red-500", "bg-rose-500", "bg-orange-500", "bg-amber-500"];
      const warmSecondaryShades = ["bg-emerald-500", "bg-lime-500", "bg-yellow-500", "bg-orange-400"];
      if (isMounted) {
        setColors({
          primary: warmPrimaryShades[Math.floor(Math.random() * warmPrimaryShades.length)],
          secondary: warmSecondaryShades[Math.floor(Math.random() * warmSecondaryShades.length)],
        });
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen py-16 ${isDark ? "dark" : ""}`}>
      <LenisProvider />
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className={`absolute top-20 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30 spiral-1 ${colors.primary}`} />
        <div className={`absolute bottom-40 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-30 spiral-2 ${colors.secondary}`} />
      </div>

      <div className="max-w-7xl mt-12 mx-auto px-4">
        <div className="mb-12">
          <h1 className={`text-5xl md:text-6xl font-bold mb-3 text-primary ${isDark ? "dark" : ""}`}>Projects</h1>
          <p className={`text-lg text-secondary ${isDark ? "dark" : ""}`}>
            Explore my latest work and public GitHub portfolio.
          </p>
        </div>

        <div className="mb-12 space-y-6">
          <div className={`glass-container rounded-2xl p-4 md:p-6 ${isDark ? "dark" : ""}`}>
            <h3 className={`text-sm font-semibold mb-4 text-secondary ${isDark ? "dark" : ""} uppercase tracking-wider`}>
              Filter by Category
            </h3>
            <div className="flex flex-wrap gap-3">
              {sectionOptions.map((section) => {
                const active = section === selectedSection;
                return (
                  <button
                    key={section}
                    onClick={() => setSelectedSection(section)}
                    className={`
                      px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300
                      ${
                        active
                          ? `glass-button ${isDark ? "dark" : ""} scale-105 shadow-lg`
                          : `border ${isDark ? "border-gray-700/50 text-secondary" : "border-white/40 text-secondary"}
                             hover:border-white/60 hover:scale-105 ${isDark ? "dark" : ""}`
                      }
                    `}
                  >
                    {section}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
          <div className={`text-sm text-tertiary ${isDark ? "dark" : ""}`}>
            Showing {visible.length} project{visible.length !== 1 ? "s" : ""}
          </div>
          {selectedSection !== "All" && (
            <button
              onClick={() => setSelectedSection("All")}
              className={`
                px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300
                border ${isDark ? "border-gray-700/50 text-secondary hover:border-red-500/50 hover:text-red-400" : "border-white/40 text-secondary hover:border-red-500/50 hover:text-red-600"}
              `}
            >
              Clear Filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {visible.map((entry) => (
            <ProjectCard key={entry.project.id} entry={entry} isDark={isDark} />
          ))}
        </div>

        {visible.length === 0 && (
          <div className={`text-center py-16 glass-container rounded-2xl ${isDark ? "dark" : ""}`}>
            <p className={`text-lg text-secondary ${isDark ? "dark" : ""}`}>No projects found for this category</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectPreview({
  title,
  previewImg,
  category,
  tags,
  isDark,
}: {
  title: string;
  previewImg?: string;
  category?: string;
  tags?: string[];
  isDark: boolean;
}) {
  if (previewImg) {
    return (
      <div
        className={`relative overflow-hidden rounded-2xl border p-4 ${isDark ? "border-white/10 bg-black/35" : "border-black/10 bg-white/60"}`}
        style={{ height: "220px" }}
      >
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background: `url('${previewImg}') center center / contain no-repeat`,
          }}
        />
      </div>
    );
  }

  const primary = tags?.[0] ?? "Project";
  const secondary = tags?.[1] ?? "Engineering";
  const tertiary = tags?.[2] ?? "Build";

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border p-5 ${isDark ? "border-white/10 bg-slate-950/60" : "border-black/10 bg-slate-100/80"}`}
      style={{ height: "220px" }}
    >
      <div className="absolute inset-0 opacity-70" style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.16), rgba(168,85,247,0.18))" }} />
      <div className="relative flex h-full flex-col">
        <div>
          <div className={`line-clamp-2 text-lg font-semibold leading-tight ${isDark ? "text-white" : "text-gray-900"}`}>{title}</div>
          {category ? <div className={`mt-2 text-xs font-medium ${isDark ? "text-blue-300" : "text-blue-700"}`}>{category}</div> : null}
        </div>
        <div className="mt-5 grid grid-cols-3 gap-3">
          {[primary, secondary, tertiary].map((chip, index) => (
            <div
              key={`${chip}-${index}`}
              className={`flex min-h-[76px] items-center justify-center rounded-2xl border px-3 py-4 text-center text-[11px] font-semibold leading-snug ${isDark ? "border-white/10 bg-white/5 text-white/85" : "border-black/10 bg-white/70 text-gray-800"}`}
            >
              {chip}
            </div>
          ))}
        </div>
        <div className={`mt-auto rounded-2xl border px-4 py-3 ${isDark ? "border-white/10 bg-black/20" : "border-black/10 bg-white/60"}`}>
          <div className="flex h-16 items-end gap-2">
            {[28, 44, 36, 58, 42, 68].map((height, index) => (
              <span
                key={index}
                className={`flex-1 rounded-t-xl ${isDark ? "bg-blue-400/50" : "bg-blue-500/50"}`}
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const ProjectCard = memo(function ProjectCard({ entry, isDark }: { entry: Enriched; isDark: boolean }) {
  const { project, gh } = entry;
  const [isHovered, setIsHovered] = useState(false);
  const learnMoreHref = project.liveUrl || gh?.homepage || gh?.html_url || (project.githubRepo ? `https://github.com/${project.githubRepo}` : "#");
  const desc = gh?.description?.trim() || project.description;
  const previewImg = projectPreviewMap[project.id] ?? (gh ? repoPreviewMap[normalizePreviewKey(gh.name)] : undefined);
  const titleSizingClasses = getTitleSizingClasses(project.title);
  const descriptionSizingClasses = getDescriptionSizingClasses(desc);

  return (
    <a
      href={learnMoreHref}
      target="_blank"
      rel="noopener noreferrer"
      className={`group glass-container rounded-2xl p-6 transition-all duration-500 flex h-full flex-col cursor-pointer block overflow-hidden
        ${isHovered ? "scale-[1.02] shadow-2xl" : "shadow-lg"} ${isDark ? "dark" : ""}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ width: "100%", minWidth: 0, minHeight: "620px", height: "100%", maxWidth: "460px", margin: "auto" }}
    >
      <div className="flex flex-col flex-1">
        <div className="mb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1 pr-2">
              <h2
                className={`mb-1 max-w-[15ch] min-h-[112px] font-bold tracking-[-0.02em] break-words [overflow-wrap:anywhere] transition-colors duration-300 sm:max-w-[17ch] ${titleSizingClasses} ${isDark ? "text-white group-hover:text-blue-400" : "text-gray-900 group-hover:text-blue-600"}`}
              >
                {project.title}
              </h2>
              {project.category && (
                <div className={`text-xs my-2 font-semibold ${isDark ? "text-blue-300" : "text-blue-700"}`}>{project.category}</div>
              )}
            </div>
            {project.githubRepo && (
              <div className="flex flex-shrink-0 flex-col items-end justify-start pt-1">
                <button
                  type="button"
                  className={`px-3 py-1.5 rounded-full border flex items-center gap-2 font-semibold text-xs transition-all duration-200
                    ${isDark ? "border-white/60 text-white/80 bg-transparent hover:bg-white/10 hover:text-white" : "border-black bg-black text-white hover:bg-gray-900 hover:text-white"}
                    focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-transparent`}
                  title="View on GitHub"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    window.open(`https://github.com/${project.githubRepo}`, "_blank", "noopener,noreferrer");
                  }}
                >
                  <FaGithub size={18} style={{ display: "inline", verticalAlign: "middle" }} />
                  <span className="font-bold tracking-wide">GitHub</span>
                </button>
              </div>
            )}
          </div>
          {project.githubRepo && (
            <div className={`flex items-center gap-2 text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              <span className="font-semibold uppercase tracking-[0.2em] text-[10px]">Repo</span>
              <span className="truncate">{project.githubRepo}</span>
            </div>
          )}
        </div>

        <div className="mb-5">
          <ProjectPreview title={project.title} previewImg={previewImg} category={project.category} tags={project.tags} isDark={isDark} />
        </div>

        <div className="mt-auto">
          <p className={`line-clamp-5 min-h-[152px] ${descriptionSizingClasses} ${isDark ? "text-gray-300" : "text-gray-700"}`}>{desc}</p>
          {project.tags?.length ? (
            <div className="mt-4 flex min-h-[72px] flex-wrap items-start gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className={`inline-flex max-w-full items-center rounded-full border px-3 py-1 text-xs font-medium leading-5 transition-all duration-300 ${
                    isDark
                      ? "bg-blue-900/30 text-blue-300 border-blue-700/50 group-hover:bg-blue-800/50"
                      : "bg-blue-100/40 text-blue-700 border-blue-200/70 group-hover:bg-blue-100/60"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </a>
  );
});
