# José Galván — Portfolio

Personal portfolio for José Galván, presenting software engineering, applied machine learning and published research.

## Stack

- Next.js 15 with static export
- React 19 and TypeScript
- Tailwind CSS 4 plus a small site-specific design layer
- i18next for English and Spanish content

## Local development

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Static deployment

The site is configured with `output: "export"`. `npm run static` builds the application and mirrors the exported `out/` directory into `docs/` for the existing GitHub Pages deployment.

The main content is maintained in `src/data/portfolio.ts`. The ATP Tennis Predictor case study uses the recorded artifacts from the companion `TenisPredictorML` repository as its factual source.

Content provenance and verification limits are documented in [CONTENT-SOURCES.md](CONTENT-SOURCES.md). The visual layer lives in `src/app/portfolio.css`; local logos and their license are in `public/brands/`.

`scripts/check-portfolio.mjs` checks the production export in Chrome at five widths in both languages, including overflow, image loading, navigation, persisted language and the case study. It requires Playwright (optionally located via `PLAYWRIGHT_MODULE`) and an installed Chrome browser. Screenshots are written to the ignored `local-qa/` folder.
