import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import type { Game } from "@/types";

interface ProductGridProps {
  products: Game[];
  query?: string;
}

export function EmptyState({ query }: { query?: string }) {
  return (
    <div className="flex min-h-[520px] flex-col items-center justify-center rounded-card border border-border-cream bg-white p-8 text-center shadow-card">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-bg-cream-dark text-brand-red">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-9 w-9" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      </div>
      <h2 className="mt-5 font-display text-[34px] uppercase leading-none text-text-dark">
        NO GAMES FOUND
      </h2>
      <p className="mt-3 max-w-md text-[14px] leading-relaxed text-text-dark-muted">
        Try adjusting your filters, checking the spelling, or searching for another system.
      </p>
      <form action="/search" className="mt-6 flex w-full max-w-md gap-2">
        <input
          name="q"
          defaultValue={query}
          placeholder="Search games"
          className="min-w-0 flex-1 rounded-btn border-border-cream bg-bg-cream px-4 py-3 text-[14px] font-bold text-text-dark"
        />
        <button className="rounded-btn bg-brand-red px-5 py-3 text-[12px] font-extrabold uppercase tracking-[0.06em] text-white transition hover:bg-brand-red-dark">
          Search
        </button>
      </form>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {["Zelda", "Mario", "Pokemon", "Final Fantasy"].map((term) => (
          <Link
            key={term}
            href={`/search?q=${encodeURIComponent(term)}`}
            className="rounded-full bg-bg-cream px-3 py-1.5 text-[12px] font-bold text-text-dark-muted transition hover:bg-brand-red hover:text-white"
          >
            {term}
          </Link>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap justify-center gap-3">
        <Link href="/products" className="rounded-btn border border-border-cream px-4 py-2 text-[12px] font-extrabold uppercase tracking-[0.06em] text-text-dark transition hover:border-brand-red hover:text-brand-red">
          Clear All Filters
        </Link>
        <Link href="/products" className="rounded-btn bg-bg-dark px-4 py-2 text-[12px] font-extrabold uppercase tracking-[0.06em] text-white transition hover:bg-brand-red">
          Browse All Games
        </Link>
      </div>
    </div>
  );
}

export function ProductGrid({ products, query }: ProductGridProps) {
  if (!products.length) {
    return <EmptyState query={query} />;
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          game={product}
          showSaving
          priority={index < 4}
        />
      ))}
    </div>
  );
}
