"use client";

import Link from "next/link";
import { Heart, ShoppingBag, Star, type LucideIcon } from "lucide-react";
import { mockAccountUser, mockOrders, wishlistFallbackProducts } from "@/components/account/mock-account-data";
import { ProductCard } from "@/components/product/ProductCard";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import { mockProducts } from "@/lib/medusa/mock-products";
import { formatPrice } from "@/lib/utils/format";

function StatusBadge({ status }: { status: string }) {
  return (
    <span className="rounded-full bg-status-success/12 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.08em] text-status-success">
      {status}
    </span>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
}) {
  return (
    <div className="rounded-card border border-border-cream bg-white p-5 shadow-card">
      <div className="flex items-center gap-4">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-red/10 text-brand-red">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-[12px] font-extrabold uppercase tracking-[0.08em] text-text-dark-muted">
            {label}
          </p>
          <p className="mt-1 font-display text-4xl uppercase leading-none text-text-dark">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

export function AccountDashboardClient() {
  const wishlistIds = useWishlistStore((state) => state.items);
  const wishlistProducts = wishlistIds
    .map((id) => mockProducts.find((product) => product.id === id))
    .filter((product): product is (typeof mockProducts)[number] => Boolean(product));
  const products = wishlistProducts.length > 0 ? wishlistProducts.slice(0, 4) : wishlistFallbackProducts;

  return (
    <div className="space-y-8">
      <header>
        <p className="text-[12px] font-extrabold uppercase tracking-[0.1em] text-brand-red">
          {mockAccountUser.email}
        </p>
        <h1 className="mt-2 font-display text-display-md uppercase leading-none text-text-dark">
          Welcome Back, Alex!
        </h1>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Total Orders" value="12" icon={ShoppingBag} />
        <StatCard label="Wishlist Items" value="5" icon={Heart} />
        <StatCard label="Rewards Points" value="340" icon={Star} />
      </div>

      <section className="rounded-card border border-border-cream bg-white p-5 shadow-card">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-display text-4xl uppercase leading-none text-text-dark">
            Recent Orders
          </h2>
          <Link href="/account/orders" className="text-sm font-extrabold uppercase tracking-[0.06em] text-brand-red">
            View All Orders {"\u2192"}
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="border-b border-border-cream text-[11px] font-extrabold uppercase tracking-[0.08em] text-text-dark-muted">
              <tr>
                <th className="py-3">Order</th>
                <th className="py-3">Date</th>
                <th className="py-3">Items</th>
                <th className="py-3">Total</th>
                <th className="py-3">Status</th>
                <th className="py-3 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-cream">
              {mockOrders.slice(0, 3).map((order) => (
                <tr key={order.id}>
                  <td className="py-4 font-extrabold text-text-dark">#{order.id}</td>
                  <td className="py-4 text-text-dark-muted">{order.date}</td>
                  <td className="py-4 text-text-dark-muted">{order.itemCount} items</td>
                  <td className="py-4 font-bold text-text-dark">{formatPrice(order.total)}</td>
                  <td className="py-4"><StatusBadge status={order.status} /></td>
                  <td className="py-4 text-right">
                    <Link href={`/account/orders/${order.id}`} className="font-bold text-brand-red">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-display text-4xl uppercase leading-none text-text-dark">
            From Your Wishlist
          </h2>
          <Link href="/account/wishlist" className="text-sm font-extrabold uppercase tracking-[0.06em] text-brand-red">
            View All Wishlist {"\u2192"}
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {products.map((game) => (
            <div key={game.id} className="min-w-[240px] max-w-[260px] flex-1">
              <ProductCard game={game} ctaVariant={2} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
