import type { Game, ProductCondition, ProductVendor } from "@/types";
import { allSystems, type PlpSort } from "@/lib/plp/catalog";
import { mockProducts, platformVendors } from "./mock-products";

interface MedusaProductResponse {
  products?: Array<{
    id: string;
    title: string;
    handle?: string;
    thumbnail?: string | null;
    images?: { url: string }[];
    metadata?: Record<string, unknown> | null;
    variants?: Array<{
      calculated_price?: {
        calculated_amount?: number;
        original_amount?: number;
      };
    }>;
  }>;
  count?: number;
  limit?: number;
  offset?: number;
}

export interface PlpFacets {
  platforms: Record<ProductVendor, number>;
  conditions: Record<ProductCondition, number>;
  genres: Record<string, number>;
}

export interface PlpProductQuery {
  vendor?: ProductVendor;
  systemSlug?: string;
  q?: string;
  platforms?: ProductVendor[];
  conditions?: ProductCondition[];
  maxPrice?: number;
  genres?: string[];
  onSale?: boolean;
  sort?: PlpSort;
  page?: number;
  limit?: number | "all";
}

export interface PlpProductResult {
  products: Game[];
  total: number;
  page: number;
  limit: number | "all";
  pageCount: number;
  start: number;
  end: number;
  facets: PlpFacets;
}

const conditionFallback: Record<ProductCondition, number> = {
  CIB: 0,
  Loose: 0,
  "New/Sealed": 0,
};

const genreMatchers: Record<string, string[]> = {
  "action-adventure": ["action", "adventure", "action-adventure"],
  platformer: ["platformer"],
  rpg: ["rpg"],
  shooter: ["shooter"],
  racing: ["racing"],
  fighting: ["fighting"],
};

function medusaUrl(path: string) {
  const baseUrl =
    process.env.MEDUSA_BACKEND_URL ?? process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;

  if (!baseUrl) {
    return null;
  }

  return `${baseUrl.replace(/\/$/, "")}${path}`;
}

function metadataString(metadata: Record<string, unknown> | null | undefined, key: string) {
  const value = metadata?.[key];
  return typeof value === "string" ? value : undefined;
}

function metadataNumber(metadata: Record<string, unknown> | null | undefined, key: string) {
  const value = metadata?.[key];
  return typeof value === "number" ? value : undefined;
}

