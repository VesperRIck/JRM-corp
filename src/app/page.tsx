import Link from "next/link";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/* Hoja de ruta de construcción por fases (placeholder de la Fase 1) */
const roadmap = [
  { phase: "Fase 1", label: "Cimientos del proyecto", done: true },
  { phase: "Fase 2", label: "Landing page completa", done: false },
  { phase: "Fase 3", label: "Backend y autenticación", done: false },
  { phase: "Fase 4", label: "Panel de cliente", done: false },
  { phase: "Fase 5", label: "Sistema de citas", done: false },
  { phase: "Fase 6", label: "Pagos con Stripe", done: false },
  { phase: "Fase 7", label: "Panel administrador", done: false },
  { phase: "Fase 8", label: "Despliegue en Vercel", done: false },
];

export default function HomePage() {
  return (
    <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-20">
      {/* Fondo: rejilla tecnológica */}
      <div className="bg-grid absolute inset-0 -z-20" aria-hidden />
      {/* Desvanecimiento del fondo hacia abajo */}
      <div
        className="absolute inset-0 -z-20 bg-gradient-to-b from-background/30 via-background/70 to-background"
        aria-hidden
      />
      {/* Orbes difusos azul pastel */}
      <div
        className="blur-orb absolute -left-24 top-4 -z-10 size-72 rounded-full bg-brand"
        aria-hidden
      />
      <div
        className="blur-orb absolute -right-20 bottom-4 -z-10 size-80 rounded-full bg-brand-light"
        aria-hidden
      />

      <div className="flex w-full max-w-3xl flex-col items-center text-center">
        {/* Distintivo de estado */}
        <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-brand-deep">
          <Sparkles className="size-3.5" />
          Fase 1 · Cimientos del proyecto completados
        </span>

        {/* Marca */}
        <h1 className="mt-6 font-display text-6xl font-bold tracking-tight sm:text-7xl">
          <span className="text-gradient">JRM Corp</span>
        </h1>

        {/* Eslogan */}
        <p className="mt-5 max-w-xl text-lg text-muted-foreground">
          {siteConfig.slogan}
        </p>

        {/* Llamados a la acción */}
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="gradient" size="lg">
            <Link href="/#servicios">
              Nuestros Servicios
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="glass" size="lg">
            <Link href="/#contacto">
              <MessageCircle className="size-4" />
              Contáctanos
            </Link>
          </Button>
        </div>

        {/* Hoja de ruta */}
        <div className="glass mt-14 w-full rounded-2xl p-6 text-left">
          <p className="text-sm font-semibold text-foreground">
            Hoja de ruta de construcción
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Plataforma corporativa premium · Next.js 16 + Supabase
          </p>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {roadmap.map((item) => (
              <li key={item.phase} className="flex items-center gap-2.5 text-sm">
                <span
                  className={cn(
                    "flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
                    item.done
                      ? "bg-primary text-primary-foreground"
                      : "border border-border text-muted-foreground",
                  )}
                >
                  {item.done ? "✓" : ""}
                </span>
                <span
                  className={item.done ? "text-foreground" : "text-muted-foreground"}
                >
                  <span className="font-medium">{item.phase}:</span> {item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
