import Link from "next/link";
import { Logo } from "@/components/layout/Logo";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg-dark px-5 py-10 text-text-dark before:absolute before:inset-0 before:bg-[radial-gradient(120%_90%_at_50%_-10%,rgba(204,30,30,.16),transparent_55%),radial-gradient(90%_70%_at_50%_120%,rgba(0,48,135,.08),transparent_60%)]">
      <div className="relative z-10 flex w-full max-w-[480px] flex-col items-center">
        <div className="w-full rounded-card border border-white/10 bg-bg-cream p-7 shadow-[0_1px_2px_rgba(0,0,0,.3),0_30px_70px_rgba(0,0,0,.55)] sm:p-10">
          <Logo className="mb-6 items-center [&_.text-text-primary]:text-text-dark" />
          {children}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[12.5px] text-white/55">
          <span>Authentic Games</span>
          <span className="h-1 w-1 rounded-full bg-brand-red" />
          <span>Tested</span>
          <span className="h-1 w-1 rounded-full bg-brand-red" />
          <span>1-Year Warranty</span>
          <span className="h-1 w-1 rounded-full bg-brand-red" />
          <span>Free Shipping $75+</span>
        </div>

        <Link href="/" className="mt-5 text-[12.5px] font-bold tracking-[0.04em] text-white/50 hover:text-white">
          Back to store
        </Link>
      </div>
    </main>
  );
}
