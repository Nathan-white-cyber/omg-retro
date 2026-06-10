import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { ProductCard } from "@/components/product";
import { formatPrice } from "@/lib/utils/format";
import { getPlatformColor } from "@/lib/utils/platform";
import { getBestSellers, getFeaturedDeals, getPlatformCounts, getRecentlyAdded } from "@/lib/medusa/products";
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

function CoverTile({
  platform,
  title,
  color,
  imageUrl,
  priority = false,
  className = "",
}: {
  platform: string;
  title: string;
  color: string;
  imageUrl?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`omg-cover ${className}`} style={{ "--cv": color } as CSSProperties}>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={`${title} cover`}
          fill
          sizes="(max-width: 680px) 50vw, 180px"
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="omg-cover-image"
        />
      ) : null}
      <span className="omg-cover-platform">{platform}</span>
      <span className="omg-cover-title">{title}</span>
    </div>
  );
}

export function HeroBanner() {
  const tiles = [
    { platform: "N64", title: "Zelda OoT", color: "#b8902f" },
    { platform: "GBA", title: "Pokemon Emerald", color: "#1f9d57" },
    { platform: "PS1", title: "Final Fantasy VII", color: "#1c2733" },
    { platform: "DC", title: "Sonic Adv 2", color: "#3a7bd5" },
    { platform: "Xbox", title: "Halo: CE", color: "#2f6b3a" },
    { platform: "GEN", title: "Streets of Rage 2", color: "#6b3aa0" },
  ];

  return (
    <section className="omg-hero" data-screen-label="Hero">
      <div className="omg-hero-bg-layer" />
      <div className="omg-container omg-hero-grid">
        <div className="omg-hero-copy">
          <span className="omg-hero-eyebrow">Tested | Cleaned | Guaranteed</span>
          <h1>
            Play the <span>Classics</span> Again
          </h1>
          <p>
            Authentic retro games, consoles & accessories - every one cleaned, tested on real
            hardware, and backed by a 1-year warranty.
          </p>
          <div className="omg-hero-actions">
            <Link href="#best-sellers" className="omg-btn omg-btn-lg">
              Shop Best Sellers
            </Link>
            <Link href="#deals" className="omg-btn omg-btn-lg omg-btn-ghost">
              Browse Deals
            </Link>
          </div>
        </div>
        <div className="omg-hero-art">
          <div className="omg-hero-tiles">
            {tiles.map((tile) => (
              <CoverTile key={tile.title} {...tile} />
            ))}
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
  dataPf: string;
}> = [
  { vendor: "nintendo", name: "Nintendo", href: "/nintendo", cta: "Shop Nintendo", dataPf: "nintendo" },
  { vendor: "playstation", name: "PlayStation", href: "/playstation", cta: "Shop PlayStation", dataPf: "playstation" },
  { vendor: "xbox", name: "Xbox", href: "/xbox", cta: "Shop Xbox", dataPf: "xbox" },
  { vendor: "sega", name: "Sega", href: "/sega", cta: "Shop Sega", dataPf: "sega" },
];

export async function ShopByPlatformSection() {
  const counts = await getPlatformCounts();

  return (
    <section className="omg-section" data-screen-label="Platforms">
      <div className="omg-container">
        <SectionHeader title="Shop by Platform" href="/products" linkLabel="All Systems" />
        <div className="omg-platform-grid">
          {platformTiles.map((platform) => (
            <Link
              key={platform.vendor}
              href={platform.href}
              className="omg-platform-card"
              data-pf={platform.dataPf}
              aria-label={`${platform.cta} - ${counts[platform.vendor]} products`}
            >
              <div className="omg-platform-scene">
                <span className="omg-platform-logo">{platform.name}</span>
              </div>
              <div className="omg-platform-bar">{platform.cta}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function DealCard({ product, priority = false }: { product: Game; priority?: boolean }) {
  const href = `/products/${product.slug}`;
  const hasDiscount = Boolean(product.originalPrice && product.originalPrice > product.price);

  return (
    <article className="omg-deal-card">
      <Link href={href} className="omg-deal-cover-link" aria-label={`View ${product.title}`}>
        <CoverTile
          platform={product.systemCode}
          title={product.title}
          color={product.coverColor ?? getPlatformColor(product.platform)}
          imageUrl={product.images[0]}
          priority={priority}
        />
      </Link>
      <div className="omg-deal-info">
        <span className="omg-deal-platform">
          {product.system} | {product.condition}
        </span>
        <Link href={href} className="omg-deal-title">
          {product.title}
        </Link>
        <div className="omg-deal-prices">
          <span className="omg-price-now">{formatPrice(product.price)}</span>
          {hasDiscount && product.originalPrice ? (
            <span className="omg-price-was">{formatPrice(product.originalPrice)}</span>
          ) : null}
          {product.discountPercent ? (
            <span className="omg-badge-off">{product.discountPercent}% Off</span>
          ) : null}
        </div>
        <Link href={href} className="omg-btn omg-btn-sm omg-deal-cta">
          Shop Deal
          <ArrowIcon />
        </Link>
      </div>
    </article>
  );
}

export async function FeaturedDealsSection() {
  const products = await getFeaturedDeals(4);

  return (
    <section className="omg-section omg-section-alt" id="deals" data-screen-label="Deals">
      <div className="omg-container">
        <SectionHeader title="This Week's Deals" href="/deals" linkLabel="All Deals" />
        <div className="omg-deal-grid">
          {products.map((product, index) => (
            <DealCard key={product.id} product={product} priority={index === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductRail({
  products,
  columns,
  ranked = false,
}: {
  products: Game[];
  columns: "six" | "four";
  ranked?: boolean;
}) {
  return (
    <div className={`omg-product-grid ${columns === "six" ? "omg-cols-6" : "omg-cols-4"}`}>
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          game={product}
          ctaVariant={2}
          rank={ranked ? index + 1 : undefined}
        />
      ))}
    </div>
  );
}

export async function BestSellersSection() {
  const products = await getBestSellers(6);

  return (
    <section className="omg-section" id="best-sellers" data-screen-label="Best Sellers">
      <div className="omg-container">
        <SectionHeader title="Best Sellers" href="/best-sellers" linkLabel="View All" />
        <ProductRail products={products} columns="six" ranked />
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
    <section className="omg-section" data-screen-label="Why">
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

  return (
    <section className="omg-section" data-screen-label="Recently Added">
      <div className="omg-container">
        <SectionHeader title="Recently Added" href="/new-arrivals" linkLabel="View All" />
        <ProductRail products={products} columns="four" />
      </div>
    </section>
  );
}

export function SearchCtaSection() {
  return (
    <div className="omg-search-cta">
      <div className="omg-container">
        <span className="omg-cta-glyph" aria-hidden="true">
          *
        </span>
        <div className="omg-cta-text">
          <h2>Looking for a Specific Game?</h2>
          <p>Search our entire catalog of thousands of retro games.</p>
        </div>
        <Link href="/search" className="omg-btn omg-btn-lg">
          Search Games
        </Link>
      </div>
    </div>
  );
}
