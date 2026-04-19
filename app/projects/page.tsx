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

const projectPreviewMap: Record<string, string | undefined> = {
  "f1-telemetry": images.musixPreview,
  "distributed-pipeline": images.movizPreview,
  "fullstack-commerce": images.gamingTrendsPreview,
  "land-registry": images.kdramaAnalyticsPreview,
  "nyc-taxi": images.lungCancerPreview,
  "medication-tracker": images.forestWatchPreview,
  "spotify-data-warehouse": images.universityRecruitmentPreview,
  "air-canvas": images.bookRecommenderPreview,
};

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
  const tags = (project.tags ?? []).map((tag) => tag.toLowerCase());
  const title = project.title.toLowerCase();

  if (tags.some((tag) => ["ai", "llm", "transformers"].includes(tag) || tag.includes("rag"))) {
    roles.add("AI/ML");
  }
  if (tags.some((tag) => tag.includes("assistant") || tag.includes("agentic"))) {
    roles.add("Assistant/Agentic");
  }
  if (tags.some((tag) => tag.includes("recommender"))) {
    roles.add("Recommender Systems");
  }
  if (tags.some((tag) => tag.includes("nlp") || tag.includes("sentiment"))) {
    roles.add("NLP");
  }
  if (tags.some((tag) => tag.includes("computer vision") || tag.includes("vision"))) {
    roles.add("Computer Vision");
  }
  if (tags.some((tag) => tag.includes("iot"))) {
    roles.add("IoT/Embedded");
  }
  if (tags.some((tag) => tag.includes("etl") || tag.includes("scraping") || tag.includes("automation"))) {
    roles.add("Data/ETL");
  }
  if (tags.some((tag) => tag.includes("full-stack") || tag.includes("full stack"))) {
    roles.add("Full-Stack");
  }
  if (tags.some((tag) => tag.includes("lms")) || title.includes("lms")) {
    roles.add("ERP");
  }
  if (roles.size === 0 && (title.includes("ai") || title.includes("assistant"))) {
    roles.add("AI/ML");
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
  const source = `${repo.name} ${repo.description ?? ""} ${(repo.topics ?? []).join(" ")} ${repo.language ?? ""}`.toLowerCase();

  if (
    [
      "ai",
      "ml",
      "machine learning",
      "prediction",
      "detector",
      "vision",
      "recommend",
      "portfolio optimization",
      "healthcare",
      "fraud",
      "bankruptcy",
      "disease",
      "heart",
    ].some((token) => source.includes(token))
  ) {
    return "AI & ML";
  }

  if (
    [
      "data",
      "pipeline",
      "analytics",
      "dashboard",
      "warehouse",
      "sql",
      "etl",
      "kdd",
      "segmentation",
      "scraper",
      "feedback",
      "results",
    ].some((token) => source.includes(token))
  ) {
    return "Data Science";
  }

  return "Full-Stack & Systems";
}

function inferCategoryFromRepo(repo: GitHubRepo, section: string): string {
  const source = `${repo.name} ${repo.description ?? ""}`.toLowerCase();

  if (section === "AI & ML") {
    if (source.includes("vision")) return "Computer Vision / AI";
    if (source.includes("recommend")) return "Recommender Systems / AI";
    if (source.includes("prediction") || source.includes("forecast")) return "ML / Forecasting";
    if (source.includes("health")) return "AI / Healthcare";
    return "AI / Machine Learning";
  }

  if (section === "Data Science") {
    if (source.includes("warehouse")) return "Warehouse / Analytics / BI";
    if (source.includes("dashboard")) return "Dashboard / Analytics / BI";
    if (source.includes("pipeline")) return "Data Pipeline / ETL / Analytics";
    if (source.includes("scraper") || source.includes("monitor")) return "Automation / Data Collection";
    return "Data Science / Analytics";
  }

  if (source.includes("blockchain")) return "Blockchain / Full-Stack / Security";
  if (source.includes("telemetry")) return "Realtime / Telemetry / Full-Stack";
  if (source.includes("network") || source.includes("security")) return "Cybersecurity / Systems";
  if (source.includes("frontend") || source.includes("website")) return "Web / Frontend";
  if (source.includes("java")) return "Java / Systems";
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
  const section = inferSectionFromRepo(repo);
  const category = inferCategoryFromRepo(repo, section);

  return {
    id: `github-${repo.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    title: humanizeRepoName(repo.name),
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
    .map((project) => ({ project, roles: inferProjectRoles(project), gh: null as GitHubRepo | null }));
}

function mergeProjects(curatedItems: Enriched[], repos: GitHubRepo[]): Enriched[] {
  const repoMap = new Map(repos.map((repo) => [repo.full_name.toLowerCase(), repo]));
  const curatedRepoNames = new Set<string>();

  const mergedCurated = curatedItems.map((item) => {
    const repoKey = item.project.githubRepo?.toLowerCase();
    if (repoKey) {
      curatedRepoNames.add(repoKey);
    }

    return {
      ...item,
      gh: repoKey ? repoMap.get(repoKey) ?? item.gh : item.gh,
    };
  });

  const importedRepos = repos
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
      const blueShades = ["bg-blue-500", "bg-blue-600", "bg-cyan-500", "bg-indigo-500"];
      const purpleShades = ["bg-purple-500", "bg-purple-600", "bg-violet-500", "bg-pink-500"];
      if (isMounted) {
        setColors({
          primary: blueShades[Math.floor(Math.random() * blueShades.length)],
          secondary: purpleShades[Math.floor(Math.random() * purpleShades.length)],
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
        style={{ minHeight: "200px" }}
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

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border p-5 ${isDark ? "border-white/10 bg-slate-950/60" : "border-black/10 bg-slate-100/80"}`}
      style={{ minHeight: "200px" }}
    >
      <div className="absolute inset-0 opacity-60" style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.18), rgba(168,85,247,0.18))" }} />
      <div className="relative flex h-full flex-col justify-between">
        <div>
          <div className={`text-lg font-semibold leading-tight ${isDark ? "text-white" : "text-gray-900"}`}>{title}</div>
          {category ? <div className={`mt-2 text-xs font-medium ${isDark ? "text-blue-300" : "text-blue-700"}`}>{category}</div> : null}
        </div>
        {tags?.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ${isDark ? "bg-white/10 text-white/80" : "bg-black/10 text-gray-800"}`}
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

const ProjectCard = memo(function ProjectCard({ entry, isDark }: { entry: Enriched; isDark: boolean }) {
  const { project, gh } = entry;
  const [isHovered, setIsHovered] = useState(false);
  const learnMoreHref = project.liveUrl || gh?.homepage || gh?.html_url || (project.githubRepo ? `https://github.com/${project.githubRepo}` : "#");
  const desc = gh?.description?.trim() || project.description;
  const previewImg = projectPreviewMap[project.id];
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
      style={{ width: "100%", minWidth: 0, minHeight: "560px", height: "auto", maxWidth: "460px", margin: "auto" }}
    >
      <div className="flex flex-col flex-1">
        <div className="mb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1 pr-2">
              <h2
                className={`mb-1 max-w-[15ch] font-bold tracking-[-0.02em] break-words [overflow-wrap:anywhere] transition-colors duration-300 sm:max-w-[17ch] ${titleSizingClasses} ${isDark ? "text-white group-hover:text-blue-400" : "text-gray-900 group-hover:text-blue-600"}`}
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
          <p className={`${descriptionSizingClasses} ${isDark ? "text-gray-300" : "text-gray-700"}`}>{desc}</p>
          {project.tags?.length ? (
            <div className="mt-4 flex flex-wrap items-start gap-2">
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
