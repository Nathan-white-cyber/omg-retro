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
  const shortTitle = game.title.length > 40 ? `${game.title.slice(0, 40)}...` : game.title;
  const roundedRating = Math.max(0, Math.min(5, Math.round(game.rating)));

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
            platform={game.platform}
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
      className="group flex cursor-pointer flex-col overflow-hidden rounded-[10px] bg-[#1a1a1a] transition duration-normal hover:-translate-y-1"
    >
      <div
        className="relative h-[160px] overflow-hidden"
        style={{ backgroundColor: coverColor } as CSSProperties}
      >
        {game.images[0] ? (
          <Image
            src={game.images[0]}
            alt={`${game.title} cover`}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            priority={priority}
            loading={priority ? undefined : "lazy"}
            className="object-cover"
          />
        ) : null}
        <div className="absolute left-2 top-2 z-10 flex flex-col items-start gap-1.5">
          <PlatformBadge label={game.systemCode} />
          {game.discountPercent ? (
            <span className="rounded-[3px] bg-brand-red px-1.5 py-[3px] font-body text-[9px] font-bold uppercase text-white">
              {game.discountPercent}% OFF
            </span>
          ) : null}
        </div>
        <div className="absolute right-2 top-2 z-10" onClick={(event) => event.stopPropagation()}>
          <WishlistHeart
            productId={game.id}
            className="h-[30px] w-[30px] border-0 bg-black/40 text-white shadow-none hover:bg-black/55"
          />
        </div>
        <h3 className="absolute inset-x-0 bottom-0 z-10 line-clamp-2 bg-[linear-gradient(transparent,rgba(0,0,0,0.7))] px-2.5 py-2 font-display text-[clamp(14px,3vw,18px)] uppercase leading-[1.1] text-white">
          {game.title}
        </h3>
      </div>

      <div className="flex flex-1 flex-col bg-[#1a1a1a] p-2.5">
        <span className="mb-0.5 font-body text-[9px] uppercase tracking-[0.08em] text-white/45">
          {game.system}
        </span>
        <h3 className="mb-1.5 truncate font-body text-[11px] font-semibold text-white">
          {shortTitle}
        </h3>

        <div className="flex items-center gap-1.5">
          <span className="font-body text-base font-bold leading-none text-brand-red">
            {formatPrice(game.price)}
          </span>
          {hasDiscount && game.originalPrice ? (
            <span className="text-[10px] text-white/35 line-through">
              {formatPrice(game.originalPrice)}
            </span>
          ) : null}
          <span className="ml-auto rounded-[3px] bg-white/10 px-1.5 py-0.5 font-body text-[9px] uppercase text-white/70">
            {game.condition}
          </span>
        </div>

        {saving > 0 ? (
          <p className="mb-1 mt-1 font-body text-[9px] uppercase text-[#4CAF50]">
            You save {formatPrice(saving)}
          </p>
        ) : null}

        {showRating ? (
          <div className="mb-2 flex items-center gap-1 text-[10px] text-white/40">
            <span className="inline-flex" aria-label={`${game.rating} out of 5 stars`}>
              {Array.from({ length: 5 }, (_, index) => (
                <CompactStar key={index} filled={index < roundedRating} />
              ))}
            </span>
            <span>({game.reviewCount.toLocaleString("en-US")})</span>
          </div>
        ) : null}

        <div className="mt-auto" onClick={(event) => event.stopPropagation()}>
          <ControllerButton
            platform={game.platform}
            variant={ctaVariant ?? 2}
            onClick={addToCart}
            fullWidth
          />
        </div>
      </div>
    </article>
  );
}
