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
    categories?: { name?: string; handle?: string }[] | null;
    tags?: { value?: string }[] | null;
    created_at?: string;
    variants?: Array<{
      title?: string;
      sku?: string | null;
      inventory_quantity?: number;
      metadata?: Record<string, unknown> | null;
      calculated_price?: {
        calculated_amount?: number;
        original_amount?: number;
      };
      prices?: { amount?: number }[];
    }>;
  }>;
  count?: number;
  limit?: number;
  offset?: number;
}

type MedusaProduct = NonNullable<MedusaProductResponse["products"]>[number];
type MedusaVariant = NonNullable<MedusaProduct["variants"]>[number];

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

const MEDUSA_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ?? process.env.MEDUSA_BACKEND_URL;
const PUB_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;

const medusaHeaders = {
  "x-publishable-api-key": PUB_KEY || "",
  "Content-Type": "application/json",
};

function medusaUrl(path: string) {
  if (!MEDUSA_URL) {
    return null;
  }

  return `${MEDUSA_URL.replace(/\/$/, "")}${path}`;
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

const inferredSystemByToken: Record<
  string,
  { platform: string; system: string; systemCode: string; vendor: ProductVendor; coverColor: string }
> = {
  N64: {
    platform: "N64",
    system: "Nintendo 64",
    systemCode: "N64",
    vendor: "nintendo",
    coverColor: "#b8902f",
  },
  GBA: {
    platform: "GBA",
    system: "Game Boy Advance",
    systemCode: "GBA",
    vendor: "nintendo",
    coverColor: "#5E3F8E",
  },
  SNES: {
    platform: "SNES",
    system: "Super Nintendo",
    systemCode: "SNES",
    vendor: "nintendo",
    coverColor: "#9B2FAE",
  },
  PS1: {
    platform: "PS1",
    system: "PlayStation",
    systemCode: "PS1",
    vendor: "playstation",
    coverColor: "#003087",
  },
  PS2: {
    platform: "PS2",
    system: "PlayStation 2",
    systemCode: "PS2",
    vendor: "playstation",
    coverColor: "#003087",
  },
  XBOX: {
    platform: "Xbox",
    system: "Original Xbox",
    systemCode: "Xbox",
    vendor: "xbox",
    coverColor: "#107C10",
  },
  DC: {
    platform: "Dreamcast",
    system: "Sega Dreamcast",
    systemCode: "DC",
    vendor: "sega",
    coverColor: "#E67E22",
  },
};

function firstVariantPrice(product: MedusaProduct) {
  const variant = product.variants?.[0];
  return variant?.calculated_price?.calculated_amount ?? variant?.prices?.[0]?.amount;
}

function inferSystem(product: MedusaProduct) {
  const source = [
    product.handle,
    product.categories?.map((category) => `${category.name ?? ""} ${category.handle ?? ""}`).join(" "),
    product.tags?.map((tag) => tag.value).join(" "),
    product.variants?.map((variant) => variant.sku).join(" "),
  ]
    .filter(Boolean)
    .join(" ")
    .toUpperCase();

  return (
    Object.entries(inferredSystemByToken).find(([token]) => source.includes(token))?.[1] ??
    inferredSystemByToken.N64
  );
}

function variantCondition(variant: MedusaVariant) {
  return (variant.title === "CIB" || variant.title === "Loose" || variant.title === "New/Sealed"
    ? variant.title
    : "Loose") satisfies ProductCondition;
}

function mapProduct(product: MedusaProduct): Game {
  const metadata = product.metadata;
  const fallback = mockProducts.find((mockProduct) => mockProduct.slug === product.handle);
  const inferredSystem = inferSystem(product);
  const calculatedPrice = product.variants?.[0]?.calculated_price;
  const price =
    firstVariantPrice(product) ?? metadataNumber(metadata, "price") ?? fallback?.price ?? 0;
  const originalPrice =
    calculatedPrice?.original_amount ?? metadataNumber(metadata, "originalPrice") ?? fallback?.originalPrice;
  const condition =
    (product.variants?.[0] ? variantCondition(product.variants[0]) : undefined) ??
    (metadataString(metadata, "condition") as ProductCondition | undefined) ??
    fallback?.condition ??
    "Loose";
  const tags = [
    ...metadataStringArray(metadata, "tags"),
    ...(product.tags?.map((tag) => tag.value).filter((tag): tag is string => Boolean(tag)) ?? []),
    ...(fallback?.tags ?? []),
  ];

  return {
    id: product.id,
    title: product.title,
    slug: product.handle ?? product.id,
    platform: metadataString(metadata, "platform") ?? fallback?.platform ?? inferredSystem.platform,
    system: metadataString(metadata, "system") ?? fallback?.system ?? inferredSystem.system,
    systemCode: metadataString(metadata, "systemCode") ?? fallback?.systemCode ?? inferredSystem.systemCode,
    condition,
    price,
    originalPrice,
    discountPercent: metadataNumber(metadata, "discountPercent") ?? fallback?.discountPercent,
    coverColor: metadataString(metadata, "coverColor") ?? fallback?.coverColor ?? inferredSystem.coverColor,
    images: product.images?.map((image) => image.url) ?? (product.thumbnail ? [product.thumbnail] : []),
    rating: metadataNumber(metadata, "rating") ?? fallback?.rating ?? 4.8,
    reviewCount: metadataNumber(metadata, "reviewCount") ?? fallback?.reviewCount ?? 0,
    stock: metadataNumber(metadata, "stock") ?? product.variants?.[0]?.inventory_quantity ?? fallback?.stock ?? 10,
    tags: Array.from(new Set(tags)),
    vendor: (metadataString(metadata, "vendor") as ProductVendor) ?? fallback?.vendor ?? inferredSystem.vendor,
    salesCount:
      metadataNumber(metadata, "salesCount") ?? metadataNumber(metadata, "sales_count") ?? fallback?.salesCount,
    createdAt:
      metadataString(metadata, "createdAt") ??
      metadataString(metadata, "created_at") ??
      product.created_at ??
      fallback?.createdAt,
    conditionVariants:
      product.variants?.map((variant) => ({
        type: variantCondition(variant),
        price: variant.calculated_price?.calculated_amount ?? variant.prices?.[0]?.amount ?? price,
        stock: variant.inventory_quantity ?? fallback?.stock ?? 10,
      })) ?? fallback?.conditionVariants,
  };
}

async function fetchProductsFromMedusa(query = "") {
  const url = medusaUrl(`/store/products${query}`);

  if (!url) {
    return null;
  }

  try {
    const response = await fetch(url, {
      headers: medusaHeaders,
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
  const discounted = products
    .filter((product) => product.originalPrice && product.originalPrice > product.price)
    .sort((a, b) => {
      const aDiscount = a.originalPrice ? (a.originalPrice - a.price) / a.originalPrice : 0;
      const bDiscount = b.originalPrice ? (b.originalPrice - b.price) / b.originalPrice : 0;
      return bDiscount - aDiscount;
    });

  return (discounted.length ? discounted : products.slice(4, 8)).slice(0, limit);
}

export async function getBestSellers(limit = 4) {
  const products = await getProducts();

  return [...products]
    .sort((a, b) => (b.salesCount ?? b.reviewCount) - (a.salesCount ?? a.reviewCount))
    .slice(0, limit);
}

export async function getRecentlyAdded(limit = 4) {
  const products = await getProducts();

  const sorted = [...products]
    .sort((a, b) => {
      const aTime = a.createdAt ? Date.parse(a.createdAt) : 0;
      const bTime = b.createdAt ? Date.parse(b.createdAt) : 0;
      return bTime - aTime;
    });

  return (sorted.some((product) => product.createdAt) ? sorted : products.slice(-limit)).slice(0, limit);
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
