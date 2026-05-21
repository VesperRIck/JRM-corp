import type { Metadata } from "next";
import Link from "next/link";
import { CircleCheck, LayoutDashboard } from "lucide-react";

import { LogoutButton } from "@/components/auth/logout-button";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { getCurrentProfile, requireAuth } from "@/lib/auth/dal";

export const metadata: Metadata = { title: "Mi Panel" };

/* =====================================================================
   Panel del cliente (placeholder de la Fase 3)
   Ruta protegida: requiere sesión iniciada.
   El panel completo se construye en la Fase 4.
   ===================================================================== */

export default async function PanelPage() {
  await requireAuth();
  const profile = await getCurrentProfile();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-secondary/40 px-5 py-14">
      <div className="bg-grid absolute inset-0 opacity-40" aria-hidden />

      <div className="relative w-full max-w-lg">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>

        <div className="rounded-2xl border border-border bg-card p-8 shadow-xl">
          <div className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-brand-deep to-brand text-white">
            <LayoutDashboard className="size-6" />
          </div>

          <h1 className="mt-4 font-display text-2xl font-bold text-foreground">
            ¡Hola, {profile?.full_name || "cliente"}!
          </h1>
          <p className="mt-1 text-muted-foreground">
            Bienvenido a tu panel de JRM Corp.
          </p>

          {/* Datos del perfil */}
          <dl className="mt-6 space-y-2.5 rounded-xl bg-secondary/60 p-4 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Correo</dt>
              <dd className="truncate font-medium text-foreground">
                {profile?.email ?? "—"}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Celular</dt>
              <dd className="font-medium text-foreground">
                {profile?.phone ?? "—"}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Cédula</dt>
              <dd className="font-medium text-foreground">
                {profile?.cedula ?? "—"}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Rol</dt>
              <dd className="font-medium capitalize text-foreground">
                {profile?.role ?? "client"}
              </dd>
            </div>
          </dl>

          <div className="mt-5 flex items-center gap-2 rounded-xl border border-brand/20 bg-brand/5 p-3 text-sm text-brand-deep">
            <CircleCheck className="size-4 shrink-0" />
            Autenticación funcionando. El panel completo llega en la Fase 4.
          </div>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <Button asChild variant="outline" className="flex-1">
              <Link href="/">Ir al inicio</Link>
            </Button>
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
}
