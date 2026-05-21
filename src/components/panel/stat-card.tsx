import type { ReactNode } from "react";

/* =====================================================================
   StatCard · Tarjeta de indicador para el panel.
   ===================================================================== */

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  hint?: string;
}

export function StatCard({ icon, label, value, hint }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-4">
        <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-deep to-brand text-white">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="font-display text-2xl font-bold leading-none text-foreground">
            {value}
          </p>
          <p className="mt-1.5 text-sm text-muted-foreground">{label}</p>
        </div>
      </div>
      {hint && <p className="mt-3 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
