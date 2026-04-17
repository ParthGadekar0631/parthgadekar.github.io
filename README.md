# Parth Gadekar Portfolio

Personal portfolio for Parth Gadekar, built as a polished single-page engineering site inspired by modern interactive portfolio layouts.

The site is designed around Parth's actual resume material, GitHub projects, and target roles across software engineering, data engineering, and AI-native systems work.

## Built With

- React
- TypeScript
- Tailwind CSS
- Vite

## What This Portfolio Includes

- A high-signal hero section focused on software engineering, systems, and data work
- Project storytelling for F1 telemetry, distributed pipelines, Air Canvas, and blockchain work
- Experience and education sections based on resume content
- A static chatbot-style portfolio copilot that works on GitHub Pages without a backend
- GitHub Pages deployment through GitHub Actions

## Project Structure

```text
src/
  App.tsx          Main portfolio layout
  content.ts       Portfolio copy, project data, chat knowledge
  index.css        Global styling and custom visual system
  main.tsx         React entry point

public/
  Parth_Gadekar_Resume.pdf

.github/workflows/
  deploy.yml       GitHub Pages deployment workflow
```

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Production Build

Create the production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Deployment

This repo is configured for GitHub Pages deployment using GitHub Actions.

### Repository Settings

Open the repository Pages settings:

`https://github.com/ParthGadekar0631/parthgadekar.github.io/settings/pages`

Then set:

- Source: `GitHub Actions`

### Publish Flow

1. Push changes to `main`
2. GitHub Actions runs `.github/workflows/deploy.yml`
3. Vite builds the site into `dist/`
4. GitHub Pages publishes the build

Because this repository is named `parthgadekar.github.io`, the site is intended to publish at:

`https://parthgadekar.github.io/`

## Notes

- This version uses a static front-end chatbot experience so it can deploy free on GitHub Pages.
- The site structure is ready for a future AI-backed version using the same UI direction.
