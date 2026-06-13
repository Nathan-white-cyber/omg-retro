import { ProductCard } from "@/components/product";
import type { Game } from "@/types";

export interface RelatedProductsProps {
  products: Game[];
  sectionTitle: string;
  viewAllHref: string;
  viewAllLabel: string;
}

export default function RelatedProducts({ products, sectionTitle, viewAllHref, viewAllLabel }: RelatedProductsProps) {
  if (!products.length) return null;

  return (
    <section className="ymal-section">
      <div className="pdp-wrap">
        <div className="section-head">
          <h2>{sectionTitle}</h2>
          <a href={viewAllHref} className="see-all">{viewAllLabel} →</a>
        </div>
        <div className="omg-product-grid omg-cols-4">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} game={product} ctaVariant={2} />
          ))}
        </div>
      </div>
    </section>
  );
}
