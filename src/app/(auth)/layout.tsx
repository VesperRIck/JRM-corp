import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Logo } from "@/components/shared/logo";

/* =====================================================================
   Diseño del grupo (auth) · Pantallas de autenticación
   Fondo tecnológico oscuro, logo y tarjeta centrada.
   ===================================================================== */

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-brand-ink px-5 py-14">
      {/* Fondo tecnológico */}
      <div className="bg-grid absolute inset-0 opacity-25" aria-hidden />
      <div
        className="blur-orb absolute -left-24 top-8 size-72 rounded-full bg-brand"
        aria-hidden
      />
      <div
        className="blur-orb absolute -right-20 bottom-8 size-80 rounded-full bg-brand-deep"
        aria-hidden
      />

      {/* Volver al inicio */}
      <Link
        href="/"
        className="absolute left-5 top-5 inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-white"
      >
        <ArrowLeft className="size-4" />
        Volver al inicio
      </Link>

      {/* Tarjeta */}
      <div className="relative w-full max-w-md">
        <div className="mb-6 flex justify-center">
          <Logo tone="light" />
        </div>
        <div className="rounded-2xl border border-white/10 bg-card p-7 shadow-2xl shadow-black/30 sm:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
