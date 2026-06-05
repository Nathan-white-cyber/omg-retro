"use client";

import { useMemo, useState } from "react";
import { PdpAddToCartButton } from "@/components/cart/PdpAddToCartButton";
import { ConditionBadge } from "@/components/product/ConditionBadge";
import { PriceDisplay } from "@/components/product/PriceDisplay";
import { WishlistHeart } from "@/components/product/WishlistHeart";
import { formatPrice } from "@/lib/utils/format";
import type { Game, ProductCondition, ProductVariantOption } from "@/types";

interface ProductInfoProps {
  game: Game;
}

function fallbackVariants(game: Game): ProductVariantOption[] {
  const loosePrice =
    game.condition === "Loose" ? game.price : Math.max(599, Math.round(game.price * 0.74));
  const cibPrice =
    game.condition === "CIB" ? game.price : Math.max(game.price + 500, Math.round(game.price * 1.28));

  return [
    { type: "CIB", price: cibPrice, stock: game.condition === "CIB" ? game.stock : game.stock + 3 },
    { type: "Loose", price: loosePrice, stock: game.condition === "Loose" ? game.stock : game.stock + 5 },
  ];
}

function ConditionSelector({
  variants,
  selected,
  onSelect,
}: {
  variants: ProductVariantOption[];
  selected: ProductVariantOption;
  onSelect: (variant: ProductVariantOption) => void;
}) {
  return (
    <div>
      <h3 className="font-body text-[12px] font-extrabold uppercase tracking-[0.08em] text-text-dark-muted">
        Condition
      </h3>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {variants.map((variant) => {
          const active = variant.type === selected.type;

          return (
            <button
              key={variant.type}
              type="button"
              className={`rounded-card border p-3 text-left transition ${
                active
                  ? "border-brand-red bg-brand-red/10 ring-2 ring-brand-red/15"
                  : "border-border-cream bg-white hover:border-brand-red/60"
              }`}
              onClick={() => onSelect(variant)}
              aria-pressed={active}
            >
              <span className="flex items-center justify-between gap-2">
                <ConditionBadge condition={variant.type as ProductCondition} />
                <span className="font-body text-sm font-extrabold text-brand-red">
                  {formatPrice(variant.price)}
                </span>
              </span>
              <span className="mt-2 block text-[11px] font-bold uppercase tracking-[0.06em] text-text-dark-muted">
                {variant.stock} in stock
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ShippingReturnsAccordion() {
  return (
    <div className="divide-y divide-border-cream rounded-card border border-border-cream bg-white">
      <details open className="group">
        <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 font-body text-[12px] font-extrabold uppercase tracking-[0.08em] text-text-dark">
          Tested & Guaranteed
          <span className="text-brand-red transition group-open:rotate-45">+</span>
        </summary>
        <p className="px-4 pb-4 text-sm leading-relaxed text-text-dark-muted">
          Every game is cleaned, tested, and backed by our 1-year warranty.
        </p>
      </details>
      <details className="group">
        <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 font-body text-[12px] font-extrabold uppercase tracking-[0.08em] text-text-dark">
          Shipping
          <span className="text-brand-red transition group-open:rotate-45">+</span>
        </summary>
        <p className="px-4 pb-4 text-sm leading-relaxed text-text-dark-muted">
          Fast U.S. shipping with free shipping unlocked on orders over $75.
        </p>
      </details>
      <details className="group">
        <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 font-body text-[12px] font-extrabold uppercase tracking-[0.08em] text-text-dark">
          Returns
          <span className="text-brand-red transition group-open:rotate-45">+</span>
        </summary>
        <p className="px-4 pb-4 text-sm leading-relaxed text-text-dark-muted">
          If something is not right, contact us and we will help make it right.
        </p>
      </details>
    </div>
  );
}

export function ProductInfo({ game }: ProductInfoProps) {
  const variants = useMemo(() => game.conditionVariants ?? fallbackVariants(game), [game]);
  const initialVariant =
    variants.find((variant) => variant.type === game.condition) ?? variants[0] ?? {
      type: game.condition,
      price: game.price,
      stock: game.stock,
    };
  const [selectedVariant, setSelectedVariant] = useState<ProductVariantOption>(initialVariant);

  const selectedGame = useMemo<Game>(
    () => ({
      ...game,
      condition: selectedVariant.type as ProductCondition,
      price: selectedVariant.price,
      stock: selectedVariant.stock,
    }),
    [game, selectedVariant],
  );
  const showOriginal = selectedVariant.type === game.condition ? game.originalPrice : undefined;
  const saving =
    showOriginal && showOriginal > selectedVariant.price ? showOriginal - selectedVariant.price : 0;

  return (
    <div className="rounded-card border border-border-cream bg-white p-5 shadow-card">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <PriceDisplay price={selectedVariant.price} originalPrice={showOriginal} showSaving={false} />
          {saving > 0 ? (
            <p className="mt-2 text-[12px] font-bold uppercase tracking-[0.04em] text-status-success">
              You save {formatPrice(saving)}
            </p>
          ) : null}
        </div>
        <span className="font-body text-[12px] font-extrabold uppercase tracking-[0.06em] text-text-dark-muted">
          {selectedVariant.stock} in stock
        </span>
      </div>

      <div className="mt-5">
        <ConditionSelector
          variants={variants}
          selected={selectedVariant}
          onSelect={setSelectedVariant}
        />
      </div>

      <div className="mt-5">
        <PdpAddToCartButton game={selectedGame} />
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 rounded-card border border-border-cream bg-bg-cream px-4 py-3">
        <span className="font-body text-[12px] font-extrabold uppercase tracking-[0.08em] text-text-dark">
          Add to Wishlist
        </span>
        <WishlistHeart productId={game.id} />
      </div>

      <div className="mt-5">
        <ShippingReturnsAccordion />
      </div>
    </div>
  );
}
