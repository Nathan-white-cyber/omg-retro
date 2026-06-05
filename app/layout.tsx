import type { Metadata } from "next";
import { Anton, Bebas_Neue, Space_Grotesk } from "next/font/google";
import { ToastProvider } from "@/components/toast/ToastProvider";
import "./globals.css";

const anton = Anton({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-display-alt",
  weight: "400",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OMG Retro - Authentic Retro Games",
  description:
    "Shop authentic, tested retro video games, consoles, and accessories.",
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
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
