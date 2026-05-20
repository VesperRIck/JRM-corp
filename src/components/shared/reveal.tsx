"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

/* =====================================================================
   Reveal · Anima la entrada de su contenido al hacer scroll.
   Envuelve cualquier bloque para darle animación de aparición.
   ===================================================================== */

type Direction = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Retraso en segundos antes de animar */
  delay?: number;
  /** Dirección desde la que entra el contenido */
  direction?: Direction;
  /** Duración de la animación en segundos */
  duration?: number;
  /** Si true, anima solo una vez */
  once?: boolean;
}

const offsets: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: 28 },
  right: { x: -28 },
  none: {},
};

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.6,
  once = true,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offsets[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
