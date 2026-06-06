import type { Metadata } from "next";
import { AccountWishlistClient } from "@/components/account/AccountWishlistClient";
import { noIndexMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const metadata: Metadata = noIndexMetadata(
  "Wishlist — OMG Retro",
  "View your saved OMG Retro wishlist items.",
  "/account/wishlist",
);

export default function AccountWishlistPage() {
  return <AccountWishlistClient />;
}
