import { AuthAccountClient } from "@/components/auth/AuthAccountClient";

export default function RegisterPage() {
  return <AuthAccountClient initialTab="create-account" />;
}

export const dynamic = "force-dynamic";
