import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { ProductCard } from "@/components/product";
import { getBestSellers, getFeaturedDeals, getPlatformCounts, getRecentlyAdded } from "@/lib/medusa/products";
import { formatPrice } from "@/lib/utils/format";
import { getPlatformConfig } from "@/lib/utils/platform";
import type { Game, ProductVendor } from "@/types";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

function SectionHeader({ title, href, linkLabel }: { title: string; href: string; linkLabel: string }) {
  return (
    <div className="omg-section-head">
      <h2>{title}</h2>
      <Link href={href} className="omg-see-all">
        {linkLabel}
        <ArrowIcon />
      </Link>
    </div>
  );
}

export function HeroBanner() {
  return (
    <section className="omg-hero omg-section-hero" data-screen-label="Hero">
      <div className="omg-hero-bg-layer" />
      <div className="omg-container omg-hero-grid">
        <div className="omg-hero-copy">
          <span className="omg-hero-eyebrow">TESTED | CLEANED | GUARANTEED</span>
          <h1>
            PLAY THE <span>CLASSICS</span> AGAIN
          </h1>
          <p>
            Authentic retro games, consoles & accessories - every one cleaned, tested on real
            hardware, and backed by a 1-year warranty.
          </p>
          <div className="omg-hero-actions">
            <Link href="#best-sellers" className="omg-btn omg-btn-lg">
              SHOP BEST SELLERS
            </Link>
            <Link href="#deals" className="omg-btn omg-btn-lg omg-btn-ghost">
              BROWSE DEALS
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

const platformTiles: Array<{
  vendor: ProductVendor;
  name: string;
  href: string;
  cta: string;
}> = [
  { vendor: "nintendo", name: "Nintendo", href: "/nintendo", cta: "Shop Nintendo" },
  { vendor: "playstation", name: "PlayStation", href: "/playstation", cta: "Shop PlayStation" },
  { vendor: "xbox", name: "Xbox", href: "/xbox", cta: "Shop Xbox" },
  { vendor: "sega", name: "Sega", href: "/sega", cta: "Shop Sega" },
];

export async function ShopByPlatformSection() {
  const counts = await getPlatformCounts();

  return (
    <section className="omg-section omg-section-platforms" data-screen-label="Platforms">
      <div className="omg-container">
        <SectionHeader title="Shop by Platform" href="/products" linkLabel="All Systems" />
        <div className="omg-platform-grid">
          {platformTiles.map((platform) => {
            const config = getPlatformConfig(platform.name);

            return (
              <Link
                key={platform.vendor}
                href={platform.href}
                className="omg-platform-card"
                aria-label={`${platform.cta} - ${counts[platform.vendor]} products`}
              >
                <div className="omg-platform-scene" style={{ background: config.tileBg }}>
                  <span className="omg-platform-logo">{platform.name}</span>
                </div>
                <div className="omg-platform-bar" style={{ background: config.shopBtnBg }}>
                  {platform.cta}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export async function FeaturedDealsSection() {
  const products = await getFeaturedDeals(4);
  if (!products.length) return null;

  return (
    <section className="omg-section omg-section-deals" id="deals" data-screen-label="Deals">
      <div className="omg-container">
        <SectionHeader title="This Week's Deals" href="/deals" linkLabel="All Deals" />
        <div className="omg-deal-grid">
          {products.map((product) => (
            <DealCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DealCard({ product }: { product: Game }) {
  const href = `/products/${product.slug}`;
  const hasDiscount = Boolean(product.originalPrice && product.originalPrice > product.price);
  const discountPercent =
    hasDiscount && product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  return (
    <article className="omg-deal-card">
      <Link href={href} className="omg-deal-cover-link" aria-label={`View ${product.title}`}>
        <div className="omg-cover" style={{ "--cv": product.coverColor || "#444444" } as CSSProperties}>
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={`${product.title} cover`}
              fill
              sizes="118px"
              className="omg-cover-image"
            />
          ) : null}
          <span className="omg-cover-platform">{product.system}</span>
          <span className="omg-cover-title">{product.title}</span>
        </div>
      </Link>
      <div className="omg-deal-info">
        <span className="omg-deal-platform">{product.system}</span>
        <Link href={href} className="omg-deal-title">
          {product.title}
        </Link>
        <div className="omg-deal-prices">
          <span className="omg-price-now">{formatPrice(product.price)}</span>
          {hasDiscount && product.originalPrice ? (
            <span className="omg-price-was">{formatPrice(product.originalPrice)}</span>
          ) : null}
        </div>
        {discountPercent > 0 ? <span className="omg-badge-off">{discountPercent}% OFF</span> : null}
        <a href={href} className="omg-btn omg-btn-sm omg-deal-cta">
          Shop Deal &#8594;
        </a>
      </div>
    </article>
  );
}

function ProductRail({ products }: { products: Game[] }) {
  return (
    <div className="omg-product-grid omg-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          game={product}
          ctaVariant={2}
        />
      ))}
    </div>
  );
}

export async function BestSellersSection() {
  const products = await getBestSellers(4);
  if (!products.length) return null;

  return (
    <section className="omg-section omg-section-best" id="best-sellers" data-screen-label="Best Sellers">
      <div className="omg-container">
        <SectionHeader title="Best Sellers" href="/best-sellers" linkLabel="View All" />
        <ProductRail products={products} />
      </div>
    </section>
  );
}

function WhyIcon({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      {children}
    </svg>
  );
}

export function WhyShopSection() {
  const items = [
    {
      title: "Genuine Articles",
      body: "Every game and console is an authentic original - no clones, no reproductions.",
      icon: (
        <>
          <path d="M12 2 4 5v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V5l-8-3Z" />
          <path d="m9 12 2 2 4-4" />
        </>
      ),
    },
    {
      title: "Hands-On Tested",
      body: "Played, cleaned, and verified on real hardware before it ships.",
      icon: (
        <>
          <rect x="2" y="7" width="20" height="11" rx="3" />
          <circle cx="8" cy="12.5" r="1.3" />
          <path d="M16 11h.01M19 13h.01" />
        </>
      ),
    },
    {
      title: "Warranty Backed",
      body: "A full year of coverage on everything we sell, no hassle.",
      icon: <path d="M12 2 4 5v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V5l-8-3Z" />,
    },
    {
      title: "Fast & Tracked",
      body: "Same-day dispatch before 2 PM EST, tracking on every order.",
      icon: (
        <>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </>
      ),
    },
  ];

  return (
    <section className="omg-section omg-section-why" data-screen-label="Why">
      <div className="omg-container">
        <div className="omg-why-band">
          <div className="omg-why-inner">
            <h2>
              Why <span>OMG Retro</span>?
            </h2>
            {items.map((item) => (
              <div key={item.title} className="omg-why-item">
                <WhyIcon>{item.icon}</WhyIcon>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export async function RecentlyAddedSection() {
  const products = await getRecentlyAdded(4);
  if (!products.length) return null;

  return (
    <section className="omg-section omg-section-recent" data-screen-label="Recently Added">
      <div className="omg-container">
        <SectionHeader title="Recently Added" href="/new-arrivals" linkLabel="View All" />
        <ProductRail products={products} />
      </div>
    </section>
  );
}

export function SearchCtaSection() {
  return (
    <div className="omg-search-cta">
      <div className="omg-container">
        <div className="omg-cta-text">
          <h2>Looking for a Specific Game?</h2>
          <p>Search our entire catalog of thousands of retro games.</p>
        </div>
        <form action="/search" className="omg-search-form">
          <input name="q" type="search" placeholder="Search games" aria-label="Search games" />
          <button type="submit">Search Games</button>
        </form>
      </div>
    </div>
  );
}
