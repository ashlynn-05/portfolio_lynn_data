// Site-wide behaviour and scroll motion, powered by GSAP (ScrollTrigger + SplitText).
// Pages opt in with data attributes, so no page has to hand-roll an animation:
//   data-intro          fades up once on load, in document order
//   data-rise           fades up when it scrolls into view (batched)
//   data-row            slides in from the left when it scrolls into view
//   data-count="50"     counts up to its number (data-prefix / data-suffix keep the "+" and "%")
//   data-parallax="0.3" drifts against the scroll at that speed
//   data-split-lines    reveals line by line from under a mask
//   data-scrub-words    lights up word by word as it crosses the viewport (Lead the Way's manifesto)
//   data-pin            a pinned story: .step items on the left swap the .frame shown in the sticky .stage
// Everything is readable with JS off or reduced motion on: the HTML is the final state.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { openLightbox } from "../lib/lightbox";

gsap.registerPlugin(ScrollTrigger, SplitText);

const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll<T>(s));
const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/* ---------- Every page opens at its top ----------
   Following a folder or a job row should land on the top of the next page, not wherever the
   last page was scrolled to. In the hosted preview the site sits inside frames whose outer
   page keeps its own scroll and resizes the frame after load, so the top of this page is
   pulled into view a few times while it settles, and we stop as soon as the visitor scrolls. */
if (!location.hash) {
  try { history.scrollRestoration = "manual"; } catch { /* older browsers */ }
  const framed = window.top !== window.self;
  let userMoved = false;
  const stop = () => { userMoved = true; };
  ["wheel", "touchstart", "keydown", "pointerdown"].forEach((t) => window.addEventListener(t, stop, { once: true, passive: true }));
  const toTop = () => {
    if (userMoved) return;
    window.scrollTo(0, 0);
    if (framed) {
      // The page's scroll-padding (kept for anchor links under the fixed nav) would leave the
      // outer page 96px short of the top, so lift it for this one call.
      const root = document.documentElement;
      root.style.scrollPaddingTop = "0px";
      root.scrollIntoView({ block: "start", behavior: "auto" });
      root.style.scrollPaddingTop = "";
    }
  };
  toTop();
  requestAnimationFrame(toTop);
  window.addEventListener("load", toTop, { once: true });
  document.fonts?.ready.then(toTop);
  [150, 400, 800, 1500].forEach((ms) => window.setTimeout(toTop, ms));
}

/* ---------- Copy buttons: the address stays visible and selectable either way ---------- */
$$<HTMLButtonElement>("[data-copy]").forEach((btn) => {
  const label = btn.textContent;
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy ?? "");
      btn.textContent = "copied";
    } catch {
      const span = btn.previousElementSibling;
      if (span) window.getSelection()?.selectAllChildren(span);
      btn.textContent = "selected, press copy";
    }
    setTimeout(() => (btn.textContent = label), 1800);
  });
});

/* ---------- Resume opens in the media lightbox (falls back to the PDF link) ---------- */
$$<HTMLAnchorElement>("[data-resume]").forEach((a) =>
  a.addEventListener("click", (e) => {
    e.preventDefault();
    // Show the CV as an image of its page (PDFs don't render inside every embed), with the PDF one tap away.
    openLightbox([{ kind: "pdf", path: a.href, preview: new URL("img/resume-page.webp", a.href).href, download: "Lynn_Le_resume.pdf", title: "Lynn Le, resume" }]);
  }),
);

/* ---------- Command palette trigger buttons ---------- */
$$("[data-cmdk]").forEach((b) => b.addEventListener("click", () => window.dispatchEvent(new Event("cmdk:open"))));

/* ---------- Nav: glass once the page leaves the top (an observer, not a scroll listener) ---------- */
const nav = $("#nav");
const sentinel = $("#nav-sentinel");
if (nav && sentinel && "IntersectionObserver" in window) {
  new IntersectionObserver(([e]) => nav.classList.toggle("is-glass", !e.isIntersecting)).observe(sentinel);
}

