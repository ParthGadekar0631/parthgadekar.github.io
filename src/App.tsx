import { CSSProperties, FormEvent, useEffect, useMemo, useState } from "react";
import {
  chatKnowledge,
  chatPrompts,
  education,
  experience,
  heroMetrics,
  modules,
  profile,
  projects,
  requestedStack,
} from "./content";

type ChatMessage = {
  role: "assistant" | "user";
  text: string;
};

const initialMessages: ChatMessage[] = [
  {
    role: "assistant",
    text:
      "Ask me about Parth's background, projects, or how this portfolio could evolve into a real AI product. This version runs fully on the front end so it stays GitHub Pages compatible.",
  },
];

function resolveAnswer(input: string, moduleLabel: string) {
  const normalized = input.toLowerCase();
  const directHit = chatKnowledge.find((entry) =>
    entry.match.some((keyword) => normalized.includes(keyword)),
  );

  if (directHit) {
    return directHit.answer;
  }

  return `You are currently in the ${moduleLabel} module. Try asking about systems work, data pipelines, the F1 telemetry project, AI portfolio upgrades, or target roles.`;
}

function App() {
  const [activeModuleId, setActiveModuleId] = useState(modules[0].id);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const activeModule = useMemo(
    () => modules.find((module) => module.id === activeModuleId) ?? modules[0],
    [activeModuleId],
  );

  const activeProjects = useMemo(
    () => projects.filter((project) => activeModule.projectIds.includes(project.id)),
    [activeModule],
  );

  const resumeHref = `${import.meta.env.BASE_URL}${profile.resume}`;

  useEffect(() => {
    setTypedText("");
    setPhraseIndex(0);
    setIsDeleting(false);
  }, [activeModule.id]);

  useEffect(() => {
    const words = activeModule.heroWords;
    const currentWord = words[phraseIndex % words.length];
    let delay = isDeleting ? 45 : 80;

    if (!isDeleting && typedText === currentWord) {
      delay = 1200;
    }

    if (isDeleting && typedText.length === 0) {
      delay = 250;
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
  }, [activeModule.heroWords, phraseIndex, typedText, isDeleting]);

  const themeStyle = {
    "--theme-accent": activeModule.theme.accent,
    "--theme-accent-soft": activeModule.theme.accentSoft,
    "--theme-accent-glow": activeModule.theme.accentGlow,
    "--theme-secondary": activeModule.theme.secondary,
    "--theme-panel": activeModule.theme.panel,
  } as CSSProperties;

  const sendMessage = (text: string) => {
    const trimmed = text.trim();

    if (!trimmed || isTyping) {
      return;
    }

    setMessages((current) => [...current, { role: "user", text: trimmed }]);
    setDraft("");
    setIsTyping(true);

    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: resolveAnswer(trimmed, activeModule.label),
        },
      ]);
      setIsTyping(false);
    }, 650);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(draft);
  };

  return (
    <div className="portfolio-shell min-h-screen text-[var(--text)]" style={themeStyle}>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="grid-overlay" />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[rgba(5,8,20,0.72)] backdrop-blur-2xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a className="text-sm font-semibold tracking-[0.34em] text-[var(--muted)] uppercase" href="#top">
            Parth Gadekar
          </a>
          <nav className="hidden items-center gap-6 text-sm text-[var(--muted)] lg:flex">
            <a href="#modules">Modules</a>
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#copilot">Copilot</a>
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

      <main id="top" className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-5 pb-16 pt-10 sm:px-8 sm:pt-14">
        <section className="grid gap-8 xl:grid-cols-[1.08fr_0.92fr]">
          <div className="hero-panel reveal">
            <div className="hero-shine" />
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium tracking-[0.24em] text-[var(--muted)] uppercase">
              Dynamic portfolio system
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="eyebrow-tag">{activeModule.kicker}</span>
              <span className="eyebrow-tag">{activeModule.label}</span>
            </div>

            <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.02] text-white sm:text-5xl lg:text-7xl">
              Building
              <span className="typed-wrap">
                <span className="typed-text">{typedText}</span>
                <span className="typed-cursor" />
              </span>
              that stay useful under pressure.
            </h1>

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
              <a className="button button-secondary" href={resumeHref} target="_blank" rel="noreferrer">
                Download resume
              </a>
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
                  Active module
                </div>
                <h2 className="mt-3 text-2xl font-semibold text-white">{activeModule.label}</h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--soft)]">{activeModule.intro}</p>
              </div>
              <div className="orbital-core">
                <span className="orbital-dot orbital-dot-one" />
                <span className="orbital-dot orbital-dot-two" />
                <span className="orbital-dot orbital-dot-three" />
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {heroMetrics.map((metric) => (
                <article key={metric.label} className="metric-card">
                  <div className="text-3xl font-semibold text-white">{metric.value}</div>
                  <div className="mt-2 text-sm font-medium text-[var(--text)]">{metric.label}</div>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{metric.detail}</p>
                </article>
              ))}
            </div>
          </aside>
        </section>

        <section id="modules" className="space-y-6">
          <div className="reveal">
            <div className="section-kicker">Module rail</div>
            <h2 className="section-title">Not a single flat page. A portfolio system with dynamic modes.</h2>
            <p className="section-copy">
              Each module changes the visual palette, the typed hero narrative, the highlighted projects, and the
              engineering story being told.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-4">
            {modules.map((module) => {
              const isActive = module.id === activeModule.id;

              return (
                <button
                  key={module.id}
                  className={`module-card reveal ${isActive ? "module-card-active" : ""}`}
                  onClick={() => setActiveModuleId(module.id)}
                  type="button"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-semibold tracking-[0.22em] text-[var(--muted)] uppercase">
                      {module.index}
                    </span>
                    <span className="module-status">{isActive ? "Live" : "Switch"}</span>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-white">{module.label}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--soft)]">{module.intro}</p>
                </button>
              );
            })}
          </div>
        </section>

        <section className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="spotlight-panel reveal">
            <div className="section-kicker">Module spotlight</div>
            <h2 className="section-title">{activeModule.title}</h2>
            <p className="section-copy">{activeModule.detail}</p>

            <div className="mt-8 space-y-4">
              {activeModule.bullets.map((bullet) => (
                <div key={bullet} className="signal-row">
                  <span className="signal-dot" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {activeModule.chips.map((chip) => (
                <span key={chip} className="stack-pill">
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            {activeModule.metrics.map((metric, index) => (
              <article
                key={metric.label}
                className="focus-metric reveal"
                style={{ animationDelay: `${index * 70 + 120}ms` }}
              >
                <div className="text-4xl font-semibold text-white">{metric.value}</div>
                <div className="mt-2 text-base font-medium text-[var(--text)]">{metric.label}</div>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{metric.detail}</p>
              </article>
            ))}

            <article className="focus-note reveal" style={{ animationDelay: "280ms" }}>
              <div className="section-kicker">Why this matters</div>
              <p className="mt-4 text-sm leading-7 text-[var(--soft)]">
                The reference portfolio feels strong because it is narrative-rich and interactive. This version now
                does the same by changing emphasis, tone, and motion as the user explores different parts of your
                engineering profile.
              </p>
            </article>
          </div>
        </section>

        <section id="projects" className="space-y-6">
          <div className="reveal">
            <div className="section-kicker">Projects</div>
            <h2 className="section-title">Projects that shift based on the active module.</h2>
          </div>

          <div className="grid gap-5 xl:grid-cols-3">
            {activeProjects.map((project, index) => (
              <article
                key={project.id}
                className="project-card reveal"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-semibold tracking-[0.22em] text-[var(--muted)] uppercase">
                      {project.timeline}
                    </div>
                    <h3 className="mt-3 text-2xl font-semibold text-white">{project.title}</h3>
                  </div>
                  <span className="module-status">{project.status}</span>
                </div>

                <p className="mt-5 text-sm leading-7 text-[var(--soft)]">{project.summary}</p>

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

                <div className="mt-8">
                  {project.href ? (
                    <a className="button button-secondary" href={project.href} target="_blank" rel="noreferrer">
                      View repo
                    </a>
                  ) : (
                    <span className="text-sm text-[var(--muted)]">Private or in-progress build.</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="grid gap-8 xl:grid-cols-[0.8fr_1.2fr]">
          <div className="reveal">
            <div className="section-kicker">Experience</div>
            <h2 className="section-title">Where the operational habits came from.</h2>
            <p className="section-copy">
              The common thread across internships is backend ownership, data movement, issue diagnosis, and using
              tooling to reduce failure cost before it becomes user pain.
            </p>
          </div>

          <div className="timeline-shell">
            {experience.map((item, index) => (
              <article
                key={item.company}
                className="timeline-card reveal"
                style={{ animationDelay: `${index * 110}ms` }}
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
                <div className="mt-5 space-y-3">
                  {item.points.map((point) => (
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

        <section className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="reveal">
            <div className="section-kicker">Education</div>
            <h2 className="section-title">Grounded in CS fundamentals, then shaped by practical builds.</h2>
          </div>

          <div className="grid gap-4">
            {education.map((item, index) => (
              <article
                key={item.school}
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
          </div>
        </section>

        <section id="copilot" className="grid gap-8 xl:grid-cols-[0.88fr_1.12fr]">
          <div className="reveal">
            <div className="section-kicker">Portfolio copilot</div>
            <h2 className="section-title">Yes, your portfolio already has a chatbot surface.</h2>
            <p className="section-copy">
              Right now it is a front-end copilot so the site stays fast and free on GitHub Pages. The structure is
              intentional though: this is the module most ready for a future Claude, observability, and Langfuse
              upgrade.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                className="stack-pill interactive-pill"
                onClick={() => sendMessage(activeModule.askPrompt)}
                type="button"
              >
                Ask about {activeModule.label}
              </button>
              {chatPrompts.map((prompt) => (
                <button
                  key={prompt.label}
                  className="stack-pill interactive-pill"
                  onClick={() => sendMessage(prompt.prompt)}
                  type="button"
                >
                  {prompt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="copilot-shell reveal" style={{ animationDelay: "140ms" }}>
            <div className="copilot-header">
              <div>
                <div className="text-sm font-semibold text-white">Ask Parth</div>
                <div className="text-xs text-[var(--muted)]">Static copilot now. Real AI upgrade path next.</div>
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
              {isTyping ? (
                <div className="copilot-message assistant">Thinking through the best signal to surface...</div>
              ) : null}
            </div>

            <form className="copilot-form" onSubmit={handleSubmit}>
              <input
                className="copilot-input"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Ask about projects, AI upgrades, roles, or systems work"
              />
              <button className="button button-primary" type="submit">
                Send
              </button>
            </form>
          </div>
        </section>

        <section className="closing-panel reveal">
          <div>
            <div className="section-kicker">Next step</div>
            <h2 className="section-title">If you want the site to feel even closer to santifer.io, the next upgrade is backend AI.</h2>
            <p className="section-copy">
              The current redesign already gives you modular storytelling, dynamic accents, animation, and a stronger
              product feel. The next major jump is a real chatbot with traces, evals, and deployment off GitHub Pages.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a className="button button-primary" href={`mailto:${profile.email}`}>
              Email Parth
            </a>
            <a className="button button-secondary" href={profile.github} target="_blank" rel="noreferrer">
              GitHub profile
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
