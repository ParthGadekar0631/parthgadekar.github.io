import { projectBlocklist } from "@/data/project-blocklist";
import { projectOverrides, type ProjectOverride } from "@/data/project-overrides";
import { projects, type Project } from "@/data/projects";

export const GITHUB_USERNAME = "ParthGadekar0631";
export const PROJECT_SYNC_REVALIDATE_SECONDS = 3600;

export type GitHubRepo = {
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  homepage?: string | null;
  language?: string | null;
  topics?: string[];
  stargazers_count: number;
  updated_at?: string;
  pushed_at?: string;
  fork?: boolean;
  archived?: boolean;
  private?: boolean;
};

export type EnrichedProject = {
  project: Project;
  roles: string[];
  gh: GitHubRepo | null;
  isAutoImported?: boolean;
  featured: boolean;
  priority: number;
  updatedAt: string | null;
};

const GITHUB_REPOS_ENDPOINT = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`;

const normalizedBlocklist = new Set(projectBlocklist.map((value) => normalizeKey(value)));
const normalizedOverrideEntries = Object.entries(projectOverrides).map(([key, value]) => [normalizeKey(key), value] as const);

function normalizeKey(value: string): string {
  return value.trim().toLowerCase();
}

function normalizePreviewKey(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
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
    "llm",
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

function formatTopicLabel(value: string): string {
  return value
    .split(/[-_ ]+/)
    .filter(Boolean)
    .map((word) => titleCaseWord(word.toLowerCase()))
    .join(" ");
}

function sanitizeHomepage(value?: string | null): string | undefined {
  if (!value?.trim()) {
    return undefined;
  }

  const candidate = value.trim();
  return /^https?:\/\//i.test(candidate) ? candidate : `https://${candidate}`;
}

