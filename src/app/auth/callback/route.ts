import { NextResponse, type NextRequest } from "next/server";

import { createClient } from "@/lib/supabase/server";

/* =====================================================================
   Ruta de callback de Supabase
   Intercambia el "code" del enlace de correo (confirmación de cuenta
   o recuperación de contraseña) por una sesión válida.
   ===================================================================== */

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/panel";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Si algo falla, volver al login
  return NextResponse.redirect(`${origin}/login?error=callback`);
}
