"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type { CSSProperties, KeyboardEvent } from "react";
import { useCartStore } from "@/lib/store/cart-store";
import { formatPrice } from "@/lib/utils/format";
import { getPlatformColor } from "@/lib/utils/platform";
import type { Game } from "@/types";
import { ConditionBadge } from "./ConditionBadge";
import { ControllerButton } from "./ControllerButton";
import { CoverBlock } from "./CoverBlock";
import { DiscountBadge } from "./DiscountBadge";
import { PriceDisplay } from "./PriceDisplay";
import { WishlistHeart } from "./WishlistHeart";

export interface ProductCardProps {
  game: Game;
  variant?: "grid" | "list";
  ctaVariant?: 1 | 2 | 3 | 4;
  showRating?: boolean;
  showSaving?: boolean;
  priority?: boolean;
}

function PlatformBadge({ label }: { label: string }) {
  return (
    <span className="rounded-[3px] bg-black/50 px-1.5 py-[3px] font-body text-[9px] font-bold uppercase tracking-[0.05em] text-white">
      {label}
    </span>
  );
}

function CompactStar({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-2.5 w-2.5 ${filled ? "fill-[#f5a623]" : "fill-transparent"} text-[#f5a623]`}
      aria-hidden="true"
    >
      <path
        d="m12 2 3.09 6.26 6.91 1-5 4.87 1.18 6.88L12 17.77l-6.18 3.24L7 14.13l-5-4.87 6.91-1L12 2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ProductCard({
  game,
  variant = "grid",
  ctaVariant,
  showRating = true,
  showSaving = false,
  priority = false,
}: ProductCardProps) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const href = `/products/${game.slug}`;
  const coverColor = game.coverColor ?? getPlatformColor(game.platform);
  const hasDiscount = Boolean(game.originalPrice && game.originalPrice > game.price);
  const saving = hasDiscount && game.originalPrice ? game.originalPrice - game.price : 0;
  const discountPercent =
    hasDiscount && game.originalPrice ? Math.round((1 - game.price / game.originalPrice) * 100) : 0;
  const shortTitle = game.title.length > 40 ? `${game.title.slice(0, 40)}...` : game.title;

  const navigate = () => {
    router.push(href);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      navigate();
    }
  };

  const addToCart = () => {
    addItem(game, game.condition);
  };

  if (variant === "list") {
    return (
      <article
        role="link"
        tabIndex={0}
        aria-label={`View ${game.title}`}
        onClick={navigate}
        onKeyDown={handleKeyDown}
        className="group grid cursor-pointer grid-cols-[120px_1fr] gap-4 rounded-card border border-border bg-bg-surface p-3 shadow-card transition duration-normal hover:-translate-y-1 hover:border-border-light hover:shadow-card-hover"
      >
        <div className="relative">
          <CoverBlock
            platform={game.system}
            systemCode={game.systemCode}
            title={game.title}
            imageUrl={game.images[0]}
            coverColor={game.coverColor}
            priority={priority}
          />
          <div className="absolute left-2 top-2">
            <PlatformBadge label={game.systemCode} />
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <span className="font-body text-[11px] font-bold uppercase tracking-[0.04em] text-text-secondary">
            {game.system}
          </span>
          <h3 className="line-clamp-2 text-[16px] font-bold leading-snug text-text-primary">
            {game.title}
          </h3>
          <div className="flex flex-wrap items-center gap-2">
            <ConditionBadge condition={game.condition} />
            {game.discountPercent ? <DiscountBadge percent={game.discountPercent} /> : null}
          </div>
          <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
            <PriceDisplay
              price={game.price}
              originalPrice={game.originalPrice}
              showSaving={showSaving}
            />
            <div onClick={(event) => event.stopPropagation()}>
              <ControllerButton
                platform={game.platform}
                variant={ctaVariant ?? 2}
                onClick={addToCart}
              />
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      role="link"
      tabIndex={0}
      aria-label={`View ${game.title}`}
      onClick={navigate}
      onKeyDown={handleKeyDown}
      className="omg-product-card group cursor-pointer"
    >
      <div
        className="omg-card-cover"
        style={{ "--cv": coverColor } as CSSProperties}
      >
        {game.images[0] ? (
          <Image
            src={game.images[0]}
            alt={`${game.title} cover`}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            priority={priority}
            loading={priority ? undefined : "lazy"}
            className="omg-cover-image"
          />
        ) : null}
        <div className="omg-card-badges">
          <span className="omg-platform-badge">{game.system}</span>
          {discountPercent > 0 ? (
            <span className="omg-discount-badge">{discountPercent}% OFF</span>
          ) : null}
        </div>
        <div className="omg-card-gradient" />
        <span className="omg-cover-title">{game.title}</span>
        <div className="omg-wishlist-wrap" onClick={(event) => event.stopPropagation()}>
          <WishlistHeart
            productId={game.id}
            className="omg-wishlist"
          />
        </div>
      </div>

      <div className="omg-card-body">
        <span className="omg-card-platform">
          {game.system}
        </span>
        <h3 className="omg-card-title">
          {shortTitle}
        </h3>

        <div className="omg-card-pricerow">
          <span className="omg-card-price">
            {formatPrice(game.price)}
          </span>
          {hasDiscount && game.originalPrice ? (
            <span className="omg-price-was">
              {formatPrice(game.originalPrice)}
            </span>
          ) : null}
          {saving > 0 ? (
            <span className="omg-save-badge">You save {formatPrice(saving)}</span>
          ) : null}
          <span className="omg-card-cond">
            {game.condition}
          </span>
        </div>

        {showSaving && saving > 0 ? (
          <p className="omg-card-saving">
            You save {formatPrice(saving)}
          </p>
        ) : null}

        {showRating ? (
          <div className="omg-card-rating">
            <span className="inline-flex" aria-label="4.8 out of 5 stars">
              {Array.from({ length: 5 }, (_, index) => (
                <CompactStar key={index} filled={index < 5} />
              ))}
            </span>
            <span>(1,284)</span>
          </div>
        ) : null}

        <div className="omg-card-action" onClick={(event) => event.stopPropagation()}>
          <ControllerButton
            platform={game.system}
            variant={ctaVariant ?? 2}
            onClick={addToCart}
            fullWidth
          />
        </div>
      </div>
    </article>
  );
}
