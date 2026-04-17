# Parth Gadekar Portfolio

Personal portfolio for Parth Gadekar, rebuilt as a stronger landing page with modular routes underneath.

The current direction is:

- homepage inspired by a modern personal product-style portfolio
- separate routes for experience, projects, skills, education, and contact
- GitHub Pages deployment through GitHub Actions
- static hosting friendly architecture

## Stack

- React
- TypeScript
- Tailwind CSS
- Vite
- GitHub Pages
- GitHub Actions

## Routes

- `/` Home
- `/experience`
- `/projects`
- `/projects/:slug`
- `/skills`
- `/education`
- `/contact`

## Project Structure

```text
src/
  App.tsx              Route-based application shell
  types.ts             Shared content and UI types
  content/
    site.ts            Portfolio profile, routes, projects, experience, education, skills
    knowledge.ts       Curated content kept for future chatbot/backend work
  lib/
    api.ts             Browser API helpers
    integrity.ts       Runtime content validation
    routes.ts          Route parsing, base-path handling, and navigation helpers
  index.css            Motion system, landing page visuals, and shared UI styles
  main.tsx             React entry point

public/
  404.html             GitHub Pages SPA redirect fallback
  Parth_Gadekar_Resume.pdf
  parth-profile.jpg

.github/workflows/
  ci.yml               Typecheck, tests, and build
  deploy.yml           GitHub Pages deployment
```

## Local Development

Install dependencies:

```bash
npm install
```

Run the app locally:

```bash
npm run dev
```

## Checks

```bash
npm run check
npm run test
npm run build
```

## Deployment

This repo deploys to GitHub Pages using GitHub Actions.

Recommended setup:

1. Push the repo to GitHub.
2. Open the repository `Settings -> Pages`.
3. Set `Source` to `GitHub Actions`.
4. Push to `main` or run the `Deploy Portfolio` workflow manually.

The deploy workflow builds the Vite app, uploads `dist`, and publishes it through the GitHub Pages actions.

## GitHub Pages Notes

- `vite.config.ts` computes the correct `base` for GitHub Pages builds.
- `src/lib/routes.ts` handles internal links under a repository subpath.
- `public/404.html` enables SPA deep-link refreshes on GitHub Pages project sites.

## Verification Checklist

After deployment, verify:

- `/` loads with the redesigned landing page
- `/experience` shows 3 work experiences
- `/projects` shows 8 projects
- `/projects/f1-telemetry` loads directly
- `/skills`, `/education`, and `/contact` load directly
- browser tab title shows `Parth Gadekar | Software Engineer Portfolio`

## Chatbot Note

GitHub Pages is static hosting. A real OpenAI-powered chatbot should not call the API directly from the browser because API keys must stay server-side.

That means:

- this portfolio can ship cleanly on GitHub Pages first
- a real chatbot should be added later through a separate backend or serverless endpoint
