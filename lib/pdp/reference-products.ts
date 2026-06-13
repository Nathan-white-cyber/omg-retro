import type { PdpProduct } from "@/lib/medusa/products";

export type PdpProductType = "game" | "console" | "accessory";

export interface PdpPhoto {
  label: string;
  color: string;
}

export interface PdpRelatedItem {
  title: string;
  platform: string;
  price: string;
  color: string;
  ratingCount: string;
}

export interface PdpReferenceProduct {
  handle: string;
  title: string;
  sku: string;
  platform: string;
  productType: PdpProductType;
  coverColor: string;
  rating: number;
  reviewCount: number;
  galleryFlag?: string;
  photos: [PdpPhoto, PdpPhoto, PdpPhoto, PdpPhoto];
  description: [string, string, string];
  specs: Array<[string, string]>;
  related: PdpRelatedItem[];
  relatedViewAll: string;
  breadcrumb: {
    parent: string;
    subcategory: string;
    current: string;
  };
}

const gameDescription: PdpReferenceProduct["description"] = [
  "The defining adventure of the Nintendo 64 - and for many, the greatest game ever made.",
  "Step into the boots of Link as he travels through time across the kingdom of Hyrule to stop the dark forces of Ganondorf. Ocarina of Time brought the Zelda series into 3D with lock-on targeting, horseback combat across Hyrule Field, and an unforgettable score performed on the in-game ocarina.",
  "This copy has been fully inspected, cleaned, and tested on original hardware. The cartridge contacts are cleaned for reliable saves, and CIB copies include the original box and manual in the condition shown. Every order is backed by our 1-year warranty.",
];

const consoleDescription: PdpReferenceProduct["description"] = [
  "The console that brought Nintendo into three dimensions - fully refurbished, tested, and ready to play.",
  "This Nintendo 64 system has been opened, cleaned, and bench-tested on a real display. The cartridge slot contacts are cleaned for reliable boots, every controller port is checked for stick drift, and the power and A/V outputs are verified before it ships.",
  "Each console includes one tested 3rd-party controller, the matching power supply, and a standard A/V cable - everything you need to play out of the box. Prefer a genuine Nintendo pad? Add an official OEM controller in the color of your choice above. Backed by our 1-year warranty.",
];

const accessoryDescription: PdpReferenceProduct["description"] = [
  "An authentic Nintendo 64 controller in the iconic Atomic Purple finish - cleaned, tested, and drift-checked.",
  "Every controller is opened, cleaned, and tested before it ships. We check the analog stick for drift and wear, verify all buttons and the Z-trigger, and make sure the connector is in solid shape so it plugs and plays the moment it arrives.",
  "The translucent Atomic Purple shell is one of the most sought-after N64 colorways. It pairs with any Nintendo 64 console - grab a second for multiplayer. Backed by our 1-year warranty.",
];

