# CLAUDE.md

Guidance for Claude Code in this repository.

## Required reading

Read `DESIGN.md` before any UI, content or styling work. It is the design system (Lynn Le Design System v2). Match it: one berry accent, Bricolage Grotesque 800 display over Space Grotesk, Phosphor icons plus the ✦ glyph, no emoji, no em dashes, no dark mode.

## Commands

```bash
bun install
bun dev
bun run build
bun run test
```

## Architecture

Astro 5 static site with Tailwind v4 (`@tailwindcss/vite`, tokens in `src/styles/global.css` `@theme`), React islands for the command palette and media lightbox, GSAP for motion. Same stack as the quin frontend, without Payload.

- Content: `src/data/content.ts` (typed, static). Every number must come from `public/data_resume.pdf` or Lynn's project write-ups (`dataProjects`).
- Shell: `src/layouts/Layout.astro` (SEO, OG, JSON-LD, fonts, islands). Pages pass `<Nav slot="nav">` and `<Footer slot="footer">`.
- Motion: `src/scripts/site.ts` (data-attribute driven, see README), plus `home.ts` and `story.ts` for page extras. Use IntersectionObserver or ScrollTrigger, never scroll listeners. Keep the HTML as the final state.
- Links: build with `to(Astro.url.pathname, "works/codrops.html")` from `src/lib/url.ts` so every link stays relative.
