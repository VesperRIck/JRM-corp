"use client";

import { motion } from "motion/react";

import { getIcon } from "@/lib/icon-map";
import { cn } from "@/lib/utils";

/* =====================================================================
   ServiceIcon · Icono "3D" animado para los servicios.
   Flota de forma continua y se inclina en perspectiva al pasar el cursor.
   ===================================================================== */

interface ServiceIconProps {
  icon: string;
  accent: string;
  className?: string;
  /** Tamaño del icono */
  size?: "md" | "lg";
}

export function ServiceIcon({
  icon,
  accent,
  className,
  size = "md",
}: ServiceIconProps) {
  const Icon = getIcon(icon);
  const box = size === "lg" ? "size-20" : "size-16";
  const glyph = size === "lg" ? "size-9" : "size-7";

  return (
    <div className={cn("[perspective:700px]", className)}>
      <motion.div
        className={cn(
          "relative grid place-items-center rounded-2xl text-white",
          box,
        )}
        style={{
          background: `linear-gradient(135deg, ${accent}, ${accent}bb)`,
          boxShadow: `0 14px 32px -10px ${accent}90`,
          transformStyle: "preserve-3d",
        }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ rotateX: -18, rotateY: 20, scale: 1.08 }}
      >
        {/* Brillo superior para dar volumen */}
        <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/45 to-transparent" />
        {/* Cara frontal del icono, ligeramente elevada en 3D */}
        <Icon
          className={cn("relative", glyph)}
          style={{ transform: "translateZ(14px)" }}
        />
      </motion.div>
    </div>
  );
}
