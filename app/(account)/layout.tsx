import { AccountSidebar } from "@/components/account/AccountSidebar";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { NavBar } from "@/components/layout/NavBar";
import { UtilityBar } from "@/components/layout/UtilityBar";

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-bg-cream text-text-dark">
      <UtilityBar />
      <MobileHeader />
      <NavBar />
      <main className="mx-auto grid max-w-[1240px] gap-8 px-7 py-8 lg:grid-cols-[280px_1fr] lg:py-11">
        <AccountSidebar />
        <section className="min-w-0">{children}</section>
      </main>
    </div>
  );
}
