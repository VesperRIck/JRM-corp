import type { Metadata } from "next";
import Link from "next/link";

import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export const metadata: Metadata = { title: "Recuperar contraseña" };

export default function ForgotPasswordPage() {
  return (
    <>
      <div className="text-center">
        <h1 className="font-display text-2xl font-bold text-foreground">
          Recuperar contraseña
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Te enviaremos un enlace para restablecerla
        </p>
      </div>

      <div className="mt-6">
        <ForgotPasswordForm />
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        ¿La recordaste?{" "}
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
