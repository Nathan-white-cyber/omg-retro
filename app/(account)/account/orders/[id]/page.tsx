import { notFound } from "next/navigation";
import { AccountOrderDetailClient } from "@/components/account/AccountOrderDetailClient";
import { findMockOrder } from "@/components/account/mock-account-data";

type AccountOrderDetailPageProps = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

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
