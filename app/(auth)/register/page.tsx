import type { Metadata } from "next";
import { AuthAccountClient } from "@/components/auth/AuthAccountClient";
import { noIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = noIndexMetadata(
  "Register — OMG Retro",
  "Create your OMG Retro account.",
  "/register",
);

export default function RegisterPage() {
  return <AuthAccountClient initialTab="create-account" />;
}

export const dynamic = "force-dynamic";
