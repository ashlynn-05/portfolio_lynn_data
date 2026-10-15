# Lynn Le Design System (v2)

A whimsical, recruiter-safe design system for Lynn Le's Business Analytics portfolio. The site is a soft pink desktop: glossy folders, windows with traffic lights, stickers you can drag, a life story kept as `life-story.txt`. The cute is the wrapper. The numbers inside are real and come from the CV, which is what keeps it credible.

This is version 2. It keeps the original Lynn Le system (palette, Bricolage Grotesque + Space Grotesk, the desktop metaphor, two skins) and tightens it against the patterns that make a page read as AI-generated. Every change is listed under **What changed in v2**.

## Voice

Playful but recruiter-safe. Lynn talks to the reader directly, in short sentences.

- UI labels are lowercase: "say hi", "open the work folder", "read my life story". Body copy is sentence case.
- One label per intent across the whole site. Contact is always **say hi**. Work is always **open the work folder**.
- Helpers are short and functional: "psst, drag these", "click a folder to open it".
- Every number traces to the CV, word for word in meaning. If a number is not on the CV it does not go on the site. Unknown personal content becomes a greyed placeholder chapter or an open "add a quest" sticker, never invented copy.
- No em-dashes or en-dashes anywhere. Use a full stop, a comma or "to" ("Mar 2024 to now"). At most one middle dot per line.
- No emoji. The **✦** sparkle is the only glyph; everything else is a Phosphor icon.

Do: "Built a sponsor pipeline from scratch." Don't: "Seamlessly revolutionising partnerships!" (filler verbs, no fact, and usually an emoji and an em-dash tagging along).

## Colour

