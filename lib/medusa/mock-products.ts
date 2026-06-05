import type { Game, ProductVendor } from "@/types";
import { allSystems } from "@/lib/plp/catalog";

const mockGenres = [
  { label: "Action/Adventure", slug: "action-adventure" },
  { label: "Platformer", slug: "platformer" },
  { label: "RPG", slug: "rpg" },
  { label: "Shooter", slug: "shooter" },
  { label: "Racing", slug: "racing" },
  { label: "Fighting", slug: "fighting" },
];

const baseMockProducts: Game[] = [
  {
    id: "n64-zelda-oot",
    title: "The Legend of Zelda: Ocarina of Time",
    slug: "the-legend-of-zelda-ocarina-of-time",
    platform: "N64",
    system: "Nintendo 64",
    systemCode: "N64",
    condition: "CIB",
    price: 6999,
    originalPrice: 8999,
    discountPercent: 22,
    coverColor: "#b8902f",
    images: [],
    rating: 4.9,
    reviewCount: 1284,
    stock: 3,
    tags: ["n64", "rpg", "cib"],
    vendor: "nintendo",
  },
  {
    id: "n64-mario-64",
    title: "Super Mario 64",
    slug: "super-mario-64",
    platform: "N64",
    system: "Nintendo 64",
    systemCode: "N64",
    condition: "CIB",
    price: 4999,
    originalPrice: 6499,
    discountPercent: 23,
    coverColor: "#2f6bb0",
    images: [],
    rating: 4.8,
    reviewCount: 1902,
    stock: 9,
    tags: ["n64", "platformer", "cib"],
    vendor: "nintendo",
  },
  {
    id: "xbox-halo-ce",
    title: "Halo: Combat Evolved",
    slug: "halo-combat-evolved",
    platform: "Xbox",
    system: "Original Xbox",
    systemCode: "Xbox",
    condition: "Loose",
    price: 2499,
    coverColor: "#107C10",
    images: [],
    rating: 4.7,
    reviewCount: 1540,
    stock: 12,
    tags: ["xbox", "shooter", "loose"],
    vendor: "xbox",
  },
  {
    id: "ps1-final-fantasy-vii",
    title: "Final Fantasy VII",
    slug: "final-fantasy-vii",
    platform: "PS1",
    system: "PlayStation",
    systemCode: "PS1",
    condition: "CIB",
    price: 5999,
    coverColor: "#003087",
    images: [],
    rating: 4.8,
    reviewCount: 2447,
    stock: 8,
    tags: ["ps1", "rpg", "cib"],
    vendor: "playstation",
  },
  {
    id: "gba-pokemon-emerald",
    title: "Pokemon Emerald Version",
    slug: "pokemon-emerald-version",
    platform: "GBA",
    system: "Game Boy Advance",
    systemCode: "GBA",
    condition: "Loose",
    price: 11999,
    coverColor: "#1f9d57",
    images: [],
    rating: 4.9,
    reviewCount: 3051,
    stock: 2,
    tags: ["gba", "rpg", "loose"],
    vendor: "nintendo",
  },
  {
    id: "ps2-metal-gear-solid-2",
    title: "Metal Gear Solid 2: Sons of Liberty",
    slug: "metal-gear-solid-2-sons-of-liberty",
    platform: "PS2",
    system: "PlayStation 2",
    systemCode: "PS2",
    condition: "CIB",
    price: 1499,
    originalPrice: 1999,
    discountPercent: 25,
    coverColor: "#2a3340",
    images: [],
    rating: 4.6,
    reviewCount: 912,
    stock: 11,
    tags: ["ps2", "action", "cib"],
    vendor: "playstation",
  },
  {
    id: "dc-sonic-adventure-2",
    title: "Sonic Adventure 2",
    slug: "sonic-adventure-2",
    platform: "Dreamcast",
    system: "Sega Dreamcast",
    systemCode: "DC",
    condition: "CIB",
    price: 2999,
    originalPrice: 3999,
    discountPercent: 25,
    coverColor: "#E67E22",
    images: [],
    rating: 4.6,
    reviewCount: 768,
    stock: 4,
    tags: ["dreamcast", "platformer", "cib"],
    vendor: "sega",
  },
  {
    id: "gen-sonic-2",
    title: "Sonic the Hedgehog 2",
    slug: "sonic-the-hedgehog-2",
    platform: "Genesis",
    system: "Sega Genesis",
    systemCode: "GEN",
    condition: "Loose",
    price: 1899,
    coverColor: "#555555",
    images: [],
    rating: 4.7,
    reviewCount: 1455,
    stock: 13,
    tags: ["genesis", "platformer", "loose"],
    vendor: "sega",
  },
  {
    id: "snes-super-metroid",
    title: "Super Metroid",
    slug: "super-metroid",
    platform: "SNES",
    system: "Super Nintendo",
    systemCode: "SNES",
    condition: "CIB",
    price: 5999,
    originalPrice: 7499,
    discountPercent: 20,
    coverColor: "#2a3340",
    images: [],
    rating: 4.9,
    reviewCount: 1203,
    stock: 5,
    tags: ["snes", "action", "cib"],
    vendor: "nintendo",
  },
  {
    id: "xbox-halo-2",
    title: "Halo 2",
    slug: "halo-2",
    platform: "Xbox",
    system: "Original Xbox",
    systemCode: "Xbox",
    condition: "CIB",
    price: 1999,
    coverColor: "#294f2e",
    images: [],
    rating: 4.6,
    reviewCount: 1320,
    stock: 8,
    tags: ["xbox", "shooter", "cib"],
    vendor: "xbox",
  },
];

