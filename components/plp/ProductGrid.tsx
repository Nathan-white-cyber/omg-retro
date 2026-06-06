import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { mockProducts } from "@/lib/medusa/mock-products";
import type { Game } from "@/types";

interface ProductGridProps {
  products: Game[];
  query?: string;
}

export function EmptyState({ query }: { query?: string }) {
  const searchQuery = query?.trim();
  const recommendedGames = mockProducts
    .slice()
    .sort((a, b) => (b.salesCount ?? 0) - (a.salesCount ?? 0))
    .slice(0, 4);

  return (
    <section className="space-y-8">
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
          {searchQuery
            ? `We could not find anything matching '${searchQuery}'. Try a different search term or browse all games.`
            : "We could not find anything matching your filters. Try a different search term or browse all games."}
        </p>
        <form action="/search" className="mt-6 flex w-full max-w-md gap-2">
          <input
            aria-label="Search games"
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
          <Link href="/products" className="rounded-btn bg-bg-dark px-4 py-2 text-[12px] font-extrabold uppercase tracking-[0.06em] text-white transition hover:bg-brand-red">
            CLEAR SEARCH
          </Link>
        </div>
      </div>

      <div>
        <h2 className="mb-4 font-display text-4xl uppercase leading-none text-text-dark">
          YOU MIGHT LIKE
        </h2>
        <div className="flex gap-5 overflow-x-auto pb-2">
          {recommendedGames.map((game) => (
            <div key={game.id} className="w-[240px] shrink-0 sm:w-[280px] lg:w-auto lg:flex-1">
              <ProductCard game={game} ctaVariant={2} />
            </div>
          ))}
        </div>
      </div>
    </section>
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
