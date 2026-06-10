import Link from "next/link";
import { ProductCard } from "@/components/product";
import { getBestSellers, getFeaturedDeals, getPlatformCounts, getRecentlyAdded } from "@/lib/medusa/products";
import type { Game, ProductVendor } from "@/types";

function SectionHeader({
  eyebrow,
  title,
  href,
  linkLabel,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  href: string;
  linkLabel: string;
  dark?: boolean;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-5">
      <div>
        <p className="mb-[3px] font-body text-[9px] font-bold uppercase tracking-[0.15em] text-brand-red">
          {eyebrow}
        </p>
        <h2
          className={`font-display text-display-sm uppercase ${
            dark ? "text-[#F5F0EB]" : "text-[#1a1a1a]"
          }`}
        >
          {title}
        </h2>
      </div>
      <Link
        href={href}
        className="shrink-0 rounded-[3px] border border-brand-red/20 bg-brand-red/10 px-2.5 py-1 font-body text-[9px] font-bold uppercase tracking-[0.06em] text-brand-red transition hover:border-brand-red/40 hover:bg-brand-red/15"
      >
        {linkLabel} -&gt;
      </Link>
    </div>
  );
}

function PlaceholderConsoleStack() {
  return (
    <div className="relative min-h-[300px] overflow-hidden rounded-card border border-border bg-bg-surface p-5 shadow-card">
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0_3px,rgba(0,0,0,.24)_3px_5px)] opacity-40" />
      <div className="relative grid h-full grid-cols-3 gap-3">
        {["N64", "SNES", "PS1", "GBA", "Xbox", "DC"].map((label, index) => (
          <div
            key={label}
            className={`flex aspect-[3/4] items-end rounded bg-[linear-gradient(145deg,#333,#111)] p-3 font-display text-xl uppercase text-white shadow-card ${
              index % 2 ? "translate-y-5" : ""
            }`}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroBanner() {
  return (
    <section className="bg-[radial-gradient(ellipse_at_15%_70%,rgba(120,10,10,0.95)_0%,transparent_50%),radial-gradient(ellipse_at_85%_30%,rgba(10,10,100,0.8)_0%,transparent_50%),#111111] px-7 py-12 md:py-16">
      <div className="mx-auto grid max-w-[1240px] items-center gap-10 lg:grid-cols-[1fr_0.95fr]">
        <div>
          <p className="mb-4 font-body text-label-lg uppercase tracking-[0.14em] text-brand-red">
            TESTED · CLEANED · GUARANTEED
          </p>
          <h1 className="max-w-3xl font-display text-[52px] uppercase leading-[0.95] text-text-primary md:text-[82px]">
            The Games That Defined{" "}
            <span className="block text-brand-red">A Generation</span>
          </h1>
          <p className="mt-5 max-w-lg text-body-lg text-text-secondary">
            Authentic retro games, consoles and accessories from the systems you love.
          </p>
          <Link
            href="/products"
            prefetch={true}
            className="mt-8 inline-flex h-[52px] items-center justify-center rounded-btn bg-brand-red px-8 font-body text-label-lg uppercase text-white transition hover:bg-brand-red-dark"
          >
            Shop Now
          </Link>
        </div>
        <PlaceholderConsoleStack />
      </div>
    </section>
  );
}

const platformTiles: Array<{
  vendor: ProductVendor;
  name: string;
  href: string;
  cta: string;
  color: string;
  accent: string;
}> = [
  { vendor: "nintendo", name: "Nintendo", href: "/nintendo", cta: "Shop Nintendo", color: "#CC1E1E", accent: "NES · SNES · N64" },
  { vendor: "playstation", name: "PlayStation", href: "/playstation", cta: "Shop PlayStation", color: "#003087", accent: "PS1 · PS2 · PSP" },
  { vendor: "xbox", name: "Xbox", href: "/xbox", cta: "Shop Xbox", color: "#107C10", accent: "Xbox · 360" },
  { vendor: "sega", name: "Sega", href: "/sega", cta: "Shop Sega", color: "#003087", accent: "Genesis · Dreamcast" },
];

export async function ShopByPlatformSection() {
  const counts = await getPlatformCounts();

  return (
    <section className="bg-[radial-gradient(ellipse_at_0%_0%,#e8d5b0_0%,#F5F0EB_40%,#ede0cc_100%)] px-7 py-section-y-sm md:py-section-y">
      <div className="mx-auto max-w-[1240px]">
        <SectionHeader eyebrow="Browse" title="Shop By Platform" href="/products" linkLabel="View All Systems" />
        <div className="grid gap-5 md:grid-cols-4">
          {platformTiles.map((platform) => (
            <Link
              key={platform.vendor}
              href={platform.href}
              className="group flex aspect-[1/1.12] flex-col overflow-hidden rounded-card bg-bg-dark shadow-card transition duration-normal hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="flex flex-1 flex-col items-center justify-center gap-4 p-5 text-center">
                <span className="font-display text-display-sm uppercase text-white">
                  {platform.name}
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-white/60">
                  {platform.accent}
                </span>
                <span className="text-body-sm text-white/55">
                  {counts[platform.vendor]} products
                </span>
              </div>
              <div
                className="px-4 py-4 text-center font-body text-label-lg uppercase text-white transition group-hover:brightness-110"
                style={{ backgroundColor: platform.color }}
              >
                {platform.cta}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductRail({
  products,
  ranked = false,
}: {
  products: Game[];
  ranked?: boolean;
}) {
  return (
    <div
      className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
    >
      {products.map((product, index) => (
        <div key={product.id} className="relative">
          {ranked ? (
            <span className="absolute -left-2 -top-2 z-20 grid h-8 w-8 place-items-center rounded-full bg-brand-red font-body text-sm font-extrabold text-white shadow-card">
              {index + 1}
            </span>
          ) : null}
          <ProductCard game={product} ctaVariant={2} showSaving />
        </div>
      ))}
    </div>
  );
}

export async function FeaturedDealsSection() {
  const products = await getFeaturedDeals(4);

  return (
    <section className="bg-[radial-gradient(ellipse_at_100%_100%,#e8d5b0_0%,#EDE5D8_40%,#e0d4be_100%)] px-7 py-section-y-sm md:py-section-y">
      <div className="mx-auto max-w-[1240px]">
        <SectionHeader eyebrow="Hot Right Now" title="Featured Deals" href="/deals" linkLabel="View All Deals" />
        <ProductRail products={products} />
      </div>
    </section>
  );
}

export async function BestSellersSection() {
  const products = await getBestSellers(6);

  return (
    <section className="bg-[radial-gradient(ellipse_at_0%_100%,#e8d5b0_0%,#F0E8DC_40%,#ede0cc_100%)] px-7 py-section-y-sm md:py-section-y">
      <div className="mx-auto max-w-[1240px]">
        <SectionHeader eyebrow="Player Favorites" title="Best Sellers" href="/best-sellers" linkLabel="View All Best Sellers" />
        <ProductRail products={products} ranked />
      </div>
    </section>
  );
}

export function WhyShopSection() {
  const items = [
    {
      title: "Carefully Handled",
      body: "We package every order with care.",
      icon: <path d="m21 8-9-5-9 5 9 5 9-5ZM3 8v8l9 5 9-5V8M12 13v8" />,
    },
    {
      title: "Cleaned & Tested",
      body: "Games are cleaned and tested before shipping.",
      icon: (
        <>
          <rect x="3" y="8" width="18" height="10" rx="4" />
          <path d="M8 13h.01M16 13h.01M10 11v4M8 13h4" />
        </>
      ),
    },
    {
      title: "1-Year Warranty",
      body: "We stand behind every purchase.",
      icon: <path d="M12 2 4 5v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V5l-8-3Z" />,
    },
    {
      title: "Real People, Real Help",
      body: "We're here if you need us.",
      icon: (
        <>
          <path d="M4 12a8 8 0 0 1 16 0v4a2 2 0 0 1-2 2h-2" />
          <path d="M8 18h4" />
          <rect x="3" y="11" width="4" height="6" rx="2" />
          <rect x="17" y="11" width="4" height="6" rx="2" />
        </>
      ),
    },
  ];

  return (
    <section className="bg-[#1a1a1a] px-7 py-10">
      <div className="mx-auto grid max-w-[1240px] gap-5 md:grid-cols-4">
        {items.map((item) => (
          <div key={item.title} className="flex items-start gap-3">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-9 w-9 shrink-0 text-brand-red"
              aria-hidden="true"
            >
              {item.icon}
            </svg>
            <div>
              <h3 className="font-body text-[13.5px] font-extrabold text-text-primary">
                {item.title}
              </h3>
              <p className="mt-1 text-[12.5px] leading-snug text-text-secondary">
                {item.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export async function RecentlyAddedSection() {
  const products = await getRecentlyAdded(4);

  return (
    <section className="bg-[radial-gradient(ellipse_at_100%_0%,#e8d5b0_0%,#EDE5D8_40%,#e0d4be_100%)] px-7 py-section-y-sm md:py-section-y">
      <div className="mx-auto max-w-[1240px]">
        <SectionHeader eyebrow="Fresh Drops" title="Recently Added" href="/new-arrivals" linkLabel="View All Recently Added" />
        <ProductRail products={products} />
      </div>
    </section>
  );
}

export function SearchCtaSection() {
  return (
    <section className="border-t border-white/[0.05] bg-[#111111] px-7 py-12">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-6 bg-[#111111] px-0 py-7 md:flex-row md:items-center md:justify-between md:gap-6 md:px-8">
        <div className="flex-1">
          <h2 className="font-display text-[clamp(18px,3vw,24px)] uppercase leading-[1.1] text-white">
            Looking For A Specific Game?
          </h2>
          <p className="mt-1.5 font-body text-[11px] text-white/50">
            Search our entire catalog of thousands of retro games.
          </p>
        </div>
        <Link
          href="/search"
          className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-[3px] border-0 bg-brand-red px-7 py-3 font-body text-[11px] font-bold uppercase tracking-[0.08em] text-white transition hover:bg-brand-red-dark"
        >
          Search Games -&gt;
        </Link>
      </div>
    </section>
  );
}
