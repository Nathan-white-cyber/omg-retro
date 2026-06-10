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

const nintendoRed: PlatformConfig = {
  symbol: "Ⓑ",
  btnBg: "#E4000F",
  btnColor: "#fff",
  badgeBg: "rgba(0,0,0,0.65)",
  badgeColor: "#fff",
  tileBg: "radial-gradient(ellipse at center, #8B0000 0%, #1a0000 100%)",
  shopBtnBg: "#E4000F",
};

const gameBoyAdvance: PlatformConfig = {
  symbol: "Ⓐ",
  btnBg: "#6B0AC9",
  btnColor: "#fff",
  badgeBg: "rgba(0,0,0,0.65)",
  badgeColor: "#fff",
  tileBg: "radial-gradient(ellipse at center, #4a0a8a 0%, #0d001a 100%)",
  shopBtnBg: "#6B0AC9",
};

const gameBoy: PlatformConfig = {
  symbol: "Ⓐ",
  btnBg: "#8B1A1A",
  btnColor: "#fff",
  badgeBg: "rgba(0,0,0,0.65)",
  badgeColor: "#fff",
  tileBg: "radial-gradient(ellipse at center, #5a1010 0%, #0d0000 100%)",
  shopBtnBg: "#8B1A1A",
};

const gameCube: PlatformConfig = {
  symbol: "Ⓐ",
  btnBg: "#1E7B1E",
  btnColor: "#fff",
  badgeBg: "rgba(0,0,0,0.65)",
  badgeColor: "#fff",
  tileBg: "radial-gradient(ellipse at center, #1a4a1a 0%, #000d00 100%)",
  shopBtnBg: "#1E7B1E",
};

const wii: PlatformConfig = {
  symbol: "Ⓐ",
  btnBg: "#888",
  btnColor: "#fff",
  badgeBg: "rgba(0,0,0,0.65)",
  badgeColor: "#fff",
  tileBg: "radial-gradient(ellipse at center, #555 0%, #111 100%)",
  shopBtnBg: "#555",
};

const playstation: PlatformConfig = {
  symbol: "✕",
  btnBg: "#003087",
  btnColor: "#fff",
  badgeBg: "rgba(0,0,0,0.65)",
  badgeColor: "#fff",
  tileBg: "radial-gradient(ellipse at center, #003087 0%, #000820 100%)",
  shopBtnBg: "#003087",
};

const xbox: PlatformConfig = {
  symbol: "Ⓐ",
  btnBg: "#107C10",
  btnColor: "#fff",
  badgeBg: "rgba(0,0,0,0.65)",
  badgeColor: "#fff",
  tileBg: "radial-gradient(ellipse at center, #0d4f0d 0%, #001000 100%)",
  shopBtnBg: "#107C10",
};

const sega: PlatformConfig = {
  symbol: "Ⓐ",
  btnBg: "#1a4fa0",
  btnColor: "#fff",
  badgeBg: "rgba(0,0,0,0.65)",
  badgeColor: "#fff",
  tileBg: "radial-gradient(ellipse at center, #1a2a6c 0%, #000510 100%)",
  shopBtnBg: "#1a4fa0",
};

const atari: PlatformConfig = {
  symbol: "▶",
  btnBg: "#D4691E",
  btnColor: "#fff",
  badgeBg: "rgba(0,0,0,0.65)",
  badgeColor: "#fff",
  tileBg: "radial-gradient(ellipse at center, #8a3a0a 0%, #1a0800 100%)",
  shopBtnBg: "#D4691E",
};

export const PLATFORM_CONFIG: Record<string, PlatformConfig> = {
  // Nintendo family
  "nintendo 64": nintendoRed,
  n64: nintendoRed,
  "super nintendo": nintendoRed,
  snes: nintendoRed,
  nes: nintendoRed,
  nintendo: nintendoRed,
  "game boy advance": gameBoyAdvance,
  gba: gameBoyAdvance,
  "game boy": gameBoy,
  gameboy: gameBoy,
  gamecube: gameCube,
  gcn: gameCube,
  wii,
  switch: nintendoRed,
  ds: nintendoRed,
  "nintendo ds": nintendoRed,

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
  symbol: "▶",
  btnBg: "#CC1E1E",
  btnColor: "#fff",
  badgeBg: "rgba(0,0,0,0.65)",
  badgeColor: "#fff",
  tileBg: "radial-gradient(ellipse at center, #333 0%, #111 100%)",
  shopBtnBg: "#CC1E1E",
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

  for (const [key, config] of Object.entries(PLATFORM_CONFIG)) {
    if (lower.includes(key)) return config;
  }

  return DEFAULT_PLATFORM_CONFIG;
}
