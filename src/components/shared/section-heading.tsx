import { Reveal } from "@/components/shared/reveal";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/* =====================================================================
   SectionHeading · Encabezado reutilizable para las secciones.
   ===================================================================== */

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "dark",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      <Reveal>
        <Badge variant={tone === "light" ? "glass" : "brand"}>{eyebrow}</Badge>
      </Reveal>
      <Reveal delay={0.05}>
        <h2
          className={cn(
            "font-display text-3xl font-bold tracking-tight sm:text-4xl",
            tone === "light" ? "text-white" : "text-foreground",
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "max-w-2xl text-base leading-relaxed",
              tone === "light" ? "text-white/65" : "text-muted-foreground",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
