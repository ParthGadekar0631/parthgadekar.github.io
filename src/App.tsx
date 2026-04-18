import { CSSProperties, FormEvent, useEffect, useMemo, useState } from "react";
import {
  capabilitySections,
  educationEntries,
  experienceEntries,
  homeHighlights,
  homepageImpactMetrics,
  homepageProjectSlugs,
  moduleConfigs,
  profile,
  projects,
  requestedStack,
  skillsGroups,
} from "./content/site";
import { validateContentIntegrity } from "./lib/integrity";
import { AppRoute, navigate, parseRoute, toAppPath } from "./lib/routes";
import { ModuleConfig, ProjectSummary } from "./types";

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
    <button className={className} onClick={() => navigate(to)} type="button">
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
      href={toAppPath(to)}
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
  if (route.kind === "projects" || route.kind === "project-detail") {
    return moduleConfigs.find((item) => item.id === "projects") ?? moduleConfigs[0];
  }

  if (route.kind === "credentials") {
    return moduleConfigs.find((item) => item.id === "credentials") ?? moduleConfigs[0];
  }

  if (route.kind === "contact") {
    return moduleConfigs.find((item) => item.id === "contact") ?? moduleConfigs[0];
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
    let delay = isDeleting ? 45 : 80;

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
  }, [isDeleting, phraseIndex, typedText, words]);

  return typedText;
}

