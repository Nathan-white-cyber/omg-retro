"use client";

import { useState } from "react";
import type { Game } from "@/types";

interface PdpAddToCartButtonProps {
  game: Game;
}

export function PdpAddToCartButton({ game }: PdpAddToCartButtonProps) {
  const [adding, setAdding] = useState(false);

  const handleClick = async () => {
    if (adding) return;

    setAdding(true);
    const { useCartStore } = await import("@/lib/store/cart-store");
    useCartStore.getState().addItem(game, game.condition);
    window.setTimeout(() => {
      window.location.href = "/cart";
    }, 180);
  };

  return (
    <button
      type="button"
      className="flex h-[52px] w-full items-center justify-center rounded-btn bg-brand-red px-6 font-body text-[14px] font-extrabold uppercase tracking-[0.04em] text-white shadow-ctrl transition duration-normal hover:-translate-y-0.5 hover:bg-brand-red-dark disabled:cursor-wait disabled:opacity-75"
      onClick={handleClick}
      disabled={adding}
    >
      {adding ? "Adding..." : "Add to Cart"}
    </button>
  );
}
