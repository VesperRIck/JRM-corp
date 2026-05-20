"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { LogIn, Menu, X } from "lucide-react";

import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { mainNav } from "@/config/navigation";
import { cn } from "@/lib/utils";

/* =====================================================================
   Navbar · Barra de navegación fija.
   - Transparente sobre el Hero, se vuelve glassmorphism al hacer scroll.
   - Menú desplegable en móvil.
   ===================================================================== */

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloquea el scroll del cuerpo cuando el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid ? "glass shadow-sm shadow-brand/5" : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Logo tone={solid ? "dark" : "light"} />

        {/* Enlaces de escritorio */}
        <ul className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                  solid
                    ? "text-foreground/75 hover:bg-secondary hover:text-foreground"
                    : "text-white/85 hover:bg-white/10 hover:text-white",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Acción + botón de menú móvil */}
        <div className="flex items-center gap-2">
          <Button
            asChild
            size="sm"
            variant={solid ? "default" : "glass"}
            className="hidden sm:inline-flex"
          >
            <Link href="/login">
              <LogIn className="size-4" />
              Iniciar sesión
            </Link>
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            className={cn(
              "grid size-10 place-items-center rounded-lg transition-colors lg:hidden",
              solid
                ? "text-foreground hover:bg-secondary"
                : "text-white hover:bg-white/10",
            )}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 pb-5 pt-3">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-4 py-3 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="mt-1">
                <Button asChild className="w-full">
                  <Link href="/login" onClick={() => setOpen(false)}>
                    <LogIn className="size-4" />
                    Iniciar sesión
                  </Link>
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
