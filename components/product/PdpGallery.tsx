"use client";

import type { CSSProperties } from "react";
import { useState } from "react";

type ProductType = "game" | "console" | "accessory";

export interface PdpGalleryProps {
  platformColor: string;
  platformTitle: string;
  productTitle: string;
  discountPercent?: number;
  productType: ProductType;
}

export default function PdpGallery({
  platformColor,
  platformTitle,
  productTitle,
  discountPercent = 0,
  productType,
}: PdpGalleryProps) {
  const thumbLabels =
    productType === "console"
      ? ["Console", "Controller", "Ports", "In Box"]
      : productType === "accessory"
        ? ["Front", "Back", "Top", "Plug"]
        : ["Front", "Back", "Cart", "Manual"];
  const thumbColors: [string, string, string, string] = [platformColor, platformColor, "#3a3f47", platformColor];
  const [activeColor, setActiveColor] = useState(platformColor);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="pdp-gallery">
      <div className="gallery-main">
        {discountPercent > 0 && <span className="gallery-flag">{discountPercent}% Off</span>}
        <div className="cover omg-cover" style={{ "--cv": activeColor } as CSSProperties}>
          <span className="cover-platform">{platformTitle}</span>
          <span className="cover-title">{productTitle}</span>
        </div>
      </div>
      <div className="gallery-thumbs">
        {thumbColors.map((color, i) => (
          <div
            key={thumbLabels[i]}
            className={`gallery-thumb${activeIndex === i ? " is-active" : ""}`}
            onClick={() => {
              setActiveColor(color);
              setActiveIndex(i);
            }}
          >
            <div className="cover omg-cover" style={{ "--cv": color } as CSSProperties} />
            <span className="thumb-label">{thumbLabels[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
