import Link from "next/link";

export default function LoginPage() {
  return (
    <div>
      <div className="mb-7 grid grid-cols-2 gap-1 rounded-btn bg-black/[0.06] p-1">
        <span className="rounded-[6px] bg-white py-3 text-center font-body text-sm font-extrabold uppercase tracking-[0.07em] text-brand-red shadow-sm">
          Login
        </span>
        <Link
          href="/register"
          className="rounded-[6px] py-3 text-center font-body text-sm font-extrabold uppercase tracking-[0.07em] text-text-dark-muted hover:text-text-dark"
        >
          Register
        </Link>
      </div>
      <h1 className="font-display text-display-sm uppercase text-text-dark">
        Welcome Back
      </h1>
      <p className="mt-2 text-body-md text-text-dark-muted">
        Customer login UI will be wired in Phase 11.
      </p>
    </div>
  );
}
