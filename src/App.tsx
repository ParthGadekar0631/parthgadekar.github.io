import { CSSProperties, FormEvent, useEffect, useMemo, useState } from "react";
import { knowledgeDocuments, suggestedPrompts } from "./content/knowledge";
import {
  caseStudies,
  educationEntries,
  experienceEntries,
  homeHighlights,
  moduleConfigs,
  profile,
  projects,
  publicMetricsSeed,
  requestedStack,
} from "./content/site";
import { fetchChatResponse, fetchPublicMetrics } from "./lib/api";
import { validateContentIntegrity } from "./lib/integrity";
import { AppRoute, navigate, parseRoute } from "./lib/routes";
import { ChatMessage, Citation, ModuleConfig, PublicMetrics } from "./types";

validateContentIntegrity();

function LinkButton({
  to,
  children,
  className,
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      className={className}
      onClick={() => navigate(to)}
      type="button"
    >
      {children}
    </button>
  );
}

function AppLink({
  to,
  children,
  className,
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      className={className}
      href={to}
      onClick={(event) => {
        event.preventDefault();
        navigate(to);
      }}
    >
      {children}
    </a>
  );
}

function getModuleForRoute(route: AppRoute): ModuleConfig {
  if (route.kind === "copilot") {
    return moduleConfigs.find((item) => item.id === "copilot") ?? moduleConfigs[0];
  }

  if (route.kind === "projects" || route.kind === "project-detail") {
    return moduleConfigs.find((item) => item.id === "projects") ?? moduleConfigs[0];
  }

  if (route.kind === "case-studies" || route.kind === "case-study-detail") {
    return moduleConfigs.find((item) => item.id === "case-studies") ?? moduleConfigs[0];
  }

  if (route.kind === "about") {
    return moduleConfigs.find((item) => item.id === "about") ?? moduleConfigs[0];
  }

  return moduleConfigs[0];
}

