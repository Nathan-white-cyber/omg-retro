import type { Metadata } from "next";
import { CartPageClient } from "@/components/cart/CartPageClient";
import { getAllProducts } from "@/lib/medusa/products";
import { noIndexMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = noIndexMetadata(
  "Your Cart — OMG Retro",
  "Review your OMG Retro cart before checkout.",
  "/cart",
);

export default async function CartPage() {
  const products = await getAllProducts();

  return <CartPageClient products={products} />;
}
