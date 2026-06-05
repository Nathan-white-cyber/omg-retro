"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { mockOrders } from "@/components/account/mock-account-data";
import { formatPrice } from "@/lib/utils/format";

function StatusBadge({ status }: { status: string }) {
  return (
    <span className="rounded-full bg-status-success/12 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.08em] text-status-success">
      {status}
    </span>
  );
}

export function AccountOrdersClient() {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-[12px] font-extrabold uppercase tracking-[0.1em] text-brand-red">
          12 lifetime orders
        </p>
        <h1 className="mt-2 font-display text-display-md uppercase leading-none text-text-dark">
          Order History (12)
        </h1>
      </header>

      <div className="space-y-4">
        {mockOrders.map((order) => (
          <details key={order.id} className="group rounded-card border border-border-cream bg-white shadow-card">
            <summary className="grid cursor-pointer list-none gap-4 p-5 md:grid-cols-[1.4fr_1fr_.7fr_.8fr_.9fr_auto] md:items-center">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-text-dark-muted">
                  Order number
                </p>
                <p className="mt-1 font-extrabold text-text-dark">#{order.id}</p>
              </div>
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-text-dark-muted">
                  Date
                </p>
                <p className="mt-1 text-sm font-bold text-text-dark">{order.date}</p>
              </div>
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-text-dark-muted">
                  Items
                </p>
                <p className="mt-1 text-sm font-bold text-text-dark">{order.itemCount}</p>
              </div>
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-text-dark-muted">
                  Total
                </p>
                <p className="mt-1 text-sm font-bold text-text-dark">{formatPrice(order.total)}</p>
              </div>
              <StatusBadge status={order.status} />
              <div className="flex items-center gap-4 md:justify-end">
                <Link
                  href={`/account/orders/${order.id}`}
                  className="text-sm font-extrabold uppercase tracking-[0.06em] text-brand-red"
                >
                  View Details {"\u2192"}
                </Link>
                <ChevronDown className="h-4 w-4 text-text-dark-muted transition group-open:rotate-180" />
              </div>
            </summary>
            <div className="border-t border-border-cream px-5 py-4 text-sm text-text-dark-muted">
              {order.items.map((item) => item.game.title).join(", ")}
            </div>
          </details>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm font-bold text-text-dark-muted">Showing 5 of 12 orders</p>
        <button
          type="button"
          className="h-11 rounded-btn border border-border-cream bg-white px-6 text-sm font-extrabold uppercase tracking-[0.08em] text-text-dark transition hover:border-brand-red hover:text-brand-red"
        >
          Load More
        </button>
      </div>
    </div>
  );
}

