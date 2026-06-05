"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistState {
  items: string[];
  toggle: (id: string) => void;
  remove: (id: string) => void;
  isWishlisted: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (id) =>
        set((state) => ({
          items: state.items.includes(id)
            ? state.items.filter((itemId) => itemId !== id)
            : [...state.items, id],
        })),
      remove: (id) =>
        set((state) => ({
          items: state.items.filter((itemId) => itemId !== id),
        })),
      isWishlisted: (id) => get().items.includes(id),
    }),
    {
      name: "omg-retro-wishlist",
    },
  ),
);
