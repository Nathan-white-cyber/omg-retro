"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/store/cart-store";

interface CartBadgeProps {
  variant?: "desktop" | "mobile";
}

export function CartBadge({ variant = "desktop" }: CartBadgeProps) {
  const itemCount = useCartStore((state) => state.itemCount);

  if (variant === "mobile") {
    return (
      <Link
        href="/cart"
        className="relative grid h-11 w-11 place-items-center rounded-[12px] text-text-primary transition hover:bg-white/10"
        aria-label={`Cart, ${itemCount} items`}
      >
        <ShoppingCart className="h-[23px] w-[23px]" aria-hidden="true" />
        <span className="absolute right-1 top-1 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-brand-red px-1 font-body text-[11px] font-extrabold leading-none text-white shadow-[0_0_0_2px_#1A1A1A]">
          {itemCount}
        </span>
      </Link>
    );
  }

  return (
    <Link
      href="/cart"
      className="inline-flex items-center gap-2 rounded-btn border border-brand-red bg-brand-red px-4 py-2.5 text-[13.5px] font-bold text-white transition hover:bg-brand-red-dark"
      aria-label={`Cart, ${itemCount} items`}
    >
      <ShoppingCart className="h-[22px] w-[22px]" aria-hidden="true" />
      Cart ({itemCount})
    </Link>
  );
}
