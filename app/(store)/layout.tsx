import { Footer } from "@/components/layout/Footer";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { NavBar } from "@/components/layout/NavBar";
import { UtilityBar } from "@/components/layout/UtilityBar";

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col bg-bg-dark text-text-primary">
      <UtilityBar />
      <MobileHeader />
      <NavBar />
      <main id="main-content" className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
