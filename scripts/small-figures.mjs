// Make the 800px copy (name-800.webp) of every project figure wider than 800px.
// Cards and case-page grids load these; the lightbox still opens the full image.
// Run after adding figures to src/data/content.ts: npm run figures (or bun run figures)
import fs from "node:fs";
import sharp from "sharp";

const W = 800;
const content = fs.readFileSync("src/data/content.ts", "utf8");
const figs = [...content.matchAll(/src: '(img\/projects\/[a-z0-9-]+\.webp)', w: (\d+)/g)];
let made = 0;
for (const [, src, w] of figs) {
  if (Number(w) <= W) continue;
  const full = `public/${src}`;
  const small = full.replace(/\.webp$/, `-${W}.webp`);
  if (fs.existsSync(small) && fs.statSync(small).mtimeMs >= fs.statSync(full).mtimeMs) continue;
  await sharp(full).resize({ width: W }).webp({ quality: 82, effort: 6 }).toFile(small);
  made++;
}
console.log(`small figures: ${made} made, ${figs.length} figures checked`);
