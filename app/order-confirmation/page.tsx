import Link from "next/link";

type OrderConfirmationPageProps = {
  searchParams?: Promise<{ orderId?: string }> | { orderId?: string };
};

export default async function OrderConfirmationPage({
  searchParams = {},
}: OrderConfirmationPageProps) {
  const params = await searchParams;
  const orderId = params.orderId ?? "OMG-PENDING";

  return (
    <main className="min-h-screen bg-bg-dark px-7 py-16 text-white">
      <section className="mx-auto max-w-[720px] rounded-card border border-border bg-bg-surface p-8 text-center shadow-card">
        <p className="font-body text-[12px] font-extrabold uppercase tracking-[0.12em] text-status-success">
          Order Confirmed
        </p>
        <h1 className="mt-3 font-display text-5xl uppercase leading-none text-white">
          Thank You
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-white/55">
          Your order has been placed. Confirmation number:
        </p>
        <p className="mt-3 rounded-card border border-white/10 bg-black/20 px-4 py-3 font-body text-sm font-extrabold uppercase tracking-[0.08em] text-brand-red">
          {orderId}
        </p>
        <Link
          href="/products"
          className="mt-7 inline-flex h-[50px] items-center justify-center rounded-btn bg-brand-red px-8 font-body text-[13px] font-extrabold uppercase tracking-[0.08em] text-white transition hover:bg-brand-red-dark"
        >
          Keep Shopping
        </Link>
      </section>
    </main>
  );
}
