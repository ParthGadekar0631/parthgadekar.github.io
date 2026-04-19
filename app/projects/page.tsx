"use client";
import { Analytics } from "@vercel/analytics/next";
import LenisProvider from '../components/LenisProvider';
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "next-themes";
import type { Project } from "@/data/projects";
import { projects } from "@/data/projects";
import * as images from "@/data/images";
import { FaGithub } from "react-icons/fa";


type GitHubInfo = {
  html_url: string;
  stargazers_count: number;
  description?: string;
  homepage?: string;
  language?: string;
  topics?: string[];
};

type Enriched = { project: Project; roles: string[]; gh: GitHubInfo | null };

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function fetchGitHub(_repo: string, _signal?: AbortSignal): Promise<GitHubInfo | null> {
  // TODO: Implement GitHub fetch logic
  return null;
}

function inferProjectRoles(p: Project): string[] {
  const roles = new Set<string>();
  const tags = (p.tags ?? []).map((t) => t.toLowerCase());
  const title = p.title.toLowerCase();

  if (tags.some((t) => ["ai", "llm", "transformers"].includes(t) || t.includes("rag"))) roles.add("AI/ML");
  if (tags.some((t) => t.includes("assistant") || t.includes("agentic"))) roles.add("Assistant/Agentic");
  if (tags.some((t) => t.includes("recommender"))) roles.add("Recommender Systems");
  if (tags.some((t) => t.includes("nlp") || t.includes("sentiment"))) roles.add("NLP");
  if (tags.some((t) => t.includes("computer vision") || t.includes("vision"))) roles.add("Computer Vision");
  if (tags.some((t) => t.includes("iot"))) roles.add("IoT/Embedded");
  if (tags.some((t) => t.includes("etl") || t.includes("scraping") || t.includes("automation"))) roles.add("Data/ETL");
  if (tags.some((t) => t.includes("full-stack") || t.includes("full stack"))) roles.add("Full-Stack");
  if (tags.some((t) => t.includes("lms")) || title.includes("lms")) roles.add("ERP");
  if (roles.size === 0 && (title.includes("ai") || title.includes("assistant"))) roles.add("AI/ML");

  return Array.from(roles);
}

const ghMemCache = new Map<string, GitHubInfo>();

function readSessionCache(repo: string): GitHubInfo | null {
  try {
    const raw = sessionStorage.getItem(`gh:${repo}`);
    if (!raw) return null;
    return JSON.parse(raw) as GitHubInfo;
  } catch {
    return null;
  }
}

function writeSessionCache(repo: string, data: GitHubInfo) {
  try {
    sessionStorage.setItem(`gh:${repo}`, JSON.stringify(data));
  } catch {
    // ignore quota issues
  }
}

function useGitHubInfo(repo?: string, rootMargin = "200px") {
  const [gh, setGh] = useState<GitHubInfo | null>(null);
  // const [loading, setLoading] = useState<boolean>(!!repo);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!repo) {
      // requestAnimationFrame(() => setLoading(false));
      return;
    }

    const mem = ghMemCache.get(repo);
    if (mem) {
      requestAnimationFrame(() => {
        setGh(mem);
        // setLoading(false);
      });
      return;
    }
    const sess = readSessionCache(repo);
    if (sess) {
      ghMemCache.set(repo, sess);
      requestAnimationFrame(() => {
        setGh(sess);
        // setLoading(false);
      });
      return;
    }

    let observer: IntersectionObserver | null = null;
    let aborted = false;
    let controller: AbortController | null = null;

    const fetchWhenVisible = async () => {
      if (aborted || !repo) return;
      // setLoading(true);
      controller = new AbortController();
      const data = await fetchGitHub(repo, controller.signal);
      if (aborted) return;
      if (data) {
        ghMemCache.set(repo, data);
        writeSessionCache(repo, data);
      }
      setGh(data);
      // setLoading(false);
    };

    const el = ref.current;
    if (!el) {
      fetchWhenVisible();
      return;
    }

    observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first?.isIntersecting) {
          observer?.disconnect();
          fetchWhenVisible();
        }
      },
      { root: null, rootMargin, threshold: 0.01 }
    );

    observer.observe(el);

    return () => {
      aborted = true;
      observer?.disconnect();
      controller?.abort();
    };
  }, [repo, rootMargin]);

  return { gh, ref };
}