function useTypedWords(words: string[]) {
  const [typedText, setTypedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setTypedText("");
    setPhraseIndex(0);
    setIsDeleting(false);
  }, [words]);

  useEffect(() => {
    const currentWord = words[phraseIndex % words.length];
    let delay = isDeleting ? 45 : 78;

    if (!isDeleting && typedText === currentWord) {
      delay = 1200;
    }

    if (isDeleting && typedText.length === 0) {
      delay = 240;
    }

    const timeout = window.setTimeout(() => {
      if (!isDeleting) {
        const nextText = currentWord.slice(0, typedText.length + 1);
        setTypedText(nextText);

        if (nextText === currentWord) {
          setIsDeleting(true);
        }

        return;
      }

      const nextText = currentWord.slice(0, typedText.length - 1);
      setTypedText(nextText);

      if (nextText.length === 0) {
        setIsDeleting(false);
        setPhraseIndex((current) => current + 1);
      }
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [words, phraseIndex, typedText, isDeleting]);

  return typedText;
}

function HomeView({ activeModule }: { activeModule: ModuleConfig }) {
  const featuredProjects = projects.filter((item) => activeModule.featuredProjectSlugs.includes(item.slug));

  return (
    <div className="space-y-16">
      <section className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="hero-panel reveal">
          <div className="hero-shine" />
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium tracking-[0.24em] text-[var(--muted)] uppercase">
            Production-grade portfolio system
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="eyebrow-tag">{activeModule.kicker}</span>
            <span className="eyebrow-tag">Vercel + Claude + Langfuse</span>
          </div>
          <p className="mt-8 max-w-3xl text-lg leading-9 text-[var(--soft)]">
            {activeModule.summary}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {homeHighlights.map((item) => (
              <article key={item.label} className="metric-card">
                <div className="text-3xl font-semibold text-white">{item.value}</div>
                <div className="mt-2 text-sm font-medium text-[var(--text)]">{item.label}</div>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="spotlight-panel reveal" style={{ animationDelay: "120ms" }}>
          <div className="section-kicker">What this site demonstrates</div>
          <h2 className="section-title">
            The portfolio demonstrates the skills it describes.
          </h2>
          <div className="mt-8 space-y-4">
            {[
              "A real text copilot powered by Claude instead of front-end-only scripted answers.",
              "Curated retrieval over your resume, project summaries, and site content.",
              "Public observability summary cards with raw traces kept private.",
              "Case-study routing, route-aware accent themes, and reusable product UI patterns.",
            ].map((point) => (
              <div key={point} className="signal-row">
                <span className="signal-dot" />
                <span>{point}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton className="button button-primary" to="/copilot">
              Open AI Copilot
            </LinkButton>
            <LinkButton className="button button-secondary" to="/projects">
              Explore Projects
            </LinkButton>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="reveal">
          <div className="section-kicker">Top-level modules</div>
          <h2 className="section-title">Five routes. One persistent product shell.</h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-5">
          {moduleConfigs.map((item, index) => (
            <LinkButton
              key={item.id}
              className="module-card reveal"
              to={item.path}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-semibold tracking-[0.22em] text-[var(--muted)] uppercase">
                  0{index + 1}
                </span>
                <span className="module-status">Route</span>
              </div>
              <h3 className="mt-5 text-xl font-semibold text-white">{item.navLabel}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--soft)]">{item.summary}</p>
            </LinkButton>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="reveal">
          <div className="section-kicker">Featured work</div>
          <h2 className="section-title">Highlighted projects for the active portfolio story.</h2>
        </div>
        <div className="grid gap-5 xl:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <article
              key={project.slug}
              className="project-card reveal"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="text-xs font-semibold tracking-[0.22em] text-[var(--muted)] uppercase">
                  {project.timeline}
                </div>
                <span className="module-status">{project.status}</span>
              </div>
              <h3 className="mt-4 text-2xl font-semibold text-white">{project.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[var(--soft)]">{project.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span key={item} className="stack-pill stack-pill-compact">
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-6">
                <AppLink className="button button-secondary" to={`/projects/${project.slug}`}>
                  View detail
                </AppLink>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function ProjectsView() {
  return (
    <div className="space-y-8">
      <div className="reveal">
        <div className="section-kicker">Projects</div>
        <h2 className="section-title">Proof of work organized for engineering conversations.</h2>
        <p className="section-copy">
          These project routes are not filler cards. They are designed to surface the kind of operating signal that
          matters in interviews: constraints, tradeoffs, observability, and why the system exists.
        </p>
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        {projects.map((project, index) => (
          <article
            key={project.slug}
            className="project-card reveal"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="text-xs font-semibold tracking-[0.22em] text-[var(--muted)] uppercase">
                {project.timeline}
              </div>
              <span className="module-status">{project.status}</span>
            </div>
            <h3 className="mt-4 text-2xl font-semibold text-white">{project.title}</h3>
            <p className="mt-4 text-sm leading-7 text-[var(--soft)]">{project.summary}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span key={item} className="stack-pill stack-pill-compact">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-6 space-y-3">
              {project.outcomes.map((point) => (
                <div key={point} className="signal-row text-sm leading-7 text-[var(--soft)]">
                  <span className="signal-dot" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <AppLink className="button button-secondary" to={`/projects/${project.slug}`}>
                Open project
              </AppLink>
              {project.href ? (
                <a className="button button-secondary" href={project.href} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function ProjectDetailView({ slug }: { slug: string }) {
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <div className="spotlight-panel reveal">
        <h2 className="section-title">Project not found.</h2>
        <p className="section-copy">This project route does not exist.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="reveal">
        <div className="section-kicker">Project detail</div>
        <h2 className="section-title">{project.title}</h2>
        <p className="section-copy">{project.detailIntro}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {project.stack.map((item) => (
            <span key={item} className="stack-pill">
              {item}
            </span>
          ))}
        </div>
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        {project.detailSections.map((section, index) => (
          <article
            key={section.title}
            className="spotlight-panel reveal"
            style={{ animationDelay: `${index * 90}ms` }}
          >
            <div className="section-kicker">{section.title}</div>
            <p className="mt-5 text-sm leading-8 text-[var(--soft)]">{section.body}</p>
            <div className="mt-6 space-y-3">
              {section.bullets.map((point) => (
                <div key={point} className="signal-row text-sm leading-7 text-[var(--soft)]">
                  <span className="signal-dot" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
      <div className="closing-panel reveal">
        <div>
          <div className="section-kicker">Next route</div>
          <p className="section-copy">
            The portfolio keeps these routes separate so each project can be discussed as a system instead of a line item.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <LinkButton className="button button-secondary" to="/projects">
            Back to projects
          </LinkButton>
          <LinkButton className="button button-primary" to="/copilot">
            Ask the copilot about this
          </LinkButton>
        </div>
      </div>
    </div>
  );
}

function CaseStudiesView() {
  return (
    <div className="space-y-8">
      <div className="reveal">
        <div className="section-kicker">Case studies</div>
        <h2 className="section-title">Lighter than the reference portfolio in v1, but structurally ready.</h2>
        <p className="section-copy">
          The point of this module is to establish deep-linkable technical storytelling now, then expand the editorial
          layer later without changing the product shell.
        </p>
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        {caseStudies.map((caseStudy, index) => (
          <article
            key={caseStudy.slug}
            className="project-card reveal"
            style={{ animationDelay: `${index * 90}ms` }}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="text-xs font-semibold tracking-[0.22em] text-[var(--muted)] uppercase">
                {caseStudy.status}
              </div>
              <span className="module-status">Essay</span>
            </div>
            <h3 className="mt-4 text-2xl font-semibold text-white">{caseStudy.title}</h3>
            <p className="mt-4 text-sm leading-7 text-[var(--soft)]">{caseStudy.summary}</p>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{caseStudy.highlight}</p>
            <div className="mt-8">
              <AppLink className="button button-secondary" to={`/case-studies/${caseStudy.slug}`}>
                Read case study
              </AppLink>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function CaseStudyDetailView({ slug }: { slug: string }) {
  const caseStudy = caseStudies.find((item) => item.slug === slug);

  if (!caseStudy) {
    return (
      <div className="spotlight-panel reveal">
        <h2 className="section-title">Case study not found.</h2>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="reveal">
        <div className="section-kicker">Case study</div>
        <h2 className="section-title">{caseStudy.title}</h2>
        <p className="section-copy">{caseStudy.summary}</p>
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        {caseStudy.sections.map((section, index) => (
          <article
            key={section.title}
            className="spotlight-panel reveal"
            style={{ animationDelay: `${index * 90}ms` }}
          >
            <div className="section-kicker">{section.title}</div>
            <p className="mt-5 text-sm leading-8 text-[var(--soft)]">{section.body}</p>
            <div className="mt-6 space-y-3">
              {section.bullets.map((point) => (
                <div key={point} className="signal-row text-sm leading-7 text-[var(--soft)]">
                  <span className="signal-dot" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function AboutView() {
  return (
    <div className="space-y-10">
      <section className="grid gap-8 xl:grid-cols-[0.85fr_1.15fr]">
        <div className="reveal">
          <div className="section-kicker">About / Contact</div>
          <h2 className="section-title">Context, fit, and where the instincts came from.</h2>
          <p className="section-copy">
            The goal here is not to write a generic bio. It is to explain the kinds of roles I want, what habits the
            internships built, and why my strongest projects point toward systems, data, and AI-native product work.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="button button-primary" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <a className="button button-secondary" href={profile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </div>
        <div className="spotlight-panel reveal" style={{ animationDelay: "120ms" }}>
          <div className="section-kicker">Target roles</div>
          <div className="mt-6 space-y-4">
            {[
              "Software engineering roles where backend systems and product delivery both matter.",
              "Data engineering roles focused on pipeline quality, reliability, and observability.",
              "AI systems roles where chat surfaces, tracing, and careful product framing matter together.",
            ].map((item) => (
              <div key={item} className="signal-row">
                <span className="signal-dot" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="space-y-5">
          {experienceEntries.map((item, index) => (
            <article
              key={item.company}
              className="timeline-card reveal"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="timeline-marker" />
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{item.role}</h3>
                  <div className="mt-2 text-sm text-[var(--theme-secondary)]">{item.company}</div>
                </div>
                <div className="text-right text-sm text-[var(--muted)]">
                  <div>{item.timeline}</div>
                  <div className="mt-1">{item.location}</div>
                </div>
              </div>
              <p className="mt-5 text-sm leading-7 text-[var(--soft)]">{item.summary}</p>
              <div className="mt-6 space-y-3">
                {item.bullets.map((point) => (
                  <div key={point} className="signal-row text-sm leading-7 text-[var(--soft)]">
                    <span className="signal-dot" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
        <div className="space-y-5">
          {educationEntries.map((item, index) => (
            <article
              key={item.school}
              className="education-card reveal"
              style={{ animationDelay: `${index * 110}ms` }}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{item.degree}</h3>
                  <div className="mt-2 text-sm text-[var(--theme-secondary)]">{item.school}</div>
                </div>
                <div className="text-sm text-[var(--muted)]">{item.timeline}</div>
              </div>
              <p className="mt-5 text-sm leading-7 text-[var(--soft)]">{item.detail}</p>
            </article>
          ))}
          <article className="spotlight-panel reveal" style={{ animationDelay: "180ms" }}>
            <div className="section-kicker">Knowledge corpus</div>
            <p className="mt-5 text-sm leading-8 text-[var(--soft)]">
              The copilot answers from a curated knowledge layer built from your resume, project summaries, case-study
              content, and portfolio copy. That keeps v1 controllable without needing a database or vector store.
            </p>
            <div className="mt-6 text-sm text-[var(--muted)]">
              {knowledgeDocuments.length} curated documents currently indexed for retrieval.
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}

function MetricsPanel({ metrics }: { metrics: PublicMetrics }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <article className="metric-card">
        <div className="metric-label">Total chats</div>
        <div className="metric-value">{metrics.totalChats}</div>
      </article>
      <article className="metric-card">
        <div className="metric-label">Average latency</div>
        <div className="metric-value">{metrics.avgLatencyMs} ms</div>
      </article>
      <article className="metric-card">
        <div className="metric-label">Popular module</div>
        <div className="metric-value metric-text">{metrics.popularModule}</div>
      </article>
      <article className="metric-card">
        <div className="metric-label">Status</div>
        <div className="metric-value metric-text">{metrics.serviceStatus}</div>
      </article>
    </div>
  );
}

function CopilotView({ route }: { route: AppRoute }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text:
        "Ask me about Parth's projects, target roles, observability interests, or how this portfolio is structured as a product.",
    },
  ]);
  const [draft, setDraft] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [citations, setCitations] = useState<Citation[]>([]);
  const [traceId, setTraceId] = useState<string>("");
  const [metrics, setMetrics] = useState<PublicMetrics>(publicMetricsSeed);

  useEffect(() => {
    let cancelled = false;

    fetchPublicMetrics()
      .then((data) => {
        if (!cancelled) {
          setMetrics(data);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setMetrics(publicMetricsSeed);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const pagePath =
    route.kind === "project-detail"
      ? `/projects/${route.slug}`
      : route.kind === "case-study-detail"
        ? `/case-studies/${route.slug}`
        : route.kind === "copilot"
          ? "/copilot"
          : "/";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = draft.trim();

    if (!trimmed || isLoading) {
      return;
    }

    const nextHistory = [...messages, { role: "user" as const, text: trimmed }];
    setMessages(nextHistory);
    setDraft("");
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetchChatResponse({
        message: trimmed,
        module: "copilot",
        page: pagePath,
        history: nextHistory.slice(-8),
      });

      setMessages((current) => [...current, { role: "assistant", text: response.answer }]);
      setCitations(response.citations);
      setTraceId(response.traceId);
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : "Unexpected chat failure.";
      setError(message);
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text:
            "The live copilot could not answer right now, so the safe fallback is to explore the Projects and About routes directly.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <section className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="reveal">
          <div className="section-kicker">AI copilot</div>
          <h2 className="section-title">Real text chat, curated retrieval, safe fallbacks.</h2>
          <p className="section-copy">
            The copilot is implemented as a server-side Vercel function that uses Claude, curated knowledge, and
            Langfuse-ready tracing hooks. The site only exposes safe summary metrics, not raw traces.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {suggestedPrompts.map((prompt) => (
              <button
                key={prompt}
                className="stack-pill interactive-pill"
                onClick={() => setDraft(prompt)}
                type="button"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
        <div className="reveal" style={{ animationDelay: "120ms" }}>
          <MetricsPanel metrics={metrics} />
          <div className="mt-4 text-sm text-[var(--muted)]">
            Last updated: {metrics.lastUpdated}
          </div>
        </div>
      </section>

      <div className="copilot-shell reveal">
        <div className="copilot-header">
          <div>
            <div className="text-sm font-semibold text-white">{profile.siteName} Copilot</div>
            <div className="text-xs text-[var(--muted)]">
              Claude-backed text mode with curated retrieval
            </div>
          </div>
          <div className="status-lamp" />
        </div>
        <div className="copilot-body">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={message.role === "assistant" ? "copilot-message assistant" : "copilot-message user"}
            >
              {message.text}
            </div>
          ))}
          {isLoading ? (
            <div className="copilot-message assistant">Thinking through the best answer...</div>
          ) : null}
        </div>
        <form className="copilot-form" onSubmit={handleSubmit}>
          <input
            className="copilot-input"
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Ask about projects, systems, observability, or target roles"
            value={draft}
          />
          <button className="button button-primary" disabled={isLoading} type="submit">
            Send
          </button>
        </form>
        <div className="mt-5 space-y-3 text-sm text-[var(--muted)]">
          {error ? <div>Fallback triggered: {error}</div> : null}
          {traceId ? <div>Trace id: {traceId}</div> : null}
          {citations.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {citations.map((citation) => (
                <span key={`${citation.path}-${citation.title}`} className="stack-pill stack-pill-compact">
                  {citation.title}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [route, setRoute] = useState<AppRoute>(() => parseRoute(window.location.pathname));

  useEffect(() => {
    const onPopState = () => {
      setRoute(parseRoute(window.location.pathname));
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const activeModule = useMemo(() => getModuleForRoute(route), [route]);
  const typedText = useTypedWords(activeModule.heroWords);
  const resumeHref = `${import.meta.env.BASE_URL}${profile.resume}`;

  const themeStyle = {
    "--theme-accent": activeModule.theme.accent,
    "--theme-accent-soft": activeModule.theme.accentSoft,
    "--theme-accent-glow": activeModule.theme.accentGlow,
    "--theme-secondary": activeModule.theme.secondary,
    "--theme-panel": activeModule.theme.panel,
  } as CSSProperties;

  return (
    <div className="portfolio-shell min-h-screen text-[var(--text)]" style={themeStyle}>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="grid-overlay" />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[rgba(5,8,20,0.72)] backdrop-blur-2xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <AppLink className="text-sm font-semibold tracking-[0.34em] text-[var(--muted)] uppercase" to="/">
            {profile.siteName}
          </AppLink>
          <nav className="hidden items-center gap-6 text-sm text-[var(--muted)] lg:flex">
            {moduleConfigs.map((module) => (
              <AppLink
                key={module.id}
                className={module.path === activeModule.path ? "nav-link nav-link-active" : "nav-link"}
                to={module.path}
              >
                {module.navLabel}
              </AppLink>
            ))}
          </nav>
          <div className="flex gap-3">
            <a className="button button-secondary" href={profile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="button button-primary" href={resumeHref} target="_blank" rel="noreferrer">
              Resume
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-5 pb-16 pt-10 sm:px-8 sm:pt-14">
        <section className="grid gap-8 xl:grid-cols-[1.08fr_0.92fr]">
          <div className="hero-panel reveal">
            <div className="hero-shine" />
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium tracking-[0.24em] text-[var(--muted)] uppercase">
              {activeModule.kicker}
            </div>
            <h1 className="mt-6 max-w-5xl text-4xl font-semibold leading-[1.02] text-white sm:text-5xl lg:text-7xl">
              {activeModule.title}
            </h1>
            <div className="typed-wrap">
              <span className="typed-text">{typedText}</span>
              <span className="typed-cursor" />
            </div>
            <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--soft)] sm:text-lg">
              {profile.summary}
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--muted)] sm:text-base">
              {profile.availability}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="button button-primary" href={`mailto:${profile.email}`}>
                Contact Parth
              </a>
              <AppLink className="button button-secondary" to="/copilot">
                Talk to the copilot
              </AppLink>
            </div>
            <div className="mt-10">
              <div className="marquee">
                <div className="marquee-track">
                  {[...requestedStack, ...requestedStack].map((item, index) => (
                    <span key={`${item}-${index}`} className="stack-pill">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <aside className="signal-panel reveal" style={{ animationDelay: "120ms" }}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold tracking-[0.24em] text-[var(--muted)] uppercase">
                  Active route
                </div>
                <h2 className="mt-3 text-2xl font-semibold text-white">{activeModule.navLabel}</h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--soft)]">{activeModule.summary}</p>
              </div>
              <div className="orbital-core">
                <span className="orbital-dot orbital-dot-one" />
                <span className="orbital-dot orbital-dot-two" />
                <span className="orbital-dot orbital-dot-three" />
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {activeModule.chips.map((chip) => (
                <span key={chip} className="stack-pill">
                  {chip}
                </span>
              ))}
            </div>
          </aside>
        </section>

        {route.kind === "home" ? <HomeView activeModule={activeModule} /> : null}
        {route.kind === "copilot" ? <CopilotView route={route} /> : null}
        {route.kind === "projects" ? <ProjectsView /> : null}
        {route.kind === "project-detail" ? <ProjectDetailView slug={route.slug} /> : null}
        {route.kind === "case-studies" ? <CaseStudiesView /> : null}
        {route.kind === "case-study-detail" ? <CaseStudyDetailView slug={route.slug} /> : null}
        {route.kind === "about" ? <AboutView /> : null}

        <section className="closing-panel reveal">
          <div>
            <div className="section-kicker">Built to grow</div>
            <h2 className="section-title">The next upgrade path is voice, evals, and deeper case-study content.</h2>
            <p className="section-copy">
              V1 intentionally prioritizes strong routing, a real text copilot, typed content, and a clean Vercel
              runtime over trying to ship every possible AI feature at once.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a className="button button-primary" href={`mailto:${profile.email}`}>
              Email
            </a>
            <a className="button button-secondary" href={profile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
