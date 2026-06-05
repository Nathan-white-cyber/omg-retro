import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductInfo } from "@/components/pdp/ProductInfo";
import { ConditionBadge } from "@/components/product/ConditionBadge";
import { CoverBlock } from "@/components/product/CoverBlock";
import { DiscountBadge } from "@/components/product/DiscountBadge";
import { PriceDisplay } from "@/components/product/PriceDisplay";
import { RatingStars } from "@/components/product/RatingStars";
import { getAllProducts, getProductBySlug } from "@/lib/medusa/products";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

type ProductPageProps = {
  params: Promise<{ slug: string }> | { slug: string };
};

const ogImageUrl = "https://omg-retro.vercel.app/images/og-placeholder.png";
const assuranceItems = [
  {
    title: "Authentic",
    text: "No reproductions.",
    icon: <path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3v8Z" />,
  },
  {
    title: "Tested",
    text: "Cleaned before shipping.",
    icon: (
      <>
        <rect x="3" y="8" width="18" height="10" rx="4" />
        <path d="M8 13h.01M16 13h.01M10 11v4M8 13h4" />
      </>
    ),
  },
  {
    title: "Fast Shipping",
    text: "Free over $75.",
    icon: (
      <>
        <path d="M14 18V6a2 2 0 0 0-2-2H3v14h2" />
        <path d="M15 18H9" />
        <path d="M19 18h2v-6h-4l-3-4v10h1" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
      </>
    ),
  },
];

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = await getProductBySlug(slug);

  if (!game) {
    return {
      title: "Product Not Found - OMG Retro",
    };
  }

  const title = `${game.title} (${game.system}) - OMG Retro`;
  const description = `Shop ${game.title} for ${game.system}. Authentic, cleaned, tested, and backed by a 1-year warranty.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: game.images[0] ?? ogImageUrl,
          width: 1200,
          height: 630,
          alt: game.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [game.images[0] ?? ogImageUrl],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const game = await getProductBySlug(slug);

  if (!game) {
    notFound();
  }

  const products = await getAllProducts();
  const relatedProducts = products
    .filter((product) => product.slug !== game.slug && product.vendor === game.vendor)
    .slice(0, 4);

  return (
    <>
      <div className="border-b border-border-cream bg-bg-cream">
        <div className="mx-auto max-w-[1240px] px-7">
          <nav
            aria-label="Breadcrumb"
            className="flex min-h-[52px] items-center gap-2 overflow-x-auto whitespace-nowrap font-body text-[12.5px] font-bold uppercase tracking-[0.05em] text-text-dark-muted"
          >
            <Link href="/" className="transition hover:text-brand-red">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/products" className="transition hover:text-brand-red">
              Shop Games
            </Link>
            <span aria-hidden="true">/</span>
            <Link href={`/${game.vendor}`} className="transition hover:text-brand-red">
              {game.system}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-text-dark" aria-current="page">
              {game.title}
            </span>
          </nav>
        </div>
      </div>

      <main className="bg-bg-cream">
        <section className="mx-auto grid max-w-[1240px] gap-8 px-7 py-9 lg:grid-cols-[minmax(0,540px)_1fr] lg:py-12">
          <div className="rounded-card border border-border-cream bg-white p-4 shadow-card">
            <CoverBlock
              platform={game.platform}
              systemCode={game.systemCode}
              title={game.title}
              imageUrl={game.images[0]}
              coverColor={game.coverColor}
              aspect="landscape"
              priority
              className="min-h-[320px]"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-body text-[12px] font-extrabold uppercase tracking-[0.08em] text-text-dark-muted">
                {game.system}
              </span>
              <ConditionBadge condition={game.condition} />
              {game.discountPercent ? <DiscountBadge percent={game.discountPercent} /> : null}
            </div>

            <h1 className="mt-3 font-display text-[clamp(40px,6vw,72px)] uppercase leading-[0.92] text-text-dark">
              {game.title}
            </h1>

            <div className="mt-4">
              <RatingStars rating={game.rating} reviewCount={game.reviewCount} />
            </div>

            <div className="mt-6">
              <ProductInfo game={game} />
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {assuranceItems.map((item) => (
                  <div key={item.title} className="rounded-card border border-border-cream bg-white p-4">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-5 w-5 text-brand-red"
                      aria-hidden="true"
                    >
                      {item.icon}
                    </svg>
                    <h2 className="mt-3 font-body text-[12px] font-extrabold uppercase tracking-[0.06em] text-text-dark">
                      {item.title}
                    </h2>
                    <p className="mt-1 text-[12px] leading-relaxed text-text-dark-muted">
                      {item.text}
                    </p>
                  </div>
              ))}
            </div>

            <div className="mt-6 border-t border-border-cream pt-6">
              <h2 className="font-body text-[14px] font-extrabold uppercase tracking-[0.06em] text-text-dark">
                Product Details
              </h2>
              <p className="mt-3 max-w-[680px] text-sm leading-relaxed text-text-dark-muted">
                This {game.condition} copy of {game.title} for {game.system} is part of the
                OMG Retro tested catalog. Every item is cleaned, checked for functionality, and
                backed by our 1-year warranty.
              </p>
            </div>
          </div>
        </section>

        {relatedProducts.length ? (
          <section className="mx-auto max-w-[1240px] px-7 pb-12">
            <div className="mb-5 flex items-end justify-between gap-4">
              <h2 className="font-display text-4xl uppercase leading-none text-text-dark">
                Related Games
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group rounded-card border border-border-cream bg-white p-3 shadow-card transition duration-normal hover:-translate-y-1 hover:border-border-light hover:shadow-card-hover"
                >
                  <CoverBlock
                    platform={product.platform}
                    systemCode={product.systemCode}
                    title={product.title}
                    imageUrl={product.images[0]}
                    coverColor={product.coverColor}
                    aspect="landscape"
                  />
                  <span className="mt-3 block font-body text-[11px] font-bold uppercase tracking-[0.04em] text-text-dark-muted">
                    {product.system}
                  </span>
                  <h3 className="mt-1 line-clamp-2 min-h-[38px] text-sm font-bold leading-snug text-text-dark group-hover:text-brand-red">
                    {product.title}
                  </h3>
                  <div className="mt-3">
                    <PriceDisplay price={product.price} originalPrice={product.originalPrice} />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </>
  );
}
