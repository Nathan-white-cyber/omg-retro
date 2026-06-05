"use client";

import { useWishlistStore } from "@/lib/store/wishlist-store";

export interface WishlistHeartProps {
  productId: string;
  isWishlisted?: boolean;
  onToggle?: (id: string) => void;
  className?: string;
}

export function WishlistHeart({
  productId,
  isWishlisted,
  onToggle,
  className = "",
}: WishlistHeartProps) {
  const storeWishlisted = useWishlistStore((state) => state.isWishlisted(productId));
  const toggle = useWishlistStore((state) => state.toggle);
  const active = isWishlisted ?? storeWishlisted;

  return (
    <button
      type="button"
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={active}
      onClick={() => {
        toggle(productId);
        onToggle?.(productId);
      }}
      className={`grid h-8 w-8 place-items-center rounded-full bg-white/90 text-text-dark shadow-[0_1px_4px_rgba(0,0,0,.18)] transition hover:scale-110 hover:text-brand-red ${active ? "text-brand-red" : ""} ${className}`}
    >
      <svg viewBox="0 0 24 24" className={`h-4 w-4 ${active ? "fill-current" : "fill-transparent"}`} aria-hidden="true">
        <path
          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
