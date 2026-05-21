import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/* =====================================================================
   EmptyState · Estado vacío reutilizable (listados sin contenido).
   ===================================================================== */

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/60 px-6 py-16 text-center",
        className,
      )}
    >
      <div className="grid size-14 place-items-center rounded-2xl bg-secondary text-brand-deep">
        {icon}
      </div>
      <h3 className="mt-4 font-display text-lg font-bold text-foreground">
        {title}
      </h3>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
