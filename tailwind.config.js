/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        brand: {
          red: "#CC1E1E",
          "red-dark": "#A01818",
          "red-glow": "rgba(204, 30, 30, 0.3)",
        },

        bg: {
          dark: "#0E0E0E",
          surface: "#1A1A1A",
          surface2: "#222222",
          cream: "#F5F0EB",
          "cream-dark": "#EDE8E2",
        },

        border: {
          DEFAULT: "#333333",
          light: "#444444",
          cream: "#E0DAD3",
        },

        text: {
          primary: "#F0F0F0",
          secondary: "#888888",
          dark: "#111111",
          "dark-muted": "#555555",
        },

        status: {
          success: "#1FA34A",
          warning: "#E67E22",
          info: "#003087",
          error: "#CC1E1E",
        },

        platform: {
          nes: "#8B8B8B",
          snes: "#9B2FAE",
          n64: "#1FA34A",
          gcn: "#1FA34A",
          wii: "#ABABAB",
          switch: "#E60012",
          gb: "#6B6B6B",
          gba: "#5E3F8E",
          ds: "#C42D2D",
          ps1: "#003087",
          ps2: "#003087",
          ps3: "#003087",
          psp: "#003087",
          xbox: "#107C10",
          xbox360: "#107C10",
          genesis: "#555555",
          saturn: "#555555",
          dreamcast: "#E67E22",
          gamegear: "#444444",
        },
      },

      fontFamily: {
        display: ["Anton", "Bebas Neue", "Impact", "sans-serif"],
        body: ["Space Grotesk", "Inter", "sans-serif"],
        ui: ["Space Grotesk", "Inter", "sans-serif"],
      },

      fontSize: {
        "display-xl": ["120px", { lineHeight: "1", letterSpacing: "0.02em" }],
        "display-lg": ["72px", { lineHeight: "1.05", letterSpacing: "0.02em" }],
        "display-md": ["48px", { lineHeight: "1.1", letterSpacing: "0.02em" }],
        "display-sm": ["32px", { lineHeight: "1.15", letterSpacing: "0.02em" }],
        "display-xs": ["22px", { lineHeight: "1.2", letterSpacing: "0.02em" }],
        "body-lg": ["16px", { lineHeight: "1.6" }],
        "body-md": ["14px", { lineHeight: "1.5" }],
        "body-sm": ["13px", { lineHeight: "1.5" }],
        "body-xs": ["11px", { lineHeight: "1.4", letterSpacing: "0.05em" }],
        "label-lg": ["13px", { lineHeight: "1", letterSpacing: "0.08em" }],
        "label-md": ["11px", { lineHeight: "1", letterSpacing: "0.1em" }],
        "label-sm": ["10px", { lineHeight: "1", letterSpacing: "0.12em" }],
      },

      spacing: {
        "nav-h": "56px",
        "utility-h": "40px",
        "header-h": "96px",
        "card-p": "16px",
        "section-y": "64px",
        "section-y-sm": "40px",
      },

      borderRadius: {
        card: "14px",
        btn: "8px",
        "btn-pill": "30px",
        badge: "4px",
        avatar: "50%",
        controller: "50%",
      },

      boxShadow: {
        card: "0 2px 8px rgba(0,0,0,0.3)",
        "card-hover": "0 12px 32px rgba(0,0,0,0.4)",
        "ctrl-3d":
          "0 4px 0 rgba(0,0,0,0.5), 0 6px 12px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.25)",
        "ctrl-3d-hover": "0 2px 0 rgba(0,0,0,0.5), 0 3px 8px rgba(0,0,0,0.4)",
        "ctrl-3d-active": "0 1px 0 rgba(0,0,0,0.5), inset 0 2px 3px rgba(0,0,0,0.3)",
        "ctrl-subtle": "0 2px 4px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.12)",
        "glow-red": "0 0 20px rgba(204,30,30,0.4)",
        "glow-green": "0 0 10px rgba(31,163,74,0.5)",
        "glow-blue": "0 0 10px rgba(0,48,135,0.5)",
        panel: "0 4px 24px rgba(0,0,0,0.2)",
      },

      transitionDuration: {
        fast: "150ms",
        normal: "200ms",
        slow: "300ms",
      },

      transitionTimingFunction: {
        "bounce-in": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },

      zIndex: {
        "utility-bar": "50",
        nav: "40",
        "mega-menu": "35",
        "mobile-drawer": "60",
        modal: "70",
        toast: "80",
      },

      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },

      gridTemplateColumns: {
        "products-desktop": "repeat(4, 1fr)",
        "products-tablet": "repeat(3, 1fr)",
        "products-mobile": "repeat(2, 1fr)",
        "plp-layout": "280px 1fr",
        "pdp-layout": "1fr 1fr",
        "cart-layout": "1fr 380px",
        "checkout-layout": "1fr 420px",
        "content-layout": "1fr 320px",
        "account-layout": "280px 1fr",
      },
    },
  },

  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
  ],
};