function useScrollOffset() {
  const [scrollOffset, setScrollOffset] = useState(() => window.scrollY || 0);

  useEffect(() => {
    let frame = 0;

    const onScroll = () => {
      if (frame !== 0) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        setScrollOffset(window.scrollY || 0);
        frame = 0;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return scrollOffset;
}

function getRepoLabel(project: ProjectSummary) {
  if (!project.href) {
    return `ParthGadekar0631/${project.slug}`;
  }

  try {
    const url = new URL(project.href);
    return url.pathname.replace(/^\//, "");
  } catch {
    return `ParthGadekar0631/${project.slug}`;
  }
}

function getInitials(value: string) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

function ProfileMark({
  imageHref,
  scrollOffset,
}: {
  imageHref: string;
  scrollOffset: number;
}) {
  const avatarStyle = {
    transform: `translateY(${Math.min(scrollOffset * 0.02, 4)}px) scale(${Math.max(0.92, 1 - scrollOffset * 0.00012)})`,
  } as CSSProperties;

  return (
    <AppLink className="brand-mark" to="/">
      <div className="brand-avatar-shell" style={avatarStyle}>
        <img alt="Parth Gadekar" className="brand-avatar" src={imageHref} />
      </div>
      <div className="brand-copy">
        <span className="brand-name">{profile.name}</span>
        <span className="brand-role">Software Engineer</span>
      </div>
    </AppLink>
  );
}

function HeroPortrait({ imageHref, scrollOffset }: { imageHref: string; scrollOffset: number }) {
  const imageStyle = {
    transform: `translate3d(0, ${Math.min(scrollOffset * 0.08, 28)}px, 0) scale(${1.02 + Math.min(scrollOffset, 700) * 0.00008})`,
  } as CSSProperties;

  return (
    <aside className="portrait-panel reveal" style={{ animationDelay: "120ms" }}>
      <div className="section-kicker">About me</div>
      <h2 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">{profile.title}</h2>
      <p className="mt-4 text-sm leading-7 text-[var(--soft)]">{profile.summary}</p>
      <div className="portrait-frame">
        <div className="portrait-glow" />
        <img alt="Parth Gadekar portrait" className="portrait-image" src={imageHref} style={imageStyle} />
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <span className="stack-pill">Stevens Institute of Technology</span>
        <span className="stack-pill">Hoboken, NJ</span>
        <span className="stack-pill">Open to SWE roles</span>
      </div>
    </aside>
  );
}

function ProjectPreview({ project }: { project: ProjectSummary }) {
  return (
    <div className="project-preview-shell">
      <div className="project-preview-browser">
        <span />
        <span />
        <span />
      </div>
      <div className="project-preview-screen">
        <div className="project-preview-badge">{project.category}</div>
        <div className="project-preview-title">{project.title}</div>
        <div className="project-preview-lines">
          <span />
          <span />
          <span />
        </div>
        <div className="project-preview-tags">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
      <div className="project-preview-base" />
    </div>
  );
}

function ProjectCards({
  items,
  columns = "xl:grid-cols-3",
  showcase = false,
}: {
  items: ProjectSummary[];
  columns?: string;
  showcase?: boolean;
}) {
  return (
    <div className={`grid gap-6 ${columns}`}>
      {items.map((project, index) => (
        <article
          key={project.slug}
          className={showcase ? "project-showcase-card reveal" : "project-card reveal"}
          style={{ animationDelay: `${index * 70}ms` }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
              <div className="mt-3 text-base font-semibold text-[var(--theme-secondary)]">{project.category}</div>
              <div className="mt-2 flex items-center gap-2 text-sm text-[var(--muted)]">
                <span className="project-repo-dot" />
                <span>{getRepoLabel(project)}</span>
              </div>
            </div>
            <a
              className="project-chip-button"
              href={project.href ?? toAppPath(`/projects/${project.slug}`)}
              rel="noreferrer"
              target={project.href ? "_blank" : undefined}
            >
              {project.href ? "GitHub" : "Details"}
            </a>
          </div>

          <div className="mt-4 text-sm leading-7 text-[var(--soft)]">{project.context}</div>
          {showcase ? <ProjectPreview project={project} /> : null}
          <p className="mt-6 text-lg leading-9 text-[var(--soft)]">{project.summary}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((item) => (
              <span key={item} className="stack-pill project-tag-pill">
                {item}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <AppLink className="button button-secondary" to={`/projects/${project.slug}`}>
              Explore project
            </AppLink>
            <span className="project-timeline">{project.timeline}</span>
          </div>
        </article>
      ))}
    </div>
  );
}

function AboutView() {
  const featuredProjects = projects.filter((item) => homepageProjectSlugs.includes(item.slug));

  return (
    <div className="space-y-20">
      <section className="space-y-6">
        <div className="reveal">
          <div className="section-kicker">Tech stack</div>
          <h2 className="section-title">Building across product engineering, data pipelines, and cloud-connected systems.</h2>
          <p className="section-copy">
            I am currently pursuing my M.S. in Computer Science at Stevens Institute of Technology while building
            projects across backend systems, ETL pipelines, full-stack applications, analytics, and applied ML.
          </p>
        </div>
        <div className="skills-cloud reveal" style={{ animationDelay: "120ms" }}>
          {requestedStack.map((item, index) => (
            <span key={item} className={index % 4 === 0 ? "stack-pill stack-pill-emphasis" : "stack-pill"}>
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="reveal">
          <div className="section-kicker">Impact snapshot</div>
          <h2 className="section-title">Selected outcome signals from projects and internships.</h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {homepageImpactMetrics.map((item, index) => (
            <article key={item.label} className="impact-card reveal" style={{ animationDelay: `${index * 75}ms` }}>
              <div className="impact-value">{item.value}</div>
              <div className="mt-3 text-lg font-semibold text-white">{item.label}</div>
              <p className="mt-4 text-sm leading-7 text-[var(--soft)]">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="reveal">
          <div className="section-kicker">Featured projects</div>
          <h2 className="section-title">The six projects I would lead with in a recruiter or interview conversation.</h2>
        </div>
        <ProjectCards items={featuredProjects} />
      </section>

      <section className="space-y-6">
        <div className="reveal">
          <div className="section-kicker">Focus areas</div>
          <h2 className="section-title">Three capability areas that define how I like to build.</h2>
        </div>
        <div className="grid gap-5 xl:grid-cols-3">
          {capabilitySections.map((section, index) => (
            <article key={section.title} className="spotlight-panel reveal" style={{ animationDelay: `${index * 80}ms` }}>
              <div className="section-kicker">{section.title}</div>
              <p className="mt-5 text-sm leading-8 text-[var(--soft)]">{section.summary}</p>
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
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <article className="spotlight-panel reveal">
          <div className="section-kicker">Work experience</div>
          <h2 className="mt-4 text-3xl font-semibold text-white">Three internships across systems, ETL, and information workflows.</h2>
          <div className="mt-6 space-y-5">
            {experienceEntries.map((item) => (
              <div key={`${item.company}-${item.role}`} className="credential-preview-row">
                <div className="credential-preview-mark">{getInitials(item.company)}</div>
                <div>
                  <div className="text-lg font-semibold text-white">{item.role}</div>
                  <div className="text-sm text-[var(--theme-secondary)]">{item.company}</div>
                  <div className="mt-1 text-sm text-[var(--muted)]">
                    {item.timeline} · {item.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <LinkButton className="button button-secondary" to="/credentials">
              View credentials
            </LinkButton>
          </div>
        </article>

        <article className="spotlight-panel reveal" style={{ animationDelay: "120ms" }}>
          <div className="section-kicker">Education</div>
          <div className="mt-6 space-y-5">
            {educationEntries.map((item) => (
              <div key={item.school} className="education-inline-card">
                <div className="education-mark">{item.badge}</div>
                <div>
                  <div className="text-lg font-semibold text-white">{item.school}</div>
                  <div className="text-sm text-[var(--theme-secondary)]">{item.degree}</div>
                  <div className="mt-1 text-sm text-[var(--muted)]">
                    {item.location} · {item.timeline}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {homeHighlights.map((item, index) => (
          <article key={item.label} className="metric-card reveal" style={{ animationDelay: `${index * 70}ms` }}>
            <div className="text-3xl font-semibold text-white">{item.value}</div>
            <div className="mt-2 text-sm font-medium text-[var(--text)]">{item.label}</div>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item.detail}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

const projectFilterOptions = ["All", "AI & ML", "Data Science", "Full-Stack & Systems"] as const;

function ProjectsView() {
  const [activeFilter, setActiveFilter] = useState<(typeof projectFilterOptions)[number]>("All");
  const filteredProjects =
    activeFilter === "All" ? projects : projects.filter((project) => project.category === activeFilter);

  return (
    <div className="space-y-10">
      <div className="reveal">
        <div className="section-kicker">Projects</div>
        <h2 className="section-title">Projects</h2>
        <p className="section-copy">
          Explore my latest work and contributions across backend systems, data engineering, analytics, and applied machine
          learning.
        </p>
      </div>
      <section className="filter-panel reveal" style={{ animationDelay: "120ms" }}>
        <div className="section-kicker">Filter by category</div>
        <div className="mt-6 flex flex-wrap gap-3">
          {projectFilterOptions.map((option) => (
            <button
              key={option}
              className={option === activeFilter ? "filter-chip filter-chip-active" : "filter-chip"}
              onClick={() => setActiveFilter(option)}
              type="button"
            >
              {option}
            </button>
          ))}
        </div>
      </section>
      <div className="reveal text-xl font-semibold text-white">Showing {filteredProjects.length} projects</div>
      <ProjectCards columns="xl:grid-cols-3" items={filteredProjects} showcase />
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
          <article key={section.title} className="spotlight-panel reveal" style={{ animationDelay: `${index * 90}ms` }}>
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
          <div className="section-kicker">Keep exploring</div>
          <p className="section-copy">
            Each project has its own route so the portfolio stays easy to scan, but still has depth when someone wants
            more detail.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <LinkButton className="button button-secondary" to="/projects">
            Back to projects
          </LinkButton>
          <LinkButton className="button button-primary" to="/contact">
            Contact Parth
          </LinkButton>
        </div>
      </div>
    </div>
  );
}

function CredentialsView() {
  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <div className="reveal">
          <div className="section-kicker">Education</div>
          <h2 className="section-title">Academic background aligned with systems, data, and software engineering.</h2>
        </div>
        <div className="grid gap-6 xl:grid-cols-2">
          {educationEntries.map((item, index) => (
            <article key={item.school} className="education-showcase-card reveal" style={{ animationDelay: `${index * 90}ms` }}>
              <div className="education-showcase-mark">{item.badge}</div>
              <div>
                <div className="text-2xl font-semibold text-white">{item.school}</div>
                <div className="mt-2 text-base font-semibold text-[var(--theme-secondary)]">{item.degree}</div>
                <div className="mt-2 text-sm text-[var(--muted)]">
                  {item.location} · {item.timeline}
                </div>
                <p className="mt-5 text-sm leading-8 text-[var(--soft)]">{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="reveal">
          <div className="section-kicker">Experience</div>
          <h2 className="section-title">Three internship experiences that shaped how I build and debug systems.</h2>
        </div>
        <div className="space-y-5">
          {experienceEntries.map((item, index) => (
            <article key={`${item.company}-${item.role}`} className="timeline-card reveal" style={{ animationDelay: `${index * 85}ms` }}>
              <div className="timeline-marker" />
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold tracking-[0.2em] text-[var(--muted)] uppercase">{item.company}</div>
                  <h3 className="mt-2 text-2xl font-semibold text-white">{item.role}</h3>
                </div>
                <div className="text-right text-sm text-[var(--muted)]">
                  <div>{item.timeline}</div>
                  <div className="mt-1">{item.location}</div>
                </div>
              </div>
              <p className="mt-5 text-sm leading-7 text-[var(--soft)]">{item.summary}</p>
              <div className="mt-6 grid gap-3">
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
      </section>

      <section className="space-y-6">
        <div className="reveal">
          <div className="section-kicker">Skills</div>
          <h2 className="section-title">Grouped by how I actually use them in projects and internships.</h2>
        </div>
        <div className="grid gap-5 xl:grid-cols-2">
          {skillsGroups.map((group, index) => (
            <article key={group.title} className="spotlight-panel reveal" style={{ animationDelay: `${index * 70}ms` }}>
              <div className="section-kicker">{group.title}</div>
              <div className="mt-6 flex flex-wrap gap-3">
                {group.items.map((item) => (
                  <span key={item} className="stack-pill">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function ContactView({ imageHref }: { imageHref: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(`Portfolio inquiry from ${name || "a visitor"}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`);

    return `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }, [email, message, name]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please fill in your name, email, and message.");
      return;
    }

    setError(null);
    window.location.href = mailtoHref;
  };

  const socialBubbles = [
    { label: "in", tone: "var(--bubble-linkedin)" },
    { label: "gh", tone: "var(--bubble-github)" },
    { label: "@", tone: "var(--bubble-email)" },
    { label: "NJ", tone: "var(--bubble-location)" },
  ];

  return (
    <div className="space-y-8">
      <div className="reveal">
        <div className="section-kicker">Contact</div>
        <h2 className="section-title">Get in Touch</h2>
        <p className="section-copy">
          I&apos;d love to hear from you. Whether you have a question, want to collaborate, or want to discuss a role,
          use the form below or connect through GitHub and LinkedIn.
        </p>
      </div>

      <section className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <article className="contact-visual-panel reveal">
          <div className="contact-visual-glow" />
          <div className="contact-avatar-shell">
            <img alt="Parth Gadekar" className="contact-avatar" src={imageHref} />
          </div>
          {socialBubbles.map((bubble, index) => (
            <div
              key={bubble.label}
              className={`contact-bubble contact-bubble-${index + 1}`}
              style={{ "--bubble-tone": bubble.tone } as CSSProperties}
            >
              {bubble.label}
            </div>
          ))}
          <div className="mt-8 max-w-sm text-center text-sm leading-7 text-[var(--soft)]">
            <div className="text-lg font-semibold text-white">{profile.name}</div>
            <div className="mt-2">{profile.location}</div>
            <div>{profile.email}</div>
          </div>
        </article>

        <article className="hero-panel reveal" style={{ animationDelay: "120ms" }}>
          <div className="hero-shine" />
          <form className="contact-form" onSubmit={handleSubmit}>
            <label className="contact-field">
              <span>Name</span>
              <input
                className="form-field"
                onChange={(event) => setName(event.target.value)}
                placeholder="Your Name"
                type="text"
                value={name}
              />
            </label>
            <label className="contact-field">
              <span>Email</span>
              <input
                className="form-field"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="your.email@example.com"
                type="email"
                value={email}
              />
            </label>
            <label className="contact-field">
              <span>Message</span>
              <textarea
                className="form-field form-textarea"
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Your message..."
                rows={7}
                value={message}
              />
            </label>
            {error ? <div className="text-sm text-red-300">{error}</div> : null}
            <div className="flex flex-wrap gap-3">
              <button className="button button-primary" type="submit">
                Open email draft
              </button>
              <a className="button button-secondary" href={profile.github} rel="noreferrer" target="_blank">
                GitHub
              </a>
              <a className="button button-secondary" href={profile.linkedin} rel="noreferrer" target="_blank">
                LinkedIn
              </a>
            </div>
          </form>
        </article>
      </section>
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
  const scrollOffset = useScrollOffset();
  const typedText = useTypedWords(activeModule.heroWords);
  const profilePhotoHref = `${import.meta.env.BASE_URL}${profile.photo}`;

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

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[rgba(6,8,18,0.82)] backdrop-blur-2xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
          <ProfileMark imageHref={profilePhotoHref} scrollOffset={scrollOffset} />
          <nav className="hidden items-center gap-10 text-sm text-[var(--muted)] lg:flex">
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
            <a className="button button-secondary" href={profile.github} rel="noreferrer" target="_blank">
              GitHub
            </a>
            <a className="button button-primary" href={profile.linkedin} rel="noreferrer" target="_blank">
              LinkedIn
            </a>
          </div>
        </div>
        <div className="mx-auto block w-full max-w-7xl overflow-x-auto px-5 pb-4 lg:hidden sm:px-8">
          <div className="flex min-w-max gap-3">
            {moduleConfigs.map((module) => (
              <AppLink
                key={module.id}
                className={module.path === activeModule.path ? "stack-pill nav-chip-active" : "stack-pill"}
                to={module.path}
              >
                {module.navLabel}
              </AppLink>
            ))}
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
              {route.kind === "about" ? profile.shortSummary : activeModule.summary}
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--muted)] sm:text-base">{profile.availability}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton className="button button-primary" to="/projects">
                View projects
              </LinkButton>
              <LinkButton className="button button-secondary" to="/contact">
                Contact me
              </LinkButton>
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

          {route.kind === "about" ? (
            <HeroPortrait imageHref={profilePhotoHref} scrollOffset={scrollOffset} />
          ) : (
            <aside className="signal-panel reveal" style={{ animationDelay: "120ms" }}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold tracking-[0.24em] text-[var(--muted)] uppercase">Current module</div>
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
          )}
        </section>

        {route.kind === "about" ? <AboutView /> : null}
        {route.kind === "projects" ? <ProjectsView /> : null}
        {route.kind === "project-detail" ? <ProjectDetailView slug={route.slug} /> : null}
        {route.kind === "credentials" ? <CredentialsView /> : null}
        {route.kind === "contact" ? <ContactView imageHref={profilePhotoHref} /> : null}

        <section className="closing-panel reveal">
          <div>
            <div className="section-kicker">Next step</div>
            <h2 className="section-title">If the work fits, reach out directly.</h2>
            <p className="section-copy">
              This portfolio is organized for fast scanning: a landing-page summary, filtered projects, a credentials
              route, and a direct contact page with all core information on-site.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a className="button button-primary" href={`mailto:${profile.email}`}>
              Email
            </a>
            <a className="button button-secondary" href={profile.github} rel="noreferrer" target="_blank">
              GitHub
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