One action colour: **berry** (#D5306D). It is used for primary buttons, the single emphasis word in a headline, active states and the timeline fill. Nothing else on the page competes with it.

The four supporting colours, **pink-mist**, **soft-blush**, **caramel** and **jasmine**, appear as fills (folders, stickers, chips) and always carry **ink** text. White text never sits on pink-mist, caramel or jasmine.

Text colours step down from **ink** (headlines) to **body** (paragraphs), **label** (nav, captions, small links), **meta** (years, uppercase labels) and **muted** (dates). Every text token passes 4.5:1 on page, wash, blush and white. Berry as text is 4.4:1, so it is reserved for text at 24px or larger, or bold at 19px or larger.

Grounds: the full page uses the **page wash** (160deg, wash-pink to wash-peach to wash-cream). Boards use **board** with a 22px **board-dot** grid. Windows use **window** with a title bar gradient from **window-bar-top** to **window-bar-bottom**.

There is no dark mode, and no dark section or footer. The light canvas is part of the brand.

## Type

- **Bricolage Grotesque 800** for display, with tight negative tracking (-0.03 to -0.035em). The chunkiness is the cuteness. Sizes: display-xl (hero), display-lg (section h2), display-md (window titles), metric (numbers).
- **Space Grotesk** 400 to 700 for body and UI.
- One emphasis word per headline, in berry, in the same font. Never switch families for emphasis.
- Uppercase **label-upper** is only for sticker statuses and case-study block heads. Section eyebrows are rationed to one per three sections, and the hero's status pill counts as one.

Both are Google Fonts: `Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800` and `Space+Grotesk:wght@400;500;600;700`.

## Shape and depth

Radii: buttons **radius-btn** (14), stickers and inner panels **radius-md** (18), cards and windows **radius-lg** (22), boards and the CTA panel **radius-xl** (30), pills **radius-pill**. Folder icons use the tab-corner radius `7px 16px 14px 14px`.

Shadows are always pink-tinted: **shadow-card**, **shadow-float**, **shadow-window**, **shadow-folder**, and the primary button's **shadow-lip**, which presses down to 3px.

## Skins

One structure, two skins, switched by a class on the root:

- **glossy** (default, `.ll`): frosted white cards with a 14px blur, soft pink shadows, glossy gradient folders with an inset highlight.
- **sticker** (`.ll .ll--sticker`): 2px **ink** outlines and hard offset shadows (**shadow-sticker**, **shadow-sticker-window**), no blur, no highlights.

The skin swaps these variables: `--card-bg`, `--card-border`, `--card-shadow`, `--float-shadow`, `--win-shadow`, `--folder-border`, `--folder-shadow`, `--r`, `--blur`, `--aurora`.

## Iconography

Phosphor icons only, regular weight in UI and bold weight inside folders and timeline nodes, inlined as SVG with `fill="currentColor"`. Copy the path data from the Phosphor library; never redraw an icon. The **✦** glyph is the brand mark: the logo tile, sparkle bursts and twinkles. Glyphs on light folders (mist, caramel, jasmine) are ink or label; glyphs on berry and rose folders are on-berry.

## Layout

- Max width 1180px, gutter clamp(18px, 4vw, 40px), section top padding clamp(72px, 9vw, 112px).
- Section heads stack: the h2, then the helper hint directly underneath. Nothing floats in the top-right corner.
- Use at least four layout families per page and never the same one twice in a row: split hero, stat strip, folder desktop, job rows, beam diagram, window, sticker board, timeline, CTA panel.
- Decorations (folders, sparkles, ribbons, glows) live at the edges, never in the reading column.
- At 760px and below everything is one column, nav links hide, drag areas become static grids, beams hide, and a tap opens a folder. Page roots set `container-type: inline-size` and components respond with container queries, so a design behaves the same in any frame.

## Motion

Intensity 7 of 10. Easing is `cubic-bezier(.16,1,.3,1)` everywhere. Every animation has a job:

| Pattern | Job | Spec |
|---|---|---|
| Hero blur-in | hierarchy on load | each word from blur 12px and 14px down, .8s, .12s stagger |
| Rotating word | says Lynn is more than one thing | cycles every 2.4s |
| Floaty folders | the desktop feels alive | 0 to -10px, 6 to 7.5s |
| Magnetic, squish buttons | feedback | squish to scale .95, lip drops to 3px |
| Count-up | draws the eye to real numbers | 1.4s ease-out when the card scrolls into view |
| Click sparkles | delight on interaction | 7 ✦ burst 28 to 58px in palette colours, 650 to 900ms |
| Drag | play | pointer-driven, clamped to the parent, desktop only |
| Folder to window zoom | state change | scale .08 to 1 from the folder, 460ms in, 280ms out |
| Nav morph | state change | full bar to a floating frosted pill, scroll-driven |

Scroll effects use CSS scroll-driven animations (`animation-timeline: view()` or `scroll()`) or IntersectionObserver, never scroll listeners. Under `prefers-reduced-motion` every animation and transition turns off.

## What changed in v2

1. **Asymmetric hero.** The centred hero becomes a split: copy on the left, a big glossy folder on the right with Lynn's photo sliding out of it like a document. Smaller folders orbit the edges.
2. **Real photo slot.** The hero needs a real photo of Lynn (4:5). Until it arrives, a striped, labelled placeholder holds the space.
3. **Fewer effects.** The cursor-reactive dot grid and film grain are gone. The hero keeps two drifting glows and two white ribbon waves from the original template, and nothing else uses them.
4. **Stacked section heads.** The helper hint moves from the top-right corner to directly under the h2.
5. **Contrast fixes.** muted was #C08B6B (2.8:1) and is now #8A5A3C. Placeholder titles were #B08A97 and are now #93606F. Text on berry was #FFF1E6 (4.2:1) and is now #FFFAF6 (4.6:1). Folder glyphs follow fill lightness.
6. **CTA panel.** The berry-to-pink gradient wash put light text on pink-mist, which failed contrast. The panel is now solid berry with one pink-mist glow in the corner.
7. **Case study trio.** Problem, what I did and impact are no longer three equal cards: problem is a plain text column, what I did is a checklist window, and impact is a jasmine sticker.
8. **Stat strip.** Four equal stat cards become one berry lead card and three frosted ones.
9. **Copy rules.** Zero em-dashes, one label per intent, numbers from the CV only.

Still banned: a second accent, dark sections, black shadows, a giant background wordmark, floating bubbles, a pulsing status dot, emoji, scroll listeners.

## Content

Data projects (from the project write-ups): BGIS workforce analytics, Altano Bank BI, Wellora marketing analytics, NextWave RFM, RetailPro predictive models, Apex data cleaning and Adidas social listening.

Experience (from the CV): Sidekick workflow mapping, the Codrops CRM build, SW Education client dashboards, and The Muse Crochet restock signals.

Contact: tlinhle05@gmail.com, 0449 921 128, LinkedIn (URL to come).

## Using this system

Load the two Google Fonts, the compiled `tokens.css`, then `components/bundle.css`. Put `.ll` (and `.ll--sticker` for the sticker skin) on the root, and `container-type: inline-size` on the page root. Components are plain HTML with `ll-` classes. Each component's README gives its markup and rules.
