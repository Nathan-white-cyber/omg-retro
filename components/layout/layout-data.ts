export type PlatformKey = "nintendo" | "playstation" | "xbox" | "sega";

export interface SystemLink {
  label: string;
  code: string;
  href: string;
  coverColor: string;
}

export interface PlatformMenu {
  key: PlatformKey;
  label: string;
  href: string;
  systems: SystemLink[];
  categories: { label: string; href: string }[];
  feature: {
    kicker: string;
    title: string;
    description: string;
    href: string;
    coverColor: string;
    platform: string;
  };
}

export const utilityPromos = [
  { label: "1-Year Warranty", icon: "package-check" },
  { label: "Free U.S. Shipping on Orders $75+", icon: "truck" },
  { label: "Authentic Games", icon: "gamepad" },
];

export const utilityLinks = [
  { label: "Track Order", href: "/account/orders" },
  { label: "Help Center", href: "/info/faq" },
  { label: "About Us", href: "/info/about" },
];

export const platformMenus: PlatformMenu[] = [
  {
    key: "nintendo",
    label: "Nintendo",
    href: "/nintendo",
    systems: [
      { label: "NES", code: "NES", href: "/nintendo/nes", coverColor: "#a59a86" },
      { label: "SNES", code: "SNES", href: "/nintendo/snes", coverColor: "#9b99a4" },
      { label: "Nintendo 64", code: "N64", href: "/nintendo/n64", coverColor: "#3a3f47" },
      { label: "GameCube", code: "GCN", href: "/nintendo/gamecube", coverColor: "#5a3fa0" },
      { label: "Nintendo Wii", code: "Wii", href: "/nintendo/wii", coverColor: "#7f97ad" },
      { label: "Switch", code: "SW", href: "/nintendo/switch", coverColor: "#c4352c" },
      { label: "Game Boy", code: "GB", href: "/nintendo/game-boy", coverColor: "#6B6B6B" },
      { label: "Game Boy Advance", code: "GBA", href: "/nintendo/gba", coverColor: "#5E3F8E" },
      { label: "Nintendo DS", code: "DS", href: "/nintendo/ds", coverColor: "#C42D2D" },
    ],
    categories: [
      { label: "Games", href: "/nintendo" },
      { label: "Consoles", href: "/products?category=consoles&vendor=nintendo" },
      { label: "Controllers", href: "/products?category=controllers&vendor=nintendo" },
      { label: "Accessories", href: "/products?category=accessories&vendor=nintendo" },
      { label: "Best Sellers", href: "/best-sellers?vendor=nintendo" },
      { label: "New Arrivals", href: "/new-arrivals?vendor=nintendo" },
    ],
    feature: {
      kicker: "Featured Deal",
      title: "Zelda: OoT",
      description: "The N64 classic, tested and guaranteed.",
      href: "/products/the-legend-of-zelda-ocarina-of-time",
      coverColor: "#b8902f",
      platform: "N64",
    },
  },
  {
    key: "playstation",
    label: "PlayStation",
    href: "/playstation",
    systems: [
      { label: "PlayStation", code: "PS1", href: "/playstation/ps1", coverColor: "#9a9ea3" },
      { label: "PlayStation 2", code: "PS2", href: "/playstation/ps2", coverColor: "#1c2733" },
      { label: "PlayStation 3", code: "PS3", href: "/playstation/ps3", coverColor: "#15151a" },
      { label: "PSP", code: "PSP", href: "/playstation/psp", coverColor: "#2f3a4a" },
    ],
    categories: [
      { label: "Games", href: "/playstation" },
      { label: "Consoles", href: "/products?category=consoles&vendor=playstation" },
      { label: "Controllers", href: "/products?category=controllers&vendor=playstation" },
      { label: "Memory Cards", href: "/products?category=memory-cards&vendor=playstation" },
      { label: "Accessories", href: "/products?category=accessories&vendor=playstation" },
      { label: "Deals", href: "/deals?vendor=playstation" },
    ],
    feature: {
      kicker: "Featured Deal",
      title: "FF VII",
      description: "The definitive PS1 RPG. Tested and guaranteed.",
      href: "/products/final-fantasy-vii",
      coverColor: "#1c2733",
      platform: "PS1",
    },
  },
  {
    key: "xbox",
    label: "Xbox",
    href: "/xbox",
    systems: [
      { label: "Original Xbox", code: "Xbox", href: "/xbox/original-xbox", coverColor: "#3a3f47" },
      { label: "Xbox 360", code: "360", href: "/xbox/xbox-360", coverColor: "#2f6b3a" },
      { label: "Accessories", code: "ACC", href: "/products?category=accessories&vendor=xbox", coverColor: "#1f8a4c" },
    ],
    categories: [
      { label: "Games", href: "/xbox" },
      { label: "Consoles", href: "/products?category=consoles&vendor=xbox" },
      { label: "Controllers", href: "/products?category=controllers&vendor=xbox" },
      { label: "Headsets", href: "/products?category=headsets&vendor=xbox" },
      { label: "Accessories", href: "/products?category=accessories&vendor=xbox" },
      { label: "Deals", href: "/deals?vendor=xbox" },
    ],
    feature: {
      kicker: "Featured Deal",
      title: "Halo",
      description: "The original Xbox shooter that started it all.",
      href: "/products/halo-combat-evolved",
      coverColor: "#2f6b3a",
      platform: "Xbox",
    },
  },
  {
    key: "sega",
    label: "Sega",
    href: "/sega",
    systems: [
      { label: "Genesis", code: "GEN", href: "/sega/genesis", coverColor: "#2f6bb0" },
      { label: "Saturn", code: "SAT", href: "/sega/saturn", coverColor: "#1c1c22" },
      { label: "Dreamcast", code: "DC", href: "/sega/dreamcast", coverColor: "#3a7bd5" },
      { label: "Game Gear", code: "GG", href: "/sega/game-gear", coverColor: "#4a5560" },
    ],
    categories: [
      { label: "Games", href: "/sega" },
      { label: "Consoles", href: "/products?category=consoles&vendor=sega" },
      { label: "Controllers", href: "/products?category=controllers&vendor=sega" },
      { label: "Accessories", href: "/products?category=accessories&vendor=sega" },
      { label: "Best Sellers", href: "/best-sellers?vendor=sega" },
      { label: "Deals", href: "/deals?vendor=sega" },
    ],
    feature: {
      kicker: "Featured Deal",
      title: "Sonic Adv 2",
      description: "Dreamcast favorite, cleaned and ready to play.",
      href: "/products/sonic-adventure-2",
      coverColor: "#2f6bb0",
      platform: "Dreamcast",
    },
  },
];

