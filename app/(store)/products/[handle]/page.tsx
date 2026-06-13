import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PdpBuyBox from "@/components/product/PdpBuyBox";
import PdpGallery from "@/components/product/PdpGallery";
import PdpReviews from "@/components/product/PdpReviews";
import PdpTabs from "@/components/product/PdpTabs";
import RelatedProducts from "@/components/sections/RelatedProducts";
import SearchCtaBand from "@/components/sections/SearchCtaBand";
import { getProductByHandle, listProducts } from "@/lib/medusa/products";
import { createMetadata, ogImageUrl } from "@/lib/seo";
import { getPlatformColor, getPlatformFromProduct, getProductType } from "@/lib/utils/platform";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

type ProductPageProps = {
  params: Promise<{ handle: string }> | { handle: string };
};

function getParentBrand(platform: string): string {
  const p = platform.toLowerCase();
  if (
    p.includes("nintendo") ||
    p.includes("nes") ||
    p.includes("snes") ||
    p.includes("game boy") ||
    p.includes("gamecube") ||
    p.includes("wii") ||
    p.includes("switch")
  ) {
    return "Nintendo";
  }
  if (p.includes("playstation") || p.includes("psp")) return "PlayStation";
  if (p.includes("xbox")) return "Xbox";
  if (p.includes("sega") || p.includes("genesis") || p.includes("dreamcast") || p.includes("saturn") || p.includes("game gear")) {
    return "Sega";
  }
  return "Shop";
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    return createMetadata({
      title: "Product Not Found - OMG Retro",
      description: "The requested OMG Retro product could not be found.",
      path: `/products/${handle}`,
      index: false,
    });
  }

  const collection = product.collection?.title ?? "Retro";

  return createMetadata({
    title: `${product.title} (${collection}) - OMG Retro`,
    description: product.description ?? `Shop ${product.title} at OMG Retro.`,
    path: `/products/${product.handle}`,
    image: product.images[0]?.url ?? product.thumbnail ?? ogImageUrl,
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) notFound();

  const platform = getPlatformFromProduct(product);
  const platformColor = getPlatformColor(platform);
  const productType = getProductType(product);
  const defaultVariant = product.variants?.find((variant) => variant.title === "CIB") ?? product.variants?.[0];
  const rawPrice = defaultVariant?.prices?.[0]?.amount ?? 0;
  const price = rawPrice / 100;
  const rawCompare = defaultVariant?.compare_at_price ?? defaultVariant?.prices?.[0]?.compare_at_price ?? 0;
  const comparePrice = typeof rawCompare === "number" && rawCompare > 0 ? rawCompare / 100 : 0;
  const discountPercent = comparePrice > price && price > 0 ? Math.round((1 - price / comparePrice) * 100) : 0;
  const parentBrand = productType === "game" ? getParentBrand(platform) : "Shop";
  const subcategory = productType === "console" ? "Consoles" : productType === "accessory" ? "Accessories" : platform;
  const related = await listProducts({ collection: product.collection?.id, limit: 5 }).then((result) =>
    result.products.filter((relatedProduct) => relatedProduct.id !== product.id).slice(0, 4),
  );

  return (
    <>
      <div className="pdp-subnav">
        <div className="pdp-wrap">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href="/">
              <svg className="bc-home" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 10.5 12 3l9 7.5" />
                <path d="M5 9.5V20h14V9.5" />
              </svg>
              Home
            </a>
            <svg className="bc-sep" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="m9 6 6 6-6 6" />
            </svg>
            <a href="#">{parentBrand}</a>
            <svg className="bc-sep" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="m9 6 6 6-6 6" />
            </svg>
            <a href="#">{subcategory}</a>
            <svg className="bc-sep" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="m9 6 6 6-6 6" />
            </svg>
            <span className="current">{product.title}</span>
          </nav>
        </div>
      </div>

      <main>
        <section className="pdp-main-section">
          <div className="pdp-wrap">
            <div className="pdp-main">
              <PdpGallery
                platformColor={platformColor}
                platformTitle={platform}
                productTitle={product.title}
                discountPercent={discountPercent}
                productType={productType}
              />
              <PdpBuyBox product={product} productType={productType} platform={platform} />
            </div>
          </div>
        </section>

        <PdpTabs
          description={product.description ?? ""}
          productType={productType}
          platform={platform}
          metadata={(product.metadata as Record<string, string>) ?? {}}
        />
        <PdpReviews productTitle={product.title} score={4.9} reviewCount={1284} />
        <RelatedProducts
          products={related}
          sectionTitle="You May Also Like"
          viewAllHref={`/${product.collection?.handle ?? "products"}`}
          viewAllLabel={`View All ${subcategory || "Products"}`}
        />
        <SearchCtaBand />
      </main>
    </>
  );
}
