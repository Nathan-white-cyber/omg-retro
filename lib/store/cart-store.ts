"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Game } from "@/types";

interface CartState {
  items: CartItem[];
  subtotal: number;
  itemCount: number;
  addItem: (game: Game, condition?: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  saveForLater: (id: string) => void;
  clearCart: () => void;
}

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
      items: [],
      subtotal: 0,
      itemCount: 0,
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
              item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item,
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
      clearCart: () => recalculate([]),
    }),
    {
      name: "omg-retro-cart",
    },
  ),
);
