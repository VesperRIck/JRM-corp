"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  Briefcase,
  CalendarCheck,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Menu,
  User,
  X,
} from "lucide-react";

import { Logo } from "@/components/shared/logo";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import type { Profile } from "@/types";

/* =====================================================================
   PanelShell · Estructura del panel de cliente.
   Sidebar oscuro fijo en escritorio + drawer deslizante en móvil.
   ===================================================================== */

const nav = [
  { label: "Inicio", href: "/panel", icon: LayoutDashboard },
  { label: "Mi Perfil", href: "/panel/perfil", icon: User },
  { label: "Servicios", href: "/panel/servicios", icon: Briefcase },
  { label: "Mis Citas", href: "/panel/citas", icon: CalendarCheck },
  { label: "Mis Pagos", href: "/panel/pagos", icon: CreditCard },
];

function getInitials(name: string): string {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "JC"
  );
}

interface SidebarContentProps {
  pathname: string;
  name: string;
  initials: string;
  roleLabel: string;
  onLogout: () => void;
  onNavigate?: () => void;
}

function SidebarContent({
  pathname,
  name,
  initials,
  roleLabel,
  onLogout,
  onNavigate,
}: SidebarContentProps) {
  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-white/10 px-6">
        <Logo tone="light" />
      </div>

      {/* Navegación */}
      <nav className="flex-1 space-y-1 px-3 py-5">
        {nav.map((item) => {
          const active =
            item.href === "/panel"
              ? pathname === "/panel"
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-brand text-white"
                  : "text-white/65 hover:bg-white/10 hover:text-white",
              )}
            >
              <Icon className="size-4.5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Usuario + cerrar sesión */}
      <div className="border-t border-white/10 p-3">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand to-brand-light text-xs font-bold text-brand-ink">
            {initials}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{name}</p>
            <p className="text-xs text-white/50">{roleLabel}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/65 transition-colors hover:bg-white/10 hover:text-white"
        >
          <LogOut className="size-4.5" />
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export function PanelShell({
  profile,
  children,
}: {
  profile: Profile | null;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const name = profile?.full_name || "Cliente";
  const initials = getInitials(name);
  const roleLabel = profile?.role === "admin" ? "Administrador" : "Cliente";

  async function handleLogout() {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
      // Supabase no configurado
    }
    router.push("/");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Sidebar de escritorio */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 bg-brand-ink lg:block print:hidden">
        <SidebarContent
          pathname={pathname}
          name={name}
          initials={initials}
          roleLabel={roleLabel}
          onLogout={handleLogout}
        />
      </aside>

      {/* Drawer móvil */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 z-50 w-64 bg-brand-ink lg:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
            >
              <SidebarContent
                pathname={pathname}
                name={name}
                initials={initials}
                roleLabel={roleLabel}
                onLogout={handleLogout}
                onNavigate={() => setOpen(false)}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Área de contenido */}
      <div className="lg:pl-64 print:pl-0!">
        {/* Barra superior */}
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-5 backdrop-blur-md sm:px-8 print:hidden">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
            className="grid size-9 place-items-center rounded-lg text-foreground hover:bg-secondary lg:hidden"
          >
            <Menu className="size-5" />
          </button>

          <div className="flex-1" />

          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-brand-deep to-brand text-xs font-bold text-white">
              {initials}
            </span>
            <span className="hidden text-sm font-medium text-foreground sm:block">
              {name}
            </span>
          </div>
        </header>

        {/* Cierre del drawer en móvil al navegar ya gestionado */}
        <main className="p-5 sm:p-8">{children}</main>
      </div>

      {/* Botón de cierre flotante del drawer (accesibilidad) */}
      {open && (
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Cerrar menú"
          className="fixed right-4 top-4 z-50 grid size-9 place-items-center rounded-lg bg-white/10 text-white lg:hidden"
        >
          <X className="size-5" />
        </button>
      )}
    </div>
  );
}
