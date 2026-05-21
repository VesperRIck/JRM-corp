"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { createClient } from "@/lib/supabase/client";
import type { AppointmentStatus } from "@/types";

/* =====================================================================
   AppointmentStatusSelect · Permite al admin cambiar el estado de una cita.
   ===================================================================== */

const options: { value: AppointmentStatus; label: string }[] = [
  { value: "pending", label: "Pendiente" },
  { value: "confirmed", label: "Confirmada" },
  { value: "completed", label: "Completada" },
  { value: "cancelled", label: "Cancelada" },
];

export function AppointmentStatusSelect({
  id,
  status,
}: {
  id: string;
  status: AppointmentStatus;
}) {
  const router = useRouter();
  const [value, setValue] = useState<AppointmentStatus>(status);
  const [loading, setLoading] = useState(false);

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value as AppointmentStatus;
    const previous = value;
    setValue(next);
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("appointments")
        .update({ status: next })
        .eq("id", id);
      if (error) {
        toast.error("No se pudo actualizar la cita", {
          description: error.message,
        });
        setValue(previous);
      } else {
        toast.success("Estado de la cita actualizado");
        router.refresh();
      }
    } catch {
      toast.error("Supabase no está configurado");
      setValue(previous);
    }
    setLoading(false);
  }

  return (
    <select
      value={value}
      onChange={handleChange}
      disabled={loading}
      className="shrink-0 rounded-lg border border-input bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/35 disabled:opacity-50"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
