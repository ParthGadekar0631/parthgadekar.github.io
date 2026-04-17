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
  if (route.kind === "experience") {
    return moduleConfigs.find((item) => item.id === "experience") ?? moduleConfigs[0];
  }

  if (route.kind === "projects" || route.kind === "project-detail") {
    return moduleConfigs.find((item) => item.id === "projects") ?? moduleConfigs[0];
  }

  if (route.kind === "skills") {
    return moduleConfigs.find((item) => item.id === "skills") ?? moduleConfigs[0];
  }

  if (route.kind === "education") {
    return moduleConfigs.find((item) => item.id === "education") ?? moduleConfigs[0];
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
        <span className="brand-role">Software Engineer Portfolio</span>
      </div>
    </AppLink>
  );
}

function HeroPortrait({ imageHref, scrollOffset }: { imageHref: string; scrollOffset: number }) {
  const imageStyle = {
    transform: `translate3d(0, ${Math.min(scrollOffset * 0.1, 40)}px, 0) scale(${1.04 + Math.min(scrollOffset, 700) * 0.0001})`,
  } as CSSProperties;

  return (
    <aside className="portrait-panel reveal" style={{ animationDelay: "120ms" }}>
      <div className="section-kicker">Parth Gadekar</div>
      <h2 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">{profile.title}</h2>
      <p className="mt-4 text-sm leading-7 text-[var(--soft)]">
        Based in Hoboken, building software across systems, data pipelines, full-stack products, and AI-native
        experiences.
      </p>
      <div className="portrait-frame">
        <div className="portrait-glow" />
        <img alt="Parth Gadekar portrait" className="portrait-image" src={imageHref} style={imageStyle} />
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <span className="stack-pill">open to SWE roles</span>
        <span className="stack-pill">USA relocation</span>
        <span className="stack-pill">systems + data</span>
      </div>
    </aside>
  );
}

