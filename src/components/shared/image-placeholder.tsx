import type { ReactNode } from "react";
import { ImageIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/* =====================================================================
   ImagePlaceholder · Marcador de imagen elegante.
   Sustituye fotos reales mientras no estén disponibles.
   Para usar imágenes reales, colócalas en /public y reemplázalo
   por el componente <Image> de next/image.
   ===================================================================== */

interface ImagePlaceholderProps {
  label?: string;
  className?: string;
  icon?: ReactNode;
}

export function ImagePlaceholder({
  label = "Imagen",
  className,
  icon,
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center gap-2.5 overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-secondary to-accent text-brand",
        className,
      )}
    >
      <div className="bg-grid absolute inset-0 opacity-40" aria-hidden />
      <div className="glass relative grid size-12 place-items-center rounded-xl">
        {icon ?? <ImageIcon className="size-5" />}
      </div>
      <span className="relative px-3 text-center text-xs font-medium">
        {label}
      </span>
    </div>
  );
}
