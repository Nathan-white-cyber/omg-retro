"use client";

import Link from "next/link";

export default function OrderDetailError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="rounded-card border border-border-cream bg-white p-8 text-center shadow-card">
      <p className="font-body text-[12px] font-extrabold uppercase tracking-[0.12em] text-brand-red">
        Order Detail Unavailable
      </p>
      <h1 className="mt-3 font-display text-5xl uppercase leading-none text-text-dark">
        Something Went Wrong
      </h1>
      <p className="mx-auto mt-4 max-w-[520px] text-sm leading-relaxed text-text-dark-muted">
        We could not load this order detail view. Try again, or return to your order history.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="h-11 rounded-btn bg-brand-red px-6 text-sm font-extrabold uppercase tracking-[0.08em] text-white transition hover:bg-brand-red-dark"
        >
          Try Again
        </button>
        <Link
          href="/account/orders"
          className="inline-flex h-11 items-center rounded-btn border border-border-cream px-6 text-sm font-extrabold uppercase tracking-[0.08em] text-text-dark transition hover:border-brand-red hover:text-brand-red"
        >
          Back to Orders
        </Link>
      </div>
    </section>
  );
}

