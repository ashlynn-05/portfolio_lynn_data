// Folders feel like objects you can pick up.
//   Press and hold any folder: it squishes, lifts with a deeper shadow, and its front flap tips open
//   so the paper inside peeks out (the .is-held state in global.css).
//   Drag a [data-drag] folder (wide screens): it swings with the speed of your hand, leaves a short
//   sparkle trail, and wobbles back to rest when dropped. Built on GSAP Draggable + InertiaPlugin.
import { gsap, $, $$, reduced } from "./site";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

gsap.registerPlugin(Draggable, InertiaPlugin);

const sparks = $(".sparks");
const TRAIL = ["#223382", "#9BACD8", "#F98513", "#DAD1C8", "#FFFFFF"];
let trailTick = 0;

function trail(x: number, y: number) {
  if (!sparks || reduced()) return;
  const now = performance.now();
  if (now - trailTick < 45) return;
  trailTick = now;
  const s = document.createElement("span");
  s.className = "spk";
  s.textContent = "✦";
  s.style.color = TRAIL[Math.floor(Math.random() * TRAIL.length)];
  s.style.fontSize = `${9 + Math.random() * 9}px`;
  sparks.appendChild(s);
  gsap.fromTo(
    s,
    { x: x - 6 + (Math.random() - 0.5) * 18, y: y - 8 + (Math.random() - 0.5) * 18, scale: 1, opacity: 1, rotate: 0 },
    { y: `+=${18 + Math.random() * 16}`, scale: 0.2, opacity: 0, rotate: 120, duration: 0.7, ease: "power2.out", onComplete: () => s.remove() },
  );
}

// A folder's resting tilt (from its CSS rotate), so a drop settles back to it rather than to 0.
const rest = (el: HTMLElement) => {
  if (el.dataset.rest === undefined) el.dataset.rest = String(gsap.getProperty(el, "rotation") || 0);
  return Number(el.dataset.rest);
};

function hold(el: HTMLElement) {
  rest(el);
  el.classList.add("is-held");
  if (!reduced()) gsap.fromTo(el, { scale: 0.93 }, { scale: 1.07, duration: 0.35, ease: "back.out(3)", overwrite: "auto" });
}

function release(el: HTMLElement) {
  el.classList.remove("is-held");
  if (!reduced()) {
    gsap.to(el, { scale: 1, duration: 0.9, ease: "elastic.out(1, 0.35)", overwrite: "auto" });
    gsap.to(el, { rotation: rest(el), duration: 1.1, ease: "elastic.out(1, 0.3)" });
  }
}

/* Every folder opens on press, draggable or not (rail folders, list icons, more folders). */
$$(".folder:not([data-drag])").forEach((el) => {
  el.addEventListener("pointerdown", (e) => { if (e.button === 0) hold(el); });
  ["pointerup", "pointercancel", "pointerleave"].forEach((t) => el.addEventListener(t, () => el.classList.contains("is-held") && release(el)));
});

/* Draggable folders: desktop widths only, so a phone keeps normal scrolling and tapping. */
const mm = gsap.matchMedia();
mm.add("(min-width: 861px)", () => {
  const drags: Draggable[] = [];
  $$("[data-drag]").forEach((el) => {
    const bounds = el.closest("[data-desk], [data-hero-art], [data-drag-zone]") ?? undefined;
    const spin = gsap.quickTo(el, "rotation", { duration: 0.45, ease: "power3.out" });
    let lastX = 0;
    drags.push(...Draggable.create(el, {
      type: "x,y", bounds, inertia: true, dragClickables: true, zIndexBoost: true, minimumMovement: 6,
      onPress() { lastX = this.x; hold(el); },
      onDrag(e: PointerEvent) {
        const vx = this.x - lastX;
        lastX = this.x;
        if (!reduced()) spin(rest(el) + gsap.utils.clamp(-22, 22, vx * 1.6));
        if (e && "clientX" in e) trail(e.clientX, e.clientY);
      },
      onThrowUpdate() {
        const vx = this.x - lastX;
        lastX = this.x;
        if (!reduced()) spin(rest(el) + gsap.utils.clamp(-14, 14, vx * 1.2));
      },
      onRelease() {
        release(el);
        // A mouse click should not leave a focus ring behind; keyboard focus still shows one.
        (el as HTMLElement).blur();
      },
    }));
  });
  return () => drags.forEach((d) => d.kill());
});

/* Phones: no drag, but a press still opens the flap. */
mm.add("(max-width: 860px)", () => {
  const els = $$("[data-drag]");
  const down = (e: Event) => hold(e.currentTarget as HTMLElement);
  const up = (e: Event) => { const el = e.currentTarget as HTMLElement; if (el.classList.contains("is-held")) release(el); };
  els.forEach((el) => {
    el.addEventListener("pointerdown", down);
    ["pointerup", "pointercancel", "pointerleave"].forEach((t) => el.addEventListener(t, up));
  });
  return () => els.forEach((el) => {
    el.removeEventListener("pointerdown", down);
    ["pointerup", "pointercancel", "pointerleave"].forEach((t) => el.removeEventListener(t, up));
  });
});
