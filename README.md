# RisksRay Portfolio

Modular portfolio for Parth Gadekar, built as a multi-page product-style site instead of a single scrolling page.

The current site is organized around the hiring flow:

- landing page with a short personal summary
- dedicated experience page with 3 work experiences
- projects page with 8 project cards and deep-linkable detail routes
- grouped skills page
- education page
- contact page with name, email, and message fields

## Stack

- React
- TypeScript
- Tailwind CSS
- Vite
- Vercel
- Claude
- Langfuse

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
  types.ts             Shared content and API types
  content/
    site.ts            Portfolio profile, modules, projects, experience, education, skills
    knowledge.ts       Curated documents used by the server-side copilot
  lib/
    api.ts             Browser API helpers
    integrity.ts       Runtime content validation
    routes.ts          Client-side route parsing and navigation
  index.css            Motion system, themed visual language, shared UI styles
  main.tsx             React entry point

api/
  chat.ts              Claude-backed serverless endpoint
  metrics.ts           Public summary metrics endpoint
  _lib/
    anthropic.ts       Claude request orchestration
    langfuse.ts        Langfuse metrics and tracing helpers
    shared.ts          Retrieval scoring and shared server helpers

public/
  Parth_Gadekar_Resume.pdf
```

## Local Development

Install dependencies:

```bash
npm install
```

Run the front end locally:

```bash
npm run dev
```

Run the full Vercel-style app locally, including `/api` routes:

```bash
npx vercel dev
```

## Checks

```bash
npm run check
npm run test
npm run build
```

CI is configured in `.github/workflows/ci.yml` to run:

- type checking
- tests
- production build

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

- Without `ANTHROPIC_API_KEY`, the server-side copilot falls back to curated retrieval summaries.
- Without Langfuse credentials, public metrics fall back to safe defaults.

## Deployment

Primary runtime target is Vercel.

Recommended deployment flow:

1. Push the repo to GitHub.
2. Import the repo into Vercel.
3. Keep the preset as `Vite` and the root directory as `./`.
4. Add the environment variables from `.env.example`.
5. Deploy.

Current free production domain pattern:

- `https://<project-name>.vercel.app`

Example:

- `https://risksray.vercel.app`

## Verification Checklist

After deployment, verify:

- `/` loads as the landing page
- `/experience` shows 3 work experiences
- `/projects` shows 8 projects
- `/projects/f1-telemetry` loads directly
- `/skills` loads directly
- `/education` loads directly
- `/contact` shows the contact form
- browser tab title shows `RisksRay | AI-Native Engineering Portfolio`

## Custom Domain

If you buy `risksray.io` later:

1. Open the Vercel project.
2. Go to `Settings -> Domains`.
3. Add `risksray.io`.
4. Configure the DNS records Vercel provides.
5. Wait for verification and SSL.

Until then, use the default `vercel.app` domain.
