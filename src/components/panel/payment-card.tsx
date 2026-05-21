import Link from "next/link";
import { FileText } from "lucide-react";

import { formatCurrency, formatShortDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Payment, PaymentStatus } from "@/types";

/* =====================================================================
   PaymentCard · Fila del historial de pagos.
   ===================================================================== */

const statusConfig: Record<
  PaymentStatus,
  { label: string; className: string }
> = {
  paid: { label: "Pagado", className: "bg-primary/10 text-primary" },
  pending: { label: "Pendiente", className: "bg-amber-100 text-amber-700" },
  failed: {
    label: "Fallido",
    className: "bg-destructive/10 text-destructive",
  },
  refunded: {
    label: "Reembolsado",
    className: "bg-secondary text-secondary-foreground",
  },
};

export function PaymentCard({ payment }: { payment: Payment }) {
  const status = statusConfig[payment.status];

  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="truncate font-display font-bold text-foreground">
            {payment.service_title}
          </h3>
          <span
            className={cn(
              "shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium",
              status.className,
            )}
          >
            {status.label}
          </span>
        </div>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {formatShortDate(payment.created_at)}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <span className="font-display text-lg font-bold text-foreground">
          {formatCurrency(payment.amount, payment.currency)}
        </span>
        <Link
          href={`/panel/pagos/${payment.id}`}
          aria-label="Ver factura"
          className="grid size-9 place-items-center rounded-lg bg-secondary text-brand-deep transition-colors hover:bg-brand hover:text-white"
        >
          <FileText className="size-4" />
        </Link>
      </div>
    </div>
  );
}