export const PDP_REFERENCE_PRODUCTS: Record<string, PdpReferenceProduct> = {
  "the-legend-of-zelda-ocarina-of-time": {
    handle: "the-legend-of-zelda-ocarina-of-time",
    title: "The Legend of Zelda: Ocarina of Time",
    sku: "N64-ZLD-OOT",
    platform: "Nintendo 64",
    productType: "game",
    coverColor: "#b8902f",
    rating: 4.9,
    reviewCount: 1284,
    galleryFlag: "22% Off",
    photos: [
      { label: "Front", color: "#b8902f" },
      { label: "Back", color: "#8f6f22" },
      { label: "Cart", color: "#3a3f47" },
      { label: "Manual", color: "#a07f28" },
    ],
    description: gameDescription,
    specs: [
      ["Platform", "Nintendo 64"],
      ["Region", "NTSC - North America"],
      ["Release Year", "1998"],
      ["Genre", "Action-Adventure"],
      ["Players", "1 Player"],
      ["Save Type", "Internal battery save (3 files)"],
      ["Condition Grading", "Loose / CIB / Sealed - each individually graded"],
      ["Includes", "Varies by condition (see selector above)"],
    ],
    related: [
      { title: "Mario Kart 64", platform: "Nintendo 64", price: "$44.99", color: "#d23b2c", ratingCount: "2,290" },
      { title: "Super Mario 64", platform: "Nintendo 64", price: "$49.99", color: "#2f6bb0", ratingCount: "1,862" },
      { title: "GoldenEye 007", platform: "Nintendo 64", price: "$44.99", color: "#3a3f47", ratingCount: "987" },
      { title: "Banjo-Kazooie", platform: "Nintendo 64", price: "$54.99", color: "#a8742a", ratingCount: "1,103" },
    ],
    relatedViewAll: "View All Nintendo 64",
    breadcrumb: { parent: "Nintendo", subcategory: "Nintendo 64", current: "Ocarina of Time" },
  },
  "n64-console": {
    handle: "n64-console",
    title: "Nintendo 64 Console",
    sku: "N64-CONSOLE",
    platform: "Nintendo 64",
    productType: "console",
    coverColor: "#33373f",
    rating: 4.8,
    reviewCount: 643,
    photos: [
      { label: "Console", color: "#33373f" },
      { label: "Controller", color: "#4a4f57" },
      { label: "Ports", color: "#2a2e35" },
      { label: "In Box", color: "#5a3fa0" },
    ],
    description: consoleDescription,
    specs: [
      ["Platform", "Nintendo 64"],
      ["Region", "NTSC - North America"],
      ["Release Year", "1996"],
      ["Video Output", "Composite & S-Video (A/V multi-out)"],
      ["Controller Ports", "4 - all tested for stick drift"],
      ["Condition", "Refurbished - cleaned & bench-tested"],
      ["In the Box", "Console, 1 x 3rd-party controller, power supply, A/V cable"],
      ["Warranty", "1-year OMG Retro warranty"],
    ],
    related: [
      { title: "Super Nintendo Console", platform: "Super Nintendo", price: "$119.99", color: "#9b99a4", ratingCount: "412" },
      { title: "Sega Genesis Console", platform: "Sega Genesis", price: "$99.99", color: "#1c2733", ratingCount: "358" },
      { title: "Nintendo GameCube Console", platform: "Nintendo GameCube", price: "$109.99", color: "#5a3fa0", ratingCount: "621" },
      { title: "N64 Expansion Pak", platform: "Nintendo 64", price: "$34.99", color: "#33373f", ratingCount: "205" },
    ],
    relatedViewAll: "View All Consoles",
    breadcrumb: { parent: "Nintendo", subcategory: "Consoles", current: "Nintendo 64 Console" },
  },
  "n64-controller-atomic-purple": {
    handle: "n64-controller-atomic-purple",
    title: "Nintendo 64 Controller - Atomic Purple",
    sku: "N64-CTRL-PUR",
    platform: "Nintendo 64",
    productType: "accessory",
    coverColor: "#6a4fb0",
    rating: 4.7,
    reviewCount: 418,
    galleryFlag: "24% Off",
    photos: [
      { label: "Front", color: "#6a4fb0" },
      { label: "Back", color: "#52389a" },
      { label: "Top", color: "#7a5bc4" },
      { label: "Plug", color: "#33373f" },
    ],
    description: accessoryDescription,
    specs: [
      ["Type", "Controller"],
      ["Platform", "Nintendo 64"],
      ["Color", "Atomic Purple (translucent)"],
      ["Connection", "Standard N64 controller plug"],
      ["Expansion Slot", "Compatible with Rumble Pak & Controller Pak"],
      ["Condition", "Pre-owned - cleaned, tested, drift-checked"],
      ["Compatibility", "All Nintendo 64 consoles"],
      ["Warranty", "1-year OMG Retro warranty"],
    ],
    related: [
      { title: "N64 Rumble Pak", platform: "Nintendo 64", price: "$19.99", color: "#33373f", ratingCount: "530" },
      { title: "N64 Controller - Jungle Green", platform: "Nintendo 64", price: "$24.99", color: "#1f8a4c", ratingCount: "286" },
      { title: "N64 Controller Pak (Memory)", platform: "Nintendo 64", price: "$14.99", color: "#2f6bb0", ratingCount: "174" },
      { title: "N64 A/V Cable", platform: "Nintendo 64", price: "$9.99", color: "#4a4f57", ratingCount: "392" },
    ],
    relatedViewAll: "View All Accessories",
    breadcrumb: { parent: "Nintendo", subcategory: "Accessories", current: "Controller - Atomic Purple" },
  },
};

export function getPdpReference(handle: string) {
  return PDP_REFERENCE_PRODUCTS[handle];
}

export function applyPdpReferenceProduct(product: PdpProduct, reference?: PdpReferenceProduct): PdpProduct {
  if (!reference) return product;

  const variantMap: Record<PdpProductType, PdpProduct["variants"]> = {
    game: [
      { id: `${product.id}:loose`, title: "Loose", prices: [{ amount: 4499 }], inventory_quantity: 15 },
      { id: `${product.id}:cib`, title: "CIB", prices: [{ amount: 6999 }], compare_at_price: 8999, inventory_quantity: 8 },
      { id: `${product.id}:sealed`, title: "Sealed", prices: [{ amount: 18999 }], inventory_quantity: 2 },
    ],
    console: [
      { id: `${product.id}:console`, title: "Console", prices: [{ amount: 12999 }], inventory_quantity: 8 },
    ],
    accessory: [
      { id: `${product.id}:oem`, title: "OEM", prices: [{ amount: 2499 }], compare_at_price: 3299, inventory_quantity: 14 },
      { id: `${product.id}:third-party`, title: "3rd-Party", prices: [{ amount: 1499 }], inventory_quantity: 22 },
    ],
  };

  return {
    ...product,
    title: reference.title,
    handle: reference.handle,
    description: reference.description.join("\n\n"),
    collection: { id: "n64", title: "Nintendo 64", handle: "n64" },
    type: { value: reference.productType },
    metadata: {
      ...(product.metadata ?? {}),
      sku: reference.sku,
      platform: reference.platform,
      coverColor: reference.coverColor,
      rating: reference.rating,
      reviewCount: reference.reviewCount,
      year: reference.specs.find(([label]) => label === "Release Year")?.[1],
      genre: reference.specs.find(([label]) => label === "Genre")?.[1],
      players: reference.specs.find(([label]) => label === "Players")?.[1],
    },
    variants: variantMap[reference.productType],
  };
}

export function pdpProductFromReference(reference: PdpReferenceProduct): PdpProduct {
  return applyPdpReferenceProduct(
    {
      id: reference.handle,
      title: reference.title,
      handle: reference.handle,
      description: reference.description.join("\n\n"),
      thumbnail: null,
      images: [],
      collection: { id: "n64", title: "Nintendo 64", handle: "n64" },
      type: { value: reference.productType },
      metadata: {},
      variants: [],
    },
    reference,
  );
}
