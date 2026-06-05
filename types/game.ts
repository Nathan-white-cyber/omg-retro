export type ProductCondition = "CIB" | "Loose" | "New/Sealed";

export type ProductVendor = "nintendo" | "playstation" | "xbox" | "sega";

export interface Game {
  id: string;
  title: string;
  slug: string;
  platform: string;
  system: string;
  systemCode: string;
  condition: ProductCondition;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  coverColor: string;
  images: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  tags: string[];
  vendor: ProductVendor;
  salesCount?: number;
  createdAt?: string;
}

export interface CartItem {
  id: string;
  game: Game;
  condition: ProductCondition | string;
  quantity: number;
  unitPrice: number;
  savedForLater?: boolean;
}

export interface ProductVariantOption {
  type: ProductCondition | string;
  price: number;
  stock: number;
}

export interface Platform {
  name: string;
  code: string;
  href: string;
  color: string;
  systems?: System[];
}

export interface System {
  name: string;
  code: string;
  href: string;
  platform: ProductVendor;
}
