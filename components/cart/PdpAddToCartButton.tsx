"use client";

import { useState } from "react";
import Link from "next/link";
import { ControllerButton } from "@/components/product/ControllerButton";
import type { Game } from "@/types";

interface PdpAddToCartButtonProps {
  game: Game;
}

export function PdpAddToCartButton({ game }: PdpAddToCartButtonProps) {
  const [state, setState] = useState<"idle" | "adding" | "added">("idle");
  const [showToast, setShowToast] = useState(false);

  const handleClick = async () => {
    if (state === "adding") return;

    setState("adding");
    const { useCartStore } = await import("@/lib/store/cart-store");
    useCartStore.getState().addItem(game, game.condition);
    setShowToast(true);

    window.setTimeout(() => {
      setState("added");
    }, 300);

    window.setTimeout(() => {
      setState("idle");
    }, 1100);

    window.setTimeout(() => {
      setShowToast(false);
    }, 3600);
  };

  return (
    <>
      <ControllerButton
        platform={game.platform}
        variant={4}
        onClick={handleClick}
        loading={state === "adding"}
        added={state === "added"}
        fullWidth
      />
      {showToast ? (
        <div className="fixed right-5 top-5 z-50 max-w-[320px] rounded-card border border-white/10 bg-[#1A1A1A] px-4 py-3 text-sm font-bold text-white shadow-card">
          <span>{game.title} added to cart</span>
          <Link href="/cart" className="ml-3 whitespace-nowrap text-brand-red transition hover:text-brand-red-light">
            View Cart →
          </Link>
        </div>
      ) : null}
    </>
  );
}
