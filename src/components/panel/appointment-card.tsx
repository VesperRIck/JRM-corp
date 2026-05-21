"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CalendarDays, Clock, FileText, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { formatLongDate, parseISODate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Appointment, AppointmentStatus } from "@/types";

/* =====================================================================
   AppointmentCard · Muestra una cita y permite cancelarla.
   ===================================================================== */

const statusConfig: Record<
  AppointmentStatus,
  { label: string; className: string }
> = {
  pending: { label: "Pendiente", className: "bg-amber-100 text-amber-700" },
  confirmed: { label: "Confirmada", className: "bg-primary/10 text-primary" },
  completed: {
    label: "Completada",
    className: "bg-secondary text-secondary-foreground",
  },
  cancelled: {
    label: "Cancelada",
    className: "bg-destructive/10 text-destructive",
  },
};

export function AppointmentCard({ appointment }: { appointment: Appointment }) {
  const router = useRouter();
  const [cancelling, setCancelling] = useState(false);

  const status = statusConfig[appointment.status];

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isFuture = parseISODate(appointment.appointment_date) >= today;
  const canCancel =
    isFuture &&
    (appointment.status === "confirmed" || appointment.status === "pending");

  async function handleCancel() {
    setCancelling(true);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("appointments")
        .update({ status: "cancelled" })
        .eq("id", appointment.id);
      if (error) {
        toast.error("No se pudo cancelar la cita", {
          description: error.message,
        });
        setCancelling(false);
        return;
      }
      toast.success("Cita cancelada");
      router.refresh();
    } catch {
      toast.error("Supabase no está configurado");
      setCancelling(false);
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display font-bold text-foreground">
          {appointment.service_title}
        </h3>
        <span
          className={cn(
            "shrink-0 rounded-full px-3 py-1 text-xs font-medium",
            status.className,
          )}
        >
          {status.label}
        </span>
      </div>

      <div className="mt-3 space-y-1.5 text-sm text-muted-foreground">
        <p className="flex items-center gap-2 capitalize">
          <CalendarDays className="size-4 shrink-0 text-brand-deep" />
          {formatLongDate(appointment.appointment_date)}
        </p>
        <p className="flex items-center gap-2">
          <Clock className="size-4 shrink-0 text-brand-deep" />
          {appointment.appointment_time}
        </p>
        {appointment.notes && (
          <p className="flex items-start gap-2">
            <FileText className="mt-0.5 size-4 shrink-0 text-brand-deep" />
            <span>{appointment.notes}</span>
          </p>
        )}
      </div>

      {canCancel && (
        <Button
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={handleCancel}
          disabled={cancelling}
        >
          <X className="size-4" />
          {cancelling ? "Cancelando..." : "Cancelar cita"}
        </Button>
      )}
    </div>
  );
}
