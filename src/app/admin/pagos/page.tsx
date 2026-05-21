import type { Metadata } from "next";
import { CreditCard, DollarSign, UserRound } from "lucide-react";

import { StatCard } from "@/components/panel/stat-card";
import { EmptyState } from "@/components/shared/empty-state";
import { formatCurrency, formatShortDate } from "@/lib/format";
import { getAllPayments, getAllProfiles } from "@/lib/services/admin";

export const metadata: Metadata = { title: "Pagos" };

export default async function AdminPagosPage() {
  const [payments, profiles] = await Promise.all([
    getAllPayments(),
    getAllProfiles(),
  ]);
  const profileMap = new Map(profiles.map((p) => [p.id, p]));
  const paid = payments.filter((p) => p.status === "paid");
  const totalRevenue = paid.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
          Pagos e ingresos
        </h1>
        <p className="mt-1 text-muted-foreground">
          Historial de todos los pagos de la plataforma.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard
          icon={<DollarSign className="size-6" />}
          label="Ingresos totales"
          value={formatCurrency(totalRevenue)}
        />
        <StatCard
          icon={<CreditCard className="size-6" />}
          label="Pagos realizados"
          value={paid.length}
        />
      </div>

      {payments.length === 0 ? (
        <EmptyState
          icon={<CreditCard className="size-7" />}
          title="Aún no hay pagos registrados"
          description="Los pagos que realicen los clientes aparecerán aquí."
        />
      ) : (
        <div className="space-y-3">
          {payments.map((payment) => {
            const client = profileMap.get(payment.user_id);
            return (
              <div
                key={payment.id}
                className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5"
              >
                <div className="min-w-0">
                  <h3 className="truncate font-display font-bold text-foreground">
                    {payment.service_title}
                  </h3>
                  <div className="mt-1 flex flex-wrap gap-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <UserRound className="size-4 text-brand-deep" />
                      {client?.full_name ?? "Cliente"}
                    </span>
                    <span>{formatShortDate(payment.created_at)}</span>
                  </div>
                </div>
                <span className="shrink-0 font-display text-lg font-bold text-foreground">
                  {formatCurrency(payment.amount, payment.currency)}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
