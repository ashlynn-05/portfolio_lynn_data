<div align="center">

<img src="public/favicon.svg" alt="Lynn Le logo" width="72" height="72">

# Lynn Le Portfolio (data)

**A calm blue desktop of folders, windows and stickers for a Business Analytics student who likes sidequests.**

**Live:** not deployed yet. Once it is on Vercel, set `SITE_URL` or update the fallback in `astro.config.mjs`.

[![Astro](https://img.shields.io/badge/Astro-5-BC52EE?logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![GSAP](https://img.shields.io/badge/GSAP-3.15-88CE02?logo=greensock&logoColor=black)](https://gsap.com)
[![Deploy with Vercel](https://img.shields.io/badge/deploy-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/new/clone?repository-url=https://github.com/ashlynn-05/portfolio_lynn_data)

[Overview](#overview) · [Getting started](#getting-started) · [Project structure](#project-structure) · [Editing content](#editing-content) · [Deploy](#deploy)

<img src="public/og/home.png" alt="Lynn Le portfolio home page" width="720">

</div>

## Overview

This is the personal portfolio of **Lynn Le**, a final-year Business Analytics student at Deakin University focused on data analytics: SQL, Power BI, Looker Studio, Python and Excel. The site uses a desktop metaphor: projects and roles live in folders, case studies open as windows, and the life story is a pinned timeline with a sticker board. This is the data-focused version of [portfolio_lynn](https://github.com/ashlynn-05/portfolio_lynn).

The cute is the wrapper. The numbers inside are real: every metric on the site comes from the CV in [`public/data_resume.pdf`](public/data_resume.pdf) or Lynn's own project write-ups, and a test suite guards that promise.

**Highlights**

- Seven data projects (BGIS workforce analytics, Altano Bank BI, Wellora marketing analytics, NextWave RFM, RetailPro predictive models, Apex data cleaning, Adidas social listening), each with its approach, dashboards, recommendations and a link to the code
- Four experience case studies (Sidekick, Codrops, SW Education, The Muse Crochet), each opening as a window with its headline numbers
- Draggable desk of folders with a list view fallback
- Cmd+K command palette and a media lightbox, both as React islands
- Data-attribute driven motion with GSAP, fully disabled under `prefers-reduced-motion`
- Static output with relative links, so the build runs on any host, in a sub-folder, or opened as plain files
- SEO ready: canonical URLs, Open Graph image, JSON-LD and a sitemap

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | [Astro 5](https://astro.build), static output (`build.format: "file"`) |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite`, tokens in the `@theme` block of `src/styles/global.css` |
| Motion | GSAP 3.15 (ScrollTrigger, SplitText, Draggable, InertiaPlugin, Flip) |
| Islands | React 19 for the command palette and `yet-another-react-lightbox` |
| Icons | Phosphor (`@phosphor-icons/core`), inlined at build time |
| Fonts | Bricolage Grotesque and Space Grotesk, self-hosted via Fontsource |
| Tests | Vitest content guard rails |
| Hosting | Vercel, or any static host |

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org) 20 or later
- [Bun](https://bun.sh) (recommended, `bun.lock` is committed). `npm` works too.

### Run it locally

```bash
git clone https://github.com/ashlynn-05/portfolio_lynn.git
cd portfolio_lynn
bun install
bun dev
```

Then open http://localhost:4321.

### Commands

| Command | What it does |
|---------|--------------|
| `bun dev` | Start the dev server at `localhost:4321` |
| `bun run build` | Build the static site to `./dist`, then make every path relative |
| `bun run preview` | Preview the production build |
| `bun run check` | Type-check `.astro` files |
| `bun run test` | Run the content guard rails |

## Project structure

```text
├── public/              # CV PDF, favicon, OG image, photos and company logos
├── scripts/
│   └── relativize.mjs   # post-build: rewrites root-absolute paths to relative ones
├── src/
│   ├── components/      # Folder, Window, Sticker, Nav, CommandPalette, MediaLightbox...
│   ├── data/
│   │   ├── content.ts   # all site content, typed and static
│   │   └── content.test.ts
│   ├── layouts/         # Layout.astro: SEO, OG, JSON-LD, fonts, islands
│   ├── lib/             # url helper (relative links), lightbox and media helpers
│   ├── pages/           # routes, see below
│   ├── scripts/         # site-wide and per-page motion
│   └── styles/          # global.css: design tokens and component styles
├── DESIGN.md            # the design system spec
└── astro.config.mjs
```

### Routes

| Path | What it is |
|------|------------|
| `/` | Home: hero, CV numbers, projects, experience folders, job rows, skill beams, life story teaser, contact |
| `/projects` | The projects folder: project cards plus a list view |
| `/projects/[slug]` | Data project case page (`bgis`, `altano`, `wellora`, `nextwave`, `retailpro`, `apex`, `adidas`) with dashboards in a lightbox |
| `/works` | The experience folder: draggable desk plus a list view |
| `/works/[slug]` | Experience case study (`sidekick`, `codrops`, `sw-education`, `muse-crochet`) |
| `/life-story` | Pinned timeline of chapters, character sheet and sticker board |
| `/404` | Not on the desk |

## Editing content

Everything the site says lives in [`src/data/content.ts`](src/data/content.ts): contact details, data projects, case studies, jobs, skills, life story chapters and stickers. Bracketed text such as `[what you built]` is a placeholder to fill in.

After any edit, run the guard rails:

```bash
bun run test
```

They check that slugs are unique, every metric has a caption, every job links to a real case study, skill beams point at existing projects, the CV grade is right, and no em or en dashes slipped into the copy.

> [!IMPORTANT]
> Every number on the site must trace back to the CV. If a figure is not in `public/data_resume.pdf` or the project write-ups, it does not go on the site.

Internal links should be built with the `to()` helper from `src/lib/url.ts` so they stay relative:

```astro
<a href={to(Astro.url.pathname, "works/codrops.html")}>open the work folder</a>
```

### Motion by data attribute

Pages opt in to motion with attributes, and `src/scripts/site.ts` does the rest.

| Attribute | Effect |
|-----------|--------|
| `data-intro` | Fades up once on load |
| `data-rise` | Fades up when scrolled into view |
| `data-row` | Slides in from the left |
| `data-count="50" data-suffix="+"` | Counts up to the CV number |
| `data-parallax="0.3"` | Drifts against the scroll |
| `data-split-lines` | Reveals line by line from under a mask |
| `data-scrub-words` | Lights up word by word as you scroll |
| `data-pin` | Pinned story: `.step` items swap the `.frame` in the sticky `.stage` |
| `data-drag` | Draggable desktop object (wide screens) |

The HTML is always the final state, so the site reads fine with JavaScript off.

### Design system

[`DESIGN.md`](DESIGN.md) is the canonical spec for tokens, type, components, motion and copy rules. In short: one Deep Space Royal accent (`#223382`, token `berry`) with a Habanero highlight, Bricolage Grotesque 800 over Space Grotesk, Phosphor icons plus the ✦ glyph, sentence-case UI labels, no emoji, no dashes, no dark mode.

> [!TIP]
> Read `DESIGN.md` before changing anything visual. It also lists the patterns to avoid so the site never reads as templated.

## Deploy

### Vercel

1. Import [`ashlynn-05/portfolio_lynn`](https://github.com/ashlynn-05/portfolio_lynn) at [vercel.com/new](https://vercel.com/new).
2. Keep the detected **Astro** preset. The defaults work as they are:
   - Install command: `bun install`
   - Build command: `bun run build`
   - Output directory: `dist`
3. Deploy. `vercel.json` turns on clean URLs, so `/works/codrops.html` is served as `/works/codrops`.

Canonical URLs, Open Graph tags and the sitemap use `VERCEL_PROJECT_PRODUCTION_URL` automatically. Once you have a custom domain, set it explicitly:

```bash
SITE_URL=https://your-domain.com
```

> [!NOTE]
> The site is fully static and does not use the Vercel adapter. The adapter would switch to directory-style output (`works/codrops/index.html`) and break the relative `.html` links.

### Any static host

```bash
bun run build
```

Upload the contents of `dist/` to Netlify, GitHub Pages, Cloudflare Pages or any web server. Because every path is relative, it also works from a sub-folder.

## Contact

**Lynn Le** · [tlinhle05@gmail.com](mailto:tlinhle05@gmail.com) · [LinkedIn](https://www.linkedin.com/in/lynn-le-9940b4307/)
