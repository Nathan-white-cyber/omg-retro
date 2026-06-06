import { Logo } from "@/components/layout/Logo";

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-bg-cream text-text-dark">
      <header className="border-b border-border-cream bg-white">
        <div className="mx-auto flex min-h-[72px] max-w-[1240px] items-center justify-between gap-5 px-7">
          <Logo className="[&_.text-text-primary]:text-text-dark" />
          <span className="inline-flex items-center gap-2 font-body text-[12.5px] font-extrabold uppercase tracking-[0.06em] text-text-dark-muted">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4 text-status-success"
              aria-hidden="true"
            >
              <rect x="4" y="11" width="16" height="9" rx="2" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" />
            </svg>
            Secure Checkout
          </span>
        </div>
      </header>
      <main id="main-content">{children}</main>
    </div>
  );
}