function metadataStringArray(metadata: Record<string, unknown> | null | undefined, key: string) {
  const value = metadata?.[key];
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function mapProduct(product: NonNullable<MedusaProductResponse["products"]>[number]): Game {
  const metadata = product.metadata;
  const calculatedPrice = product.variants?.[0]?.calculated_price;
  const price = calculatedPrice?.calculated_amount ?? metadataNumber(metadata, "price") ?? 0;
  const originalPrice =
    calculatedPrice?.original_amount ?? metadataNumber(metadata, "originalPrice");

  return {
    id: product.id,
    title: product.title,
    slug: product.handle ?? product.id,
    platform: metadataString(metadata, "platform") ?? "NES",
    system: metadataString(metadata, "system") ?? "NES",
    systemCode: metadataString(metadata, "systemCode") ?? "NES",
    condition: (metadataString(metadata, "condition") as Game["condition"]) ?? "Loose",
    price,
    originalPrice,
    discountPercent: metadataNumber(metadata, "discountPercent"),
    coverColor: metadataString(metadata, "coverColor") ?? "#8B8B8B",
    images: product.images?.map((image) => image.url) ?? (product.thumbnail ? [product.thumbnail] : []),
    rating: metadataNumber(metadata, "rating") ?? 4.8,
    reviewCount: metadataNumber(metadata, "reviewCount") ?? 0,
    stock: metadataNumber(metadata, "stock") ?? 0,
    tags: metadataStringArray(metadata, "tags"),
    vendor: (metadataString(metadata, "vendor") as ProductVendor) ?? "nintendo",
    salesCount: metadataNumber(metadata, "salesCount") ?? metadataNumber(metadata, "sales_count"),
    createdAt: metadataString(metadata, "createdAt") ?? metadataString(metadata, "created_at"),
  };
}

async function fetchProductsFromMedusa(query = "") {
  const url = medusaUrl(`/store/products${query}`);

  if (!url) {
    return null;
  }

  try {
    const response = await fetch(url, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as MedusaProductResponse;

    return {
      products: data.products?.map(mapProduct) ?? [],
      count: data.count,
      limit: data.limit,
      offset: data.offset,
    };
  } catch {
    return null;
  }
}

function buildMedusaQuery(query: PlpProductQuery, totalLimit = 100) {
  const params = new URLSearchParams();

  params.set("limit", String(query.limit === "all" ? totalLimit : query.limit ?? 24));
  params.set("offset", String(((query.page ?? 1) - 1) * (query.limit === "all" ? totalLimit : query.limit ?? 24)));

  if (query.q) params.set("q", query.q);
  if (query.vendor) params.set("vendor", query.vendor);
  if (query.platforms?.length) params.set("vendor", query.platforms.join(","));
  if (query.systemSlug) params.set("tags", query.systemSlug);
  if (query.conditions?.length) params.set("metadata[condition]", query.conditions.join(","));
  if (query.maxPrice) params.set("price_lte", String(query.maxPrice));
  if (query.genres?.length) params.set("tags", [...(query.systemSlug ? [query.systemSlug] : []), ...query.genres].join(","));
  if (query.onSale) params.set("has_discounts", "true");

  if (query.sort === "price-asc") params.set("order", "price:asc");
  if (query.sort === "price-desc") params.set("order", "price:desc");
  if (query.sort === "newest") params.set("order", "created_at:desc");
  if (query.sort === "best-selling") params.set("order", "sales_count:desc");
  if (query.sort === "highest-rated") params.set("order", "rating:desc");

  return `?${params.toString()}`;
}

async function getProducts() {
  const response = await fetchProductsFromMedusa("?limit=100");
  return response?.products.length ? response.products : mockProducts;
}

export async function getAllProducts() {
  return getProducts();
}

export async function getProductBySlug(slug: string) {
  const products = await getProducts();
  return products.find((product) => product.slug === slug) ?? null;
}

function matchesGenre(product: Game, genre: string) {
  const tags = product.tags.map((tag) => tag.toLowerCase());
  const matchers = genreMatchers[genre] ?? [genre];
  return matchers.some((matcher) => tags.includes(matcher));
}

function applyLocalFilters(products: Game[], query: PlpProductQuery) {
  const search = query.q?.trim().toLowerCase();

  return products.filter((product) => {
    if (query.vendor && product.vendor !== query.vendor) return false;
    if (query.platforms?.length && !query.platforms.includes(product.vendor)) return false;
    if (query.systemSlug && !product.tags.includes(query.systemSlug)) return false;
    if (query.conditions?.length && !query.conditions.includes(product.condition)) return false;
    if (query.maxPrice && product.price > query.maxPrice * 100) return false;
    if (query.genres?.length && !query.genres.some((genre) => matchesGenre(product, genre))) return false;
    if (query.onSale && !product.originalPrice) return false;

    if (search) {
      const haystack = [
        product.title,
        product.platform,
        product.system,
        product.systemCode,
        product.vendor,
        ...product.tags,
      ]
        .join(" ")
        .toLowerCase();

      if (!haystack.includes(search)) return false;
    }

    return true;
  });
}

function sortProducts(products: Game[], sort: PlpSort = "featured") {
  return [...products].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "newest") return Date.parse(b.createdAt ?? "0") - Date.parse(a.createdAt ?? "0");
    if (sort === "best-selling") return (b.salesCount ?? 0) - (a.salesCount ?? 0);
    if (sort === "highest-rated") return b.rating - a.rating;

    const aDiscount = a.originalPrice ? (a.originalPrice - a.price) / a.originalPrice : 0;
    const bDiscount = b.originalPrice ? (b.originalPrice - b.price) / b.originalPrice : 0;
    return bDiscount - aDiscount || (b.salesCount ?? b.reviewCount) - (a.salesCount ?? a.reviewCount);
  });
}