const projectFilterOptions = ["All", "AI & ML", "Data Science", "Full-Stack & Systems"] as const;

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
  columns = "xl:grid-cols-2",
  showcase = false,
}: {
  items: ProjectSummary[];
  columns?: string;
  showcase?: boolean;
}) {
  return (
    <div className={`grid gap-5 ${columns}`}>
      {items.map((project, index) => (
        <article
          key={project.slug}
          className={showcase ? "project-showcase-card reveal" : "project-card reveal"}
          style={{ animationDelay: `${index * 80}ms` }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
              <div className="mt-3 text-base font-semibold text-[var(--theme-secondary)]">{project.category}</div>
              <div className="mt-2 text-sm leading-7 text-[var(--muted)]">{project.context}</div>
            </div>
            {project.href ? (
              <a className="project-chip-button" href={project.href} rel="noreferrer" target="_blank">
                GitHub
              </a>
            ) : (
              <AppLink className="project-chip-button" to={`/projects/${project.slug}`}>
                Details
              </AppLink>
            )}
          </div>
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

function HomeView() {
  const featuredProjects = projects.filter((item) => homepageProjectSlugs.includes(item.slug));

  return (
    <div className="space-y-20">
      <section className="space-y-6">
        <div className="reveal">
          <div className="section-kicker">Core stack</div>
          <h2 className="section-title">Tools I use to build backend, data, and product systems.</h2>
          <p className="section-copy">
            This landing page is intentionally shaped more like a strong personal product page: quick positioning, clear
            technical coverage, outcome-driven project highlights, and direct routes into deeper detail.
          </p>
        </div>
        <div className="skills-cloud reveal" style={{ animationDelay: "120ms" }}>
          {requestedStack.map((item, index) => (
            <span
              key={item}
              className={index % 4 === 0 ? "stack-pill stack-pill-emphasis" : "stack-pill"}
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="reveal">
          <div className="section-kicker">Impact snapshot</div>
          <h2 className="section-title">Project outcomes with measurable signal.</h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {homepageImpactMetrics.map((item, index) => (
            <article
              key={item.label}
              className="impact-card reveal"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="impact-value">{item.value}</div>
              <div className="mt-3 text-lg font-semibold text-white">{item.label}</div>
              <p className="mt-4 text-sm leading-7 text-[var(--soft)]">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="reveal">
          <div className="section-kicker">Selected work</div>
          <h2 className="section-title">Six projects I would lead with in an interview conversation.</h2>
        </div>
        <ProjectCards columns="xl:grid-cols-3" items={featuredProjects} />
      </section>

      <section className="space-y-6">
        <div className="reveal">
          <div className="section-kicker">What I focus on</div>
          <h2 className="section-title">Three capability areas that organize the rest of the portfolio.</h2>
        </div>
        <div className="grid gap-5 xl:grid-cols-3">
          {capabilitySections.map((section, index) => (
            <article
              key={section.title}
              className="spotlight-panel reveal"
              style={{ animationDelay: `${index * 90}ms` }}
            >
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

      <section className="space-y-6">
        <div className="reveal">
          <div className="section-kicker">Portfolio routes</div>
          <h2 className="section-title">A strong landing page on top of modular pages underneath.</h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {moduleConfigs.map((item, index) => (
            <LinkButton key={item.id} className="module-card reveal" to={item.path}>
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

function ExperienceView() {
  const relatedProjects = projects.filter((item) =>
    moduleConfigs.find((module) => module.id === "experience")?.featuredProjectSlugs.includes(item.slug),
  );

  return (
    <div className="space-y-10">
      <section className="reveal">
        <div className="section-kicker">Work experience</div>
        <h2 className="section-title">Three roles across backend systems, ETL workflows, and data operations.</h2>
        <p className="section-copy">
          These experiences shaped how I debug production issues, think about reliability, and connect software decisions
          to business outcomes.
        </p>
      </section>

      <section className="space-y-5">
        {experienceEntries.map((item, index) => (
          <article
            key={`${item.company}-${item.role}`}
            className="timeline-card reveal"
            style={{ animationDelay: `${index * 90}ms` }}
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
      </section>

      <section className="space-y-6">
        <div className="reveal">
          <div className="section-kicker">Related projects</div>
          <h2 className="section-title">Projects that reinforce the same engineering habits.</h2>
        </div>
        <ProjectCards items={relatedProjects} />
      </section>
    </div>
  );
}

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
          Explore my latest work and contributions across full-stack systems, data engineering, and applied machine
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
          <div className="section-kicker">Keep exploring</div>
          <p className="section-copy">
            Every project has its own route so the portfolio feels structured and easy to scan during interviews.
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

function SkillsView() {
  return (
    <div className="space-y-8">
      <div className="reveal">
        <div className="section-kicker">Skills</div>
        <h2 className="section-title">Skills grouped by how I use them in real projects.</h2>
        <p className="section-copy">
          Instead of a long keyword dump, the skills route organizes tools by the work they support: product
          development, APIs, data systems, cloud workflows, and engineering discipline.
        </p>
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        {skillsGroups.map((group, index) => (
          <article
            key={group.title}
            className="spotlight-panel reveal"
            style={{ animationDelay: `${index * 80}ms` }}
          >
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
    </div>
  );
}

function EducationView() {
  return (
    <div className="space-y-10">
      <section className="reveal">
        <div className="section-kicker">Education</div>
        <h2 className="section-title">Academic grounding for software, data, and systems work.</h2>
        <p className="section-copy">
          The education route keeps the academic context separate from projects and work experience so recruiters and
          hiring managers can scan it quickly.
        </p>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        {educationEntries.map((item, index) => (
          <article
            key={`${item.school}-${item.degree}`}
            className="education-card reveal"
            style={{ animationDelay: `${index * 100}ms` }}
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
      </section>

      <section className="grid gap-5 xl:grid-cols-3">
        {[
          "Graduate study in databases, machine learning, statistics, and data analysis.",
          "Undergraduate foundation in systems programming, DBMS, software engineering, and web programming.",
          "Academic work that supports both product implementation and data-oriented roles.",
        ].map((point, index) => (
          <article
            key={point}
            className="spotlight-panel reveal"
            style={{ animationDelay: `${index * 90}ms` }}
          >
            <div className="section-kicker">Academic signal</div>
            <p className="mt-5 text-sm leading-8 text-[var(--soft)]">{point}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

function ContactView() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent(`Portfolio inquiry from ${name || "a visitor"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`,
    );

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

  return (
    <div className="space-y-8">
      <div className="reveal">
        <div className="section-kicker">Contact</div>
        <h2 className="section-title">Reach out with a simple form and direct contact options.</h2>
        <p className="section-copy">
          Fill in the form below and it will open a ready-to-send email. You can also use the direct links for email,
          GitHub, LinkedIn, and phone.
        </p>
      </div>

      <section className="grid gap-6 xl:grid-cols-[0.78fr_1.22fr]">
        <article className="spotlight-panel reveal">
          <div className="section-kicker">Direct contact</div>
          <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--soft)]">
            <div>
              <div className="text-xs font-semibold tracking-[0.22em] text-[var(--muted)] uppercase">Email</div>
              <a className="text-white" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            </div>
            <div>
              <div className="text-xs font-semibold tracking-[0.22em] text-[var(--muted)] uppercase">Phone</div>
              <a className="text-white" href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`}>
                {profile.phone}
              </a>
            </div>
            <div>
              <div className="text-xs font-semibold tracking-[0.22em] text-[var(--muted)] uppercase">Location</div>
              <div className="text-white">{profile.location}</div>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="button button-secondary" href={profile.github} rel="noreferrer" target="_blank">
              GitHub
            </a>
            <a className="button button-primary" href={profile.linkedin} rel="noreferrer" target="_blank">
              LinkedIn
            </a>
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
                placeholder="Your name"
                type="text"
                value={name}
              />
            </label>
            <label className="contact-field">
              <span>Email</span>
              <input
                className="form-field"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                type="email"
                value={email}
              />
            </label>
            <label className="contact-field">
              <span>Message</span>
              <textarea
                className="form-field form-textarea"
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Tell me about the role, project, or conversation you want to have."
                rows={7}
                value={message}
              />
            </label>
            {error ? <div className="text-sm text-red-300">{error}</div> : null}
            <div className="flex flex-wrap gap-3">
              <button className="button button-primary" type="submit">
                Open email draft
              </button>
              <a className="button button-secondary" href={`mailto:${profile.email}`}>
                Send direct email
              </a>
            </div>
            <div className="text-sm text-[var(--muted)]">
              The form opens your default mail app with the message prefilled.
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

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[rgba(5,8,20,0.72)] backdrop-blur-2xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <ProfileMark imageHref={profilePhotoHref} scrollOffset={scrollOffset} />
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
              {route.kind === "home" ? profile.shortSummary : profile.summary}
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--muted)] sm:text-base">
              {profile.availability}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton className="button button-primary" to="/contact">
                Let&apos;s connect
              </LinkButton>
              <LinkButton className="button button-secondary" to="/projects">
                Explore work
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

          {route.kind === "home" ? (
            <HeroPortrait imageHref={profilePhotoHref} scrollOffset={scrollOffset} />
          ) : (
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
          )}
        </section>

        {route.kind === "home" ? <HomeView /> : null}
        {route.kind === "experience" ? <ExperienceView /> : null}
        {route.kind === "projects" ? <ProjectsView /> : null}
        {route.kind === "project-detail" ? <ProjectDetailView slug={route.slug} /> : null}
        {route.kind === "skills" ? <SkillsView /> : null}
        {route.kind === "education" ? <EducationView /> : null}
        {route.kind === "contact" ? <ContactView /> : null}

        <section className="closing-panel reveal">
          <div>
            <div className="section-kicker">Next step</div>
            <h2 className="section-title">If the work fits, reach out directly.</h2>
            <p className="section-copy">
              This portfolio is structured to make hiring conversations easier: quick landing summary, separate work and
              project modules, grouped skills, academic context, and a direct contact route.
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
