import type { Metadata } from "next";
import { AccountDashboardClient } from "@/components/account/AccountDashboardClient";
import { noIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = noIndexMetadata(
  "Account Dashboard — OMG Retro",
  "View your OMG Retro account dashboard.",
  "/account",
);

export default function AccountPage() {
  return <AccountDashboardClient />;
}

export const dynamic = "force-dynamic";
