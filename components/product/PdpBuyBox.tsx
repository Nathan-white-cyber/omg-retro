"use client";

import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { useCartStore } from "@/lib/store/cart-store";
import type { PdpProduct, PdpProductVariant } from "@/lib/medusa/products";
import type { PdpReferenceProduct } from "@/lib/pdp/reference-products";
import { getPlatformCssClass, getPlatformGlyph } from "@/lib/utils/platform";
import type { Game, ProductCondition, ProductVendor } from "@/types";
import CompatChips from "./CompatChips";

type ProductType = "game" | "console" | "accessory";
type AddonId = "oem" | "third";

export interface PdpBuyBoxProps {
  product: PdpProduct;
  productType: ProductType;
  platform: string;
  reference?: PdpReferenceProduct;
}

const addonColors = [
  { name: "Classic Grey", color: "#9a9ea3" },
  { name: "Smoke Black", color: "#1c1c22" },
  { name: "Atomic Purple", color: "#6a4fb0" },
  { name: "Jungle Green", color: "#1f8a4c" },
  { name: "Watermelon Red", color: "#d23b2c" },
  { name: "Ice Blue", color: "#3a7bd5" },
];

const addonDefs: Record<AddonId, { name: string; desc: string; price: number; defaultColor: string }> = {
  oem: {
    name: "Official OEM Controller",
    desc: "Genuine Nintendo pad - tested & cleaned",
    price: 20,
    defaultColor: "Classic Grey",
  },
  third: {
    name: "Extra 3rd-Party Controller",
    desc: "Great-value pad for players 2-4",
    price: 14.99,
    defaultColor: "Smoke Black",
  },
};

