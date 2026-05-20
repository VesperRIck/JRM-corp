import Link from "next/link";

import { cn } from "@/lib/utils";

/* =====================================================================
   Logo · Monograma + nombre de JRM Corp.
   - `tone="light"`  → texto blanco (para fondos oscuros)
   - `href={null}`   → renderiza sin enlace
   ===================================================================== */

interface LogoProps {
  className?: string;
  showText?: boolean;
  href?: string | null;
  tone?: "light" | "dark";
}

export function Logo({
  className,
  showText = true,
  href = "/",
  tone = "dark",
}: LogoProps) {
  const content = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-deep to-brand text-[10px] font-bold tracking-tight text-white shadow-md shadow-brand/30">
        JRM
      </span>
      {showText && (
        <span
          className={cn(
            "font-display text-lg font-bold tracking-tight",
            tone === "light" ? "text-white" : "text-foreground",
          )}
        >
          JRM Corp
        </span>
      )}
    </span>
  );

  if (href === null) return content;

  return (
    <Link href={href} aria-label="JRM Corp · Ir al inicio">
      {content}
    </Link>
  );
}
