"use client";

import Link from "next/link";
import { Check, Download, PackagePlus } from "lucide-react";
import type { MockOrder } from "@/components/account/mock-account-data";
import { ConditionBadge } from "@/components/product/ConditionBadge";
import { CoverBlock } from "@/components/product/CoverBlock";
import { useToast } from "@/components/toast/ToastProvider";
import { useCartStore } from "@/lib/store/cart-store";
import { formatPrice } from "@/lib/utils/format";

function StatusBadge({ status }: { status: string }) {
  return (
    <span className="rounded-full bg-status-success/12 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.08em] text-status-success">
      {status}
    </span>
  );
}

function TimelineStep({ label, date }: { label: string; date: string }) {
  return (
    <div className="flex min-w-[150px] flex-1 items-center gap-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-status-success text-white">
        <Check className="h-4 w-4" />
      </span>
      <span>
        <span className="block text-sm font-extrabold text-text-dark">{label}</span>
        <span className="block text-[12px] font-bold text-text-dark-muted">{date}</span>
      </span>
    </div>
  );
}

export function AccountOrderDetailClient({ order }: { order: MockOrder }) {
  const addItem = useCartStore((state) => state.addItem);
  const toast = useToast();

  const buyAgain = (item: MockOrder["items"][number]) => {
    addItem(item.game, item.condition);
    toast({
      message: `${item.game.title} added to cart`,
      action: { label: "View Cart \u2192", href: "/cart" },
    });
  };

  const buyAllAgain = () => {
    order.items.forEach((item) => addItem(item.game, item.condition));
    toast({
      message: "Order items added to cart",
      action: { label: "View Cart \u2192", href: "/cart" },
    });
  };

  return (
    <div className="space-y-6">
      <Link href="/account/orders" className="inline-flex text-sm font-extrabold uppercase tracking-[0.06em] text-brand-red">
        {"\u2190"} Back to Order History
      </Link>

      <section className="rounded-card border border-l-4 border-border border-l-brand-red bg-[#1A1A1A] p-6 text-white shadow-card">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <h1 className="font-display text-display-md uppercase leading-none text-white">
              Order #{order.id}
            </h1>
            <p className="mt-2 text-sm text-white/55">Placed: {order.placedAt}</p>
          </div>
          <div className="text-left md:text-right">
            <StatusBadge status={order.status} />
            <Link href="/info/contact" className="mt-4 block text-sm font-bold text-brand-red">
              Need help with this order?
            </Link>
          </div>
        </div>
      </section>

      <section className="rounded-card border border-border-cream bg-white p-5 shadow-card">
        <h2 className="mb-5 font-display text-4xl uppercase leading-none text-text-dark">
          Order Timeline
        </h2>
        <div className="flex flex-col gap-4 lg:flex-row">
          <TimelineStep label="Order Placed" date="June 1" />
          <TimelineStep label="Confirmed" date="June 1" />
          <TimelineStep label="Shipped" date="June 2" />
          <TimelineStep label="Delivered" date="June 5" />
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border-cream pt-4">
          <p className="text-sm font-bold text-text-dark-muted">
            Tracking: <span className="text-text-dark">1Z999AA10123456784</span>
          </p>
          <a href="https://www.ups.com/track" className="text-sm font-extrabold uppercase tracking-[0.06em] text-brand-red">
            Track Package on UPS {"\u2192"}
          </a>
        </div>
      </section>

      <section className="rounded-card border border-border-cream bg-white p-5 shadow-card">
        <h2 className="mb-5 font-display text-4xl uppercase leading-none text-text-dark">
          Items In This Order ({order.itemCount})
        </h2>
        <div className="space-y-4">
          {order.items.map((item) => (
            <div key={item.id} className="grid gap-4 border-b border-border-cream pb-4 last:border-0 last:pb-0 md:grid-cols-[80px_1fr_auto] md:items-center">
              <CoverBlock
                platform={item.game.platform}
                systemCode={item.game.systemCode}
                title={item.game.title}
                imageUrl={item.game.images[0]}
                coverColor={item.game.coverColor}
                aspect="square"
                className="h-20 w-20"
              />
              <div>
                <p className="font-extrabold text-text-dark">{item.game.title}</p>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <ConditionBadge condition={item.game.condition} />
                  <span className="text-sm text-text-dark-muted">Qty {item.quantity}</span>
                  <span className="text-sm text-text-dark-muted">{formatPrice(item.unitPrice)} each</span>
                </div>
              </div>
              <div className="flex items-center gap-4 md:justify-end">
                <span className="font-extrabold text-brand-red">
                  {formatPrice(item.unitPrice * item.quantity)}
                </span>
                <button
                  type="button"
                  onClick={() => buyAgain(item)}
                  className="h-9 rounded-btn border border-border-cream px-4 text-[12px] font-extrabold uppercase tracking-[0.08em] text-text-dark transition hover:border-brand-red hover:text-brand-red"
                >
                  Buy Again
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="ml-auto max-w-[420px] rounded-card border border-border-cream bg-white p-5 shadow-card">
        <div className="space-y-3 text-sm text-text-dark-muted">
          <div className="flex justify-between"><span>Subtotal</span><span className="font-bold text-text-dark">$204.97</span></div>
          <div className="flex justify-between"><span>Shipping</span><span className="font-bold text-status-success">FREE</span></div>
          <div className="flex justify-between"><span>Tax</span><span className="font-bold text-text-dark">$18.45</span></div>
          <div className="flex justify-between border-t border-border-cream pt-4 font-display text-3xl uppercase text-brand-red">
            <span>Order Total</span><span>$223.42</span>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-card border border-border-cream bg-white p-5 shadow-card">
          <h2 className="font-body text-[12px] font-extrabold uppercase tracking-[0.08em] text-text-dark">
            Shipping Address
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-dark-muted">
            Alex Rivera<br />
            123 Retro Lane<br />
            Brooklyn, NY 11201<br />
            Standard Shipping - Delivered June 5, 2026
          </p>
        </div>
        <div className="rounded-card border border-border-cream bg-white p-5 shadow-card">
          <h2 className="font-body text-[12px] font-extrabold uppercase tracking-[0.08em] text-text-dark">
            Payment Method
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-text-dark-muted">
            Visa ending in 4242<br />
            Billing same as shipping
          </p>
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={buyAllAgain}
          className="inline-flex h-11 items-center gap-2 rounded-btn bg-brand-red px-6 text-sm font-extrabold uppercase tracking-[0.08em] text-white transition hover:bg-brand-red-dark"
        >
          <PackagePlus className="h-4 w-4" />
          Buy All Again
        </button>
        <button
          type="button"
          className="inline-flex h-11 items-center gap-2 rounded-btn border border-border-cream bg-white px-6 text-sm font-extrabold uppercase tracking-[0.08em] text-text-dark transition hover:border-brand-red hover:text-brand-red"
        >
          <Download className="h-4 w-4" />
          Download Invoice
        </button>
        <Link href="/info/returns" className="text-sm font-extrabold uppercase tracking-[0.08em] text-text-dark-muted hover:text-brand-red">
          Return Items
        </Link>
      </div>

      <section className="rounded-card border border-white/10 bg-[#1A1A1A] p-6 text-white shadow-card">
        <h2 className="font-display text-4xl uppercase leading-none">Questions About This Order?</h2>
        <p className="mt-2 text-sm text-white/55">Our team responds within 24 hours.</p>
        <Link href="/info/contact" className="mt-5 inline-flex h-11 items-center rounded-btn border border-brand-red px-6 text-sm font-extrabold uppercase tracking-[0.08em] text-brand-red transition hover:bg-brand-red hover:text-white">
          Contact Support
        </Link>
      </section>
    </div>
  );
}
