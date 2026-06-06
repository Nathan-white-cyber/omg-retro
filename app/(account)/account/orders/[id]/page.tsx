import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AccountOrderDetailClient } from "@/components/account/AccountOrderDetailClient";
import { findMockOrder } from "@/components/account/mock-account-data";
import { noIndexMetadata } from "@/lib/seo";

type AccountOrderDetailPageProps = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: AccountOrderDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  return noIndexMetadata(
    `Order ${id} — OMG Retro`,
    "View details for your OMG Retro order.",
    `/account/orders/${id}`,
  );
}

export default async function AccountOrderDetailPage({
  params,
}: AccountOrderDetailPageProps) {
  const { id } = await params;
  const order = findMockOrder(id);

  if (!order) {
    notFound();
  }

  return <AccountOrderDetailClient order={order} />;
}