export default function Projects() {
  const [items] = useState<Enriched[]>(
    () =>
      projects
        .filter((p) => p.githubRepo && projectPreviewMap[p.id])
        .map((p) => ({ project: p, roles: inferProjectRoles(p), gh: null as GitHubInfo | null }))
  );

  return (
    <>
      <ProjectsClient items={items} />
      <Analytics />
    </>
  );
}

function ProjectsClient({ items }: { items: Enriched[] }) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const [colors, setColors] = useState<{ primary: string; secondary: string }>({ primary: '', secondary: '' });

  const sectionOptions = useMemo(() => {
    const set = new Set<string>();
    items.forEach(({ project }) => {
      if (project.section) {
        set.add(project.section);
      }
    });
    return ["All", ...Array.from(set).sort()];
  }, [items]);

  const [selectedSection, setSelectedSection] = useState<string>("All");

  const visible = useMemo(() => {
    let filtered = items;
    if (selectedSection !== "All") {
      filtered = filtered.filter(({ project }) => project.section === selectedSection);
    }
    return filtered;
  }, [items, selectedSection]);

  useEffect(() => {
    let isMounted = true;
    requestAnimationFrame(() => {
      if (isMounted) setMounted(true);
      // Generate random blue and purple hues
      const blueShades = ['bg-blue-500', 'bg-blue-600', 'bg-cyan-500', 'bg-indigo-500'];
      const purpleShades = ['bg-purple-500', 'bg-purple-600', 'bg-violet-500', 'bg-pink-500'];
      if (isMounted) {
        setColors({
          primary: blueShades[Math.floor(Math.random() * blueShades.length)],
          secondary: purpleShades[Math.floor(Math.random() * purpleShades.length)]
        });
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen py-16 ${isDark ? 'dark' : ''}`}>
      <LenisProvider />
      {/* Background gradient blur effect with molecular animation */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className={`absolute top-20 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30 spiral-1 ${colors.primary}`} />
        <div className={`absolute bottom-40 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-30 spiral-2 ${colors.secondary}`} />
      </div>

      <div className="max-w-7xl mt-12 mx-auto px-4">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className={`text-5xl md:text-6xl font-bold mb-3 text-primary ${isDark ? 'dark' : ''}`}>
            Projects
          </h1>
          <p className={`text-lg text-secondary ${isDark ? 'dark' : ''}`}>
            Explore my latest work and contributions
          </p>
        </div>

        {/* Filter Section */}
        <div className="mb-12 space-y-6">
          {/* Section Filter */}
          <div className={`glass-container rounded-2xl p-4 md:p-6 ${isDark ? 'dark' : ''}`}>
            <h3 className={`text-sm font-semibold mb-4 text-secondary ${isDark ? 'dark' : ''} uppercase tracking-wider`}>
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
                      ${active
                        ? `glass-button ${isDark ? 'dark' : ''} scale-105 shadow-lg`
                        : `border ${isDark ? 'border-gray-700/50 text-secondary' : 'border-white/40 text-secondary'} 
                             hover:border-white/60 hover:scale-105 ${isDark ? 'dark' : ''}`
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

        {/* Results Counter and Clear Filters */}
        <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
          <div className={`text-sm text-tertiary ${isDark ? 'dark' : ''}`}>
            Showing {visible.length} project{visible.length !== 1 ? 's' : ''}
          </div>
          {selectedSection !== "All" && (
            <button
              onClick={() => {
                setSelectedSection("All");
              }}
              className={`
                px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300
                border ${isDark ? 'border-gray-700/50 text-secondary hover:border-red-500/50 hover:text-red-400' : 'border-white/40 text-secondary hover:border-red-500/50 hover:text-red-600'}
              `}
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {visible.map(({ project }) => (
            <ProjectCard key={project.id} project={project} isDark={isDark} />
          ))}
        </div>

        {/* Empty State */}
        {visible.length === 0 && (
          <div className={`text-center py-16 glass-container rounded-2xl ${isDark ? 'dark' : ''}`}>
            <p className={`text-lg text-secondary ${isDark ? 'dark' : ''}`}>
              No projects found for this category
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const ProjectCard = memo(function ProjectCard({ project, isDark }: { project: Project; isDark: boolean }) {
  const { gh, ref } = useGitHubInfo(project.githubRepo);
  const [isHovered, setIsHovered] = useState(false);
  const learnMoreHref = project.liveUrl || gh?.homepage || (gh?.html_url ?? (project.githubRepo ? `https://github.com/${project.githubRepo}` : "#"));
  const desc = gh?.description || project.description;

  const previewImg = projectPreviewMap[project.id];
  const titleSizingClasses = getTitleSizingClasses(project.title);
  const descriptionSizingClasses = getDescriptionSizingClasses(desc);

  return (
    <a
      href={learnMoreHref}
      target="_blank"
      rel="noopener noreferrer"
      className={`group glass-container rounded-2xl p-6 transition-all duration-500 flex h-full flex-col cursor-pointer block overflow-hidden project-card-bg-${project.id}
        ${isHovered ? 'scale-105 shadow-2xl' : 'shadow-lg'} ${isDark ? 'dark' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={ref as React.Ref<HTMLAnchorElement>}
      style={{ position: 'relative', zIndex: 0, width: '100%', minWidth: 0, minHeight: '540px', height: 'auto', maxWidth: '460px', margin: 'auto' }}
    >
      {/* PNG as card background, consistent size */}
      <style jsx>{`
        .project-card-bg-${project.id} {
          position: relative;
        }
        .project-card-bg-${project.id}::before {
          content: '';
          position: absolute;
          z-index: 0;
          background: #18181b;
          opacity: 0.48;
          border-radius: 1rem;
          transition: opacity 0.3s;
        }
        .project-card-bg-${project.id}:hover::before {
          opacity: 0.28;
        }
        .project-card-bg-${project.id}::after {
          content: '';
          position: absolute;
          top: 53%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
          width: 300px;
          height: 200px;
          max-width: 82%;
          max-height: 48%;
          background: ${previewImg ? `url('${previewImg}') center center / contain no-repeat` : 'none'};
          opacity: 0.88;
          pointer-events: none;
          transition: opacity 0.3s;
        }
        .project-card-bg-${project.id}:hover::after {
          opacity: 1;
        }
      `}</style>
      {/* Card content, above image */}
      <div className="flex flex-col flex-1 relative z-10">
        {/* Header and category at top */}
        <div className="mb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1 pr-2">
              <h2 className={`mb-1 max-w-[15ch] font-bold tracking-[-0.02em] break-words [overflow-wrap:anywhere] transition-colors duration-300 sm:max-w-[17ch] ${titleSizingClasses} ${isDark ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'}`}>
                {project.title}
              </h2>
              {project.category && (
                <div className={`text-xs my-2 font-semibold ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
                  {project.category}
                </div>
              )}
            </div>
            {project.githubRepo && (
              <div className="flex flex-shrink-0 flex-col items-end justify-start pt-1">
                {project.githubRepo && (
                  <button
                    type="button"
                    className={`px-3 py-1.5 rounded-full border flex items-center gap-2 font-semibold text-xs transition-all duration-200
                      ${isDark
                        ? 'border-white/60 text-white/80 bg-transparent hover:bg-white/10 hover:text-white'
                        : 'border-black bg-black text-white hover:bg-gray-900 hover:text-white'}
                      focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-transparent`}
                    title="View on GitHub"
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      window.open(`https://github.com/${project.githubRepo}`, '_blank', 'noopener,noreferrer');
                    }}
                  >
                    <FaGithub size={18} style={{ display: 'inline', verticalAlign: 'middle' }} />
                    <span className="font-bold tracking-wide">GitHub</span>
                  </button>
                )}

              </div>
            )}
          </div>
          {project.githubRepo && (
            <div className={`flex items-center gap-2 text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <span>📦</span>
              <span className="truncate">{project.githubRepo}</span>
            </div>
          )}
        </div>
        <div className="min-h-[210px] flex-1" />
        {/* Description and tags at bottom */}
        {desc ? (
          <p className={`mt-4 line-clamp-3 ${descriptionSizingClasses} ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {desc}
          </p>
        ) : (
          <div className="mt-4 animate-pulse space-y-2">
            <div className={`h-3 rounded-full w-full ${isDark ? 'bg-gray-700/50' : 'bg-gray-300/50'}`} />
            <div className={`h-3 rounded-full w-5/6 ${isDark ? 'bg-gray-700/50' : 'bg-gray-300/50'}`} />
          </div>
        )}
        {project.tags?.length ? (
          <div className="mt-3 flex flex-wrap items-start gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className={`inline-flex max-w-full items-center rounded-full border px-3 py-1 text-xs font-medium leading-5 transition-all duration-300 ${isDark
                  ? 'bg-blue-900/30 text-blue-300 border-blue-700/50 group-hover:bg-blue-800/50'
                  : 'bg-blue-100/40 text-blue-700 border-blue-200/70 group-hover:bg-blue-100/60'
                  }`}
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </a>
  );
  // End of ProjectCard
});
