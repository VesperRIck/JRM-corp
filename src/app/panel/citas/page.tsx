import type { Metadata } from "next";
import Link from "next/link";
import { CalendarCheck } from "lucide-react";

import { AppointmentCard } from "@/components/panel/appointment-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { getMyAppointments } from "@/lib/services/appointments";

export const metadata: Metadata = { title: "Mis Citas" };

export default async function PanelCitasPage() {
  const appointments = await getMyAppointments();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
            Mis Citas
          </h1>
          <p className="mt-1 text-muted-foreground">
            Gestiona tus citas con el equipo de JRM Corp.
          </p>
        </div>
        {appointments.length > 0 && (
          <Button asChild variant="gradient">
            <Link href="/panel/citas/agendar">
              <CalendarCheck className="size-4" />
              Agendar cita
            </Link>
          </Button>
        )}
      </div>

      {appointments.length === 0 ? (
        <EmptyState
          icon={<CalendarCheck className="size-7" />}
          title="Aún no tienes citas agendadas"
          description="Reserva una cita con nuestro equipo y aparecerá aquí con su fecha y estado."
          action={
            <Button asChild variant="gradient">
              <Link href="/panel/citas/agendar">
                <CalendarCheck className="size-4" />
                Agendar una cita
              </Link>
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {appointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </div>
      )}
    </div>
  );
}
