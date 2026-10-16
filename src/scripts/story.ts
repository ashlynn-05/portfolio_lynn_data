// Life story extras: a sticker board you can mess up (Draggable + inertia)
// and tidy back into a grid (Flip animates between the two layouts).
import { gsap, $, $$, reduced } from "./site";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Draggable, InertiaPlugin, Flip);

const board = $("[data-board]");
const tidyBtn = $<HTMLButtonElement>("[data-tidy]");
const tidyLabel = $("[data-tidy-label]");

if (board) {
  const stickers = $$("[data-sticker]", board);
  let drags: Draggable[] = [];

  const enableDrag = () => {
    drags.forEach((d) => d.kill());
    drags = [];
    if (board.classList.contains("is-tidy")) return;
    if (!window.matchMedia("(min-width: 861px)").matches) return;
    stickers.forEach((s) => {
      drags.push(...Draggable.create(s, {
        type: "x,y", bounds: board, inertia: true, zIndexBoost: true,
        onPress() { gsap.to(this.target, { scale: 1.08, duration: 0.2 }); },
        onRelease() { gsap.to(this.target, { scale: 1, duration: 0.35, ease: "back.out(2)" }); },
      }));
    });
  };

  tidyBtn?.addEventListener("click", () => {
    const tidy = !board.classList.contains("is-tidy");
    const state = Flip.getState(stickers);
    gsap.set(stickers, { x: 0, y: 0 });
    board.classList.toggle("is-tidy", tidy);
    tidyBtn.setAttribute("aria-pressed", String(tidy));
    if (tidyLabel) tidyLabel.textContent = tidy ? "Scatter again" : "Tidy up";
    if (!reduced()) {
      Flip.from(state, { duration: 0.75, ease: "expo.inOut", stagger: 0.03, absolute: true, onComplete: enableDrag });
    } else {
      enableDrag();
    }
  });

  enableDrag();
  window.matchMedia("(min-width: 861px)").addEventListener("change", enableDrag);

  // Stickers drop onto the board one by one the first time it scrolls in.
  if (!reduced()) {
    gsap.from(stickers, {
      y: -60, opacity: 0, rotate: "+=12", duration: 0.8, ease: "back.out(1.6)", stagger: 0.08,
      scrollTrigger: { trigger: board, start: "top 80%", once: true },
    });
  }
}
