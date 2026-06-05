import { AuthAccountClient } from "@/components/auth/AuthAccountClient";

export default function LoginPage() {
  return <AuthAccountClient initialTab="sign-in" />;
}

export const dynamic = "force-dynamic";
