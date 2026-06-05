"use client";

import { useState } from "react";
import { ControllerButton } from "@/components/product/ControllerButton";
import { useToast } from "@/components/toast/ToastProvider";
import type { Game } from "@/types";

interface PdpAddToCartButtonProps {
  game: Game;
}

export function PdpAddToCartButton({ game }: PdpAddToCartButtonProps) {
  const [state, setState] = useState<"idle" | "adding" | "added">("idle");
  const toast = useToast();

  const handleClick = async () => {
    if (state === "adding") return;

    setState("adding");
    const { useCartStore } = await import("@/lib/store/cart-store");
    useCartStore.getState().addItem(game, game.condition);
    toast({
      message: `${game.title} added to cart`,
      action: {
        label: "View Cart →",
        href: "/cart",
      },
      duration: 3000,
    });

    window.setTimeout(() => {
      setState("added");
    }, 300);

    window.setTimeout(() => {
      setState("idle");
    }, 1100);

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
    </>
  );
}