const supplementalProducts: Game[] = allSystems.flatMap((system, systemIndex) =>
  [0, 1].map((variantIndex) => {
    const genre = mockGenres[(systemIndex + variantIndex) % mockGenres.length];
    const condition = (["CIB", "Loose", "New/Sealed"] as const)[
      (systemIndex + variantIndex) % 3
    ];
    const basePrice = 1299 + systemIndex * 250 + variantIndex * 700;
    const hasDiscount = (systemIndex + variantIndex) % 3 === 0;
    const discountAmount = 1500;

    return {
      id: `${system.slug}-mock-${variantIndex + 1}`,
      title:
        variantIndex === 0
          ? `${system.name} Classics Collection`
          : `${system.name} Arcade Hits`,
      slug:
        variantIndex === 0
          ? `${system.slug}-classics-collection`
          : `${system.slug}-arcade-hits`,
      platform: system.code,
      system: system.name,
      systemCode: system.code,
      condition,
      price: basePrice,
      originalPrice: hasDiscount ? basePrice + discountAmount : undefined,
      discountPercent: hasDiscount
        ? Math.round(discountAmount / (basePrice + discountAmount) * 100)
        : undefined,
      coverColor: system.color,
      images: [],
      rating: 4.2 + ((systemIndex + variantIndex) % 8) / 10,
      reviewCount: 80 + systemIndex * 34 + variantIndex * 57,
      stock: 2 + ((systemIndex + variantIndex) % 12),
      tags: [system.slug, genre.slug, condition.toLowerCase().replace(/[^a-z0-9]+/g, "-")],
      vendor: system.vendor,
    };
  }),
);

function buildConditionVariants(product: Game) {
  if (product.id === "n64-zelda-oot") {
    return [
      { type: "CIB", price: 6999, stock: 3 },
      { type: "Loose", price: 4499, stock: 8 },
    ];
  }

  const loosePrice =
    product.condition === "Loose" ? product.price : Math.max(599, Math.round(product.price * 0.74));
  const cibPrice =
    product.condition === "CIB" ? product.price : Math.max(product.price + 500, Math.round(product.price * 1.28));

  return [
    { type: "CIB", price: cibPrice, stock: product.condition === "CIB" ? product.stock : product.stock + 3 },
    { type: "Loose", price: loosePrice, stock: product.condition === "Loose" ? product.stock : product.stock + 5 },
  ];
}

export const mockProducts: Game[] = [...baseMockProducts, ...supplementalProducts].map((product, index) => ({
  ...product,
  conditionVariants: buildConditionVariants(product),
  salesCount: 2400 - index * 137,
  createdAt: new Date(Date.UTC(2026, 4, 30 - index)).toISOString(),
}));

export const platformVendors: ProductVendor[] = [
  "nintendo",
  "playstation",
  "xbox",
  "sega",
];