/* ---------- Mobile menu: opens as a circle from the button ---------- */
const menuBtn = $<HTMLButtonElement>("#menu-btn");
const menu = $("#mnav");
if (menuBtn && menu && nav) {
  const outside = [$("main"), $("#hi")].filter(Boolean) as HTMLElement[];
  let lastFocus: HTMLElement | null = null;
  const origin = () => {
    const r = menuBtn.getBoundingClientRect();
    menu.style.setProperty("--mx", `${r.left + r.width / 2}px`);
    menu.style.setProperty("--my", `${r.top + r.height / 2}px`);
  };
  const open = () => {
    origin();
    lastFocus = document.activeElement as HTMLElement;
    menu.classList.add("open");
    nav.classList.add("menu-open");
    menuBtn.setAttribute("aria-expanded", "true");
    menuBtn.setAttribute("aria-label", "Close menu");
    document.documentElement.style.overflow = "hidden";
    outside.forEach((el) => (el.inert = true));
    setTimeout(() => $<HTMLAnchorElement>(".mnav__item", menu)?.focus({ preventScroll: true }), 260);
  };
  const close = (restore = true) => {
    if (!menu.classList.contains("open")) return;
    origin();
    menu.classList.remove("open");
    nav.classList.remove("menu-open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Open menu");
    document.documentElement.style.overflow = "";
    outside.forEach((el) => (el.inert = false));
    if (restore) lastFocus?.focus({ preventScroll: true });
  };
  menuBtn.addEventListener("click", () => (menu.classList.contains("open") ? close() : open()));
  menu.addEventListener("click", (e) => { if ((e.target as Element).closest("a")) close(false); });
  document.addEventListener("keydown", (e) => {
    if (!menu.classList.contains("open")) return;
    if (e.key === "Escape") { e.preventDefault(); close(); }
    if (e.key === "Tab") {
      const f = [menuBtn, ...$$<HTMLElement>("a", menu)];
      const i = f.indexOf(document.activeElement as HTMLElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
    }
  });
  window.matchMedia("(min-width: 1061px)").addEventListener("change", (m) => m.matches && close(false));
}

/* ---------- Click sparkles: a burst of seven ✦ in palette colours ---------- */
const sparks = $(".sparks");
const SPARK_COLOURS = ["#223382", "#9BACD8", "#F98513", "#DAD1C8", "#FFFFFF", "#223382", "#F98513"];
document.addEventListener("pointerdown", (e) => {
  if (!sparks || reduced() || e.button !== 0) return;
  const base = Math.random() * Math.PI;
  for (let k = 0; k < 7; k++) {
    const s = document.createElement("span");
    s.className = "spk";
    s.textContent = "✦";
    s.style.color = SPARK_COLOURS[k];
    s.style.fontSize = `${10 + (k % 3) * 5}px`;
    sparks.appendChild(s);
    const a = base + (k * Math.PI * 2) / 7;
    const d = 28 + (k % 3) * 15;
    gsap.fromTo(
      s,
      { x: e.clientX - 7, y: e.clientY - 9, scale: 0.3, opacity: 1, rotate: 0 },
      { x: e.clientX - 7 + Math.cos(a) * d, y: e.clientY - 9 + Math.sin(a) * d, scale: 1, rotate: 90, opacity: 0, duration: 0.65 + (k % 3) * 0.12, ease: "power3.out", onComplete: () => s.remove() },
    );
  }
});

/* ---------- Magnetic buttons (fine pointers only) ---------- */
if (finePointer()) {
  $$(".magnetic").forEach((el) => {
    const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });
    el.addEventListener("pointermove", (e) => {
      if (reduced()) return;
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.25);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
    });
    el.addEventListener("pointerleave", () => { xTo(0); yTo(0); });
  });
}

/* ---------- Count-up helper ---------- */
export function countUp(el: HTMLElement, duration = 1.4) {
  const target = Number(el.dataset.count);
  if (!Number.isFinite(target)) return;
  const pre = el.dataset.prefix ?? "";
  const suf = el.dataset.suffix ?? "";
  const o = { v: 0 };
  gsap.to(o, {
    v: target, duration, ease: "power3.out",
    onUpdate: () => (el.textContent = `${pre}${Math.round(o.v).toLocaleString("en-US")}${suf}`),
    onComplete: () => (el.textContent = `${pre}${target.toLocaleString("en-US")}${suf}`),
  });
}

