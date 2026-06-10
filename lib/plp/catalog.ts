import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { getPlatformConfig } from "@/lib/utils/platform";
import type { ProductVendor } from "@/types";

export interface SystemRoute {
  name: string;
  code: string;
  slug: string;
  href: string;
  vendor: ProductVendor;
  color: string;
}

export interface PlatformRoute {
  name: string;
  vendor: ProductVendor;
  href: string;
  color: string;
  systems: SystemRoute[];
}

export interface PlpRouteContext {
  kind: "products" | "platform" | "system" | "deals" | "best-sellers" | "new-arrivals" | "search";
  title: string;
  subtitle: string;
  href: string;
  vendor?: ProductVendor;
  system?: SystemRoute;
  platform?: PlatformRoute;
  platformCode?: string;
  forcedSale?: boolean;
  forcedOrder?: PlpSort;
}

export type PlpSort =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "newest"
  | "best-selling"
  | "highest-rated";

export const sortLabels: Record<PlpSort, string> = {
  featured: "Featured",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  newest: "Newest Added",
  "best-selling": "Best Selling",
  "highest-rated": "Highest Rated",
};

export const genreOptions = [
  "Action/Adventure",
  "Platformer",
  "RPG",
  "Shooter",
  "Racing",
  "Fighting",
] as const;

export const conditionOptions = ["CIB", "Loose", "New/Sealed"] as const;

const platformColor = (name: string) => getPlatformConfig(name).shopBtnBg;

export const platformRoutes: PlatformRoute[] = [
  {
    name: "Nintendo",
    vendor: "nintendo",
    href: "/nintendo",
    color: platformColor("Nintendo"),
    systems: [
      { name: "Nintendo 64", code: "N64", slug: "n64", href: "/nintendo/n64", vendor: "nintendo", color: platformColor("Nintendo 64") },
      { name: "Super Nintendo", code: "SNES", slug: "snes", href: "/nintendo/snes", vendor: "nintendo", color: platformColor("Super Nintendo") },
      { name: "GameCube", code: "GCN", slug: "gamecube", href: "/nintendo/gamecube", vendor: "nintendo", color: platformColor("GameCube") },
      { name: "Wii", code: "Wii", slug: "wii", href: "/nintendo/wii", vendor: "nintendo", color: platformColor("Wii") },
      { name: "NES", code: "NES", slug: "nes", href: "/nintendo/nes", vendor: "nintendo", color: platformColor("NES") },
      { name: "Switch", code: "SW", slug: "switch", href: "/nintendo/switch", vendor: "nintendo", color: platformColor("Switch") },
      { name: "Game Boy", code: "GB", slug: "game-boy", href: "/nintendo/game-boy", vendor: "nintendo", color: platformColor("Game Boy") },
      { name: "Game Boy Advance", code: "GBA", slug: "gba", href: "/nintendo/gba", vendor: "nintendo", color: platformColor("Game Boy Advance") },
      { name: "Nintendo DS", code: "DS", slug: "ds", href: "/nintendo/ds", vendor: "nintendo", color: platformColor("Nintendo DS") },
    ],
  },
  {
    name: "PlayStation",
    vendor: "playstation",
    href: "/playstation",
    color: platformColor("PlayStation"),
    systems: [
      { name: "PlayStation", code: "PS1", slug: "ps1", href: "/playstation/ps1", vendor: "playstation", color: platformColor("PlayStation") },
      { name: "PlayStation 2", code: "PS2", slug: "ps2", href: "/playstation/ps2", vendor: "playstation", color: platformColor("PlayStation 2") },
      { name: "PlayStation 3", code: "PS3", slug: "ps3", href: "/playstation/ps3", vendor: "playstation", color: platformColor("PlayStation 3") },
      { name: "PSP", code: "PSP", slug: "psp", href: "/playstation/psp", vendor: "playstation", color: platformColor("PSP") },
    ],
  },
  {
    name: "Xbox",
    vendor: "xbox",
    href: "/xbox",
    color: platformColor("Xbox"),
    systems: [
      { name: "Original Xbox", code: "Xbox", slug: "original-xbox", href: "/xbox/original-xbox", vendor: "xbox", color: platformColor("Original Xbox") },
      { name: "Xbox 360", code: "360", slug: "xbox-360", href: "/xbox/xbox-360", vendor: "xbox", color: platformColor("Xbox 360") },
    ],
  },
  {
    name: "Sega",
    vendor: "sega",
    href: "/sega",
    color: platformColor("Sega"),
    systems: [
      { name: "Genesis", code: "GEN", slug: "genesis", href: "/sega/genesis", vendor: "sega", color: platformColor("Genesis") },
      { name: "Saturn", code: "SAT", slug: "saturn", href: "/sega/saturn", vendor: "sega", color: platformColor("Saturn") },
      { name: "Dreamcast", code: "DC", slug: "dreamcast", href: "/sega/dreamcast", vendor: "sega", color: platformColor("Dreamcast") },
      { name: "Game Gear", code: "GG", slug: "game-gear", href: "/sega/game-gear", vendor: "sega", color: platformColor("Game Gear") },
    ],
  },
];

