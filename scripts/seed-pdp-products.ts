interface AdminProduct {
  id: string;
  title: string;
  handle: string;
}

interface AdminCollection {
  id: string;
  title: string;
}

interface AdminListProductsResponse {
  products?: AdminProduct[];
}

interface AdminListCollectionsResponse {
  collections?: AdminCollection[];
}

const backendUrl =
  process.env.MEDUSA_BACKEND_URL ?? process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ?? "https://omg-retro-backend-production.up.railway.app";
const adminToken = process.env.MEDUSA_ADMIN_API_KEY ?? process.env.MEDUSA_ADMIN_TOKEN;

if (!adminToken) {
  throw new Error("Set MEDUSA_ADMIN_API_KEY or MEDUSA_ADMIN_TOKEN before running npm run seed:pdp.");
}

function adminUrl(path: string) {
  return `${backendUrl.replace(/\/$/, "")}${path}`;
}

async function adminFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(adminUrl(path), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${adminToken}`,
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`${init?.method ?? "GET"} ${path} failed (${response.status}): ${body}`);
  }

  return (await response.json()) as T;
}

async function productExists(handle: string) {
  const data = await adminFetch<AdminListProductsResponse>(`/admin/products?handle=${encodeURIComponent(handle)}&limit=1`);
  return Boolean(data.products?.some((product) => product.handle === handle));
}

async function getOrCreateCollection(title: string) {
  const data = await adminFetch<AdminListCollectionsResponse>(`/admin/collections?title=${encodeURIComponent(title)}&limit=1`);
  const existing = data.collections?.find((collection) => collection.title.toLowerCase() === title.toLowerCase());

  if (existing) return existing.id;

  const created = await adminFetch<{ collection: AdminCollection }>("/admin/collections", {
    method: "POST",
    body: JSON.stringify({ title }),
  });

  return created.collection.id;
}

async function createPdpProducts() {
  const consolesCollectionId = await getOrCreateCollection("Consoles");
  const accessoriesCollectionId = await getOrCreateCollection("Accessories");

  if (!(await productExists("nintendo-64-console"))) {
    await adminFetch("/admin/products", {
      method: "POST",
      body: JSON.stringify({
        title: "Nintendo 64 Console",
        handle: "nintendo-64-console",
        type: { value: "console" },
        collection_id: consolesCollectionId,
        description:
          "The iconic Nintendo 64 console, fully tested and cleaned. Every unit ships with one controller and all necessary cables. Plays all N64 cartridges flawlessly.",
        status: "published",
        variants: [
          {
            title: "Console",
            inventory_quantity: 8,
            prices: [{ amount: 12999, currency_code: "usd" }],
          },
        ],
        metadata: { platform: "Nintendo 64", sku: "N64-CONSOLE", includes_controller: true },
      }),
    });
  }

  if (!(await productExists("nintendo-64-controller-atomic-purple"))) {
    await adminFetch("/admin/products", {
      method: "POST",
      body: JSON.stringify({
        title: "Nintendo 64 Controller - Atomic Purple",
        handle: "nintendo-64-controller-atomic-purple",
        type: { value: "accessory" },
        collection_id: accessoriesCollectionId,
        description:
          "Genuine OEM Nintendo 64 controller in Atomic Purple. Fully tested and cleaned. All buttons and joystick verified before shipping.",
        status: "published",
        variants: [
          {
            title: "OEM",
            inventory_quantity: 14,
            prices: [{ amount: 2499, currency_code: "usd" }],
          },
          {
            title: "3rd-Party",
            inventory_quantity: 22,
            prices: [{ amount: 1499, currency_code: "usd" }],
          },
        ],
        metadata: { platform: "Nintendo 64", sku: "N64-CTRL-PUR", compatible_with: "Nintendo 64" },
      }),
    });
  }
}

createPdpProducts()
  .then(() => {
    console.log("PDP seed products are present.");
  })
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  });
