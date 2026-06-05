"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mockProducts } from "@/lib/medusa/mock-products";
import type { CartItem, Game } from "@/types";

interface CartState {
  items: CartItem[];
  subtotal: number;
  itemCount: number;
  addItem: (game: Game, condition?: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  saveForLater: (id: string) => void;
  moveToCart: (id: string) => void;
  clearCart: () => void;
}

const sampleCartItems = [
  "n64-zelda-oot",
  "gba-pokemon-emerald",
  "ps2-metal-gear-solid-2",
]
  .map((id) => mockProducts.find((game) => game.id === id))
  .filter((game): game is Game => Boolean(game))
  .map<CartItem>((game) => ({
    id: `${game.id}:${game.condition}`,
    game,
    condition: game.condition,
    quantity: 1,
    unitPrice: game.price,
    savedForLater: false,
  }));

function recalculate(items: CartItem[]) {
  return {
    items,
    subtotal: items.reduce(
      (total, item) => total + (item.savedForLater ? 0 : item.unitPrice * item.quantity),
      0,
    ),
    itemCount: items.reduce(
      (total, item) => total + (item.savedForLater ? 0 : item.quantity),
      0,
    ),
  };
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      ...recalculate(sampleCartItems),
      addItem: (game, condition = game.condition) =>
        set((state) => {
          const id = `${game.id}:${condition}`;
          const existing = state.items.find((item) => item.id === id);
          const items = existing
            ? state.items.map((item) =>
                item.id === id
                  ? { ...item, quantity: item.quantity + 1, savedForLater: false }
                  : item,
              )
            : [
                ...state.items,
                {
                  id,
                  game,
                  condition,
                  quantity: 1,
                  unitPrice: game.price,
                  savedForLater: false,
                },
              ];

          return recalculate(items);
        }),
      removeItem: (id) =>
        set((state) => recalculate(state.items.filter((item) => item.id !== id))),
      updateQuantity: (id, quantity) =>
        set((state) =>
          recalculate(
            state.items.map((item) =>
              item.id === id ? { ...item, quantity: Math.min(10, Math.max(1, quantity)) } : item,
            ),
          ),
        ),
      saveForLater: (id) =>
        set((state) =>
          recalculate(
            state.items.map((item) =>
              item.id === id ? { ...item, savedForLater: true } : item,
            ),
          ),
        ),
      moveToCart: (id) =>
        set((state) =>
          recalculate(
            state.items.map((item) =>
              item.id === id ? { ...item, savedForLater: false, quantity: Math.max(1, item.quantity) } : item,
            ),
          ),
        ),
      clearCart: () => set(() => recalculate([])),
    }),
    {
      name: "omg-retro-cart",
    },
  ),
);
