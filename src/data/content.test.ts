import fs from "node:fs";
import { describe, expect, it } from "vitest";
import { chapters, jobs, projects, dataProjects, skills, beamProjects, stickers } from "./content";

// Guard rails for content edits: the site promises every number traces to the CV.
describe("content", () => {
  it("has unique case study slugs", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has unique data project slugs, each with a GitHub link", () => {
    const slugs = dataProjects.map((d) => d.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const d of dataProjects) expect(d.github).toMatch(/^https:\/\/github\.com\/ashlynn-05\//);
  });

  it("gives every data project metric a caption and a value", () => {
    for (const d of dataProjects) {
      expect(d.metrics.length).toBeGreaterThan(0);
      for (const m of d.metrics) {
        expect(m.caption.length).toBeGreaterThan(0);
        expect(m.value !== null || !!m.text).toBe(true);
      }
    }
  });

  it("gives every metric a caption and either a number or a text value", () => {
    for (const p of projects) {
      expect(p.metrics.length).toBeGreaterThan(0);
      for (const m of p.metrics) {
        expect(m.caption.length).toBeGreaterThan(0);
        expect(m.value !== null || !!m.text).toBe(true);
      }
    }
  });

  it("links every job to a real case study", () => {
    const slugs = new Set(projects.map((p) => p.slug));
    for (const j of jobs) expect(slugs.has(j.slug)).toBe(true);
  });

  it("only beams skills to projects that exist", () => {
    for (const s of skills) for (const i of s.links) expect(beamProjects[i]).toBeDefined();
  });

  it("uses no em or en dashes in visible copy", () => {
    const text = JSON.stringify({ chapters, jobs, projects, dataProjects, skills, stickers });
    expect(text).not.toMatch(/[–—]/);
  });

  it("keeps the CV grade at 83/100", () => {
    const text = JSON.stringify({ chapters, stickers });
    expect(text).not.toContain("82/100");
    expect(text).toContain("83/100");
  });

  it("links every project and org out over https", () => {
    for (const d of dataProjects) {
      expect(d.github).toMatch(/^https:\/\/github\.com\/ashlynn-05\//);
      for (const src of d.sources ?? []) expect(src.href).toMatch(/^https:\/\//);
    }
    for (const w of projects) if (w.site) expect(w.site.href).toMatch(/^https:\/\//);
  });

  it("ships an 800px copy of every wide figure (npm run figures)", () => {
    for (const d of dataProjects) for (const f of d.figures ?? []) {
      expect(fs.existsSync(`public/${f.src}`)).toBe(true);
      if (f.w > 800) expect(fs.existsSync(`public/${f.src.replace(/\.webp$/, "-800.webp")}`)).toBe(true);
    }
  });
});
