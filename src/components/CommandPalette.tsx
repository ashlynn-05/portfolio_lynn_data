import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";

// Ported from the quin frontend's palette. quin searched Payload; Lynn's site is
// static, so the index (pages + case studies) is built at compile time and passed in.
export interface PaletteItem {
  label: string;
  hint: string;
  url: string;
  kind: "page" | "work" | "action";
  action?: "copy-email" | "resume";
}

interface Props {
  items: PaletteItem[];
  email: string;
}

export const CMDK_EVENT = "cmdk:open";

export default function CommandPalette({ items, email }: Props) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return items;
    return items.filter((i) => `${i.label} ${i.hint} ${i.kind}`.toLowerCase().includes(term));
  }, [q, items]);

  const show = useCallback(() => {
    lastFocus.current = document.activeElement as HTMLElement | null;
    setQ("");
    setActive(0);
    setOpen(true);
  }, []);
  const hide = useCallback(() => {
    setOpen(false);
    lastFocus.current?.focus?.();
  }, []);

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        open ? hide() : show();
      }
    };
    const onOpen = () => show();
    window.addEventListener("keydown", onKey);
    window.addEventListener(CMDK_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(CMDK_EVENT, onOpen);
    };
  }, [open, show, hide]);

  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  const run = useCallback(
    async (item: PaletteItem) => {
      if (item.action === "copy-email") {
        try {
          await navigator.clipboard.writeText(email);
          setToast("Email copied");
        } catch {
          setToast(email);
        }
        setTimeout(() => setToast(""), 1800);
        return;
      }
      if (item.action === "resume") {
        hide();
        document.querySelector<HTMLAnchorElement>("[data-resume]")?.click();
        return;
      }
      if (/^https?:/.test(item.url)) {
        hide();
        window.open(item.url, "_blank", "noopener,noreferrer");
        return;
      }
      window.location.href = item.url;
    },
    [email, hide],
  );

  if (!open) return null;

  const onListKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") { e.preventDefault(); hide(); }
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(results.length - 1, a + 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); }
    if (e.key === "Enter" && results[active]) { e.preventDefault(); run(results[active]); }
  };

  return (
    <div className="cmdk" role="dialog" aria-modal="true" aria-label="Jump anywhere" onClick={hide}>
      <div className="cmdk__panel window" onClick={(e) => e.stopPropagation()} onKeyDown={onListKey}>
        <div className="window__bar">
          <div className="window__dots" aria-hidden="true"><span></span><span></span><span></span></div>
          <span className="window__path">~/lynn/search</span>
          <span className="window__meta">esc to close</span>
        </div>
        <label className="sr" htmlFor="cmdk-input">Find a page, a case study or an action</label>
        <input
          id="cmdk-input"
          ref={inputRef}
          className="cmdk__input"
          placeholder="Find a folder, a page or an action"
          value={q}
          onChange={(e) => { setQ(e.target.value); setActive(0); }}
          autoComplete="off"
          role="combobox"
          aria-expanded="true"
          aria-controls="cmdk-list"
          aria-activedescendant={results[active] ? `cmdk-${active}` : undefined}
        />
        <ul className="cmdk__list" id="cmdk-list" role="listbox">
          {results.map((r, i) => (
            <li key={`${r.kind}-${r.label}`} id={`cmdk-${i}`} role="option" aria-selected={i === active}>
              <button type="button" className={i === active ? "is-active" : ""} onMouseEnter={() => setActive(i)} onClick={() => run(r)}>
                <span className={`cmdk__kind k-${r.kind}`}>{r.kind}</span>
                <span className="cmdk__label">{r.label}</span>
                <span className="cmdk__hint">{r.hint}</span>
              </button>
            </li>
          ))}
          {!results.length && (
            <li className="cmdk__empty">Nothing called "{q.trim()}". Try "crochet", "codrops" or "life".</li>
          )}
        </ul>
        {toast && <p className="cmdk__toast" role="status">{toast}</p>}
      </div>
    </div>
  );
}
