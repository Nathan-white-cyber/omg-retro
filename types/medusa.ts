import type { Game } from "./game";

export interface MedusaProductMetadata {
  platform?: string;
  system?: string;
  systemCode?: string;
  condition?: string;
  coverColor?: string;
  rating?: number;
  reviewCount?: number;
  stock?: number;
  tags?: string[];
  vendor?: string;
}

export interface MedusaGameProduct {
  id: string;
  handle?: string;
  title: string;
  thumbnail?: string | null;
  images?: { url: string }[];
  metadata?: MedusaProductMetadata | null;
}

export interface MedusaCustomerWishlist {
  wishlist?: string[];
}

export type GameMapper = (product: MedusaGameProduct) => Game;
