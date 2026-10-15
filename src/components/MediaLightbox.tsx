import { useEffect, useState } from "react";
import Lightbox, { type Slide } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "./MediaLightbox.css";

import type { MediaAsset } from "../lib/media";
import { LIGHTBOX_EVENT, type LightboxOpenDetail } from "../lib/lightbox";

// Ported from the quin frontend (images + documents). Lynn's resume opens here as a PDF,
// and photos dropped into the photo slots open full size.
function toSlide(asset: MediaAsset): Slide {
  const meta = { title: asset.title, description: asset.description ?? asset.caption };
  if (asset.kind === "image") return { type: "image", src: asset.path, alt: asset.title ?? "", ...meta };
  return { type: "doc", asset, ...meta };
}

function DocSlide({ asset }: { asset: MediaAsset }) {
  const preview = asset.kind === "pdf" ? asset.preview : undefined;
  const download = asset.kind === "pdf" ? asset.download : undefined;
  return (
    <div className={`mlb-doc${preview ? " mlb-doc--page" : ""}`}>
      {preview ? (
        <div className="mlb-doc-scroll">
          <img src={preview} alt={asset.title ?? "Document page"} />
        </div>
      ) : (
        <iframe src={asset.path} title={asset.title ?? "Document"} />
      )}
      <div className="mlb-doc-actions">
        {download && <a className="mlb-doc-open" href={asset.path} download={download}>download PDF</a>}
        <a className="mlb-doc-open mlb-doc-open--ghost" href={asset.path} target="_blank" rel="noopener">open in a new tab</a>
      </div>
    </div>
  );
}

export default function MediaLightbox() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [slides, setSlides] = useState<Slide[]>([]);

  useEffect(() => {
    function onOpen(e: Event) {
      const detail = (e as CustomEvent<LightboxOpenDetail>).detail;
      if (!detail?.assets?.length) return;
      setSlides(detail.assets.map(toSlide));
      setIndex(Math.max(0, Math.min(detail.assets.length - 1, detail.index)));
      setOpen(true);
    }
    window.addEventListener(LIGHTBOX_EVENT, onOpen);
    return () => window.removeEventListener(LIGHTBOX_EVENT, onOpen);
  }, []);

  const current = slides[index] as (Slide & { title?: string; description?: string }) | undefined;

  return (
    <Lightbox
      open={open}
      close={() => setOpen(false)}
      index={index}
      on={{ view: ({ index: i }) => setIndex(i) }}
      slides={slides}
      carousel={{ finite: true, padding: "32px", spacing: "16px" }}
      className="mlb-root"
      controller={{ closeOnBackdropClick: true }}
      styles={{
        root: {
          "--yarl__color_backdrop": "rgba(17, 17, 68, 0.82)",
          "--yarl__color_button": "rgba(244, 241, 236, 0.9)",
          "--yarl__color_button_active": "#F4F1EC",
        },
      }}
      render={{
        slide: ({ slide }) => (slide.type === "doc" ? <DocSlide asset={slide.asset} /> : undefined),
        // One slide (the resume): no prev/next arrows.
        ...(slides.length <= 1 ? { buttonPrev: () => null, buttonNext: () => null } : {}),
        controls: () =>
          current?.title ? (
            <div className="mlb-caption" aria-live="polite">
              <span className="mlb-caption-title">{current.title}</span>
              {current.description && <span className="mlb-caption-desc">{current.description}</span>}
            </div>
          ) : null,
      }}
    />
  );
}
