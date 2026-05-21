"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Ban, IdCard, Mail, Phone, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import type { Profile } from "@/types";

/* =====================================================================
   UserCard · Tarjeta de usuario para el admin (con bloqueo).
   ===================================================================== */

function getInitials(name: string): string {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "U"
  );
}

export function UserCard({ profile }: { profile: Profile }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isAdmin = profile.role === "admin";

  async function toggleBlock() {
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("profiles")
        .update({ is_blocked: !profile.is_blocked })
        .eq("id", profile.id);
      if (error) {
        toast.error("No se pudo actualizar el usuario", {
          description: error.message,
        });
        setLoading(false);
        return;
      }
      toast.success(
        profile.is_blocked ? "Usuario desbloqueado" : "Usuario bloqueado",
      );
      router.refresh();
    } catch {
      toast.error("Supabase no está configurado");
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-start gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-deep to-brand text-sm font-bold text-white">
          {getInitials(profile.full_name)}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate font-display font-bold text-foreground">
              {profile.full_name || "Sin nombre"}
            </h3>
            <span
              className={cn(
                "rounded-full px-2.5 py-0.5 text-xs font-medium",
                isAdmin
                  ? "bg-brand/15 text-brand-deep"
                  : "bg-secondary text-secondary-foreground",
              )}
            >
              {isAdmin ? "Administrador" : "Cliente"}
            </span>
            {profile.is_blocked && (
              <span className="rounded-full bg-destructive/10 px-2.5 py-0.5 text-xs font-medium text-destructive">
                Bloqueado
              </span>
            )}
          </div>
        </div>
      </div>

      <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
        <li className="flex items-center gap-2">
          <Mail className="size-4 shrink-0 text-brand-deep" />
          <span className="truncate">{profile.email ?? "—"}</span>
        </li>
        <li className="flex items-center gap-2">
          <Phone className="size-4 shrink-0 text-brand-deep" />
          {profile.phone ?? "—"}
        </li>
        <li className="flex items-center gap-2">
          <IdCard className="size-4 shrink-0 text-brand-deep" />
          {profile.cedula ?? "—"}
        </li>
      </ul>

      {!isAdmin && (
        <Button
          variant="outline"
          size="sm"
          className="mt-4 w-full"
          onClick={toggleBlock}
          disabled={loading}
        >
          {profile.is_blocked ? (
            <ShieldCheck className="size-4" />
          ) : (
            <Ban className="size-4" />
          )}
          {loading
            ? "Procesando..."
            : profile.is_blocked
              ? "Desbloquear usuario"
              : "Bloquear usuario"}
        </Button>
      )}
    </div>
  );
}
