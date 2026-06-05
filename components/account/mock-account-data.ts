import { mockProducts } from "@/lib/medusa/mock-products";
import type { CartItem, Game } from "@/types";

export const mockAccountUser = {
  id: "mock-alex-rivera",
  email: "alex@example.com",
  firstName: "Alex",
  lastName: "Rivera",
  memberSince: "January 2024",
};

export interface MockOrder {
  id: string;
  date: string;
  placedAt: string;
  itemCount: number;
  total: number;
  status: "DELIVERED";
  items: CartItem[];
}

function productById(id: string): Game {
  const product = mockProducts.find((item) => item.id === id);

  if (!product) {
    throw new Error(`Missing mock product: ${id}`);
  }

  return product;
}

function orderItem(productId: string, quantity = 1): CartItem {
  const game = productById(productId);

  return {
    id: `${game.id}:${game.condition}`,
    game,
    condition: game.condition,
    quantity,
    unitPrice: game.price,
  };
}

export const mockOrders: MockOrder[] = [
  {
    id: "OMG-20260601",
    date: "June 1 2026",
    placedAt: "June 1, 2026 at 10:34 AM",
    itemCount: 3,
    total: 22342,
    status: "DELIVERED",
    items: [
      orderItem("n64-zelda-oot"),
      orderItem("gba-pokemon-emerald"),
      orderItem("ps2-metal-gear-solid-2"),
    ],
  },
  {
    id: "OMG-20260512",
    date: "May 12 2026",
    placedAt: "May 12, 2026 at 2:18 PM",
    itemCount: 1,
    total: 11999,
    status: "DELIVERED",
    items: [orderItem("gba-pokemon-emerald")],
  },
  {
    id: "OMG-20260430",
    date: "April 30 2026",
    placedAt: "April 30, 2026 at 9:12 AM",
    itemCount: 2,
    total: 8998,
    status: "DELIVERED",
    items: [orderItem("n64-mario-64"), orderItem("gen-sonic-2", 2)],
  },
  {
    id: "OMG-20260415",
    date: "April 15 2026",
    placedAt: "April 15, 2026 at 4:42 PM",
    itemCount: 1,
    total: 4499,
    status: "DELIVERED",
    items: [orderItem("n64-zelda-oot")],
  },
  {
    id: "OMG-20260320",
    date: "March 20 2026",
    placedAt: "March 20, 2026 at 11:05 AM",
    itemCount: 4,
    total: 18496,
    status: "DELIVERED",
    items: [
      orderItem("snes-super-metroid"),
      orderItem("dc-sonic-adventure-2"),
      orderItem("xbox-halo-2"),
      orderItem("ps2-metal-gear-solid-2"),
    ],
  },
];

export const wishlistFallbackProducts = mockProducts
  .slice()
  .sort((a, b) => (b.salesCount ?? 0) - (a.salesCount ?? 0))
  .slice(0, 4);

export function findMockOrder(id: string) {
  return mockOrders.find((order) => order.id === id);
}
