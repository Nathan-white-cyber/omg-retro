"use client";

import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";

type AuthTab = "sign-in" | "create-account";

interface AuthAccountClientProps {
  initialTab?: AuthTab;
}

function setMockSession() {
  document.cookie = [
    "next-auth.session-token=mock-account-session",
    "path=/",
    "max-age=2592000",
    "SameSite=Lax",
  ].join("; ");
}

function passwordStrength(password: string) {
  const variety = [
    /[a-z]/.test(password),
    /[A-Z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length;

  if (password.length >= 10 && variety >= 3) {
    return { label: "Strong", color: "bg-status-success", width: "w-full", text: "text-status-success" };
  }

  if (password.length >= 7 && variety >= 2) {
    return { label: "Fair", color: "bg-[#E67E22]", width: "w-2/3", text: "text-[#E67E22]" };
  }

  return { label: "Weak", color: "bg-brand-red", width: "w-1/3", text: "text-brand-red" };
}

function GoogleIcon() {
  return (
    <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-[13px] font-extrabold text-[#4285F4]">
      G
    </span>
  );
}

function AppleIcon() {
  return <span className="text-xl leading-none">{"\uF8FF"}</span>;
}

function PasswordField({
  value,
  onChange,
  placeholder = "Password",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.08em] text-text-dark-muted">
        Password
      </span>
      <span className="flex h-12 items-center rounded-btn border border-border-cream bg-white px-3 focus-within:border-brand-red focus-within:ring-2 focus-within:ring-brand-red/20">
        <input
          required
          type={showPassword ? "text" : "password"}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className="min-w-0 flex-1 bg-transparent text-sm text-text-dark outline-none placeholder:text-text-dark-muted/60"
        />
        <button
          type="button"
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="grid h-9 w-9 place-items-center rounded-btn text-text-dark-muted transition hover:bg-black/[0.05] hover:text-brand-red"
          onClick={() => setShowPassword((visible) => !visible)}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </span>
    </label>
  );
}

export function AuthAccountClient({ initialTab = "sign-in" }: AuthAccountClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AuthTab>(initialTab);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const strength = useMemo(() => passwordStrength(registerPassword), [registerPassword]);

  const completeMockAuth = () => {
    setMockSession();
    router.push("/account");
    router.refresh();
  };

  const signIn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!loginEmail || !loginPassword) return;
    completeMockAuth();
  };

  const createAccount = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!firstName || !lastName || !registerEmail || !registerPassword) return;
    completeMockAuth();
  };

  return (
    <div>
      <div className="mb-7 grid grid-cols-2 border-b border-border-cream">
        {[
          ["sign-in", "Sign In"],
          ["create-account", "Create Account"],
        ].map(([tab, label]) => (
          <button
            key={tab}
            type="button"
            className={`py-3 text-center font-body text-sm font-extrabold uppercase tracking-[0.08em] transition ${
              activeTab === tab
                ? "border-b-2 border-brand-red text-brand-red"
                : "text-text-dark-muted hover:text-text-dark"
            }`}
            onClick={() => setActiveTab(tab as AuthTab)}
          >
            {label}
          </button>
        ))}
      </div>

      {activeTab === "sign-in" ? (
        <form onSubmit={signIn} className="space-y-5">
          <div>
            <h1 className="font-display text-display-sm uppercase leading-none text-text-dark">
              Sign In
            </h1>
            <p className="mt-2 text-sm text-text-dark-muted">
              Welcome back to your OMG Retro account.
            </p>
          </div>
          <label className="block">
            <span className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.08em] text-text-dark-muted">
              Email
            </span>
            <input
              required
              type="email"
              value={loginEmail}
              onChange={(event) => setLoginEmail(event.target.value)}
              className="h-12 w-full rounded-btn border border-border-cream bg-white px-3 text-sm text-text-dark outline-none transition focus:border-brand-red focus:ring-2 focus:ring-brand-red/20"
            />
          </label>
          <PasswordField value={loginPassword} onChange={setLoginPassword} />
          <div className="flex justify-end">
            <a href="#forgot-password" className="text-sm font-bold text-brand-red">
              Forgot password?
            </a>
          </div>
          <button className="h-12 w-full rounded-btn bg-brand-red font-body text-sm font-extrabold uppercase tracking-[0.08em] text-white transition hover:bg-brand-red-dark">
            Sign In
          </button>
          <div className="flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.08em] text-text-dark-muted">
            <span className="h-px flex-1 bg-border-cream" />
            or continue with
            <span className="h-px flex-1 bg-border-cream" />
          </div>
          <button type="button" className="flex h-12 w-full items-center justify-center gap-3 rounded-btn border border-border-cream bg-white text-sm font-extrabold text-text-dark transition hover:border-brand-red">
            <GoogleIcon />
            Continue with Google
          </button>
          <button type="button" className="flex h-12 w-full items-center justify-center gap-3 rounded-btn border border-border-cream bg-white text-sm font-extrabold text-text-dark transition hover:border-brand-red">
            <AppleIcon />
            Continue with Apple
          </button>
          <p className="text-center text-sm text-text-dark-muted">
            New to OMG Retro?{" "}
            <button type="button" className="font-bold text-brand-red" onClick={() => setActiveTab("create-account")}>
              Create an account
            </button>
          </p>
        </form>
      ) : (
        <form onSubmit={createAccount} className="space-y-5">
          <div>
            <h1 className="font-display text-display-sm uppercase leading-none text-text-dark">
              Create Account
            </h1>
            <p className="mt-2 text-sm text-text-dark-muted">
              Save favorites, track orders, and get deal alerts.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.08em] text-text-dark-muted">
                First name
              </span>
              <input required value={firstName} onChange={(event) => setFirstName(event.target.value)} className="h-12 w-full rounded-btn border border-border-cream bg-white px-3 text-sm text-text-dark outline-none transition focus:border-brand-red focus:ring-2 focus:ring-brand-red/20" />
            </label>
            <label className="block">
              <span className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.08em] text-text-dark-muted">
                Last name
              </span>
              <input required value={lastName} onChange={(event) => setLastName(event.target.value)} className="h-12 w-full rounded-btn border border-border-cream bg-white px-3 text-sm text-text-dark outline-none transition focus:border-brand-red focus:ring-2 focus:ring-brand-red/20" />
            </label>
          </div>
          <label className="block">
            <span className="mb-2 block text-[11px] font-extrabold uppercase tracking-[0.08em] text-text-dark-muted">
              Email
            </span>
            <input required type="email" value={registerEmail} onChange={(event) => setRegisterEmail(event.target.value)} className="h-12 w-full rounded-btn border border-border-cream bg-white px-3 text-sm text-text-dark outline-none transition focus:border-brand-red focus:ring-2 focus:ring-brand-red/20" />
          </label>
          <PasswordField value={registerPassword} onChange={setRegisterPassword} />
          <div>
            <div className="h-2 rounded-full bg-black/[0.08]">
              <div className={`h-full rounded-full ${strength.color} ${strength.width}`} />
            </div>
            <p className={`mt-2 text-[12px] font-extrabold uppercase tracking-[0.08em] ${strength.text}`}>
              {strength.label}
            </p>
          </div>
          <label className="flex items-center gap-3 text-sm text-text-dark-muted">
            <input type="checkbox" className="rounded border-border-cream text-brand-red" />
            Email me about deals and new arrivals
          </label>
          <button className="h-12 w-full rounded-btn bg-brand-red font-body text-sm font-extrabold uppercase tracking-[0.08em] text-white transition hover:bg-brand-red-dark">
            Create Account
          </button>
          <p className="text-center text-sm text-text-dark-muted">
            Already have an account?{" "}
            <button type="button" className="font-bold text-brand-red" onClick={() => setActiveTab("sign-in")}>
              Sign in
            </button>
          </p>
        </form>
      )}
    </div>
  );
}

