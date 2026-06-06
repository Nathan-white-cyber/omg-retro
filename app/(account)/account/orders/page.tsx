import type { Metadata } from "next";
import { AccountOrdersClient } from "@/components/account/AccountOrdersClient";
import { noIndexMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const metadata: Metadata = noIndexMetadata(
  "Order History — OMG Retro",
  "View your OMG Retro order history.",
  "/account/orders",
);

export default function AccountOrdersPage() {
  return <AccountOrdersClient />;
}
