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

function normalizePlatformKey(collectionTitle: string) {
  return (collectionTitle ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
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
