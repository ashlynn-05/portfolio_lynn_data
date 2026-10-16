import type { Figure } from "../data/content";
import { to } from "./url";

// Figures wider than 800px ship with a 800px copy next to them (name-800.webp), so cards
// and figure grids can skip the full image. The lightbox still opens the full one.
export const SMALL_W = 800;

export const smallSrc = (src: string) => src.replace(/\.webp$/, `-${SMALL_W}.webp`);

export function figSrcset(page: string, f: Figure): string | undefined {
  return f.w > SMALL_W ? `${to(page, smallSrc(f.src))} ${SMALL_W}w, ${to(page, f.src)} ${f.w}w` : undefined;
}