export const footerColumns = [
  {
    title: "Shop",
    links: [
      { label: "Nintendo", href: "/nintendo" },
      { label: "PlayStation", href: "/playstation" },
      { label: "Xbox", href: "/xbox" },
      { label: "Sega", href: "/sega" },
      { label: "All Systems", href: "/products" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Track Order", href: "/account/orders" },
      { label: "Shipping Info", href: "/info/shipping" },
      { label: "Returns", href: "/info/returns" },
      { label: "Help Center", href: "/info/faq" },
      { label: "Contact Us", href: "/info/contact" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "About Us", href: "/info/about" },
      { label: "Our Guarantee", href: "/info/guarantee" },
      { label: "Reviews", href: "/info/guarantee#reviews" },
      { label: "Blog", href: "/blog" },
    ],
  },
];

export const accountNavItems = [
  { label: "Dashboard", href: "/account", icon: "dashboard" },
  { label: "Order History", href: "/account/orders", icon: "orders" },
  { label: "Wishlist", href: "/account/wishlist", icon: "wishlist" },
  { label: "Settings", href: "/account/settings", icon: "settings" },
];

export const drawerMinorLinks = [
  { label: "Help Centre", href: "/info/faq", icon: "help" },
  { label: "Track Order", href: "/account/orders", icon: "package-check" },
  { label: "About Us", href: "/info/about", icon: "book" },
];

export const headerActionLinks = [
  { label: "Account", href: "/login", icon: "account" },
  { label: "Search", href: "/search", icon: "search" },
  { label: "Home", href: "/", icon: "home" },
];
