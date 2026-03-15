# Wayne Public Safety Monitor

Static-first Astro project for a public safety data site focused on Wayne County, North Carolina, and its municipalities.

## Current project status

This repository now includes the initial site scaffold **and** the first real historical crime datasets for Wayne County.

Included so far:
- Astro static site scaffold
- Cloudflare Pages-friendly configuration
- shared layouts, navigation, styling, and reusable content components
- reusable historical metric framework for long-term public safety time series
- section pages for Home, County Dashboard, Crime, Fire & EMS, Budgets & Staffing, Methodology, About, Reports, and Municipalities
- municipality index plus dynamic municipality profile route scaffold
- placeholder public records directories under `public/records/`
- three wired Wayne County countywide crime-rate metric pages:
  - violent crime rate
  - index crime rate
  - property crime rate

## Included datasets

The repository currently includes these real annual Wayne County crime-rate series under `src/data/crime/wayne-county/`:

- `violent-crime.*`
- `index-crime-rate.*`
- `property-crime-rate.*`

Each metric is stored as:
- `*.meta.json` — metadata, comparability notes, source references, series breaks
- `*.series.json` — annual time series
- `*.summary.json` — derived metric summary values used by the page UI

These pages are already wired:
- `/crime/wayne-county/violent-crime`
- `/crime/wayne-county/index-crime-rate`
- `/crime/wayne-county/property-crime-rate`

## Historical data approach

The project is structured to emphasize **maximum defensible historical context**.

Each metric can distinguish between:
- **Available since** — earliest year data exists
- **Comparable since** — earliest year data is reasonably comparable across time

The metric framework also supports:
- long-term and recent views
- count-first or rate-first metrics
- series breaks
- partial-year flags
- source notes and methodology notes
- historical summary language and status badges

## Important caveats

This repository is still an early-stage starter build.

Not included yet:
- `node_modules`
- built `dist/` output
- Git history / `.git` directory
- most source PDFs or downloaded public-records files
- additional historical datasets beyond the three Wayne County crime-rate series
- final production branding, copyediting, or full content population

Also note:
- this package has **not** been build-verified in this environment
- you should run `npm install`, `npm run dev`, and `npm run build` locally before deployment
- placeholder chart components are included, but the current React chart files are still simple starter components rather than polished production charts

## Project structure

```text
wayne-public-safety-monitor/
├─ public/
│  ├─ _headers
│  ├─ _redirects
│  ├─ favicon.svg
│  └─ records/
├─ src/
│  ├─ components/
│  │  ├─ charts/
│  │  ├─ metrics/
│  │  └─ ui/
│  ├─ data/
│  │  └─ crime/wayne-county/
│  ├─ layouts/
│  ├─ lib/
│  ├─ pages/
│  └─ styles/
├─ astro.config.mjs
├─ package.json
├─ tsconfig.json
└─ README.md
```

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm install
npm run build
```

Astro will generate the static site in `dist/`.

## Cloudflare Pages settings

Use these settings when you connect the GitHub repository to Cloudflare Pages:

- Framework preset: `Astro`
- Build command: `npm run build`
- Build output directory: `dist`
- Production branch: `main`

This project is configured as a static Astro site and does **not** currently use a Cloudflare adapter.

## Core metric framework files

- `src/lib/types.ts` — shared metric types
- `src/lib/metrics.ts` — metric helper functions
- `src/layouts/MetricPageLayout.astro` — reusable metric page layout
- `src/components/metrics/*` — metadata, notes, interpretation, and sources panels
- `src/components/ui/*` — stat cards and status badges
- `src/components/charts/*` — starter React chart components

## Suggested next steps

1. Run the project locally and confirm the build succeeds.
2. Push the repository to GitHub.
3. Connect the repository to Cloudflare Pages.
4. Add the source PDFs or record links corresponding to the included crime datasets.
5. Expand the historical dataset library with additional county and municipal series.
6. Replace the starter chart components with more polished production charts.
7. Add more metric pages for fire/EMS, traffic, budgets, and municipality-level trends.

## Suggested deployment workflow

1. Upload the project contents to a new GitHub repository.
2. Commit to the `main` branch.
3. Connect the repository to Cloudflare Pages.
4. Confirm the build settings above.
5. Review the preview deployment.
6. Merge future work through pull requests before publishing to production.
