import { CalendarCheck, CreditCard, DollarSign, Users } from "lucide-react";

import { RevenueChart } from "@/components/admin/revenue-chart";
import { ServicesChart } from "@/components/admin/services-chart";
import { StatCard } from "@/components/panel/stat-card";
import { formatCurrency } from "@/lib/format";
import { getAdminStats } from "@/lib/services/admin";

/* =====================================================================
   Dashboard del Administrador
   ===================================================================== */

export default async function AdminDashboardPage() {
  const stats = await getAdminStats();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
          Dashboard
        </h1>
        <p className="mt-1 text-muted-foreground">
          Resumen general de la actividad de JRM Corp.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<Users className="size-6" />}
          label="Usuarios registrados"
          value={stats.totalUsers}
        />
        <StatCard
          icon={<CalendarCheck className="size-6" />}
          label="Citas totales"
          value={stats.totalAppointments}
        />
        <StatCard
          icon={<CreditCard className="size-6" />}
          label="Pagos realizados"
          value={stats.totalPayments}
        />
        <StatCard
          icon={<DollarSign className="size-6" />}
          label="Ingresos totales"
          value={formatCurrency(stats.totalRevenue)}
        />
      </div>

      {/* Gráficas */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-lg font-bold text-foreground">
            Ingresos
          </h2>
          <p className="text-sm text-muted-foreground">Últimos 6 meses</p>
          <div className="mt-4">
            <RevenueChart data={stats.revenueByMonth} />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-lg font-bold text-foreground">
            Servicios más vendidos
          </h2>
          <p className="text-sm text-muted-foreground">Por número de pagos</p>
          <div className="mt-4">
            {stats.servicePopularity.length > 0 ? (
              <ServicesChart data={stats.servicePopularity} />
            ) : (
              <div className="flex h-[260px] items-center justify-center text-sm text-muted-foreground">
                Aún no hay pagos registrados.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
