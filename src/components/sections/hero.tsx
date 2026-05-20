"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  ChevronDown,
  MessageCircle,
  Moon,
  Sun,
  Sunrise,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { useGreeting } from "@/hooks/use-greeting";

/* =====================================================================
   Hero · Sección principal con fondo tecnológico animado.
   ===================================================================== */

/* Partículas decorativas (posiciones fijas para evitar desajustes SSR) */
const particles = [
  { left: "12%", top: "24%", size: 6, delay: 0 },
  { left: "82%", top: "30%", size: 8, delay: 1.2 },
  { left: "70%", top: "66%", size: 5, delay: 0.6 },
  { left: "26%", top: "70%", size: 7, delay: 1.8 },
  { left: "90%", top: "50%", size: 4, delay: 0.9 },
  { left: "44%", top: "18%", size: 5, delay: 1.5 },
];

const periodIcon = { morning: Sunrise, afternoon: Sun, evening: Moon } as const;

export function Hero() {
  const greeting = useGreeting();
  const GreetIcon = greeting ? periodIcon[greeting.period] : Sun;

  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center overflow-hidden bg-brand-ink text-white"
    >
      {/* Rejilla tecnológica */}
      <div className="bg-grid absolute inset-0 opacity-25" aria-hidden />
      {/* Halo radial superior */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(143,180,227,0.20),transparent)]"
        aria-hidden
      />

      {/* Orbes difusos animados */}
      <motion.div
        className="blur-orb absolute -left-20 top-24 size-80 rounded-full bg-brand"
        animate={{ y: [0, 30, 0], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        className="blur-orb absolute -right-16 bottom-24 size-96 rounded-full bg-brand-deep"
        animate={{ y: [0, -36, 0], opacity: [0.5, 0.3, 0.5] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      {/* Partículas flotantes */}
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-brand-light/70"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
          animate={{ y: [0, -22, 0], opacity: [0.2, 0.9, 0.2] }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
          aria-hidden
        />
      ))}

      {/* Transición suave hacia el fondo claro */}
      <div
        className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-background to-transparent"
        aria-hidden
      />

      {/* Contenido */}
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-28 pt-28 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-dark inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-white/80"
          >
            <GreetIcon className="size-3.5 text-brand-light" />
            {greeting
              ? `${greeting.text}, te damos la bienvenida`
              : "Te damos la bienvenida"}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl"
          >
            <span className="bg-gradient-to-r from-white via-white to-brand-light bg-clip-text text-transparent">
              JRM Corp
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-5 max-w-xl text-lg text-white/65 sm:text-xl"
          >
            {siteConfig.slogan}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button asChild variant="gradient" size="xl">
              <Link href="/#servicios">
                Nuestros Servicios
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="glass" size="xl">
              <Link href="/#contacto">
                <MessageCircle className="size-4" />
                Contáctanos
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Indicador de desplazamiento */}
      <motion.a
        href="#nosotros"
        aria-label="Desplázate hacia abajo"
        className="absolute bottom-7 left-1/2 -translate-x-1/2 text-foreground/35 transition-colors hover:text-foreground/70"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="size-6" />
      </motion.a>
    </section>
  );
}
