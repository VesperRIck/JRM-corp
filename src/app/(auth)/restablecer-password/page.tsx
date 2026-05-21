import type { Metadata } from "next";

import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const metadata: Metadata = { title: "Nueva contraseña" };

export default function ResetPasswordPage() {
  return (
    <>
      <div className="text-center">
        <h1 className="font-display text-2xl font-bold text-foreground">
          Nueva contraseña
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Define una nueva contraseña para tu cuenta
        </p>
      </div>

      <div className="mt-6">
        <ResetPasswordForm />
      </div>
    </>
  );
}