function buildFacets(products: Game[]): PlpFacets {
  const platforms = platformVendors.reduce<Record<ProductVendor, number>>(
    (counts, vendor) => ({ ...counts, [vendor]: 0 }),
    { nintendo: 0, playstation: 0, xbox: 0, sega: 0 },
  );
  const conditions = { ...conditionFallback };
  const genres = Object.keys(genreMatchers).reduce<Record<string, number>>(
    (counts, genre) => ({ ...counts, [genre]: 0 }),
    {},
  );

  products.forEach((product) => {
    platforms[product.vendor] += 1;
    conditions[product.condition] += 1;
    Object.keys(genres).forEach((genre) => {
      if (matchesGenre(product, genre)) {
        genres[genre] += 1;
      }
    });
  });

  return { platforms, conditions, genres };
}

function paginate(products: Game[], page: number, limit: number | "all") {
  if (limit === "all") {
    return products;
  }

  const start = (page - 1) * limit;
  return products.slice(start, start + limit);
}

export async function getPlpProducts(query: PlpProductQuery): Promise<PlpProductResult> {
  const page = Math.max(query.page ?? 1, 1);
  const limit = query.limit ?? 24;
  const normalizedQuery = { ...query, page, limit };
  const allProducts = await getProducts();
  const filteredForFacets = applyLocalFilters(allProducts, {
    ...normalizedQuery,
    conditions: undefined,
    maxPrice: undefined,
    genres: undefined,
    onSale: undefined,
  });
  const facets = buildFacets(filteredForFacets);
  const medusaResponse = await fetchProductsFromMedusa(buildMedusaQuery(normalizedQuery, allProducts.length));
  const localFiltered = applyLocalFilters(allProducts, normalizedQuery);
  const sorted = sortProducts(
    medusaResponse?.products.length ? medusaResponse.products : localFiltered,
    normalizedQuery.sort,
  );
  const total = medusaResponse?.products.length ? medusaResponse.count ?? sorted.length : sorted.length;
  const visibleProducts = medusaResponse?.products.length ? sorted : paginate(sorted, page, limit);
  const numericLimit = limit === "all" ? total || sorted.length || 1 : limit;
  const start = total === 0 ? 0 : (page - 1) * numericLimit + 1;
  const end = total === 0 ? 0 : Math.min(start + visibleProducts.length - 1, total);

  return {
    products: visibleProducts,
    total,
    page,
    limit,
    pageCount: limit === "all" ? 1 : Math.max(Math.ceil(total / limit), 1),
    start,
    end,
    facets,
  };
}

export async function getSystemCounts(vendor?: ProductVendor) {
  const products = await getProducts();

  return allSystems.reduce<Record<string, number>>((counts, system) => {
    if (vendor && system.vendor !== vendor) {
      return counts;
    }

    counts[system.slug] = products.filter((product) => product.tags.includes(system.slug)).length;
    return counts;
  }, {});
}

export async function getFeaturedDeals(limit = 4) {
  const products = await getProducts();

  return products
    .filter((product) => product.originalPrice && product.discountPercent)
    .sort((a, b) => (b.discountPercent ?? 0) - (a.discountPercent ?? 0))
    .slice(0, limit);
}

export async function getBestSellers(limit = 6) {
  const products = await getProducts();

  return [...products]
    .sort((a, b) => (b.salesCount ?? b.reviewCount) - (a.salesCount ?? a.reviewCount))
    .slice(0, limit);
}

export async function getRecentlyAdded(limit = 4) {
  const products = await getProducts();

  return [...products]
    .sort((a, b) => {
      const aTime = a.createdAt ? Date.parse(a.createdAt) : 0;
      const bTime = b.createdAt ? Date.parse(b.createdAt) : 0;
      return bTime - aTime;
    })
    .slice(0, limit);
}

export async function getPlatformCounts() {
  const products = await getProducts();

  return platformVendors.reduce<Record<ProductVendor, number>>(
    (counts, vendor) => ({
      ...counts,
      [vendor]: products.filter((product) => product.vendor === vendor).length,
    }),
    {
      nintendo: 0,
      playstation: 0,
      xbox: 0,
      sega: 0,
    },
  );
}
