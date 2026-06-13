// Single source of truth for all platform-specific config.
// Import this wherever platform colors, symbols, or styles are needed.
// Never hardcode platform data in individual components.

export interface PlatformConfig {
  // Controller button circle
  symbol: string;
  btnBg: string;
  btnColor: string;

  // Product card platform badge
  badgeBg: string;
  badgeColor: string;

  // Platform tiles
  tileBg: string;
  shopBtnBg: string;
}

const nintendo: PlatformConfig = {
  symbol: "\u24B7",
  btnBg: "#E4000F",
  btnColor: "#ffffff",
  badgeBg: "rgba(0,0,0,0.65)",
  badgeColor: "#ffffff",
  tileBg: "radial-gradient(ellipse at center, #8B0000 0%, #1a0000 100%)",
  shopBtnBg: "#E4000F",
};

const playstation: PlatformConfig = {
  symbol: "\u2715",
  btnBg: "#003087",
  btnColor: "#ffffff",
  badgeBg: "rgba(0,0,0,0.65)",
  badgeColor: "#ffffff",
  tileBg: "radial-gradient(ellipse at center, #003087 0%, #000820 100%)",
  shopBtnBg: "#003087",
};

const xbox: PlatformConfig = {
  symbol: "\u24B6",
  btnBg: "#107C10",
  btnColor: "#ffffff",
  badgeBg: "rgba(0,0,0,0.65)",
  badgeColor: "#ffffff",
  tileBg: "radial-gradient(ellipse at center, #0d4f0d 0%, #001000 100%)",
  shopBtnBg: "#107C10",
};

const sega: PlatformConfig = {
  symbol: "\u24B6",
  btnBg: "#1A6EB5",
  btnColor: "#ffffff",
  badgeBg: "rgba(0,0,0,0.65)",
  badgeColor: "#ffffff",
  tileBg: "radial-gradient(ellipse at center, #1a2a6c 0%, #000510 100%)",
  shopBtnBg: "#1A6EB5",
};

const atari: PlatformConfig = {
  symbol: "\u2B1C",
  btnBg: "#444",
  btnColor: "#ffffff",
  badgeBg: "rgba(0,0,0,0.65)",
  badgeColor: "#ffffff",
  tileBg: "radial-gradient(ellipse at center, #8a3a0a 0%, #1a0800 100%)",
  shopBtnBg: "#444",
};

export const PLATFORM_CONFIG: Record<string, PlatformConfig> = {
  // Nintendo family
  "nintendo 64": nintendo,
  n64: nintendo,
  "super nintendo": nintendo,
  snes: nintendo,
  nes: nintendo,
  gamecube: nintendo,
  gcn: nintendo,
  wii: nintendo,
  "game boy advance": nintendo,
  gba: nintendo,
  "game boy": nintendo,
  gameboy: nintendo,
  switch: nintendo,
  ds: nintendo,
  "nintendo ds": nintendo,
  nintendo,

  // PlayStation family
  "playstation 2": playstation,
  "playstation 3": playstation,
  playstation,
  ps1: playstation,
  ps2: playstation,
  ps3: playstation,
  psp: playstation,

  // Xbox family
  "original xbox": xbox,
  "xbox 360": xbox,
  xbox,

  // Sega family
  "sega dreamcast": sega,
  dreamcast: sega,
  "sega genesis": sega,
  genesis: sega,
  "sega saturn": sega,
  saturn: sega,
  sega,
  "game gear": sega,

  // Atari
  atari,
};

export const DEFAULT_PLATFORM_CONFIG: PlatformConfig = {
  symbol: "\u25B6",
  btnBg: "#444",
  btnColor: "#ffffff",
  badgeBg: "rgba(0,0,0,0.65)",
  badgeColor: "#ffffff",
  tileBg: "radial-gradient(ellipse at center, #333 0%, #111 100%)",
  shopBtnBg: "#444",
};

export const PLATFORM_COLORS: Record<string, string> = {
  "nintendo-64": "#3a3f47",
  n64: "#3a3f47",
  nes: "#a59a86",
  snes: "#9b99a4",
  gamecube: "#5a3fa0",
  wii: "#7f97ad",
  switch: "#c4352c",
  playstation: "#9a9ea3",
  ps1: "#9a9ea3",
  ps2: "#1c2733",
  ps3: "#15151a",
  psp: "#2f3a4a",
  xbox: "#3a3f47",
  "xbox-360": "#2f6b3a",
  genesis: "#2f6bb0",
  "sega-genesis": "#2f6bb0",
  saturn: "#1c1c22",
  dreamcast: "#3a7bd5",
  "game-gear": "#4a5560",
};

