import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  CalendarCheck,
  CreditCard,
  ShieldCheck,
  User,
} from "lucide-react";

import { StatCard } from "@/components/panel/stat-card";
import { getCurrentProfile } from "@/lib/auth/dal";
import { getActiveServices } from "@/lib/services/services-data";
import { getMyAppointments } from "@/lib/services/appointments";
import { getMyPayments } from "@/lib/services/payments";

/* =====================================================================
   Panel de Cliente · Inicio (dashboard)
   ===================================================================== */

const quickActions = [
  {
    label: "Editar mi perfil",
    description: "Actualiza tus datos personales",
    href: "/panel/perfil",
    icon: User,
  },
  {
    label: "Ver servicios",
    description: "Explora todo lo que ofrecemos",
    href: "/panel/servicios",
    icon: Briefcase,
  },
  {
    label: "Agendar una cita",
    description: "Reserva con nuestro equipo",
    href: "/panel/citas",
    icon: CalendarCheck,
  },
];

export default async function PanelHomePage() {
  const profile = await getCurrentProfile();
  const appointments = await getMyAppointments();
  const activeAppointments = appointments.filter(
    (a) => a.status !== "cancelled",
  ).length;
  const payments = await getMyPayments();
  const services = await getActiveServices();
  const firstName = (profile?.full_name || "Cliente").split(" ")[0];

  return (
    <div className="space-y-8">
      {/* Encabezado */}
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
          ¡Hola, {firstName}!
        </h1>
        <p className="mt-1 text-muted-foreground">
          Bienvenido a tu panel de JRM Corp.
        </p>
      </div>

      {/* Acceso al panel de administración (solo administradores) */}
      {profile?.role === "admin" && (
        <Link
          href="/admin"
          className="group flex items-center gap-3 rounded-2xl border border-brand/30 bg-brand/5 p-4 transition-colors hover:bg-brand/10"
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-deep to-brand text-white">
            <ShieldCheck className="size-5" />
          </span>
          <span className="flex-1">
            <span className="block font-semibold text-foreground">
              Tienes acceso de administrador
            </span>
            <span className="block text-sm text-muted-foreground">
              Entra al panel de administración de JRM Corp.
            </span>
          </span>
          <ArrowRight className="size-5 shrink-0 text-brand-deep transition-transform group-hover:translate-x-1" />
        </Link>
      )}

      {/* Indicadores */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={<CalendarCheck className="size-6" />}
          label="Mis citas"
          value={activeAppointments}
        />
        <StatCard
          icon={<CreditCard className="size-6" />}
          label="Pagos realizados"
          value={payments.length}
        />
        <StatCard
          icon={<Briefcase className="size-6" />}
          label="Servicios disponibles"
          value={services.length}
        />
      </div>

      {/* Accesos rápidos */}
      <div>
        <h2 className="font-display text-lg font-bold text-foreground">
          Accesos rápidos
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.href}
                href={action.href}
                className="group rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg hover:shadow-brand/10"
              >
                <div className="grid size-11 place-items-center rounded-xl bg-secondary text-brand-deep transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-3 font-semibold text-foreground">
                  {action.label}
                </h3>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {action.description}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-deep">
                  Ir
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
