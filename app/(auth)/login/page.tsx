import type { Metadata } from "next";
import { AuthAccountClient } from "@/components/auth/AuthAccountClient";
import { noIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = noIndexMetadata(
  "Login — OMG Retro",
  "Sign in to your OMG Retro account.",
  "/login",
);

export default function LoginPage() {
  return <AuthAccountClient initialTab="sign-in" />;
}

export const dynamic = "force-dynamic";
