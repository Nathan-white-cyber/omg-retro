export interface PlatformVisual {
  key: string;
  color: string;
  letter: string;
  textColor: string;
}

const platformVisuals: Record<string, PlatformVisual> = {
  nes: { key: "nes", color: "#8B8B8B", letter: "A", textColor: "#1A1A1A" },
  snes: { key: "snes", color: "#9B2FAE", letter: "A", textColor: "#FFFFFF" },
  n64: { key: "n64", color: "#1FA34A", letter: "A", textColor: "#FFFFFF" },
  gcn: { key: "gcn", color: "#1FA34A", letter: "A", textColor: "#FFFFFF" },
  gamecube: { key: "gcn", color: "#1FA34A", letter: "A", textColor: "#FFFFFF" },
  wii: { key: "wii", color: "#ABABAB", letter: "A", textColor: "#1A1A1A" },
  switch: { key: "switch", color: "#E60012", letter: "A", textColor: "#FFFFFF" },
  gb: { key: "gb", color: "#6B6B6B", letter: "A", textColor: "#FFFFFF" },
  gbc: { key: "gb", color: "#6B6B6B", letter: "A", textColor: "#FFFFFF" },
  gameboy: { key: "gb", color: "#6B6B6B", letter: "A", textColor: "#FFFFFF" },
  "game boy": { key: "gb", color: "#6B6B6B", letter: "A", textColor: "#FFFFFF" },
  "game boy color": { key: "gb", color: "#6B6B6B", letter: "A", textColor: "#FFFFFF" },
  gba: { key: "gba", color: "#5E3F8E", letter: "A", textColor: "#FFFFFF" },
  "game boy advance": { key: "gba", color: "#5E3F8E", letter: "A", textColor: "#FFFFFF" },
  ds: { key: "ds", color: "#C42D2D", letter: "A", textColor: "#FFFFFF" },
  "nintendo ds": { key: "ds", color: "#C42D2D", letter: "A", textColor: "#FFFFFF" },
  ps1: { key: "ps1", color: "#003087", letter: "✕", textColor: "#FFFFFF" },
  ps2: { key: "ps2", color: "#003087", letter: "✕", textColor: "#FFFFFF" },
  ps3: { key: "ps3", color: "#003087", letter: "✕", textColor: "#FFFFFF" },
  psp: { key: "psp", color: "#003087", letter: "✕", textColor: "#FFFFFF" },
  playstation: { key: "ps1", color: "#003087", letter: "✕", textColor: "#FFFFFF" },
  xbox: { key: "xbox", color: "#107C10", letter: "A", textColor: "#FFFFFF" },
  originalxbox: { key: "xbox", color: "#107C10", letter: "A", textColor: "#FFFFFF" },
  "original xbox": { key: "xbox", color: "#107C10", letter: "A", textColor: "#FFFFFF" },
  xbox360: { key: "xbox360", color: "#107C10", letter: "A", textColor: "#FFFFFF" },
  "xbox 360": { key: "xbox360", color: "#107C10", letter: "A", textColor: "#FFFFFF" },
  "360": { key: "xbox360", color: "#107C10", letter: "A", textColor: "#FFFFFF" },
  genesis: { key: "genesis", color: "#555555", letter: "C", textColor: "#FFFFFF" },
  gen: { key: "genesis", color: "#555555", letter: "C", textColor: "#FFFFFF" },
  saturn: { key: "saturn", color: "#555555", letter: "A", textColor: "#FFFFFF" },
  dreamcast: { key: "dreamcast", color: "#E67E22", letter: "A", textColor: "#FFFFFF" },
  dc: { key: "dreamcast", color: "#E67E22", letter: "A", textColor: "#FFFFFF" },
  gamegear: { key: "gamegear", color: "#444444", letter: "1", textColor: "#FFFFFF" },
  "game gear": { key: "gamegear", color: "#444444", letter: "1", textColor: "#FFFFFF" },
  gg: { key: "gamegear", color: "#444444", letter: "1", textColor: "#FFFFFF" },
};

export function normalizePlatform(platform: string) {
  return platform.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();
}

export function getPlatformVisual(platform: string): PlatformVisual {
  const key = normalizePlatform(platform).replace(/\s+/g, " ");
  const compact = key.replace(/\s+/g, "");

  if (key.includes("nintendo") || key === "n64" || key === "nes" || key === "snes") {
    return { key: "nintendo", color: "#E4000F", letter: "N", textColor: "#FFFFFF" };
  }

  if (key.includes("playstation") || /^ps[12345p]/.test(compact)) {
    return { key: "playstation", color: "#003087", letter: "P", textColor: "#FFFFFF" };
  }

  if (key.includes("xbox")) {
    return { key: "xbox", color: "#107C10", letter: "X", textColor: "#FFFFFF" };
  }

  if (key.includes("sega") || key.includes("dreamcast") || key.includes("genesis")) {
    return { key: "sega", color: "#1a4fa0", letter: "S", textColor: "#FFFFFF" };
  }

  if (key.includes("game boy") || compact.includes("gameboy") || key === "gba") {
    return { key: "game-boy", color: "#8B1A1A", letter: "G", textColor: "#FFFFFF" };
  }

  if (key.includes("atari")) {
    return { key: "atari", color: "#D4691E", letter: "A", textColor: "#FFFFFF" };
  }

  return (
    platformVisuals[key] ??
    platformVisuals[compact] ??
    platformVisuals[platform.toLowerCase()] ??
    { key: "default", color: "#CC1E1E", letter: "●", textColor: "#FFFFFF" }
  );
}

export function getPlatformColor(platform: string) {
  return getPlatformVisual(platform).color;
}
