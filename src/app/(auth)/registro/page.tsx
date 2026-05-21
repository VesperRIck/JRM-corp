import type { Metadata } from "next";
import Link from "next/link";

import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = { title: "Crear cuenta" };

export default function RegisterPage() {
  return (
    <>
      <div className="text-center">
        <h1 className="font-display text-2xl font-bold text-foreground">
          Crear cuenta
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Únete a JRM Corp y gestiona tus servicios
        </p>
      </div>

      <div className="mt-6">
        <RegisterForm />
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        ¿Ya tienes cuenta?{" "}
        <Link
          href="/login"
          className="font-semibold text-brand-deep hover:underline"
        >
          Inicia sesión
        </Link>
      </p>
    </>
  );
}
