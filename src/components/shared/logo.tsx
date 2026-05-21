import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

/* =====================================================================
   Logo · Logo de JRM Corp (solo el imagotipo, sin texto).
   El PNG tiene fondo transparente.
   - `tone="light"` → fondos OSCUROS: el logo se invierte a blanco.
   - `tone="dark"`  → fondos CLAROS: el logo se muestra normal.
   - `href={null}`  → renderiza sin enlace.
   ===================================================================== */

interface LogoProps {
  className?: string;
  href?: string | null;
  tone?: "light" | "dark";
}

export function Logo({ className, href = "/", tone = "dark" }: LogoProps) {
  const image = (
    <Image
      src="/jrm-logo.png"
      alt="JRM Corp"
      width={44}
      height={44}
      className={cn(
        "size-11 object-contain",
        tone === "light" && "invert",
        className,
      )}
    />
  );

  if (href === null) return image;

  return (
    <Link
      href={href}
      aria-label="JRM Corp · Ir al inicio"
      className="inline-flex"
    >
      {image}
    </Link>
  );
}