function getUpdatedAt(repo?: GitHubRepo | null, project?: Partial<Project>): string | null {
  return repo?.pushed_at ?? repo?.updated_at ?? project?.updatedAt ?? null;
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

function findOverride(repo?: GitHubRepo | null, project?: Partial<Project>): ProjectOverride | undefined {
  const candidates = [
    repo?.full_name,
    repo?.name,
    project?.githubRepo,
    project?.id,
    project?.title ? normalizePreviewKey(project.title) : undefined,
  ].filter(Boolean) as string[];

  for (const candidate of candidates) {
    const normalized = normalizeKey(candidate);
    const direct = normalizedOverrideEntries.find(([key]) => key === normalized);
    if (direct) {
      return direct[1];
    }
  }

  return undefined;
}

function shouldIncludeRepo(repo: GitHubRepo): boolean {
  const repoKeys = [repo.name, repo.full_name].map(normalizeKey);

  if (repo.private || repo.fork || repo.archived) {
    return false;
  }

  if (repoKeys.some((key) => normalizedBlocklist.has(key))) {
    return false;
  }

  return !repo.name.toLowerCase().includes("github.io");
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
    source.includes("recommend") ||
    source.includes("llm")
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
    source.includes("scraper") ||
    source.includes("trading")
  ) {
    return "Data Engineering & Analytics";
  }
  if (
    source.includes("frontend") ||
    source.includes("website") ||
    source.includes("web") ||
    source.includes("react") ||
    source.includes("javascript") ||
    source.includes("html") ||
    source.includes("css")
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
    if (source.includes("llm") || source.includes("evaluation")) return "LLMOps / AI";
    return "AI / Machine Learning";
  }

  if (section === "Data Engineering & Analytics") {
    if (source.includes("warehouse")) return "Data Warehouse / BI";
    if (source.includes("dashboard")) return "Dashboard / Analytics";
    if (source.includes("pipeline") || source.includes("etl")) return "Data Pipeline / ETL";
    if (source.includes("scraper") || source.includes("monitor")) return "Data Collection / Automation";
    if (source.includes("trading")) return "Quant / Analytics";
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

function buildFallbackTags(repo: GitHubRepo, section: string): string[] {
  const tags: string[] = [];
  const push = (value?: string | null) => {
    if (!value) return;
    const trimmed = value.trim();
    if (!trimmed || tags.includes(trimmed)) return;
    tags.push(trimmed);
  };

  const topicHints = (repo.topics ?? []).map(formatTopicLabel);
  const source = `${repo.name} ${repo.description ?? ""} ${(repo.topics ?? []).join(" ")}`.toLowerCase();

  if (section === "AI & ML") {
    push("AI");
    push(source.includes("recommend") ? "Recommender" : "Machine Learning");
  } else if (section === "Data Engineering & Analytics") {
    push(source.includes("pipeline") ? "ETL" : "Analytics");
    push(source.includes("warehouse") ? "Warehouse" : "Data Science");
  } else if (section === "Blockchain") {
    push("Blockchain");
    push("Full-Stack");
  } else if (section === "Cybersecurity") {
    push("Security");
    push("Systems");
  } else if (section === "Web & Frontend") {
    push("Web");
    push("Frontend");
  } else {
    push("Systems");
    push("Full-Stack");
  }

  for (const topic of topicHints) {
    if (tags.length >= 4) break;
    push(topic);
  }

  if (tags.length < 4) {
    push(repo.language);
  }

  return tags.slice(0, 4);
}

function buildFallbackTechStack(repo: GitHubRepo): string[] | undefined {
  const values = new Set<string>();

  if (repo.language) {
    values.add(repo.language);
  }

  for (const topic of repo.topics ?? []) {
    if (values.size >= 6) break;
    values.add(formatTopicLabel(topic));
  }

  return values.size ? Array.from(values) : undefined;
}

function buildFallbackDescription(repo: GitHubRepo, category: string): string {
  if (repo.description?.trim()) {
    return repo.description.trim();
  }

  const language = repo.language ? ` built with ${repo.language}` : "";
  const updatedAt = getUpdatedAt(repo);
  const updatedLabel = updatedAt
    ? ` and updated ${new Date(updatedAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })}`
    : "";

  return `Public GitHub project covering ${category.toLowerCase()}${language}, automatically imported from GitHub${updatedLabel}.`;
}

function inferProjectRoles(project: Project): string[] {
  const roles = new Set<string>();
  const source = buildSource(project);

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

function buildAutoProject(repo: GitHubRepo): Project {
  const projectBase: Project = {
    id: `github-${normalizePreviewKey(repo.name)}`,
    title: humanizeRepoName(repo.name),
    description: "",
    githubRepo: repo.full_name,
  };
  const override = findOverride(repo, projectBase);
  const section = override?.section ?? inferSection({ ...projectBase, ...override }, repo);
  const category = override?.category ?? inferCategory({ ...projectBase, ...override }, section, repo);

  return {
    ...projectBase,
    ...override,
    description: override?.description ?? buildFallbackDescription(repo, category),
    tags: override?.tags ?? buildFallbackTags(repo, section),
    tech: override?.tech ?? buildFallbackTechStack(repo),
    liveUrl: override?.liveUrl ?? sanitizeHomepage(repo.homepage),
    role:
      override?.role ??
      (section === "AI & ML"
        ? "ML Engineer"
        : section === "Data Engineering & Analytics"
          ? "Data Engineer"
          : "Software Engineer"),
    category,
    section,
    githubRepo: repo.full_name,
    featured: override?.featured ?? false,
    priority: override?.priority ?? 0,
    image: override?.image,
    updatedAt: getUpdatedAt(repo),
  };
}

function enrichProject(project: Project, repo: GitHubRepo | null, isAutoImported = false): EnrichedProject {
  const override = findOverride(repo, project);
  const mergedBase = {
    ...project,
    ...override,
    githubRepo: project.githubRepo ?? repo?.full_name,
    liveUrl: override?.liveUrl ?? project.liveUrl ?? sanitizeHomepage(repo?.homepage),
    image: override?.image ?? project.image,
    tech: override?.tech ?? project.tech ?? (repo ? buildFallbackTechStack(repo) : project.tech),
    tags: override?.tags ?? project.tags ?? (repo ? buildFallbackTags(repo, inferSection(project, repo)) : project.tags),
  };
  const section = override?.section ?? inferSection(mergedBase, repo);
  const category = override?.category ?? inferCategory(mergedBase, section, repo);
  const updatedAt = getUpdatedAt(repo, mergedBase);
  const normalizedProject: Project = {
    ...mergedBase,
    description:
      override?.description ??
      mergedBase.description ??
      (repo ? buildFallbackDescription(repo, category) : "Project details coming soon."),
    category,
    section,
    featured: override?.featured ?? mergedBase.featured ?? false,
    priority: override?.priority ?? mergedBase.priority ?? 0,
    updatedAt,
  };

  return {
    project: normalizedProject,
    roles: inferProjectRoles(normalizedProject),
    gh: repo,
    isAutoImported,
    featured: normalizedProject.featured ?? false,
    priority: normalizedProject.priority ?? 0,
    updatedAt,
  };
}

function sortProjects(items: EnrichedProject[]): EnrichedProject[] {
  return [...items].sort((left, right) => {
    if (Number(right.featured) !== Number(left.featured)) {
      return Number(right.featured) - Number(left.featured);
    }

    if (right.priority !== left.priority) {
      return right.priority - left.priority;
    }

    const leftTime = left.updatedAt ? new Date(left.updatedAt).getTime() : 0;
    const rightTime = right.updatedAt ? new Date(right.updatedAt).getTime() : 0;
    if (rightTime !== leftTime) {
      return rightTime - leftTime;
    }

    return left.project.title.localeCompare(right.project.title);
  });
}

function buildCuratedItems(): EnrichedProject[] {
  return sortProjects(
    projects
      .filter((project) => project.githubRepo || project.liveUrl)
      .map((project) => enrichProject(project, null, false)),
  );
}

async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const token = process.env.GITHUB_TOKEN;

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(GITHUB_REPOS_ENDPOINT, {
    headers,
    next: { revalidate: PROJECT_SYNC_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`GitHub repo sync failed: ${response.status}`);
  }

  return ((await response.json()) as GitHubRepo[]).filter(shouldIncludeRepo);
}

function mergeProjects(curatedItems: EnrichedProject[], repos: GitHubRepo[]): EnrichedProject[] {
  const repoMap = new Map(repos.map((repo) => [normalizeKey(repo.full_name), repo]));
  const matchedRepos = new Set<string>();

  const mergedCurated = curatedItems.map((item) => {
    const repoKey = item.project.githubRepo ? normalizeKey(item.project.githubRepo) : null;
    const repo = repoKey ? repoMap.get(repoKey) ?? null : null;

    if (repoKey && repo) {
      matchedRepos.add(repoKey);
    }

    return enrichProject(item.project, repo, false);
  });

  const importedRepos = repos
    .filter((repo) => !matchedRepos.has(normalizeKey(repo.full_name)))
    .map((repo) => enrichProject(buildAutoProject(repo), repo, true));

  return sortProjects([...mergedCurated, ...importedRepos]);
}

export async function getMergedProjects(): Promise<EnrichedProject[]> {
  const curatedItems = buildCuratedItems();

  try {
    const repos = await fetchGitHubRepos();
    return mergeProjects(curatedItems, repos);
  } catch (error) {
    console.error("Project sync fallback:", error);
    return curatedItems;
  }
}
