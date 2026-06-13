import { existsSync, readFileSync } from "node:fs";

type Json = Record<string, unknown>;

interface AdminCollection {
  id: string;
  title: string;
  handle?: string;
}

interface AdminProductVariant {
  id: string;
  title?: string;
}

interface AdminProduct {
  id: string;
  title: string;
  handle: string;
  variants?: AdminProductVariant[];
}

interface ProductSpec {
  title: string;
  handle: string;
  type: { value: "game" | "console" | "accessory" };
  collection_id: string;
  description: string;
  metadata: Json;
  status: "published";
  variants: VariantSpec[];
}

interface VariantSpec {
  title: string;
  prices: Array<{ currency_code: "usd"; amount: number }>;
  compare_at_price?: number;
  inventory_quantity: number;
  metadata: Json;
}

const collections = [
  { title: "Nintendo 64", handle: "nintendo-64" },
  { title: "Consoles", handle: "consoles" },
  { title: "Accessories", handle: "accessories" },
] as const;

function loadEnvFile(path: string) {
  if (!existsSync(path)) return;

  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const equals = trimmed.indexOf("=");
    if (equals === -1) continue;

    const key = trimmed.slice(0, equals).trim();
    const value = trimmed
      .slice(equals + 1)
      .trim()
      .replace(/^['"]|['"]$/g, "");

    process.env[key] ??= value;
  }
}

loadEnvFile(".env.local");
loadEnvFile(".env");

const backendUrl =
  process.env.MEDUSA_BACKEND_URL ??
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ??
  "https://omg-retro-backend-production.up.railway.app";
const adminToken = process.env.MEDUSA_ADMIN_API_KEY ?? process.env.MEDUSA_ADMIN_TOKEN;

if (!adminToken) {
  throw new Error("Set MEDUSA_ADMIN_API_KEY or MEDUSA_ADMIN_TOKEN before running npm run seed:pdp.");
}

const adminAuthToken = adminToken;

function adminUrl(path: string) {
  return `${backendUrl.replace(/\/$/, "")}${path}`;
}

async function adminFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(adminUrl(path), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${adminAuthToken}`,
      "x-medusa-access-token": adminAuthToken,
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`${init?.method ?? "GET"} ${path} failed (${response.status}): ${body}`);
  }

  return (await response.json()) as T;
}

async function maybeAdminFetch<T>(path: string, init?: RequestInit): Promise<T | null> {
  const response = await fetch(adminUrl(path), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${adminAuthToken}`,
      "x-medusa-access-token": adminAuthToken,
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) return null;
  return (await response.json()) as T;
}

async function ensureCollection(title: string, handle: string) {
  const byHandle = await adminFetch<{ collections?: AdminCollection[] }>(
    `/admin/collections?handle=${encodeURIComponent(handle)}&limit=1`,
  );
  const existingByHandle = byHandle.collections?.find((collection) => collection.handle === handle);

  if (existingByHandle) {
    if (existingByHandle.title !== title) {
      await maybeAdminFetch(`/admin/collections/${existingByHandle.id}`, {
        method: "POST",
        body: JSON.stringify({ title, handle }),
      });
    }
    return existingByHandle.id;
  }

  const byTitle = await adminFetch<{ collections?: AdminCollection[] }>(
    `/admin/collections?title=${encodeURIComponent(title)}&limit=10`,
  );
  const existingByTitle = byTitle.collections?.find((collection) => collection.title.toLowerCase() === title.toLowerCase());

  if (existingByTitle) {
    await maybeAdminFetch(`/admin/collections/${existingByTitle.id}`, {
      method: "POST",
      body: JSON.stringify({ title, handle }),
    });
    return existingByTitle.id;
  }

  const created = await adminFetch<{ collection: AdminCollection }>("/admin/collections", {
    method: "POST",
    body: JSON.stringify({ title, handle }),
  });

  return created.collection.id;
}

async function getProductByHandle(handle: string) {
  const data = await adminFetch<{ products?: AdminProduct[] }>(
    `/admin/products?handle=${encodeURIComponent(handle)}&fields=*variants&limit=1`,
  );

  return data.products?.find((product) => product.handle === handle) ?? null;
}

function baseProductPayload(spec: ProductSpec) {
  return {
    title: spec.title,
    handle: spec.handle,
    type: spec.type,
    collection_id: spec.collection_id,
    description: spec.description,
    metadata: spec.metadata,
    status: spec.status,
  };
}

async function deleteExistingVariants(product: AdminProduct) {
  for (const variant of product.variants ?? []) {
    await maybeAdminFetch(`/admin/products/${product.id}/variants/${variant.id}`, {
      method: "DELETE",
    });
  }
}