/* ---------- Pinned stories ---------- */
function setupPin(root: HTMLElement, animate: boolean) {
  const steps = $$(".step", root);
  const frames = $$(".stage .frame", root);
  let current = -1;
  const show = (i: number) => {
    if (i === current || !frames[i]) return;
    const prev = frames[current];
    current = i;
    steps.forEach((s, k) => s.classList.toggle("on", k === i));
    frames.forEach((f, k) => f.classList.toggle("on", k === i));
    if (!animate) return;
    if (prev) gsap.to(prev, { autoAlpha: 0, y: -18, scale: 0.98, duration: 0.3, ease: "power2.out", overwrite: true });
    gsap.fromTo(frames[i], { autoAlpha: 0, y: 26, scale: 0.97 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, ease: "expo.out", overwrite: true });
    $$("[data-count]:not([data-counted])", frames[i]).forEach((el) => { el.dataset.counted = ""; countUp(el, 1.1); });
    const sticker = $(".frame__sticker", frames[i]);
    if (sticker) gsap.fromTo(sticker, { rotate: -10, scale: 0.8, y: 20 }, { rotate: 4, scale: 1, y: 0, duration: 0.7, ease: "back.out(1.8)" });
  };
  steps.forEach((step, i) =>
    ScrollTrigger.create({ trigger: step, start: "top 55%", end: "bottom 55%", onToggle: (self) => self.isActive && show(i) }),
  );
  show(0);
  const rail = $(".steps__rail i", root);
  if (rail && animate) {
    gsap.fromTo(rail, { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: $(".steps", root), start: "top 55%", end: "bottom 55%", scrub: true } });
  } else if (rail) {
    rail.style.transform = "none";
  }
}

/* ---------- Scroll motion ---------- */
const mm = gsap.matchMedia();
mm.add({ motion: "(prefers-reduced-motion: no-preference)", wide: "(min-width: 861px)" }, (ctx) => {
  const { motion, wide } = ctx.conditions as { motion: boolean; wide: boolean };

  $$("[data-pin]").forEach((root) => setupPin(root, motion && wide));
  if (!motion) return;

  // Reading progress line in the glass nav.
  gsap.to(".nav__prog", { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });

  // Entrances.
  gsap.from("[data-intro]", { y: 28, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.09, delay: 0.1 });
  ScrollTrigger.batch("[data-rise]", {
    start: "top 88%", once: true,
    onEnter: (b) => gsap.from(b, { y: 44, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.08, overwrite: true }),
  });
  ScrollTrigger.batch("[data-row]", {
    start: "top 92%", once: true,
    onEnter: (b) => gsap.from(b, { x: -36, opacity: 0, duration: 0.85, ease: "expo.out", stagger: 0.07 }),
  });

  // Numbers count up when they arrive (frames in a pinned stage count when shown).
  $$("[data-count]").filter((el) => !el.closest(".stage")).forEach((el) =>
    ScrollTrigger.create({ trigger: el, start: "top 88%", once: true, onEnter: () => countUp(el) }),
  );

  // Parallax drift.
  $$("[data-parallax]").forEach((el) => {
    const speed = Number(el.dataset.parallax) || 0.2;
    gsap.fromTo(el, { yPercent: speed * 60 }, { yPercent: speed * -60, ease: "none", scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true } });
  });

  // Line-by-line reveals under a mask.
  $$("[data-split-lines]").forEach((el) => {
    SplitText.create(el, {
      type: "lines", mask: "lines", autoSplit: true,
      onSplit: (self) => gsap.from(self.lines, { yPercent: 110, duration: 0.9, ease: "expo.out", stagger: 0.08, scrollTrigger: { trigger: el, start: "top 85%", once: true } }),
    });
  });

  // Word-by-word scrub (the manifesto).
  $$("[data-scrub-words]").forEach((el) => {
    SplitText.create(el, {
      type: "words", autoSplit: true,
      onSplit: (self) => gsap.fromTo(self.words, { opacity: 0.18 }, { opacity: 1, ease: "none", stagger: 0.08, scrollTrigger: { trigger: el, start: "top 78%", end: "bottom 42%", scrub: 0.4 } }),
    });
  });

  // The contact panel's folders climb in. The tween moves what's inside each folder, not the
  // folder itself, so Draggable's bounds never see a folder parked outside the panel.
  gsap.from($$(".cta-f").flatMap((f) => [...f.children]), { y: 140, opacity: 0, ease: "none", stagger: 0.12, scrollTrigger: { trigger: "[data-cta]", start: "top 90%", end: "top 40%", scrub: 0.6 } });
});

// Pages register their own extras after fonts settle; keep trigger positions honest.
document.fonts?.ready.then(() => ScrollTrigger.refresh());

export { gsap, ScrollTrigger, $, $$, reduced, finePointer };
