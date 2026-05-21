"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

/* =====================================================================
   LogoutButton · Cierra la sesión y redirige al inicio.
   ===================================================================== */

export function LogoutButton({
  variant = "outline",
}: {
  variant?: "outline" | "ghost" | "default";
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
      // Supabase no configurado: nada que cerrar
    }
    router.push("/");
    router.refresh();
  }

  return (
    <Button variant={variant} onClick={handleLogout} disabled={loading}>
      <LogOut className="size-4" />
      {loading ? "Cerrando..." : "Cerrar sesión"}
    </Button>
  );
}