async function createVariant(productId: string, variant: VariantSpec) {
  await adminFetch(`/admin/products/${productId}/variants`, {
    method: "POST",
    body: JSON.stringify(variant),
  });
}

async function upsertProduct(spec: ProductSpec) {
  const existing = await getProductByHandle(spec.handle);

  if (!existing) {
    const created = await adminFetch<{ product: AdminProduct }>("/admin/products", {
      method: "POST",
      body: JSON.stringify(baseProductPayload(spec)),
    });

    for (const variant of spec.variants) {
      await createVariant(created.product.id, variant);
    }
    return;
  }

  await adminFetch(`/admin/products/${existing.id}`, {
    method: "POST",
    body: JSON.stringify(baseProductPayload(spec)),
  });
  await deleteExistingVariants(existing);

  for (const variant of spec.variants) {
    await createVariant(existing.id, variant);
  }
}

async function main() {
  const collectionIds = new Map<string, string>();

  for (const collection of collections) {
    collectionIds.set(collection.handle, await ensureCollection(collection.title, collection.handle));
  }

  const products: ProductSpec[] = [
    {
      title: "The Legend of Zelda: Ocarina of Time",
      handle: "the-legend-of-zelda-ocarina-of-time",
      type: { value: "game" },
      collection_id: collectionIds.get("nintendo-64")!,
      description:
        "The defining adventure of the Nintendo 64 - and for many, the greatest game ever made. Step into the boots of Link as he travels through time across the kingdom of Hyrule. This copy has been fully inspected, cleaned, and tested on original hardware. Every order is backed by our 1-year warranty.",
      metadata: {
        sku: "N64-ZLD-OOT",
        platform: "Nintendo 64",
        year: "1998",
        genre: "Action-Adventure",
        players: "1 Player",
      },
      status: "published",
      variants: [
        {
          title: "Loose",
          prices: [{ currency_code: "usd", amount: 4499 }],
          inventory_quantity: 15,
          metadata: { desc: "Cartridge only, tested & cleaned" },
        },
        {
          title: "CIB",
          prices: [{ currency_code: "usd", amount: 6999 }],
          compare_at_price: 8999,
          inventory_quantity: 8,
          metadata: { desc: "Complete in box - manual + case" },
        },
        {
          title: "Sealed",
          prices: [{ currency_code: "usd", amount: 18999 }],
          inventory_quantity: 2,
          metadata: { desc: "New, factory sealed" },
        },
      ],
    },
    {
      title: "Nintendo 64 Console",
      handle: "n64-console",
      type: { value: "console" },
      collection_id: collectionIds.get("consoles")!,
      description:
        "The console that brought Nintendo into three dimensions - fully refurbished, tested, and ready to play. This Nintendo 64 system has been opened, cleaned, and bench-tested on a real display. Each console includes one tested 3rd-party controller, the matching power supply, and a standard A/V cable. Backed by our 1-year warranty.",
      metadata: {
        sku: "N64-CONSOLE",
        platform: "Nintendo 64",
        year: "1996",
        includes_controller: true,
      },
      status: "published",
      variants: [
        {
          title: "Console",
          prices: [{ currency_code: "usd", amount: 12999 }],
          inventory_quantity: 8,
          metadata: { desc: "Fully tested and refurbished" },
        },
      ],
    },
    {
      title: "Nintendo 64 Controller - Atomic Purple",
      handle: "n64-controller-atomic-purple",
      type: { value: "accessory" },
      collection_id: collectionIds.get("accessories")!,
      description:
        "An authentic Nintendo 64 controller in the iconic Atomic Purple finish - cleaned, tested, and drift-checked. Every controller is opened, cleaned, and tested before it ships. The translucent Atomic Purple shell is one of the most sought-after N64 colorways. Backed by our 1-year warranty.",
      metadata: {
        sku: "N64-CTRL-PUR",
        platform: "Nintendo 64",
        compatible_with: "Nintendo 64",
      },
      status: "published",
      variants: [
        {
          title: "OEM",
          prices: [{ currency_code: "usd", amount: 2499 }],
          compare_at_price: 3299,
          inventory_quantity: 14,
          metadata: { desc: "Genuine Nintendo controller - tested & cleaned" },
        },
        {
          title: "3rd-Party",
          prices: [{ currency_code: "usd", amount: 1499 }],
          inventory_quantity: 22,
          metadata: { desc: "Tested 3rd-party pad - great value" },
        },
      ],
    },
  ];

  for (const product of products) {
    await upsertProduct(product);
    console.log(`Seeded ${product.handle}`);
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
