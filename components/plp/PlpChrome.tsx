"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, type ReactNode } from "react";
import {
  conditionOptions,
  genreOptions,
  platformRoutes,
  sortLabels,
  type PlpSort,
} from "@/lib/plp/catalog";
import type { PlpFacets } from "@/lib/medusa/products";
import type { ProductCondition, ProductVendor } from "@/types";

interface PlpChromeProps {
  children: ReactNode;
  facets: PlpFacets;
  start: number;
  end: number;
  total: number;
  initialSearchParams: Record<string, string | string[] | undefined>;
}

const platformLabels: Record<ProductVendor, string> = {
  nintendo: "Nintendo",
  playstation: "PlayStation",
  xbox: "Xbox",
  sega: "Sega",
};

const conditionLabels: Record<string, ProductCondition> = {
  cib: "CIB",
  loose: "Loose",
  "new-sealed": "New/Sealed",
  newsealed: "New/Sealed",
};

function slug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function valuesFromParams(params: URLSearchParams, key: string) {
  return params
    .getAll(key)
    .flatMap((value) => value.split(","))
    .filter(Boolean);
}

function buildParams(current: URLSearchParams, updates: Record<string, string | string[] | null>) {
  const next = new URLSearchParams(current.toString());

  Object.entries(updates).forEach(([key, value]) => {
    next.delete(key);

    if (Array.isArray(value)) {
      value.forEach((item) => next.append(key, item));
    } else if (value) {
      next.set(key, value);
    }
  });

  next.delete("page");
  return next;
}

function FilterCheckbox({
  label,
  count,
  checked,
  onChange,
}: {
  label: string;
  count: number;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="flex w-full items-center justify-between gap-3 py-2 text-left text-[13px] font-bold text-text-dark transition hover:text-brand-red"
    >
      <span className="inline-flex items-center gap-2">
        <span
          className={`flex h-4 w-4 items-center justify-center rounded-[3px] border ${
            checked ? "border-brand-red bg-brand-red" : "border-border-cream bg-white"
          }`}
        >
          {checked ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-3 w-3 text-white" aria-hidden="true">
              <path d="m5 12 4 4L19 6" />
            </svg>
          ) : null}
        </span>
        {label}
      </span>
      <span className="text-[12px] text-text-dark-muted">{count}</span>
    </button>
  );
}