function fmt(value: number) {
  return `$${value.toFixed(2)}`;
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

function variantPrice(variant?: PdpProductVariant) {
  return (variant?.prices?.[0]?.amount ?? 0) / 100;
}

function AddonCard({
  id,
  isOn,
  qty,
  colorName,
  onToggle,
  onQty,
  onColor,
}: {
  id: AddonId;
  isOn: boolean;
  qty: number;
  colorName: string;
  onToggle: () => void;
  onQty: (value: number) => void;
  onColor: (value: string) => void;
}) {
  const addon = addonDefs[id];
  const colors = id === "third" ? [addonColors[1], addonColors[0], ...addonColors.slice(2)] : addonColors;

  return (
    <div className={`addon${isOn ? " is-on" : ""}`} data-addon={id} data-price={addon.price}>
      <div className="addon-head" onClick={onToggle}>
        <span className="addon-check"><CheckIcon /></span>
        <span className="addon-info">
          <span className="addon-name">{addon.name}</span>
          <span className="addon-desc">{addon.desc}</span>
        </span>
        <span className="addon-price">+{fmt(addon.price)} <small>each</small></span>
      </div>
      <div className="addon-body">
        <div className="addon-row">
          <span className="addon-row-label">Qty</span>
          <div className="qty-sm" onClick={(event) => event.stopPropagation()}>
            <button type="button" data-step="-1" onClick={() => onQty(Math.max(1, qty - 1))}>-</button>
            <input type="number" value={qty} min={1} max={4} readOnly />
            <button type="button" data-step="1" onClick={() => onQty(Math.min(4, qty + 1))}>+</button>
          </div>
        </div>
        <div className="addon-row">
          <span className="addon-row-label">Color</span>
          <div className="swatches" onClick={(event) => event.stopPropagation()}>
            {colors.map((swatch) => (
              <button
                key={`${id}-${swatch.name}`}
                type="button"
                className={`swatch${swatch.name === colorName ? " is-sel" : ""}`}
                style={{ "--c": swatch.color } as CSSProperties}
                data-name={swatch.name}
                onClick={() => onColor(swatch.name)}
                aria-label={swatch.name}
              />
            ))}
            <span className="swatch-name">Color: <b className="color-out">{colorName}</b></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PdpBuyBox({ product, productType, platform, reference }: PdpBuyBoxProps) {
  const addItem = useCartStore((state) => state.addItem);
  const variants = product.variants ?? [];
  const fallbackVariant: PdpProductVariant = { id: `${product.id}:default`, title: "Loose", prices: [{ amount: 0 }] };
  const displayVariants = variants.length ? variants : [fallbackVariant];
  const initialVariantId = productType === "game" ? displayVariants.find((variant) => variant.title === "CIB")?.id ?? displayVariants[0]?.id ?? "" : displayVariants[0]?.id ?? "";
  const [selectedVariantId, setSelectedVariantId] = useState(initialVariantId);
  const selectedVariant = displayVariants.find((variant) => variant.id === selectedVariantId) ?? displayVariants[0];
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [wishlistSaved, setWishlistSaved] = useState(false);
  const [addons, setAddons] = useState<Record<AddonId, { isOn: boolean; qty: number; color: string }>>({
    oem: { isOn: false, qty: 1, color: "Classic Grey" },
    third: { isOn: false, qty: 1, color: "Smoke Black" },
  });
  const basePrice = variantPrice(selectedVariant);
  const compareAmt = selectedVariant?.compare_at_price ?? 0;
  const comparePrice = typeof compareAmt === "number" && compareAmt > 0 ? compareAmt / 100 : null;
  const consoleAddonTotal = productType === "console"
    ? (Object.entries(addons) as Array<[AddonId, (typeof addons)[AddonId]]>).reduce(
        (total, [id, addon]) => total + (addon.isOn ? addonDefs[id].price * addon.qty : 0),
        0,
      )
    : 0;
  const displayPrice = productType === "console" ? basePrice * qty + consoleAddonTotal : basePrice;
  const saveAmt = comparePrice && comparePrice > basePrice ? comparePrice - basePrice : 0;
  const sku = reference?.sku ?? (product.metadata?.sku as string) ?? product.handle;
  const rating = reference?.rating ?? 4.9;
  const reviewCount = reference?.reviewCount ?? 1284;
  const stock = selectedVariant?.inventory_quantity ?? 10;
  const platformClass = getPlatformCssClass(platform);
  const { text: glyphText, isPs } = getPlatformGlyph(platform);

  const noteParts = [`Console <b>${fmt(basePrice * qty)}</b>`];
  (Object.entries(addons) as Array<[AddonId, (typeof addons)[AddonId]]>).forEach(([id, addon]) => {
    if (addon.isOn) noteParts.push(`${addon.qty}x ${addonDefs[id].name} <b>${fmt(addonDefs[id].price * addon.qty)}</b>`);
  });
  const consoleNote = `${noteParts.join(" · ")}${noteParts.length === 1 ? " · controller included free" : ""}`;

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
      price: Math.round(displayPrice * 100),
      originalPrice: compareAmt || undefined,
      coverColor: reference?.coverColor ?? (product.metadata?.coverColor as string | undefined) ?? "#b8902f",
      images: product.images.map((image) => image.url),
      rating,
      reviewCount,
      stock,
      tags: [],
      vendor: vendorFromPlatform(platform),
    };
  }, [compareAmt, displayPrice, platform, product, rating, reference?.coverColor, reviewCount, selectedVariant?.title, sku, stock]);

  const addToCart = () => {
    if (added) return;
    for (let index = 0; index < qty; index += 1) addItem(cartGame, selectedVariant?.title);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div className="pdp-buy">
      <span className="buy-platform">{platform}</span>
      <h1 className="buy-title">{product.title}</h1>
      <div className="buy-meta">
        <span className="card-rating" aria-label={`${rating} out of 5 stars`}>
          <span className="stars">{"\u2605\u2605\u2605\u2605\u2605"}</span>
        </span>
        <span>{rating.toFixed(1)}</span>
        <span className="meta-sep" />
        <a href="#reviews" className="review-link">{reviewCount.toLocaleString()} reviews</a>
        <span className="meta-sep" />
        <span className="stock-pill">In Stock</span>
        <span className="meta-sep" />
        <span className="sku">SKU: {sku}</span>
      </div>

      <div className="buy-price">
        <span className="price-now" id="buyPrice">{fmt(displayPrice)}</span>
        {productType === "console" ? (
          <span className="price-note" id="priceNote" dangerouslySetInnerHTML={{ __html: consoleNote }} />
        ) : (
          <>
            {comparePrice ? <span className="price-was" id="buyWas">{fmt(comparePrice)}</span> : null}
            {saveAmt > 0 ? <span className="badge-off" id="buySave">Save ${saveAmt.toFixed(0)}</span> : null}
          </>
        )}
      </div>

      {productType === "game" ? (
        <div className="buy-field">
          <span className="field-label">
            Condition <span className="field-hint">All conditions tested & guaranteed</span>
          </span>
          <div className="condition-opts" id="condOpts">
            {displayVariants.map((variant) => {
              const vPrice = variantPrice(variant);
              const vCompare = typeof variant.compare_at_price === "number" ? variant.compare_at_price / 100 : "";
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
                  data-price={vPrice}
                  data-was={vCompare}
                  data-label={variant.title}
                  onClick={() => setSelectedVariantId(variant.id)}
                >
                  <span className="opt-name">{variant.title}</span>
                  <span className="opt-desc">{descMap[variant.title] ?? ""}</span>
                  <span className="opt-price">{fmt(vPrice)}</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {productType === "console" ? (
        <>
          <div className="incl-pill">
            <span className="incl-ico"><CheckIcon /></span>
            <span className="incl-text">
              <strong>3rd-Party Controller Included</strong>
              <span>One tested controller ships with every console - no extra charge.</span>
            </span>
            <span className="incl-tag">Included</span>
          </div>
          <div className="buy-field">
            <span className="field-label">Add Controllers <span className="field-hint">Optional - build your setup</span></span>
            <div className="addon-list" id="addonList">
              {(Object.keys(addonDefs) as AddonId[]).map((id) => (
                <AddonCard
                  key={id}
                  id={id}
                  isOn={addons[id].isOn}
                  qty={addons[id].qty}
                  colorName={addons[id].color}
                  onToggle={() => setAddons((state) => ({ ...state, [id]: { ...state[id], isOn: !state[id].isOn } }))}
                  onQty={(value) => setAddons((state) => ({ ...state, [id]: { ...state[id], qty: value } }))}
                  onColor={(value) => setAddons((state) => ({ ...state, [id]: { ...state[id], color: value } }))}
                />
              ))}
            </div>
          </div>
        </>
      ) : null}

      {productType === "accessory" ? <CompatChips platform={platform} /> : null}

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
              style={{ pointerEvents: added ? "none" : undefined }}
            >
              <span className="ctrl-icon">{added ? <CheckIcon /> : isPs ? <span className="ps-cross">{"\u2715"}</span> : glyphText}</span>
              {added ? " Added!" : " Add to Cart"}
            </button>
          </span>
          <button
            type="button"
            id="wishBtn"
            className={`btn-icon${wishlistSaved ? " is-saved" : ""}`}
            aria-label="Add to wishlist"
            onClick={() => setWishlistSaved((saved) => !saved)}
          >
            {"\u2661"}
          </button>
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
          <span><strong>Tested &amp; Cleaned</strong>Plays perfectly - verified before shipping.</span>
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
          <span><strong>Free U.S. Shipping</strong>On orders over $75. Ships in 1-2 days.</span>
        </li>
      </ul>
    </div>
  );
}
