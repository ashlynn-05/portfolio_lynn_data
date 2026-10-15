// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

// Same shape as the quin frontend, minus Payload: a fully static build.
// `bun run build` writes a plain static site to ./dist everywhere, Vercel included.
// No Vercel adapter: it forces directory-style output (works/codrops/index.html),
// which breaks the relative "works/codrops.html" links that src/lib/url.ts builds.

const buildSiteUrl = () => {
  if (process.env.SITE_URL) return process.env.SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "https://lynnle-data-portfolio.vercel.app"; // change once Lynn has a domain
};

export default defineConfig({
  site: buildSiteUrl(),
  output: "static",
  // life-story.html, works/codrops.html: every internal link is relative, so the
  // same build runs on Vercel, any static host, a sub-folder or a file preview.
  build: { format: "file", inlineStylesheets: "never", assets: "assets" },
  prefetch: { prefetchAll: false, defaultStrategy: "hover" },
  devToolbar: { enabled: false },
  vite: {
    plugins: [/** @type {any} */ (tailwindcss())],
  },
  integrations: [sitemap(), react()],
});
