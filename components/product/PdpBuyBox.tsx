"use client";

import { useMemo, useState } from "react";
import { useCartStore } from "@/lib/store/cart-store";
import { getPlatformCssClass, getPlatformGlyph } from "@/lib/utils/platform";
import type { PdpProduct, PdpProductVariant } from "@/lib/medusa/products";
import type { Game, ProductCondition, ProductVendor } from "@/types";
import AddonConfigurator from "./AddonConfigurator";
import CompatChips from "./CompatChips";

type ProductType = "game" | "console" | "accessory";

export interface PdpBuyBoxProps {
  product: PdpProduct;
  productType: ProductType;
  platform: string;
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function vendorFromPlatform(platform: string): ProductVendor {
  const lower = platform.toLowerCase();
  if (lower.includes("playstation") || lower.includes("ps")) return "playstation";
  if (lower.includes("xbox")) return "xbox";
  if (lower.includes("sega") || lower.includes("dreamcast") || lower.includes("genesis")) return "sega";
  return "nintendo";
}

function conditionFromTitle(title: string): ProductCondition {
  if (title === "CIB" || title === "Loose" || title === "New/Sealed") return title;
  if (title.toLowerCase().includes("sealed")) return "New/Sealed";
  return "Loose";
}

export default function PdpBuyBox({ product, productType, platform }: PdpBuyBoxProps) {
  const addItem = useCartStore((state) => state.addItem);
  const variants = product.variants ?? [];
  const fallbackVariant: PdpProductVariant = { id: `${product.id}:default`, title: "Loose", prices: [{ amount: 0 }] };
  const displayVariants = variants.length ? variants : [fallbackVariant];
  const [selectedVariantId, setSelectedVariantId] = useState(displayVariants[0]?.id ?? "");
  const selectedVariant = displayVariants.find((variant) => variant.id === selectedVariantId) ?? displayVariants[0];
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const priceCents = selectedVariant?.prices?.[0]?.amount ?? 0;
  const price = priceCents / 100;
  const compareAmt = selectedVariant?.compare_at_price ?? 0;
  const comparePrice = typeof compareAmt === "number" && compareAmt > 0 ? compareAmt / 100 : null;
  const saveAmt = comparePrice && comparePrice > price ? comparePrice - price : 0;
  const sku = (product.metadata?.sku as string) ?? product.handle;
  const stock = selectedVariant?.inventory_quantity ?? 10;
  const platformClass = getPlatformCssClass(platform);
  const { text: glyphText, isPs } = getPlatformGlyph(platform);

  const cartGame = useMemo<Game>(() => {
    const condition = conditionFromTitle(selectedVariant?.title ?? "Loose");

    return {
      id: product.id,
      title: product.title,
      slug: product.handle,
      platform,
      system: platform,
      systemCode: sku,
      condition,
      price: priceCents,
      originalPrice: compareAmt || undefined,
      coverColor: (product.metadata?.coverColor as string | undefined) ?? "#b8902f",
      images: product.images.map((image) => image.url),
      rating: 4.9,
      reviewCount: 1284,
      stock,
      tags: [],
      vendor: vendorFromPlatform(platform),
    };
  }, [compareAmt, platform, priceCents, product, selectedVariant?.title, sku, stock]);

  const addToCart = () => {
    for (let index = 0; index < qty; index += 1) {
      addItem(cartGame, selectedVariant?.title);
    }
    setAdded(true);
    window.setTimeout(() => setAdded(false), 850);
  };

  return (
    <div className="pdp-buy">
      <span className="buy-platform">{platform}</span>
      <h1 className="buy-title">{product.title}</h1>
      <div className="buy-meta">
        <span className="card-rating" aria-label="5 out of 5 stars">
          <span className="stars">{"\u2605\u2605\u2605\u2605\u2605"}</span>
        </span>
        <span>4.9</span>
        <span className="meta-sep" />
        <a href="#reviews" className="review-link">1,284 reviews</a>
        <span className="stock-pill">In Stock</span>
        <span className="sku">SKU: {sku}</span>
      </div>

      <div className="buy-price">
        <span className="price-now">${price.toFixed(2)}</span>
        {comparePrice && <span className="price-was">${comparePrice.toFixed(2)}</span>}
        {saveAmt > 0 && <span className="badge-off">Save ${saveAmt.toFixed(0)}</span>}
      </div>

      {productType === "game" && (
        <div className="buy-field">
          <span className="field-label">
            Condition <span className="field-hint">All conditions tested & guaranteed</span>
          </span>
          <div className="condition-opts">
            {displayVariants.map((variant) => {
              const vPrice = (variant.prices?.[0]?.amount ?? 0) / 100;
              const descMap: Record<string, string> = {
                Loose: "Cartridge only, tested & cleaned",
                CIB: "Complete in box - manual + case",
                Sealed: "New, factory sealed",
              };

              return (
                <button
                  key={variant.id}
                  className="condition-opt"
                  type="button"
                  aria-pressed={selectedVariantId === variant.id}
                  onClick={() => setSelectedVariantId(variant.id)}
                >
                  <span className="opt-name">{variant.title}</span>
                  <span className="opt-desc">{descMap[variant.title] ?? ""}</span>
                  <span className="opt-price">${vPrice.toFixed(2)}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {productType === "console" && (
        <>
          <p className="price-note">Console ${price.toFixed(2)} - controller included free</p>
          <div className="incl-pill">
            <span className="incl-ico"><CheckIcon /></span>
            <span className="incl-text">
              <strong>Controller Included</strong>
              <span>Ships with one controller and all necessary cables.</span>
            </span>
            <span className="incl-tag">Free</span>
          </div>
          <AddonConfigurator />
        </>
      )}

      {productType === "accessory" && <CompatChips platform={platform} />}

      <div className="buy-field">
        <span className="field-label">Quantity</span>
        <div className="buy-controls">
          <div className="qty">
            <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity">-</button>
            <input value={qty} readOnly aria-label="Quantity" />
            <button type="button" onClick={() => setQty(Math.min(99, qty + 1))} aria-label="Increase quantity">+</button>
          </div>
          <span className={platformClass}>
            <button
              type="button"
              className={`btn-add ctrl-combo ripple${added ? " added" : ""}`}
              onClick={addToCart}
            >
              <span className="ctrl-icon">{isPs ? <span className="ps-cross">{"\u2715"}</span> : glyphText}</span>
              {added ? " Added! \u2713" : " Add to Cart"}
            </button>
          </span>
          <button type="button" className="btn-icon" aria-label="Add to wishlist">{"\u2661"}</button>
        </div>
      </div>

      <a href="/checkout" className="btn-buynow">Buy It Now</a>

      <ul className="buy-assurances">
        <li>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2 4 5v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V5l-8-3Z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
          <span><strong>100% Authentic</strong>Original cartridge. No reproductions.</span>
        </li>
        <li>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="7" width="20" height="11" rx="3" />
            <circle cx="8" cy="12.5" r="1.3" />
            <path d="M16 11h.01M19 13h.01" />
          </svg>
          <span><strong>Tested &amp; Cleaned</strong>{"Plays perfectly \u2014 verified before shipping."}</span>
        </li>
        <li>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2 4 5v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V5l-8-3Z" />
          </svg>
          <span><strong>1-Year Warranty</strong>We stand behind every purchase.</span>
        </li>
        <li>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 5h13v11H1zM14 8h4l4 4v4h-8" />
            <circle cx="6" cy="18" r="2" />
            <circle cx="18" cy="18" r="2" />
          </svg>
          <span><strong>Free U.S. Shipping</strong>{"On orders over $75. Ships in 1\u20132 days."}</span>
        </li>
      </ul>
    </div>
  );
}
