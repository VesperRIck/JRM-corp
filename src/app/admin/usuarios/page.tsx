import type { Metadata } from "next";
import { Users } from "lucide-react";

import { UserCard } from "@/components/admin/user-card";
import { EmptyState } from "@/components/shared/empty-state";
import { getAllProfiles } from "@/lib/services/admin";

export const metadata: Metadata = { title: "Usuarios" };

export default async function AdminUsuariosPage() {
  const profiles = await getAllProfiles();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
          Usuarios
        </h1>
        <p className="mt-1 text-muted-foreground">
          {profiles.length} usuario{profiles.length === 1 ? "" : "s"} registrado
          {profiles.length === 1 ? "" : "s"}.
        </p>
      </div>

      {profiles.length === 0 ? (
        <EmptyState
          icon={<Users className="size-7" />}
          title="Aún no hay usuarios registrados"
          description="Los usuarios que se registren en la plataforma aparecerán aquí."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {profiles.map((profile) => (
            <UserCard key={profile.id} profile={profile} />
          ))}
        </div>
      )}
    </div>
  );
}
