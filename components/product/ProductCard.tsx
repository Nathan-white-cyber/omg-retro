"use client";

import { useRouter } from "next/navigation";
import type { KeyboardEvent } from "react";
import { useCartStore } from "@/lib/store/cart-store";
import { formatPrice } from "@/lib/utils/format";
import type { Game } from "@/types";
import { ConditionBadge } from "./ConditionBadge";
import { ControllerButton } from "./ControllerButton";
import { CoverBlock } from "./CoverBlock";
import { DiscountBadge } from "./DiscountBadge";
import { PriceDisplay } from "./PriceDisplay";
import { RatingStars } from "./RatingStars";
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
    <span className="rounded-[3px] bg-black/55 px-2 py-1 font-body text-[9.5px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur">
      {label}
    </span>
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
      className="group flex cursor-pointer flex-col overflow-hidden rounded-card border border-border bg-bg-surface shadow-card transition duration-normal hover:-translate-y-1 hover:border-border-light hover:shadow-card-hover"
    >
      <div className="relative">
        <CoverBlock
          platform={game.platform}
          systemCode={game.systemCode}
          title={game.title}
          imageUrl={game.images[0]}
          coverColor={game.coverColor}
          aspect="landscape"
          priority={priority}
          className="rounded-b-none"
        />
        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          <PlatformBadge label={game.systemCode} />
          {game.discountPercent ? <DiscountBadge percent={game.discountPercent} /> : null}
        </div>
        <div className="absolute right-3 top-3" onClick={(event) => event.stopPropagation()}>
          <WishlistHeart productId={game.id} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <span className="font-body text-[11px] font-bold uppercase tracking-[0.04em] text-text-secondary">
          {game.system}
        </span>
        <h3 className="mt-1 line-clamp-2 min-h-[38px] text-sm font-bold leading-snug text-text-primary">
          {game.title}
        </h3>

        <div className="mt-3 flex items-start justify-between gap-3">
          <div>
            <PriceDisplay
              price={game.price}
              originalPrice={game.originalPrice}
              showSaving={false}
            />
            {showSaving && game.originalPrice && game.originalPrice > game.price ? (
              <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.04em] text-status-success">
                You save {formatPrice(game.originalPrice - game.price)}
              </p>
            ) : null}
          </div>
          <ConditionBadge condition={game.condition} />
        </div>

        {showRating ? (
          <div className="mt-3">
            <RatingStars rating={game.rating} reviewCount={game.reviewCount} />
          </div>
        ) : null}
      </div>

      <div className="px-4 pb-4" onClick={(event) => event.stopPropagation()}>
        {ctaVariant ? (
          <ControllerButton
            platform={game.platform}
            variant={ctaVariant}
            onClick={addToCart}
            fullWidth={ctaVariant !== 1}
            className={ctaVariant === 1 ? "justify-center" : ""}
          />
        ) : (
          <>
            <div className="flex justify-center md:hidden">
              <ControllerButton platform={game.platform} variant={1} onClick={addToCart} />
            </div>
            <div className="hidden md:block">
              <ControllerButton
                platform={game.platform}
                variant={2}
                onClick={addToCart}
                fullWidth
              />
            </div>
          </>
        )}
      </div>
    </article>
  );
}
