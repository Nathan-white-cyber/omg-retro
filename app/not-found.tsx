import Link from "next/link";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { NavBar } from "@/components/layout/NavBar";
import { UtilityBar } from "@/components/layout/UtilityBar";
import { ProductCard } from "@/components/product/ProductCard";
import { mockProducts } from "@/lib/medusa/mock-products";

const recommendedGames = mockProducts
  .slice()
  .sort((a, b) => (b.salesCount ?? 0) - (a.salesCount ?? 0))
  .slice(0, 4);

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0E0E0E] text-white">
      <UtilityBar />
      <MobileHeader />
      <NavBar />

      <main className="flex-1 px-7 py-14">
        <section className="mx-auto max-w-[600px] text-center">
          <p className="omg-glitch font-display text-[110px] uppercase leading-none text-brand-red sm:text-[150px]" data-text="404">
            404
          </p>
          <p className="mt-3 font-display text-5xl uppercase leading-none text-white sm:text-[48px]">
            GAME OVER
          </p>
          <h1 className="mt-2 font-display text-[32px] uppercase leading-none text-brand-red">
            PAGE NOT FOUND
          </h1>
          <p className="mx-auto mt-4 max-w-[480px] text-sm leading-relaxed text-white/55">
            This page is missing from the cartridge slot. Try searching the catalog or head back to the games.
          </p>

          <form action="/search" className="mt-7 flex gap-2 rounded-card border border-white/10 bg-[#1A1A1A] p-2">
            <input
              name="q"
              placeholder="Search games, systems, accessories..."
              className="min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/35"
            />
            <button className="rounded-btn bg-brand-red px-5 py-3 text-[12px] font-extrabold uppercase tracking-[0.08em] text-white transition hover:bg-brand-red-dark">
              Search
            </button>
          </form>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/products" className="rounded-btn bg-brand-red px-5 py-3 text-[12px] font-extrabold uppercase tracking-[0.08em] text-white transition hover:bg-brand-red-dark">
              Browse Games
            </Link>
            <Link href="/" className="rounded-btn border border-white/15 px-5 py-3 text-[12px] font-extrabold uppercase tracking-[0.08em] text-white/70 transition hover:border-brand-red hover:text-brand-red">
              Back Home
            </Link>
          </div>
        </section>

        <section className="mx-auto mt-14 max-w-[1240px]">
          <h2 className="mb-5 text-center font-display text-4xl uppercase leading-none text-white">
            Popular Games
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {recommendedGames.map((game) => (
              <ProductCard key={game.id} game={game} ctaVariant={2} />
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-7 py-5 text-center text-[12px] text-white/45">
        (c) 2026 OMG Retro. All rights reserved.
      </footer>
    </div>
  );
}
