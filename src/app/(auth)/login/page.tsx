import type { Metadata } from "next";
import Link from "next/link";

import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = { title: "Iniciar sesión" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <>
      <div className="text-center">
        <h1 className="font-display text-2xl font-bold text-foreground">
          Iniciar sesión
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Accede a tu cuenta de JRM Corp
        </p>
      </div>

      <div className="mt-6">
        <LoginForm next={next} />
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        ¿No tienes cuenta?{" "}
        <Link
          href="/registro"
          className="font-semibold text-brand-deep hover:underline"
        >
          Regístrate
        </Link>
      </p>
    </>
  );
}
