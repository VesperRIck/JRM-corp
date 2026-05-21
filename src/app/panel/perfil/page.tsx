import type { Metadata } from "next";
import { CircleAlert } from "lucide-react";

import { ProfileForm } from "@/components/panel/profile-form";
import { getCurrentProfile } from "@/lib/auth/dal";

export const metadata: Metadata = { title: "Mi Perfil" };

export default async function PerfilPage() {
  const profile = await getCurrentProfile();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
          Mi Perfil
        </h1>
        <p className="mt-1 text-muted-foreground">
          Actualiza tu información personal.
        </p>
      </div>

      {profile ? (
        <div className="max-w-2xl rounded-2xl border border-border bg-card p-6 sm:p-8">
          <ProfileForm profile={profile} />
        </div>
      ) : (
        <div className="flex items-start gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 p-5 text-sm text-destructive">
          <CircleAlert className="mt-0.5 size-5 shrink-0" />
          <p>
            No se pudo cargar tu perfil. Verifica que la base de datos de
            Supabase esté configurada (esquema <code>schema.sql</code>).
          </p>
        </div>
      )}
    </div>
  );
}
