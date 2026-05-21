"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Pencil, Trash2 } from "lucide-react";

import { ServiceIcon } from "@/components/shared/service-icon";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { createClient } from "@/lib/supabase/client";
import type { Service } from "@/types";

/* =====================================================================
   ServiceAdminRow · Fila de servicio en el listado del admin.
   ===================================================================== */

export function ServiceAdminRow({ service }: { service: Service }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function toggleActive() {
    setBusy(true);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("services")
        .update({ is_active: !service.isActive })
        .eq("id", service.id);
      if (error) {
        toast.error("No se pudo actualizar", { description: error.message });
      } else {
        toast.success(
          service.isActive ? "Servicio suspendido" : "Servicio activado",
        );
        router.refresh();
      }
    } catch {
      toast.error("Supabase no está configurado");
    }
    setBusy(false);
  }

  async function remove() {
    if (
      !window.confirm(
        `¿Eliminar el servicio "${service.title}"? Esta acción no se puede deshacer.`,
      )
    ) {
      return;
    }
    setBusy(true);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("services")
        .delete()
        .eq("id", service.id);
      if (error) {
        toast.error("No se pudo eliminar", { description: error.message });
      } else {
        toast.success("Servicio eliminado");
        router.refresh();
      }
    } catch {
      toast.error("Supabase no está configurado");
    }
    setBusy(false);
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center">
      <ServiceIcon icon={service.icon} accent={service.accent} />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-display font-bold text-foreground">
            {service.title}
          </h3>
          {!service.isActive && (
            <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700">
              Suspendido
            </span>
          )}
        </div>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {formatPrice(service.price)} · /{service.slug}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleActive}
          disabled={busy}
        >
          {service.isActive ? "Suspender" : "Activar"}
        </Button>
        <Button asChild variant="secondary" size="icon" className="size-9">
          <Link href={`/admin/servicios/${service.id}`} aria-label="Editar">
            <Pencil className="size-4" />
          </Link>
        </Button>
        <button
          type="button"
          onClick={remove}
          disabled={busy}
          aria-label="Eliminar"
          className="grid size-9 shrink-0 place-items-center rounded-lg bg-destructive/10 text-destructive transition-colors hover:bg-destructive hover:text-destructive-foreground disabled:opacity-50"
        >
          <Trash2 className="size-4" />
        </button>
      </div>
    </div>
  );
}
