import type { Metadata } from "next";
import { CheckoutPageClient } from "@/components/checkout/CheckoutPageClient";
import { noIndexMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = noIndexMetadata(
  "Checkout — OMG Retro",
  "Secure checkout for your OMG Retro order.",
  "/checkout",
);

export default function CheckoutPage() {
  return <CheckoutPageClient />;
}
