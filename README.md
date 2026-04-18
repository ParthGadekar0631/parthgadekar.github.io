# Parth Gadekar Portfolio

This repository contains my personal portfolio website. It is built on top of a Next.js App Router project and customized to present my work experience, education, projects, skills, and contact information in a polished interactive format.

The portfolio is branded around:
- `Parth Gadekar` as the site identity
- `RisksRay` as the chatbot assistant

## What The Site Includes

- `About`
  My background, academic journey, and visual introduction.
- `Projects`
  Selected software, data, backend, analytics, and systems projects.
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
  projects.tsx
  skillset.tsx
  tile-highlights.tsx
  workexperience.tsx

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
- `npm run build` currently succeeds.
- `npm run lint` still reports some existing repo issues in legacy interactive/3D files that were not part of the content swap.

## Contact

- Email: `parthgadekar060202@gmail.com`
- GitHub: [ParthGadekar0631](https://github.com/ParthGadekar0631)
- LinkedIn: [parthgadekar622](https://www.linkedin.com/in/parthgadekar622/)
