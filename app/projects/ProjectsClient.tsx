"use client";

import { memo, useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import { FaGithub } from "react-icons/fa";
import LenisProvider from "../components/LenisProvider";
import type { EnrichedProject } from "@/lib/project-sync";

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

export default function ProjectsClient({ items }: { items: EnrichedProject[] }) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const [colors, setColors] = useState<{ primary: string; secondary: string }>({ primary: "", secondary: "" });
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
      const warmPrimaryShades = ["nyc-glow-red", "nyc-glow-rose", "nyc-glow-amber", "nyc-glow-gold"];
      const warmSecondaryShades = ["nyc-glow-green", "nyc-glow-teal", "nyc-glow-gold", "nyc-glow-amber"];
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
        <div className={`absolute top-20 left-[15%] w-96 h-96 rounded-full blur-3xl opacity-38 spiral-1 ${colors.primary}`} />
        <div className={`absolute bottom-40 right-[12%] w-96 h-96 rounded-full blur-3xl opacity-32 spiral-2 ${colors.secondary}`} />
      </div>

      <div className="max-w-7xl mt-12 mx-auto px-4">
        <div className="mb-12">
          <h1 className={`text-5xl md:text-6xl font-bold mb-3 text-primary ${isDark ? "dark" : ""}`}>Projects</h1>
          <p className={`text-lg text-secondary ${isDark ? "dark" : ""}`}>
            Live GitHub portfolio sync with curated project details, automatic fallbacks, and override-driven highlights.
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
                border ${isDark ? "border-gray-700/50 text-secondary hover:border-emerald-500/50 hover:text-emerald-300" : "border-white/40 text-secondary hover:border-emerald-500/50 hover:text-emerald-700"}
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
      <div
        className="absolute inset-0 opacity-70"
        style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.14), rgba(239,68,68,0.14), rgba(16,185,129,0.12))" }}
      />
      <div className="relative flex h-full flex-col">
        <div>
          <div className={`line-clamp-2 text-lg font-semibold leading-tight ${isDark ? "text-white" : "text-gray-900"}`}>{title}</div>
          {category ? <div className={`mt-2 text-xs font-medium ${isDark ? "text-emerald-300" : "text-emerald-700"}`}>{category}</div> : null}
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
                className={`flex-1 rounded-t-xl ${isDark ? "bg-emerald-400/45" : "bg-emerald-500/45"}`}
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const ProjectCard = memo(function ProjectCard({ entry, isDark }: { entry: EnrichedProject; isDark: boolean }) {
  const { project, gh } = entry;
  const [isHovered, setIsHovered] = useState(false);
  const learnMoreHref = project.liveUrl || gh?.homepage || gh?.html_url || (project.githubRepo ? `https://github.com/${project.githubRepo}` : "#");
  const desc = gh?.description?.trim() || project.description;
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
                className={`mb-1 max-w-[15ch] min-h-[112px] font-bold tracking-[-0.02em] break-words [overflow-wrap:anywhere] transition-colors duration-300 sm:max-w-[17ch] ${titleSizingClasses} ${isDark ? "text-white group-hover:text-red-400" : "text-gray-900 group-hover:text-red-600"}`}
              >
                {project.title}
              </h2>
              {project.category && (
                <div className={`text-xs my-2 font-semibold ${isDark ? "text-emerald-300" : "text-emerald-700"}`}>{project.category}</div>
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
          <ProjectPreview title={project.title} previewImg={project.image} category={project.category} tags={project.tags} isDark={isDark} />
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
                      ? "bg-emerald-900/20 text-emerald-200 border-emerald-700/40 group-hover:bg-red-900/20 group-hover:text-red-200 group-hover:border-red-700/40"
                      : "bg-emerald-100/40 text-emerald-700 border-emerald-200/70 group-hover:bg-red-100/50 group-hover:text-red-700 group-hover:border-red-200/70"
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
