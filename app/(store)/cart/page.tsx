import type { Metadata } from "next";
import { CartPageClient } from "@/components/cart/CartPageClient";
import { getAllProducts } from "@/lib/medusa/products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your Cart — OMG Retro",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function CartPage() {
  const products = await getAllProducts();

  return <CartPageClient products={products} />;
}
