# Parth Gadekar Portfolio

This repository contains my personal portfolio website. It is built on top of a Next.js App Router project and customized to present my work experience, education, projects, skills, and contact information in a polished interactive format.

The portfolio is branded around:
- `Parth Gadekar` as the site identity
- `RisksRay` as the chatbot assistant

## What The Site Includes

- `About`
  My background, academic journey, and visual introduction.
- `Projects`
  Selected software, data, backend, analytics, and systems projects with automatic GitHub sync.
- `Credentials`
  Education, experience highlights, and professional signals.
- `Contact`
  Direct contact form and social/profile links.
- `RisksRay`
  A chatbot-style assistant that answers questions about my profile and work.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- next-themes
- react-three-fiber / drei
- Framer Motion

## Main Content Sources

The site content is primarily driven from:

- [data/projects.tsx](C:\Users\parth\Desktop\Projects%20USA\parthgadekar.github.io\data\projects.tsx)
- [data/project-overrides.ts](C:\Users\parth\Desktop\Projects%20USA\parthgadekar.github.io\data\project-overrides.ts)
- [data/project-blocklist.ts](C:\Users\parth\Desktop\Projects%20USA\parthgadekar.github.io\data\project-blocklist.ts)
- [data/workexperience.tsx](C:\Users\parth\Desktop\Projects%20USA\parthgadekar.github.io\data\workexperience.tsx)
- [data/education.tsx](C:\Users\parth\Desktop\Projects%20USA\parthgadekar.github.io\data\education.tsx)
- [data/details.tsx](C:\Users\parth\Desktop\Projects%20USA\parthgadekar.github.io\data\details.tsx)
- [data/impact.tsx](C:\Users\parth\Desktop\Projects%20USA\parthgadekar.github.io\data\impact.tsx)
- [data/skillset.tsx](C:\Users\parth\Desktop\Projects%20USA\parthgadekar.github.io\data\skillset.tsx)

## Project Structure

```text
app/
  about/                  About page sections
  api/                    Contact + chatbot endpoints
  components/             Reusable UI and 3D components
  contact/                Contact page
  context/                App state providers
  credentials/            Credentials page
  home/                   Landing page sections
  projects/               Projects page

data/
  certificates.tsx
  details.tsx
  education.tsx
  images.ts
  impact.tsx
  project-blocklist.ts
  project-overrides.ts
  projects.tsx
  skillset.tsx
  tile-highlights.tsx
  workexperience.tsx

lib/
  project-sync.ts        Server-side GitHub repo sync and merge logic

public/
  assets/                 Education and visual assets
  icons/                  Brand and badge icons
  projects-previews/      Project preview artwork
  parth-profile.jpg       Profile image
```

## Local Development

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

## Project Sync

The `Projects` page now merges:

- curated project content from [data/projects.tsx](C:\Users\parth\Desktop\Projects%20USA\parthgadekar.github.io\data\projects.tsx)
- server-side GitHub repository data from `ParthGadekar0631`

The sync behavior is:

- existing curated entries keep their richer copy and metadata
- new public GitHub repos appear automatically without manual code edits
- repos are sorted by `featured`, then `priority`, then most recently updated
- if GitHub is unavailable, the page falls back to curated project data instead of crashing

Use these files to control the sync:

- [data/project-overrides.ts](C:\Users\parth\Desktop\Projects%20USA\parthgadekar.github.io\data\project-overrides.ts)
  Add per-repo overrides for title, description, category, section, tech stack, image, featured flag, and priority.
- [data/project-blocklist.ts](C:\Users\parth\Desktop\Projects%20USA\parthgadekar.github.io\data\project-blocklist.ts)
  Add repo names you want hidden from the Projects page.

## Environment Setup

Copy `.env.example` to `.env.local` and fill in only the values you need:

```bash
cp .env.example .env.local
```

Relevant variables:

- `GITHUB_TOKEN`
  Optional. Used only on the server for the Projects sync to increase GitHub API rate limits.
- `OPENAI_API_KEY`
  Required for the `Risksray` chatbot.
- `OPENAI_MODEL`
  Optional chatbot model override. Defaults to `gpt-4o-mini`.
- `GMAIL_APP_PASSWORD`
  Required if you want the contact form email sender to work.

Build for production:

```bash
npm run build
```

Lint the project:

```bash
npm run lint
```

## Notes

- The portfolio content has been rewritten for my background and projects.
- The app structure remains close to the original portfolio architecture.
- The Projects page now auto-imports new public GitHub repos server-side.
- `npm run build` currently succeeds.
- `npm run lint` still reports some existing repo issues in legacy interactive/3D files that were not part of the content swap.

## Contact

- Email: `parthgadekar060202@gmail.com`
- GitHub: [ParthGadekar0631](https://github.com/ParthGadekar0631)
- LinkedIn: [parthgadekar622](https://www.linkedin.com/in/parthgadekar622/)