export const allSystems = platformRoutes.flatMap((platform) => platform.systems);

export function getPlatformRoute(vendor: ProductVendor) {
  return platformRoutes.find((platform) => platform.vendor === vendor);
}

export function getSystemRoute(vendor: ProductVendor, slug: string) {
  return getPlatformRoute(vendor)?.systems.find((system) => system.slug === slug);
}

export function getPlpRouteContext(kind: PlpRouteContext["kind"], options: { vendor?: ProductVendor; systemSlug?: string } = {}): PlpRouteContext {
  if (kind === "platform" && options.vendor) {
    const platform = getPlatformRoute(options.vendor);

    if (platform) {
      return {
        kind,
        title: `${platform.name.toUpperCase()} GAMES & CONSOLES`,
        subtitle: `Shop authentic ${platform.name} games, systems, and accessories.`,
        href: platform.href,
        vendor: platform.vendor,
        platform,
        platformCode: platform.vendor,
      };
    }
  }

  if (kind === "system" && options.vendor && options.systemSlug) {
    const platform = getPlatformRoute(options.vendor);
    const system = getSystemRoute(options.vendor, options.systemSlug);

    if (platform && system) {
      return {
        kind,
        title: `${system.name.toUpperCase()} GAMES`,
        subtitle: `Browse tested ${system.name} games backed by our 1-year warranty.`,
        href: system.href,
        vendor: options.vendor,
        system,
        platform,
        platformCode: system.code,
      };
    }
  }

  const special: Record<Exclude<PlpRouteContext["kind"], "platform" | "system">, PlpRouteContext> = {
    products: {
      kind: "products",
      title: "SHOP GAMES",
      subtitle: "The full catalog of authentic retro games, consoles, and accessories.",
      href: "/products",
    },
    deals: {
      kind: "deals",
      title: "FEATURED DEALS",
      subtitle: "Discounted retro favorites, sorted by the best savings first.",
      href: "/deals",
      forcedSale: true,
      forcedOrder: "featured",
    },
    "best-sellers": {
      kind: "best-sellers",
      title: "BEST SELLERS",
      subtitle: "The retro games collectors keep coming back for.",
      href: "/best-sellers",
      forcedOrder: "best-selling",
    },
    "new-arrivals": {
      kind: "new-arrivals",
      title: "RECENTLY ADDED",
      subtitle: "Fresh trade-ins and newly listed retro finds.",
      href: "/new-arrivals",
      forcedOrder: "newest",
    },
    search: {
      kind: "search",
      title: "SEARCH GAMES",
      subtitle: "Search the full OMG Retro catalog by title, system, or genre.",
      href: "/search",
    },
  };

  return special[kind as keyof typeof special];
}

export function metadataForPlp(context: PlpRouteContext): Metadata {
  const specialTitles: Partial<Record<PlpRouteContext["kind"], string>> = {
    products: "Shop All Retro Games — OMG Retro",
    deals: "Deals — OMG Retro",
    "best-sellers": "Best Sellers — OMG Retro",
    "new-arrivals": "New Arrivals — OMG Retro",
    search: "Search Games — OMG Retro",
  };
  const systemTitleOverrides: Record<string, string> = {
    ps1: "PlayStation 1 Games — OMG Retro",
  };

  const title = specialTitles[context.kind] ??
    (context.kind === "system" && context.system
      ? systemTitleOverrides[context.system.slug] ?? `${context.system.name} Games — OMG Retro`
      : context.kind === "platform" && context.platform
        ? `${context.platform.name} Games & Consoles — OMG Retro`
        : `${context.title.replace(/\s+/g, " ")} — OMG Retro`);

  return createMetadata({
    title,
    description: context.subtitle,
    path: context.href,
  });
}
