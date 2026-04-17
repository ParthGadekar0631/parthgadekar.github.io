import { FormEvent, useMemo, useState } from "react";
import {
  chatKnowledge,
  chatPrompts,
  education,
  experience,
  focusCards,
  heroMetrics,
  profile,
  projects,
  requestedStack,
  strengths,
} from "./content";

type ChatMessage = {
  role: "assistant" | "user";
  text: string;
};

const initialMessages: ChatMessage[] = [
  {
    role: "assistant",
    text:
      "Ask me about Parth's background, projects, and the kind of systems he wants to build. This version runs fully on the front end so it can deploy cleanly to GitHub Pages.",
  },
];

function resolveAnswer(input: string) {
  const normalized = input.toLowerCase();
  const directHit = chatKnowledge.find((entry) =>
    entry.match.some((keyword) => normalized.includes(keyword)),
  );

  if (directHit) {
    return directHit.answer;
  }

  return "I do not use a live model in this GitHub Pages build yet, but I can still route you to the right topics. Try asking about Parth's engineering profile, the F1 telemetry system, data engineering, observability, or target roles.";
}

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const visibleStack = useMemo(() => requestedStack, []);
  const resumeHref = `${import.meta.env.BASE_URL}${profile.resume}`;

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
          text: resolveAnswer(trimmed),
        },
      ]);
      setIsTyping(false);
    }, 700);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(draft);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="aurora aurora-one" />
      <div className="aurora aurora-two" />

      <header className="sticky top-0 z-30 border-b border-white/10 bg-[rgba(7,10,22,0.7)] backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a className="text-sm font-semibold tracking-[0.3em] text-[var(--muted)] uppercase" href="#top">
            Parth Gadekar
          </a>
          <nav className="hidden gap-6 text-sm text-[var(--muted)] md:flex">
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#education">Education</a>
            <a href="#chat">Chat</a>
          </nav>
          <a className="button button-secondary" href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </header>

      <main id="top" className="mx-auto flex w-full max-w-7xl flex-col gap-20 px-5 pb-16 pt-10 sm:px-8 sm:pt-14">
        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="panel relative overflow-hidden">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-medium tracking-[0.2em] text-cyan-200 uppercase">
              Software Engineer · Systems · Data · AI-native product thinking
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-7xl">
              Building reliable software from telemetry dashboards to data pipelines.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--muted)] sm:text-lg">
              {profile.summary}
            </p>
            <p className="mt-6 max-w-3xl text-sm leading-7 text-[var(--soft)] sm:text-base">
              {profile.availability}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a className="button button-primary" href={resumeHref} target="_blank" rel="noreferrer">
                Download resume
              </a>
              <a className="button button-secondary" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {visibleStack.map((item) => (
                <span key={item} className="pill">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <aside className="panel flex flex-col justify-between gap-8">
            <div>
              <div className="text-xs font-medium tracking-[0.25em] text-[var(--muted)] uppercase">
                Current Snapshot
              </div>
              <div className="mt-4 rounded-[28px] border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-semibold text-white">{profile.name}</div>
                    <div className="mt-1 text-sm text-[var(--muted)]">Hoboken, NJ</div>
                  </div>
                  <div className="avatar">PG</div>
                </div>
                <p className="mt-5 text-sm leading-7 text-[var(--soft)]">
                  Focused on shipping strong fundamentals now and leaving room for a future Claude + Langfuse +
                  observability layer when this portfolio grows beyond static hosting.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {heroMetrics.map((metric) => (
                <article key={metric.label} className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                  <div className="text-3xl font-semibold text-white">{metric.value}</div>
                  <div className="mt-2 text-sm font-medium text-[var(--text)]">{metric.label}</div>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{metric.detail}</p>
                </article>
              ))}
            </div>
          </aside>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          {focusCards.map((card) => (
            <article key={card.title} className="panel">
              <div className="text-xs font-medium tracking-[0.24em] text-cyan-200 uppercase">{card.eyebrow}</div>
              <h2 className="mt-4 text-2xl font-semibold text-white">{card.title}</h2>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{card.copy}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="panel">
            <div className="section-label">Why This Site Exists</div>
            <h2 className="section-heading">
              Inspired by the reference portfolio, but rebuilt around your own engineering signal.
            </h2>
            <p className="section-copy">
              The goal here is not to imitate someone else's copy. It is to create the same level of intentionality:
              strong first impression, visible proof-of-work, an AI-flavored interaction layer, and a layout that feels
              built for an engineer instead of a generic template.
            </p>

            <div className="mt-8 grid gap-4">
              {strengths.map((item) => (
                <div key={item} className="rounded-[22px] border border-white/10 bg-[rgba(255,255,255,0.03)] px-4 py-4 text-sm text-[var(--soft)]">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="panel">
            <div className="section-label">Impact Signals</div>
            <h2 className="section-heading">Numbers that repeat across your resumes.</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <article className="impact-card">
                <span className="impact-number">~40%</span>
                <p>Pipeline reliability and ingestion robustness improvements in data engineering work.</p>
              </article>
              <article className="impact-card">
                <span className="impact-number">~35%</span>
                <p>Performance and latency gains across telemetry, ETL, and computer vision workflows.</p>
              </article>
              <article className="impact-card">
                <span className="impact-number">~30%</span>
                <p>Better debugging, stability, and release reliability through logging, monitoring, and CI/CD.</p>
              </article>
              <article className="impact-card">
                <span className="impact-number">95%</span>
                <p>Gesture tracking accuracy reached in the Air Canvas real-time computer vision project.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="projects" className="space-y-6">
          <div>
            <div className="section-label">Selected Projects</div>
            <h2 className="section-heading">Work that best represents where you are strongest.</h2>
          </div>

          <div className="grid gap-5 xl:grid-cols-2">
            {projects.map((project) => (
              <article key={project.title} className="project-card">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-medium tracking-[0.24em] text-cyan-200 uppercase">
                      {project.timeline}
                    </div>
                    <h3 className="mt-3 text-2xl font-semibold text-white">{project.title}</h3>
                  </div>
                  <span className="status-badge">{project.status}</span>
                </div>

                <p className="mt-5 text-sm leading-7 text-[var(--muted)]">{project.summary}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span key={item} className="stack-chip">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-6 space-y-3">
                  {project.impact.map((point) => (
                    <div key={point} className="flex gap-3 text-sm leading-7 text-[var(--soft)]">
                      <span className="mt-2 h-2 w-2 rounded-full bg-cyan-300" />
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
                    <span className="text-sm text-[var(--muted)]">Detailed repository link not public yet.</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="panel">
            <div className="section-label">Experience</div>
            <h2 className="section-heading">Internships that gave you real operational instincts.</h2>
            <p className="section-copy">
              The recurring theme in both roles is not just coding. It is diagnosing system behavior, structuring
              data flow, making pipelines safer to operate, and using tooling to reduce failure cost.
            </p>
          </div>

          <div className="space-y-5">
            {experience.map((item) => (
              <article key={item.company} className="panel">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="text-xl font-semibold text-white">{item.role}</div>
                    <div className="mt-2 text-sm text-cyan-200">{item.company}</div>
                  </div>
                  <div className="text-right text-sm text-[var(--muted)]">
                    <div>{item.timeline}</div>
                    <div className="mt-1">{item.location}</div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {item.points.map((point) => (
                    <div key={point} className="flex gap-3 text-sm leading-7 text-[var(--soft)]">
                      <span className="mt-2 h-2 w-2 rounded-full bg-[var(--accent)]" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="education" className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="panel">
            <div className="section-label">Education</div>
            <h2 className="section-heading">Grounded in CS fundamentals, now applied through product-facing work.</h2>
          </div>

          <div className="grid gap-5">
            {education.map((item) => (
              <article key={item.school} className="panel">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{item.degree}</h3>
                    <div className="mt-2 text-sm text-cyan-200">{item.school}</div>
                  </div>
                  <div className="text-sm text-[var(--muted)]">{item.timeline}</div>
                </div>
                <p className="mt-5 text-sm leading-7 text-[var(--soft)]">{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="chat" className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="panel">
            <div className="section-label">Portfolio Copilot</div>
            <h2 className="section-heading">A chatbot-style layer, kept static so GitHub Pages can host it free.</h2>
            <p className="section-copy">
              The reference portfolio uses a real AI backend. This version keeps the same interaction surface, but the
              answers come from a local knowledge layer so the site works immediately on GitHub Pages. The UI is
              intentionally ready for a later Claude, Vercel, observability, and Langfuse expansion.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {chatPrompts.map((item) => (
                <button key={item.label} className="pill-button" onClick={() => sendMessage(item.prompt)} type="button">
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="chat-shell">
            <div className="chat-header">
              <div>
                <div className="text-sm font-semibold text-white">Ask Parth</div>
                <div className="text-xs text-[var(--muted)]">Static copilot · GitHub Pages compatible</div>
              </div>
              <div className="status-dot" />
            </div>

            <div className="chat-body">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={message.role === "assistant" ? "message assistant" : "message user"}
                >
                  {message.text}
                </div>
              ))}
              {isTyping ? <div className="message assistant">Thinking through Parth&apos;s portfolio...</div> : null}
            </div>

            <form className="chat-form" onSubmit={handleSubmit}>
              <input
                className="chat-input"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Ask about projects, roles, or technical strengths"
              />
              <button className="button button-primary" type="submit">
                Send
              </button>
            </form>
          </div>
        </section>

        <section className="panel flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="section-label">Contact</div>
            <h2 className="section-heading max-w-2xl">If the role needs ownership, technical depth, and clear execution, let&apos;s talk.</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <a className="button button-primary" href={`mailto:${profile.email}`}>
              Email Parth
            </a>
            <a className="button button-secondary" href={profile.github} target="_blank" rel="noreferrer">
              GitHub Profile
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
