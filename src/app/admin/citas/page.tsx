import type { Metadata } from "next";
import { CalendarCheck, CalendarDays, Clock, UserRound } from "lucide-react";

import { AppointmentStatusSelect } from "@/components/admin/appointment-status-select";
import { EmptyState } from "@/components/shared/empty-state";
import { formatLongDate } from "@/lib/format";
import { getAllAppointments, getAllProfiles } from "@/lib/services/admin";

export const metadata: Metadata = { title: "Citas" };

export default async function AdminCitasPage() {
  const [appointments, profiles] = await Promise.all([
    getAllAppointments(),
    getAllProfiles(),
  ]);
  const profileMap = new Map(profiles.map((p) => [p.id, p]));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
          Citas
        </h1>
        <p className="mt-1 text-muted-foreground">
          {appointments.length} cita{appointments.length === 1 ? "" : "s"} en
          total.
        </p>
      </div>

      {appointments.length === 0 ? (
        <EmptyState
          icon={<CalendarCheck className="size-7" />}
          title="Aún no hay citas agendadas"
          description="Las citas que reserven los clientes aparecerán aquí."
        />
      ) : (
        <div className="space-y-3">
          {appointments.map((appointment) => {
            const client = profileMap.get(appointment.user_id);
            return (
              <div
                key={appointment.id}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <h3 className="font-display font-bold text-foreground">
                    {appointment.service_title}
                  </h3>
                  <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <UserRound className="size-4 text-brand-deep" />
                      {client?.full_name ?? "Cliente"}
                    </span>
                    <span className="flex items-center gap-1.5 capitalize">
                      <CalendarDays className="size-4 text-brand-deep" />
                      {formatLongDate(appointment.appointment_date)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="size-4 text-brand-deep" />
                      {appointment.appointment_time}
                    </span>
                  </div>
                </div>
                <AppointmentStatusSelect
                  id={appointment.id}
                  status={appointment.status}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