function normalizePlatformKey(collectionTitle: string) {
  return (collectionTitle ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function getPlatformCssClass(title: string): string {
  const lower = normalizePlatformKey(title);
  const matches: Array<[string[], string]> = [
    [["nintendo 64", "n64"], "c-n64"],
    [["super nintendo", "snes"], "c-snes"],
    [["nintendo ds", "nds", "ds"], "c-ds"],
    [["game boy advance", "gba"], "c-gba"],
    [["game boy"], "c-gb"],
    [["gamecube", "gcn"], "c-gcn"],
    [["switch"], "c-switch"],
    [["wii"], "c-wii"],
    [["nes"], "c-nes"],
    [["playstation 2", "ps2"], "c-ps2"],
    [["playstation 3", "ps3"], "c-ps3"],
    [["psp"], "c-psp"],
    [["playstation", "ps1"], "c-ps1"],
    [["xbox 360", "360"], "c-360"],
    [["xbox"], "c-xbox"],
    [["dreamcast"], "c-dc"],
    [["genesis", "mega drive"], "c-gen"],
    [["saturn"], "c-sat"],
    [["game gear"], "c-gg"],
  ];

  for (const [needles, className] of matches) {
    if (needles.some((needle) => lower.includes(needle))) return className;
  }

  return "";
}

export function getPlatformGlyph(title: string): { text: string; isPs: boolean } {
  const lower = normalizePlatformKey(title);

  if (
    lower.includes("playstation") ||
    lower.includes("ps1") ||
    lower.includes("ps2") ||
    lower.includes("ps3") ||
    lower.includes("psp")
  ) {
    return { text: "\u2715", isPs: true };
  }

  if (lower.includes("genesis") || lower.includes("mega drive") || lower.includes("saturn")) {
    return { text: "C", isPs: false };
  }

  if (lower.includes("game gear")) {
    return { text: "1", isPs: false };
  }

  return { text: "A", isPs: false };
}

export function getPlatformFromProduct(product: {
  title?: string | null;
  collection?: { title?: string | null } | null;
  metadata?: Record<string, unknown> | null;
}): string {
  if (product.metadata?.platform && typeof product.metadata.platform === "string") {
    return product.metadata.platform;
  }

  const col = product.collection?.title ?? "";
  const knownPlatforms = [
    "Nintendo 64",
    "SNES",
    "Super Nintendo",
    "NES",
    "GameCube",
    "Wii",
    "Nintendo Switch",
    "Game Boy Advance",
    "GBA",
    "Game Boy",
    "Nintendo DS",
    "DS",
    "PlayStation",
    "PlayStation 2",
    "PlayStation 3",
    "PSP",
    "Xbox",
    "Xbox 360",
    "Original Xbox",
    "Sega Genesis",
    "Sega Dreamcast",
    "Sega Saturn",
    "Game Gear",
    "Dreamcast",
    "Genesis",
    "Saturn",
  ];
  const colLower = col.toLowerCase();
  const matched = knownPlatforms.find((platform) => colLower.includes(platform.toLowerCase()));
  if (matched) return col;

  const title = product.title ?? "";
  const titleLower = title.toLowerCase();
  const matchedFromTitle = knownPlatforms.find((platform) => titleLower.includes(platform.toLowerCase()));
  if (matchedFromTitle) return matchedFromTitle;

  return col;
}

export function getPlatformColor(platform: string): string {
  const p = platform.toLowerCase();
  const normalized = p.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  if (PLATFORM_COLORS[normalized]) return PLATFORM_COLORS[normalized];
  if (p.includes("nintendo 64") || p.includes("n64")) return "#b8902f";
  if (p.includes("snes") || p.includes("super nintendo")) return "#9b2fae";
  if (p === "nes" || p.includes("nintendo entertainment")) return "#c0392b";
  if (p.includes("game boy advance") || p.includes("gba")) return "#5e3f8e";
  if (p.includes("game boy")) return "#6b6b6b";
  if (p.includes("gamecube")) return "#1a3a6b";
  if (p.includes("wii")) return "#b0b0b0";
  if (p.includes("nintendo ds") || p === "ds") return "#c42d2d";
  if (p.includes("nintendo switch")) return "#e60012";
  if (p.includes("playstation 3") || p.includes("ps3")) return "#1a1a2e";
  if (p.includes("playstation 2") || p.includes("ps2")) return "#1c2733";
  if (p.includes("playstation") || p.includes("ps1") || p.includes("psp")) return "#1c2733";
  if (p.includes("xbox 360")) return "#2a5c2a";
  if (p.includes("xbox")) return "#1a3a1a";
  if (p.includes("dreamcast")) return "#e67e22";
  if (p.includes("genesis") || p.includes("mega drive")) return "#2c2c2c";
  if (p.includes("saturn")) return "#3a3a6b";
  if (p.includes("game gear")) return "#444444";
  return "#33373f";
}

export function getProductType(product: {
  type?: { value?: string | null } | null;
  collection?: { title?: string | null } | null;
  title?: string | null;
}): "game" | "console" | "accessory" {
  const t = (product.type?.value ?? "").toLowerCase();
  if (t === "console") return "console";
  if (t === "accessory") return "accessory";

  const col = (product.collection?.title ?? "").toLowerCase();
  if (col.includes("console")) return "console";
  if (col.includes("accessor")) return "accessory";

  const title = (product.title ?? "").toLowerCase();
  if (title.includes("console")) return "console";
  if (
    title.includes("controller") ||
    title.includes("cable") ||
    title.includes("memory pak") ||
    title.includes("accessory")
  ) {
    return "accessory";
  }

  return "game";
}

/**
 * Resolve platform config from a collection title string.
 * Matches by substring so "Nintendo 64" matches "nintendo 64",
 * and falls back to DEFAULT_PLATFORM_CONFIG if nothing matches.
 */
export function getPlatformConfig(collectionTitle: string): PlatformConfig {
  const lower = normalizePlatformKey(collectionTitle);

  if (PLATFORM_CONFIG[lower]) return PLATFORM_CONFIG[lower];

  const entries = Object.entries(PLATFORM_CONFIG).sort((a, b) => b[0].length - a[0].length);

  for (const [key, config] of entries) {
    if (lower.includes(key)) return config;
  }

  return DEFAULT_PLATFORM_CONFIG;
}
