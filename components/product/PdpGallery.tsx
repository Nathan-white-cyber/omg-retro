"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import type { PdpPhoto } from "@/lib/pdp/reference-products";

type ProductType = "game" | "console" | "accessory";

export interface PdpGalleryProps {
  platformColor: string;
  platformTitle: string;
  productTitle: string;
  discountPercent?: number;
  productType: ProductType;
  photos?: [PdpPhoto, PdpPhoto, PdpPhoto, PdpPhoto];
  galleryFlag?: string;
}

const extraPhotos: PdpPhoto[] = [
  { label: "Cartridge Label", color: "#3a3f47" },
  { label: "Box Spine", color: "#26303a" },
  { label: "Manual Pages", color: "#5a3fa0" },
  { label: "Serial Sticker", color: "#454b54" },
];

function defaultPhotos(productType: ProductType, platformColor: string): [PdpPhoto, PdpPhoto, PdpPhoto, PdpPhoto] {
  const labels =
    productType === "console"
      ? ["Console", "Controller", "Ports", "In Box"]
      : productType === "accessory"
        ? ["Front", "Back", "Top", "Plug"]
        : ["Front", "Back", "Cart", "Manual"];

  return [
    { label: labels[0], color: platformColor },
    { label: labels[1], color: platformColor },
    { label: labels[2], color: "#3a3f47" },
    { label: labels[3], color: platformColor },
  ];
}

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {direction === "left" ? <path d="m15 18-6-6 6-6" /> : <path d="m9 18 6-6-6-6" />}
    </svg>
  );
}

export default function PdpGallery({
  platformColor,
  platformTitle,
  productTitle,
  discountPercent = 0,
  productType,
  photos,
  galleryFlag,
}: PdpGalleryProps) {
  const visiblePhotos = photos ?? defaultPhotos(productType, platformColor);
  const allPhotos = useMemo(() => [...visiblePhotos, ...extraPhotos], [visiblePhotos]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const activePhoto = allPhotos[activeIndex] ?? allPhotos[0];
  const flag = galleryFlag ?? (discountPercent > 0 && productType !== "console" ? `${discountPercent}% Off` : "");

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!lightboxOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxOpen(false);
      if (event.key === "ArrowLeft") setActiveIndex((index) => (index - 1 + allPhotos.length) % allPhotos.length);
      if (event.key === "ArrowRight") setActiveIndex((index) => (index + 1) % allPhotos.length);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [allPhotos.length, lightboxOpen]);

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  const lightbox = lightboxOpen ? (
    <div className="lightbox" onClick={() => setLightboxOpen(false)}>
      <button type="button" className="lb-close" onClick={() => setLightboxOpen(false)} aria-label="Close lightbox">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>
      <div className="lb-stage" onClick={(event) => event.stopPropagation()}>
        <div className="lb-main">
          <span className="lb-counter">{activeIndex + 1} / {allPhotos.length}</span>
          <button type="button" className="lb-arrow prev" onClick={() => setActiveIndex((activeIndex - 1 + allPhotos.length) % allPhotos.length)} aria-label="Previous photo">
            <Arrow direction="left" />
          </button>
          <div className="cover omg-cover" style={{ "--cv": activePhoto.color } as CSSProperties}>
            <span className="cover-platform">{platformTitle}</span>
            <span className="cover-title">{productTitle}</span>
          </div>
          <button type="button" className="lb-arrow next" onClick={() => setActiveIndex((activeIndex + 1) % allPhotos.length)} aria-label="Next photo">
            <Arrow direction="right" />
          </button>
        </div>
        <div className="lb-label">{activePhoto.label}</div>
        <div className="lb-strip">
          {allPhotos.map((photo, index) => (
            <button
              key={`${photo.label}-${photo.color}`}
              type="button"
              className={index === activeIndex ? "is-active" : undefined}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show ${photo.label}`}
            >
              <span className="cover" style={{ "--cv": photo.color } as CSSProperties} />
              <span>{photo.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  ) : null;

  return (
    <div className="pdp-gallery">
      <div className="gallery-main">
        {flag ? <span className="gallery-flag">{flag}</span> : null}
        <div className="cover omg-cover" style={{ "--cv": activePhoto.color } as CSSProperties}>
          <span className="cover-platform">{platformTitle}</span>
          <span className="cover-title">{productTitle}</span>
        </div>
        <button type="button" className="gallery-viewall" onClick={() => openLightbox(activeIndex)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />
          </svg>
          View All {allPhotos.length} Photos
        </button>
      </div>
      <div className="gallery-thumbs">
        {visiblePhotos.map((photo, i) => (
          <div
            key={photo.label}
            className={`gallery-thumb${activeIndex === i ? " is-active" : ""}`}
            onClick={() => setActiveIndex(i)}
          >
            <div className="cover omg-cover" style={{ "--cv": photo.color } as CSSProperties} />
            <span className="thumb-label">{photo.label}</span>
            {i === visiblePhotos.length - 1 ? (
              <button
                type="button"
                className="more-badge"
                onClick={(event) => {
                  event.stopPropagation();
                  openLightbox(i);
                }}
              >
                <span className="n">+{allPhotos.length - visiblePhotos.length}</span>
                <span className="t">View All</span>
              </button>
            ) : null}
          </div>
        ))}
      </div>
      {mounted ? createPortal(lightbox, document.body) : null}
    </div>
  );
}
