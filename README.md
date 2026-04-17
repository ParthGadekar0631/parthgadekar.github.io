# Parth Gadekar Portfolio

AI-native portfolio for Parth Gadekar, rebuilt as a modular product demo instead of a single scrolling landing page.

The site is designed to demonstrate the same engineering behaviors it talks about:

- route-based product architecture
- real Claude-backed text copilot
- curated retrieval over typed portfolio content
- Langfuse-ready tracing and public observability summaries
- dynamic module theming, animation, and case-study routing

## Stack

- React
- TypeScript
- Tailwind CSS
- Vite
- Vercel
- Claude
- Langfuse

## Top-Level Routes

- `/` Home
- `/copilot` AI Copilot
- `/projects` Projects
- `/projects/:slug` Project detail
- `/case-studies` Case Studies
- `/case-studies/:slug` Case study detail
- `/about` About / Contact

## Project Structure

```text
src/
  App.tsx              Route-based application shell
  types.ts             Shared route/content/chat types
  content/
    site.ts            Portfolio modules, projects, case studies, profile data
    knowledge.ts       Curated retrieval documents and suggested prompts
  lib/
    api.ts             Browser API helpers
    integrity.ts       Runtime content validation
    routes.ts          Client-side route parsing and navigation
  index.css            Motion system, themed visual language, shared components
  main.tsx             React entry point

api/
  chat.ts              Claude-backed serverless copilot endpoint
  metrics.ts           Public observability summary endpoint
  _lib/
    anthropic.ts       Claude request orchestration
    langfuse.ts        Langfuse metrics/tracing helpers
    shared.ts          Retrieval scoring and shared server helpers

public/
  Parth_Gadekar_Resume.pdf
```

## Local Development

Install dependencies:

```bash
npm install
```

Start the front end locally:

```bash
npm run dev
```

Note: `npm run dev` runs the Vite front end only. The `/api` routes are intended for Vercel serverless runtime.

## Environment Variables

Copy `.env.example` and configure:

```bash
ANTHROPIC_API_KEY=
ANTHROPIC_MODEL=claude-3-5-sonnet-latest
LANGFUSE_PUBLIC_KEY=
LANGFUSE_SECRET_KEY=
LANGFUSE_BASE_URL=https://cloud.langfuse.com
```

Behavior by configuration:

- Without `ANTHROPIC_API_KEY`, the copilot falls back to curated retrieval summaries.
- Without Langfuse credentials, public metrics fall back to safe empty defaults.

## Production Build

Create the production build:

```bash
npm run build
```

Preview the static front end locally:

```bash
npm run preview
```

## Deployment

Primary runtime target is Vercel, not GitHub Pages.

This repo includes:

- `vercel.json` for SPA routing fallback
- `api/` serverless functions for chat and metrics
- Vite static output in `dist/`

Recommended deployment flow:

1. Push the repo to GitHub
2. Import the repo into Vercel
3. Add the environment variables from `.env.example`
4. Deploy

## Notes

- V1 ships a real text copilot, not voice mode.
- Public observability is summary-level only; raw traces stay private.
- Case-study routing is fully implemented, but the editorial layer is intentionally lighter than the reference portfolio in v1.
