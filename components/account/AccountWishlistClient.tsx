"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { mockProducts } from "@/lib/medusa/mock-products";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import { formatPrice } from "@/lib/utils/format";
import type { Game } from "@/types";

type SortMode = "recent" | "price-asc" | "price-desc" | "name-asc";

function sortProducts(products: Game[], sort: SortMode) {
  const next = [...products];

  if (sort === "price-asc") {
    return next.sort((a, b) => a.price - b.price);
  }

  if (sort === "price-desc") {
    return next.sort((a, b) => b.price - a.price);
  }

  if (sort === "name-asc") {
    return next.sort((a, b) => a.title.localeCompare(b.title));
  }

  return next;
}

function EmptyWishlist() {
  const recommendedGames = mockProducts
    .slice()
    .sort((a, b) => (b.salesCount ?? 0) - (a.salesCount ?? 0))
    .slice(0, 4);

  return (
    <section className="space-y-8">
      <div className="rounded-card border border-border-cream bg-white p-10 text-center shadow-card">
        <Heart className="mx-auto h-16 w-16 text-brand-red" />
        <h2 className="mt-5 font-display text-5xl uppercase leading-none text-text-dark">
          Your Wishlist Is Empty
        </h2>
        <p className="mx-auto mt-3 max-w-[420px] text-sm leading-relaxed text-text-dark-muted">
          Save games by tapping the {"\u2661"} on any product. We will keep your favorites here.
        </p>
        <Link href="/products" className="mt-6 inline-flex h-11 items-center rounded-btn bg-brand-red px-7 text-sm font-extrabold uppercase tracking-[0.08em] text-white transition hover:bg-brand-red-dark">
          Start Browsing
        </Link>
      </div>

      <div>
        <h2 className="mb-4 font-display text-4xl uppercase leading-none text-text-dark">
          Best Sellers To Start With
        </h2>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {recommendedGames.map((game) => (
            <ProductCard key={game.id} game={game} ctaVariant={2} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function AccountWishlistClient() {
  const wishlistIds = useWishlistStore((state) => state.items);
  const remove = useWishlistStore((state) => state.remove);
  const [sort, setSort] = useState<SortMode>("recent");
  const products = sortProducts(
    wishlistIds
      .map((id) => mockProducts.find((product) => product.id === id))
      .filter((product): product is Game => Boolean(product)),
    sort,
  );

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[12px] font-extrabold uppercase tracking-[0.1em] text-brand-red">
            Saved games
          </p>
          <h1 className="mt-2 font-display text-display-md uppercase leading-none text-text-dark">
            My Wishlist ({products.length} items)
          </h1>
        </div>
        <label className="block">
          <span className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.08em] text-text-dark-muted">
            Sort
          </span>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortMode)}
            className="h-11 rounded-btn border border-border-cream bg-white px-3 text-sm font-bold text-text-dark outline-none transition focus:border-brand-red focus:ring-2 focus:ring-brand-red/20"
          >
            <option value="recent">Recently Added</option>
            <option value="price-asc">Price Low to High</option>
            <option value="price-desc">Price High to Low</option>
            <option value="name-asc">Name A to Z</option>
          </select>
        </label>
      </header>

      {products.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {products.map((game) => (
            <div key={game.id} className="rounded-card border border-border-cream bg-white p-3 shadow-card">
              <ProductCard game={game} ctaVariant={2} />
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 px-1">
                <span className={`text-[12px] font-extrabold uppercase tracking-[0.08em] ${game.stock <= 3 ? "text-[#E67E22]" : "text-status-success"}`}>
                  {game.stock <= 3 ? "Low Stock" : "In Stock"}
                </span>
                <button
                  type="button"
                  onClick={() => remove(game.id)}
                  className="text-[12px] font-extrabold uppercase tracking-[0.08em] text-text-dark-muted transition hover:text-brand-red"
                >
                  Remove from Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyWishlist />
      )}

      <section className="rounded-card border border-white/10 bg-[#1A1A1A] p-6 text-white shadow-card">
        <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h2 className="font-display text-4xl uppercase leading-none">
              Get Notified When Prices Drop
            </h2>
            <p className="mt-2 text-sm text-white/55">
              We will send a heads-up when favorites hit a better price.
            </p>
          </div>
          <form className="flex min-w-0 flex-col gap-3 sm:flex-row">
            <input
              aria-label="Email for price drop notifications"
              type="email"
              placeholder="alex@example.com"
              className="h-11 min-w-0 rounded-btn border border-white/10 bg-black/25 px-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-brand-red focus:ring-2 focus:ring-brand-red/25 sm:w-[260px]"
            />
            <button
              type="button"
              className="h-11 rounded-btn bg-brand-red px-6 text-sm font-extrabold uppercase tracking-[0.08em] text-white transition hover:bg-brand-red-dark"
            >
              Notify Me
            </button>
          </form>
        </div>
        {products.length > 0 ? (
          <p className="mt-4 text-[12px] text-white/35">
            Current wishlist value: {formatPrice(products.reduce((total, game) => total + game.price, 0))}
          </p>
        ) : null}
      </section>
    </div>
  );
}
