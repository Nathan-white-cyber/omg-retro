import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PdpBuyBox from "@/components/product/PdpBuyBox";
import PdpGallery from "@/components/product/PdpGallery";
import PdpReviews from "@/components/product/PdpReviews";
import PdpTabs from "@/components/product/PdpTabs";
import RelatedProducts from "@/components/sections/RelatedProducts";
import SearchCtaBand from "@/components/sections/SearchCtaBand";
import { getProductByHandle, listProducts, type PdpProduct } from "@/lib/medusa/products";
import { createMetadata, ogImageUrl } from "@/lib/seo";
import { getPlatformColor, getProductType } from "@/lib/utils/platform";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

type ProductPageProps = {
  params: Promise<{ handle: string }> | { handle: string };
};

function variantPrice(product: PdpProduct) {
  const variant = product.variants[0];
  return variant?.calculated_price?.calculated_amount ?? variant?.prices[0]?.amount ?? 0;
}

function comparePrice(product: PdpProduct) {
  return product.variants[0]?.calculated_price?.original_amount;
}

function computeDiscountPercent(product: PdpProduct) {
  const price = variantPrice(product);
  const original = comparePrice(product);

  if (!original || original <= price) return 0;
  return Math.round((1 - price / original) * 100);
}

function parentCategory(collectionTitle: string) {
  const lower = collectionTitle.toLowerCase();
  if (lower.includes("console") || lower.includes("accessor")) return "Shop";
  if (lower.includes("playstation") || lower.includes("ps2") || lower.includes("ps3")) return "PlayStation";
  if (lower.includes("xbox")) return "Xbox";
  if (lower.includes("sega") || lower.includes("genesis") || lower.includes("dreamcast") || lower.includes("saturn")) return "Sega";
  if (lower.includes("nintendo") || lower.includes("snes") || lower.includes("nes") || lower.includes("gamecube") || lower.includes("wii")) return "Nintendo";
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

  const productType = getProductType(product);
  const collectionTitle = product.collection?.title ?? "";
  const platformColor = getPlatformColor(collectionTitle);
  const discountPercent = computeDiscountPercent(product);
  const related = await listProducts({ collection: product.collection?.id, limit: 5 }).then((result) =>
    result.products.filter((relatedProduct) => relatedProduct.id !== product.id).slice(0, 4),
  );
  const parent = parentCategory(collectionTitle);

  return (
    <>
      <div className="pdp-subnav">
        <div className="pdp-wrap">
          <nav className="pdp-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="bc-sep" aria-hidden="true">›</span>
            <Link href="/products">{parent}</Link>
            <span className="bc-sep" aria-hidden="true">›</span>
            <Link href={product.collection?.handle ? `/${product.collection.handle}` : "/products"}>
              {collectionTitle || "Products"}
            </Link>
            <span className="bc-sep" aria-hidden="true">›</span>
            <span className="current" aria-current="page">{product.title}</span>
          </nav>
        </div>
      </div>

      <main>
        <section className="pdp-main-section">
          <div className="pdp-wrap">
            <div className="pdp-main">
              <PdpGallery
                platformColor={platformColor}
                platformTitle={collectionTitle}
                productTitle={product.title}
                discountPercent={discountPercent}
                productType={productType}
              />
              <PdpBuyBox product={product} productType={productType} />
            </div>
          </div>
        </section>

        <PdpTabs description={product.description ?? ""} productType={productType} platform={collectionTitle} />
        <PdpReviews productTitle={product.title} score={4.9} reviewCount={1284} />
        <RelatedProducts
          products={related}
          sectionTitle="You May Also Like"
          viewAllHref={`/${product.collection?.handle ?? "products"}`}
          viewAllLabel={`View All ${collectionTitle || "Products"}`}
        />
        <SearchCtaBand />
      </main>
    </>
  );
}
