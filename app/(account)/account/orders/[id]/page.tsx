import { notFound } from "next/navigation";
import { AccountOrderDetailClient, findMockOrder } from "@/components/account/AccountOrderDetailClient";

type AccountOrderDetailPageProps = {
  params: Promise<{ id: string }> | { id: string };
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