export function PlpChrome({
  children,
  facets,
  start,
  end,
  total,
}: PlpChromeProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const activePlatforms = valuesFromParams(searchParams, "platform");
  const activeConditions = valuesFromParams(searchParams, "condition");
  const activeGenres = valuesFromParams(searchParams, "genre");
  const maxPrice = searchParams.get("maxPrice") ?? "200";
  const onSale = searchParams.get("sale") === "true";
  const sort = (searchParams.get("sort") as PlpSort | null) ?? "featured";
  const limit = searchParams.get("limit") ?? "24";

  const pushUpdates = (updates: Record<string, string | string[] | null>) => {
    const next = buildParams(searchParams, updates);
    router.push(next.toString() ? `${pathname}?${next.toString()}` : pathname);
  };

  const toggleValue = (key: string, value: string) => {
    const active = valuesFromParams(searchParams, key);
    const next = active.includes(value)
      ? active.filter((item) => item !== value)
      : [...active, value];

    pushUpdates({ [key]: next.length ? next : null });
  };

  const clearHref = pathname;

  const chips = useMemo(() => {
    const items: Array<{ label: string; key: string; value?: string }> = [];

    activePlatforms.forEach((platform) => {
      items.push({ label: platformLabels[platform as ProductVendor] ?? platform, key: "platform", value: platform });
    });
    activeConditions.forEach((condition) => {
      items.push({ label: conditionLabels[condition]?.toString() ?? condition.toUpperCase(), key: "condition", value: condition });
    });
    activeGenres.forEach((genre) => {
      items.push({ label: genreOptions.find((item) => slug(item) === genre) ?? genre, key: "genre", value: genre });
    });
    if (searchParams.get("maxPrice")) {
      items.push({ label: `Under $${searchParams.get("maxPrice")}`, key: "maxPrice" });
    }
    if (onSale) {
      items.push({ label: "On Sale", key: "sale" });
    }
    if (searchParams.get("q")) {
      items.push({ label: `"${searchParams.get("q")}"`, key: "q" });
    }

    return items;
  }, [activePlatforms, activeConditions, activeGenres, onSale, searchParams]);

  const removeChipHref = (key: string, value?: string) => {
    const next = new URLSearchParams(searchParams.toString());

    if (value) {
      const remaining = valuesFromParams(next, key).filter((item) => item !== value);
      next.delete(key);
      remaining.forEach((item) => next.append(key, item));
    } else {
      next.delete(key);
    }

    next.delete("page");
    const query = next.toString();
    return query ? `${pathname}?${query}` : pathname;
  };

  const filterContent = (
    <div className="space-y-7">
      <div className="flex items-center justify-between border-b border-border-cream pb-4">
        <h2 className="font-display text-[28px] uppercase leading-none text-text-dark">Filters</h2>
        <Link href={clearHref} className="text-[12px] font-extrabold uppercase tracking-[0.06em] text-text-dark-muted transition hover:text-brand-red">
          Clear All
        </Link>
      </div>

      <section>
        <h3 className="mb-2 text-[12px] font-extrabold uppercase tracking-[0.08em] text-text-dark">Platform</h3>
        {platformRoutes.map((platform) => (
          <FilterCheckbox
            key={platform.vendor}
            label={platform.name}
            count={facets.platforms[platform.vendor] ?? 0}
            checked={activePlatforms.includes(platform.vendor)}
            onChange={() => toggleValue("platform", platform.vendor)}
          />
        ))}
      </section>

      <section>
        <h3 className="mb-2 text-[12px] font-extrabold uppercase tracking-[0.08em] text-text-dark">Condition</h3>
        {conditionOptions.map((condition) => {
          const value = slug(condition);
          return (
            <FilterCheckbox
              key={condition}
              label={condition}
              count={facets.conditions[condition] ?? 0}
              checked={activeConditions.includes(value)}
              onChange={() => toggleValue("condition", value)}
            />
          );
        })}
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-[12px] font-extrabold uppercase tracking-[0.08em] text-text-dark">Price</h3>
          <span className="text-[12px] font-bold text-text-dark-muted">
            {maxPrice === "200" ? "$200+" : `Under $${maxPrice}`}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="200"
          step="5"
          value={maxPrice}
          onChange={(event) =>
            pushUpdates({ maxPrice: event.target.value === "200" ? null : event.target.value })
          }
          className="w-full accent-brand-red"
        />
      </section>

      <section>
        <h3 className="mb-2 text-[12px] font-extrabold uppercase tracking-[0.08em] text-text-dark">Genre</h3>
        {genreOptions.map((genre) => {
          const value = slug(genre);
          return (
            <FilterCheckbox
              key={genre}
              label={genre}
              count={facets.genres[value] ?? 0}
              checked={activeGenres.includes(value)}
              onChange={() => toggleValue("genre", value)}
            />
          );
        })}
      </section>

      <section>
        <button
          type="button"
          onClick={() => pushUpdates({ sale: onSale ? null : "true" })}
          className="flex w-full items-center justify-between gap-4 rounded-btn border border-border-cream bg-bg-cream p-3 text-left"
        >
          <span>
            <span className="block text-[13px] font-extrabold uppercase tracking-[0.06em] text-text-dark">
              On Sale
            </span>
            <span className="text-[12px] text-text-dark-muted">Show discounted games only</span>
          </span>
          <span className={`flex h-6 w-11 items-center rounded-full p-1 transition ${onSale ? "bg-brand-red" : "bg-border-cream"}`}>
            <span className={`h-4 w-4 rounded-full bg-white transition ${onSale ? "translate-x-5" : ""}`} />
          </span>
        </button>
      </section>

      <button
        type="button"
        onClick={() => setMobileFiltersOpen(false)}
        className="w-full rounded-btn bg-brand-red px-5 py-3 text-[12px] font-extrabold uppercase tracking-[0.08em] text-white transition hover:bg-brand-red-dark lg:hidden"
      >
        Apply Filters
      </button>
    </div>
  );

  return (
    <>
      <section className="sticky top-0 z-30 border-b border-border-cream bg-bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-7 py-4">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="rounded-btn border border-border-cream bg-white px-4 py-2 text-[12px] font-extrabold uppercase tracking-[0.08em] text-text-dark lg:hidden"
          >
            Filters
          </button>
          <span className="hidden text-[12px] font-extrabold uppercase tracking-[0.08em] text-text-dark lg:block">
            Filters
          </span>
          <p className="text-center text-[13px] font-bold text-text-dark-muted">
            Showing {start}-{end} of {total} products
          </p>
          <div className="flex items-center gap-2">
            <select
              value={limit}
              onChange={(event) => pushUpdates({ limit: event.target.value === "24" ? null : event.target.value })}
              className="rounded-btn border-border-cream bg-white py-2 pl-3 pr-8 text-[12px] font-bold text-text-dark"
              aria-label="Products per page"
            >
              <option value="24">24</option>
              <option value="48">48</option>
              <option value="all">All</option>
            </select>
            <select
              value={sort}
              onChange={(event) => pushUpdates({ sort: event.target.value === "featured" ? null : event.target.value })}
              className="max-w-[150px] rounded-btn border-border-cream bg-white py-2 pl-3 pr-8 text-[12px] font-bold text-text-dark md:max-w-none"
              aria-label="Sort products"
            >
              {Object.entries(sortLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="bg-bg-cream">
        <div className="mx-auto max-w-[1240px] px-7 py-5">
          {chips.length ? (
            <div className="mb-5 flex flex-wrap items-center gap-2">
              {chips.map((chip) => (
                <Link
                  key={`${chip.key}-${chip.value ?? chip.label}`}
                  href={removeChipHref(chip.key, chip.value)}
                  className="rounded-full border border-border-cream bg-white px-3 py-1.5 text-[12px] font-extrabold text-text-dark transition hover:border-brand-red hover:text-brand-red"
                >
                  {chip.label} x
                </Link>
              ))}
              <Link href={clearHref} className="px-2 text-[12px] font-extrabold uppercase tracking-[0.06em] text-text-dark-muted transition hover:text-brand-red">
                Clear All
              </Link>
            </div>
          ) : null}

          <div className="grid gap-7 lg:grid-cols-plp-layout">
            <aside className="hidden rounded-card border border-border-cream bg-white p-5 shadow-card lg:block">
              {filterContent}
            </aside>
            <div>{children}</div>
          </div>
        </div>
      </section>

      {mobileFiltersOpen ? (
        <div className="fixed inset-0 z-mobile-drawer lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            aria-label="Close filters"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <aside className="absolute bottom-0 left-0 right-0 max-h-[86vh] overflow-y-auto rounded-t-card bg-white p-5 shadow-panel">
            {filterContent}
          </aside>
        </div>
      ) : null}
    </>
  );
}
