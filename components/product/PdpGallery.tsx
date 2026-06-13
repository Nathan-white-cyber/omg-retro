"use client";

import type { CSSProperties } from "react";
import { useMemo, useState } from "react";

type ProductType = "game" | "console" | "accessory";

export interface PdpGalleryProps {
  platformColor: string;
  platformTitle: string;
  productTitle: string;
  discountPercent?: number;
  productType: ProductType;
}

function clampColor(value: number) {
  return Math.max(0, Math.min(255, value));
}

function shiftHex(hex: string, amount: number) {
  const normalized = hex.replace("#", "");
  if (!/^[0-9a-f]{6}$/i.test(normalized)) return hex;

  const r = clampColor(Number.parseInt(normalized.slice(0, 2), 16) + amount);
  const g = clampColor(Number.parseInt(normalized.slice(2, 4), 16) + amount);
  const b = clampColor(Number.parseInt(normalized.slice(4, 6), 16) + amount);

  return `#${[r, g, b].map((part) => part.toString(16).padStart(2, "0")).join("")}`;
}

function labelsForType(productType: ProductType) {
  if (productType === "console") return ["Console", "Controller", "Ports", "In Box"];
  if (productType === "accessory") return ["Front", "Back", "Top", "Plug"];
  return ["Front", "Back", "Cart", "Manual"];
}

export default function PdpGallery({
  platformColor,
  platformTitle,
  productTitle,
  discountPercent = 0,
  productType,
}: PdpGalleryProps) {
  const colors = useMemo(
    () => [platformColor, shiftHex(platformColor, -20), shiftHex(platformColor, -40), shiftHex(platformColor, 20)],
    [platformColor],
  );
  const labels = labelsForType(productType);
  const [activeIndex, setActiveIndex] = useState(0);
  const showFlag = productType !== "console" && discountPercent > 0;

  return (
    <div className="pdp-gallery">
      <div className="gallery-main">
        {showFlag ? <span className="gallery-flag">{discountPercent}% Off</span> : null}
        <div className="omg-cover" style={{ "--cv": colors[activeIndex] } as CSSProperties}>
          <span className="omg-cover-platform">{platformTitle}</span>
          <span className="omg-cover-title">{productTitle}</span>
        </div>
      </div>
      <div className="gallery-thumbs">
        {labels.map((label, index) => (
          <button
            key={label}
            type="button"
            className={`gallery-thumb${index === activeIndex ? " is-active" : ""}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Show ${label} view`}
          >
            <div className="omg-cover" style={{ "--cv": colors[index] } as CSSProperties}>
              <span className="omg-cover-title">{label}</span>
            </div>
            <span className="thumb-label">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
