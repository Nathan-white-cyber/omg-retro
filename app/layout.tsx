import type { Metadata, Viewport } from "next";
import { Anton, Bebas_Neue, Space_Grotesk } from "next/font/google";
import { ToastProvider } from "@/components/toast/ToastProvider";
import { createMetadata, siteUrl } from "@/lib/seo";
import "./globals.css";

const anton = Anton({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-display-alt",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...createMetadata({
    title: "OMG Retro — Authentic Retro Games, Consoles & Accessories",
    description:
      "Shop authentic, tested retro games and consoles backed by a 1-year warranty and fast U.S. shipping.",
    path: "/",
  }),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0E0E0E",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${bebasNeue.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bg-dark font-body text-text-primary">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-brand-red focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
