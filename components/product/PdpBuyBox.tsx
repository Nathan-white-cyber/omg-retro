"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { useCartStore } from "@/lib/store/cart-store";
import { formatPrice } from "@/lib/utils/format";
import { getPlatformCssClass, getPlatformGlyph } from "@/lib/utils/platform";
import type { PdpProduct, PdpProductVariant } from "@/lib/medusa/products";
import type { Game, ProductCondition, ProductVendor } from "@/types";
import AddonConfigurator from "./AddonConfigurator";
import CompatChips from "./CompatChips";
import ConditionSelector from "./ConditionSelector";

type ProductType = "game" | "console" | "accessory";

export interface PdpBuyBoxProps {
  product: PdpProduct;
  productType: ProductType;
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 2 4 5v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V5l-8-3Z" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M14 18V6H3v12h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2v-6h-4l-3-4v10h1" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
    </svg>
  );
}

function priceForVariant(variant?: PdpProductVariant) {
  return variant?.calculated_price?.calculated_amount ?? variant?.prices[0]?.amount ?? 0;
}

function originalForVariant(variant?: PdpProductVariant) {
  return variant?.calculated_price?.original_amount;
}

function metadataString(metadata: Record<string, unknown> | null | undefined, key: string) {
  const value = metadata?.[key];
  return typeof value === "string" ? value : undefined;
}

function platformTitle(product: PdpProduct) {
  return metadataString(product.metadata, "platform") ?? product.collection?.title ?? "";
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

export default function PdpBuyBox({ product, productType }: PdpBuyBoxProps) {
  const addItem = useCartStore((state) => state.addItem);
  const variants = product.variants.length ? product.variants : [{ id: `${product.id}:default`, title: "Loose", prices: [{ amount: 0 }] }];
  const [selectedVariantId, setSelectedVariantId] = useState(variants[0].id);
  const [selectedPrice, setSelectedPrice] = useState(priceForVariant(variants[0]));
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const selectedVariant = variants.find((variant) => variant.id === selectedVariantId) ?? variants[0];
  const originalPrice = originalForVariant(selectedVariant);
  const collectionTitle = platformTitle(product);
  const platformClass = getPlatformCssClass(collectionTitle);
  const { text: glyphText, isPs } = getPlatformGlyph(collectionTitle);
  const sku = metadataString(product.metadata, "sku") ?? product.handle;
  const stock = selectedVariant.inventory_quantity ?? 10;
  const saveAmount = originalPrice && originalPrice > selectedPrice ? originalPrice - selectedPrice : 0;

  const cartGame = useMemo<Game>(() => {
    const condition = conditionFromTitle(selectedVariant.title);

    return {
      id: product.id,
      title: product.title,
      slug: product.handle,
      platform: collectionTitle,
      system: collectionTitle,
      systemCode: sku,
      condition,
      price: selectedPrice,
      originalPrice,
      coverColor: metadataString(product.metadata, "coverColor") ?? "#1fa34a",
      images: product.images.map((image) => image.url),
      rating: 4.9,
      reviewCount: 1284,
      stock,
      tags: [],
      vendor: vendorFromPlatform(collectionTitle),
    };
  }, [collectionTitle, originalPrice, product, selectedPrice, selectedVariant.title, sku, stock]);

  const handleConditionSelect = useCallback((variantId: string, price: number) => {
    setSelectedVariantId(variantId);
    setSelectedPrice(price);
  }, []);

  const addToCart = () => {
    for (let index = 0; index < qty; index += 1) {
      addItem(cartGame, selectedVariant.title);
    }
    setAdded(true);
    window.setTimeout(() => setAdded(false), 850);
  };

  return (
    <div className="pdp-buy">
      <span className="buy-platform">{collectionTitle}</span>
      <h1 className="buy-title">{product.title}</h1>
      <div className="buy-meta">
        <span className="card-rating" aria-label="5 out of 5 stars">
          <span className="stars">★★★★★</span>
        </span>
        <span>4.9</span>
        <span className="meta-sep" />
        <a href="#reviews" className="review-link">1,284 reviews</a>
        <span className="stock-pill">In Stock</span>
        <span className="sku">SKU {sku}</span>
      </div>

      <div className="buy-price">
        <span className="price-now">{formatPrice(selectedPrice)}</span>
        {saveAmount > 0 && originalPrice ? <span className="price-was">{formatPrice(originalPrice)}</span> : null}
        {saveAmount > 0 ? <span className="badge-off">Save {formatPrice(saveAmount)}</span> : null}
      </div>

      {productType === "game" ? (
        <ConditionSelector variants={variants} onSelect={handleConditionSelect} />
      ) : null}

      {productType === "console" ? (
        <>
          <p className="price-note">Console {formatPrice(selectedPrice)} · controller included free</p>
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
      ) : null}

      {productType === "accessory" ? <CompatChips platform={collectionTitle} /> : null}

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
          <button type="button" className="btn-icon" aria-label="Add to wishlist">♡</button>
        </div>
      </div>

      <Link href="/checkout" className="btn-buynow">Buy It Now</Link>

      <ul className="buy-assurances">
        <li><ShieldIcon /><span><strong>Authentic</strong> original hardware and games.</span></li>
        <li><CheckIcon /><span><strong>Tested & Cleaned</strong> before it ships.</span></li>
        <li><ShieldIcon /><span><strong>1-Year Warranty</strong> included.</span></li>
        <li><TruckIcon /><span><strong>Free U.S. Shipping</strong> on orders $75+.</span></li>
      </ul>
    </div>
  );
}
