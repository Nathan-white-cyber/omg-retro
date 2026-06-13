"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import { ProductCard } from "@/components/product";
import type { PdpRelatedItem } from "@/lib/pdp/reference-products";
import type { Game } from "@/types";

export interface RelatedProductsProps {
  products: Game[];
  sectionTitle: string;
  viewAllHref: string;
  viewAllLabel: string;
  referenceItems?: PdpRelatedItem[];
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6Z" />
    </svg>
  );
}

function ReferenceCard({ item }: { item: PdpRelatedItem }) {
  const [saved, setSaved] = useState(false);
  const shortPlatform = item.platform === "Nintendo 64" ? "N64" : item.platform;

  return (
    <div className="product-card">
      <div className="card-media">
        <button
          type="button"
          className={`wishlist${saved ? " is-saved" : ""}`}
          aria-label="Save"
          onClick={(event) => {
            event.preventDefault();
            setSaved((value) => !value);
          }}
        >
          <HeartIcon />
        </button>
        <div className="cover" style={{ "--cv": item.color } as CSSProperties}>
          <span className="cover-platform">{shortPlatform}</span>
          <span className="cover-title">{item.title}</span>
        </div>
      </div>
      <span className="card-platform">{item.platform}</span>
      <span className="card-title">{item.title}</span>
      <span className="card-price">{item.price}</span>
      <span className="card-rating"><span className="stars">★★★★★</span> ({item.ratingCount})</span>
    </div>
  );
}

export default function RelatedProducts({ products, sectionTitle, viewAllHref, viewAllLabel, referenceItems }: RelatedProductsProps) {
  if (!referenceItems?.length && !products.length) return null;

  return (
    <section className="ymal-section">
      <div className="pdp-wrap">
        <div className="section-head">
          <h2>{sectionTitle}</h2>
          <a href={viewAllHref} className="see-all">{viewAllLabel} →</a>
        </div>
        {referenceItems?.length ? (
          <div className="product-grid cols-4">
            {referenceItems.map((item) => <ReferenceCard key={item.title} item={item} />)}
          </div>
        ) : (
          <div className="omg-product-grid omg-cols-4">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} game={product} ctaVariant={2} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
