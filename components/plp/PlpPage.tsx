import { notFound } from "next/navigation";
import { CompactHero } from "@/components/plp/CompactHero";
import { ConsoleIconRow } from "@/components/plp/ConsoleIconRow";
import { Pagination } from "@/components/plp/Pagination";
import { PlpChrome } from "@/components/plp/PlpChrome";
import { PlpTrustStrip } from "@/components/plp/PlpTrustStrip";
import { ProductGrid } from "@/components/plp/ProductGrid";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { TrustBar } from "@/components/sections/TrustBar";
import {
  conditionOptions,
  getPlpRouteContext,
  type PlpRouteContext,
  type PlpSort,
} from "@/lib/plp/catalog";
import { getPlpProducts, getSystemCounts } from "@/lib/medusa/products";
import type { BreadcrumbItem } from "@/components/layout/Breadcrumb";
import type { ProductCondition, ProductVendor } from "@/types";

export type PlpSearchParams = Record<string, string | string[] | undefined>;

interface PlpPageProps {
  kind: PlpRouteContext["kind"];
  vendor?: ProductVendor;
  systemSlug?: string;
  searchParams?: PlpSearchParams;
}

const sortValues: PlpSort[] = [
  "featured",
  "price-asc",
  "price-desc",
  "newest",
  "best-selling",
  "highest-rated",
];

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function allValues(value: string | string[] | undefined) {
  if (!value) return [];
  return (Array.isArray(value) ? value : [value])
    .flatMap((item) => item.split(","))
    .filter(Boolean);
}

function normalizeCondition(value: string): ProductCondition | null {
  const lower = value.toLowerCase();

  return (
    conditionOptions.find((condition) =>
      condition.toLowerCase().replace(/[^a-z0-9]+/g, "-") === lower,
    ) ?? null
  );
}

function parseLimit(value: string | undefined) {
  if (value === "all") return "all" as const;
  if (value === "48") return 48;
  return 24;
}

function parsePage(value: string | undefined) {
  const page = Number(value);
  return Number.isFinite(page) && page > 0 ? page : 1;
}

function parseSort(value: string | undefined, fallback?: PlpSort) {
  return sortValues.includes(value as PlpSort) ? (value as PlpSort) : fallback ?? "featured";
}

function breadcrumbsForContext(context: PlpRouteContext): BreadcrumbItem[] {
  if (context.kind === "system" && context.platform && context.system) {
    return [
      { label: context.platform.name, href: context.platform.href },
      { label: context.system.name },
    ];
  }

  if (context.kind === "platform" && context.platform) {
    return [{ label: context.platform.name }];
  }

  const labelMap: Record<PlpRouteContext["kind"], string> = {
    products: "Shop Games",
    platform: "Platform",
    system: "System",
    deals: "Featured Deals",
    "best-sellers": "Best Sellers",
    "new-arrivals": "Recently Added",
    search: "Search",
  };

  return [{ label: labelMap[context.kind] }];
}

export async function PlpPage({
  kind,
  vendor,
  systemSlug,
  searchParams = {},
}: PlpPageProps) {
  const context = getPlpRouteContext(kind, { vendor, systemSlug });

  if ((kind === "platform" && !context.platform) || (kind === "system" && !context.system)) {
    notFound();
  }

  const platformFilters = allValues(searchParams.platform).filter((value): value is ProductVendor =>
    ["nintendo", "playstation", "xbox", "sega"].includes(value),
  );
  const conditionFilters = allValues(searchParams.condition)
    .map(normalizeCondition)
    .filter((value): value is ProductCondition => Boolean(value));
  const genreFilters = allValues(searchParams.genre);
  const maxPriceValue = Number(firstValue(searchParams.maxPrice));
  const maxPrice = Number.isFinite(maxPriceValue) && maxPriceValue > 0 ? maxPriceValue : undefined;
  const sort = parseSort(firstValue(searchParams.sort), context.forcedOrder);
  const limit = parseLimit(firstValue(searchParams.limit));
  const page = parsePage(firstValue(searchParams.page));
  const query = firstValue(searchParams.q);

  const [systemCounts, result] = await Promise.all([
    getSystemCounts(context.kind === "platform" ? context.vendor : undefined),
    getPlpProducts({
      vendor: context.vendor,
      systemSlug: context.system?.slug,
      q: query,
      platforms: platformFilters,
      conditions: conditionFilters,
      maxPrice,
      genres: genreFilters,
      onSale: context.forcedSale || firstValue(searchParams.sale) === "true",
      sort,
      page,
      limit,
    }),
  ]);

  const showConsoleRow = context.kind === "products" || context.kind === "platform";

  return (
    <>
      <CompactHero
        title={context.title}
        subtitle={context.subtitle}
        platformCode={context.platformCode}
        platformColor={context.system?.color ?? context.platform?.color}
      />
      <PlpTrustStrip />
      <Breadcrumb items={breadcrumbsForContext(context)} variant="cream" />
      {showConsoleRow ? (
        <ConsoleIconRow
          platform={context.kind === "platform" ? context.platform : undefined}
          counts={systemCounts}
        />
      ) : null}
      <PlpChrome
        facets={result.facets}
        start={result.start}
        end={result.end}
        total={result.total}
        initialSearchParams={searchParams}
      >
        <ProductGrid products={result.products} query={query} />
        <Pagination page={result.page} pageCount={result.pageCount} searchParams={searchParams} />
      </PlpChrome>
      <TrustBar variant="compact" />
    </>
  );
}
