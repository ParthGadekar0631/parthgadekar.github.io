"use client";

import LenisProvider from "../components/LenisProvider";
import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import workexperience from "@/data/workexperience";
import { certificates } from "@/data/certificates";
import { publications } from "@/data/publications";
import { Award, BriefcaseBusiness, ExternalLink, FileImage, FileText, Linkedin } from "lucide-react";

function formatMonth(date?: string | null) {
  if (!date) return null;
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
}

export default function Credentials() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  const stats = useMemo(
    () => [
      { label: "Internships", value: String(workexperience.length) },
      { label: "Publication", value: String(publications.length) },
      { label: "Certifications", value: String(certificates.length) },
    ],
    [],
  );

  if (!mounted) return null;

  return (
    <div className={`min-h-screen py-16 ${isDark ? "dark" : ""}`}>
      <LenisProvider />

      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute left-[8%] top-28 h-80 w-80 rounded-full bg-red-500/15 blur-3xl" />
        <div className="absolute right-[10%] top-[36%] h-[26rem] w-[26rem] rounded-full bg-amber-500/12 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-72 w-[34rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="mx-auto mt-12 max-w-7xl px-4">
        <header className="mb-12">
          <p className={`mb-3 text-sm uppercase tracking-[0.24em] ${isDark ? "text-white/55" : "text-gray-500"}`}>
            Profile Signals
          </p>
          <h1 className={`text-5xl font-bold tracking-[-0.03em] md:text-6xl ${isDark ? "text-white" : "text-gray-950"}`}>
            Credentials
          </h1>
          <p className={`mt-4 max-w-3xl text-lg ${isDark ? "text-white/72" : "text-gray-600"}`}>
            Internship experience, published research, and selected certifications that back up the engineering work shown
            across the portfolio.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className={`glass-container rounded-2xl p-5 ${isDark ? "dark" : ""}`}>
                <div className={`text-3xl font-semibold ${isDark ? "text-white" : "text-gray-950"}`}>{stat.value}</div>
                <div className={`mt-1 text-sm uppercase tracking-[0.18em] ${isDark ? "text-white/55" : "text-gray-500"}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </header>

        <section className="mb-16">
          <div className="mb-6 flex items-center gap-3">
            <BriefcaseBusiness className={`h-5 w-5 ${isDark ? "text-blue-300" : "text-blue-700"}`} />
            <h2 className={`text-3xl font-semibold tracking-[-0.02em] ${isDark ? "text-white" : "text-gray-950"}`}>
              Work Experience
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {workexperience.map((item) => (
              <article key={`${item.company}-${item.duration}`} className={`glass-container rounded-3xl p-6 ${isDark ? "dark" : ""}`}>
                <div className="mb-5 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                  <a href={item.photo} target="_blank" rel="noopener noreferrer" className="block">
                    <img src={item.photo} alt={`${item.company} internship certificate`} className="h-48 w-full object-cover object-top" />
                  </a>
                </div>

                <div className="mb-4 flex items-start gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-3 shadow-lg shadow-black/10">
                    <img src={item.logo} alt={`${item.company} logo`} className="h-full w-full object-contain" />
                  </div>

                  <div className="min-w-0">
                    <p className={`text-sm font-medium uppercase tracking-[0.18em] ${isDark ? "text-white/50" : "text-gray-500"}`}>
                      Internship
                    </p>
                    <h3 className={`mt-1 text-2xl font-semibold leading-tight ${isDark ? "text-white" : "text-gray-950"}`}>
                      {item.position}
                    </h3>
                    <p className={`mt-1 text-base ${isDark ? "text-white/78" : "text-gray-600"}`}>{item.company}</p>
                    <p className={`mt-2 text-sm ${isDark ? "text-white/58" : "text-gray-500"}`}>{item.duration}</p>
                  </div>
                </div>

                <p className={`mb-5 text-base leading-8 ${isDark ? "text-white/76" : "text-gray-700"}`}>{item.summary}</p>

                <ul className={`mb-5 space-y-3 text-sm leading-7 ${isDark ? "text-white/70" : "text-gray-600"}`}>
                  {item.responsibilities.map((responsibility) => (
                    <li key={responsibility} className="flex gap-3">
                      <span className={`mt-2 h-2 w-2 rounded-full ${isDark ? "bg-blue-300" : "bg-blue-600"}`} />
                      <span>{responsibility}</span>
                    </li>
                  ))}
                </ul>

                <div className="mb-5 flex flex-wrap gap-2">
                  {item.tech.map((tech) => (
                    <span
                      key={tech}
                      className={`rounded-full border px-3 py-1 text-xs font-medium ${
                        isDark
                          ? "border-blue-500/35 bg-blue-500/10 text-blue-200"
                          : "border-blue-200 bg-blue-50 text-blue-700"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={item.photo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                      isDark ? "bg-white/10 text-white hover:bg-white/16" : "bg-gray-950 text-white hover:bg-black"
                    }`}
                  >
                    <FileImage className="h-4 w-4" />
                    Photo
                  </a>
                  <a
                    href={item.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                      isDark ? "bg-white/10 text-white hover:bg-white/16" : "bg-gray-950 text-white hover:bg-black"
                    }`}
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                      isDark ? "bg-white/10 text-white hover:bg-white/16" : "bg-gray-950 text-white hover:bg-black"
                    }`}
                  >
                    <ExternalLink className="h-4 w-4" />
                    Company
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="mb-6 flex items-center gap-3">
            <FileText className={`h-5 w-5 ${isDark ? "text-violet-300" : "text-violet-700"}`} />
            <h2 className={`text-3xl font-semibold tracking-[-0.02em] ${isDark ? "text-white" : "text-gray-950"}`}>
              Published Research
            </h2>
          </div>

          {publications.map((publication) => (
            <article
              key={publication.id}
              className={`glass-container overflow-hidden rounded-3xl p-0 ${isDark ? "dark" : ""}`}
            >
              <div className="grid lg:grid-cols-[1.35fr_0.9fr]">
                <div className="p-8 md:p-10">
                  <p className={`text-sm uppercase tracking-[0.22em] ${isDark ? "text-white/50" : "text-gray-500"}`}>
                    Research Publication
                  </p>
                  <h3 className={`mt-3 text-3xl font-semibold leading-tight ${isDark ? "text-white" : "text-gray-950"}`}>
                    {publication.title}
                  </h3>
                  <p className={`mt-4 text-base leading-8 ${isDark ? "text-white/76" : "text-gray-700"}`}>{publication.summary}</p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {publication.focus.map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-full border px-3 py-1 text-xs font-medium ${
                          isDark
                            ? "border-violet-500/35 bg-violet-500/10 text-violet-200"
                            : "border-violet-200 bg-violet-50 text-violet-700"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    {publication.profileUrl ? (
                      <a
                        href={publication.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                          isDark ? "bg-white/10 text-white hover:bg-white/16" : "bg-gray-950 text-white hover:bg-black"
                        }`}
                      >
                        <Linkedin className="h-4 w-4" />
                        LinkedIn
                      </a>
                    ) : null}
                    {publication.projectUrl ? (
                      <a
                        href={publication.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                          isDark ? "bg-white/10 text-white hover:bg-white/16" : "bg-gray-950 text-white hover:bg-black"
                        }`}
                      >
                        <ExternalLink className="h-4 w-4" />
                        Related Project
                      </a>
                    ) : null}
                  </div>
                </div>

                <div className={`border-l p-8 md:p-10 ${isDark ? "border-white/10 bg-white/[0.03]" : "border-black/10 bg-black/[0.02]"}`}>
                  <div className="space-y-6">
                    <div>
                      <p className={`text-sm uppercase tracking-[0.18em] ${isDark ? "text-white/45" : "text-gray-500"}`}>Venue</p>
                      <p className={`mt-2 text-lg leading-8 ${isDark ? "text-white/82" : "text-gray-800"}`}>{publication.venue}</p>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
                      <div>
                        <p className={`text-sm uppercase tracking-[0.18em] ${isDark ? "text-white/45" : "text-gray-500"}`}>Published</p>
                        <p className={`mt-2 text-lg ${isDark ? "text-white/82" : "text-gray-800"}`}>{publication.date}</p>
                      </div>
                      {publication.pages ? (
                        <div>
                          <p className={`text-sm uppercase tracking-[0.18em] ${isDark ? "text-white/45" : "text-gray-500"}`}>Pages</p>
                          <p className={`mt-2 text-lg ${isDark ? "text-white/82" : "text-gray-800"}`}>{publication.pages}</p>
                        </div>
                      ) : null}
                      {publication.isbn ? (
                        <div>
                          <p className={`text-sm uppercase tracking-[0.18em] ${isDark ? "text-white/45" : "text-gray-500"}`}>ISBN</p>
                          <p className={`mt-2 break-words text-lg ${isDark ? "text-white/82" : "text-gray-800"}`}>{publication.isbn}</p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section>
          <div className="mb-6 flex items-center gap-3">
            <Award className={`h-5 w-5 ${isDark ? "text-orange-300" : "text-orange-700"}`} />
            <h2 className={`text-3xl font-semibold tracking-[-0.02em] ${isDark ? "text-white" : "text-gray-950"}`}>
              Certifications
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {certificates.map((certificate) => (
              <article key={certificate.id} className={`glass-container rounded-3xl p-6 ${isDark ? "dark" : ""}`}>
                <p className={`text-sm uppercase tracking-[0.18em] ${isDark ? "text-white/50" : "text-gray-500"}`}>
                  Certification
                </p>
                <h3 className={`mt-3 text-2xl font-semibold leading-tight ${isDark ? "text-white" : "text-gray-950"}`}>
                  {certificate.name}
                </h3>
                <p className={`mt-2 text-base ${isDark ? "text-white/75" : "text-gray-700"}`}>{certificate.issuer}</p>

                <div className={`mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm ${isDark ? "text-white/58" : "text-gray-500"}`}>
                  {certificate.issueDate ? <span>Issued {formatMonth(certificate.issueDate)}</span> : null}
                  {certificate.credentialId ? <span>ID {certificate.credentialId}</span> : null}
                </div>

                {certificate.summary ? (
                  <p className={`mt-5 text-base leading-8 ${isDark ? "text-white/76" : "text-gray-700"}`}>{certificate.summary}</p>
                ) : null}

                <div className="mt-5 flex flex-wrap gap-2">
                  {certificate.skills?.map((skill) => (
                    <span
                      key={skill}
                      className={`rounded-full border px-3 py-1 text-xs font-medium ${
                        isDark
                          ? "border-orange-500/35 bg-orange-500/10 text-orange-200"
                          : "border-orange-200 bg-orange-50 text-orange-700"
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-6">
                  {certificate.credentialUrl ? (
                    <a
                      href={certificate.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                        isDark ? "bg-white/10 text-white hover:bg-white/16" : "bg-gray-950 text-white hover:bg-black"
                      }`}
                    >
                      <Linkedin className="h-4 w-4" />
                      View on LinkedIn
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
