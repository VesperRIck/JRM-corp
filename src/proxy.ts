import { NextResponse, type NextRequest } from "next/server";

import { isSupabaseConfigured } from "@/lib/supabase/config";
import { updateSession } from "@/lib/supabase/middleware";

/* =====================================================================
   proxy.ts · (en Next.js 16 reemplaza a "middleware")
   - Refresca la sesión de Supabase en cada petición.
   - Protege rutas privadas: redirige a /login si no hay sesión.
   - Evita que un usuario autenticado vea las pantallas de auth.
   ===================================================================== */

/** Rutas que requieren sesión iniciada */
const protectedRoutes = ["/panel", "/admin"];

/** Rutas de autenticación (un usuario logueado no debería verlas) */
const authRoutes = ["/login", "/registro", "/recuperar-password"];

export async function proxy(request: NextRequest) {
  // Si Supabase aún no está configurado, no se aplica protección.
  if (!isSupabaseConfigured) {
    return NextResponse.next();
  }

  const { user, response } = await updateSession(request);
  const path = request.nextUrl.pathname;

  const isProtected = protectedRoutes.some((route) => path.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => path.startsWith(route));

  // Sin sesión en ruta protegida -> al login (recordando el destino)
  if (isProtected && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", path);
    return copyCookies(response, NextResponse.redirect(url));
  }

  // Con sesión en una ruta de auth -> al panel
  if (isAuthRoute && user) {
    const url = request.nextUrl.clone();
    url.pathname = "/panel";
    return copyCookies(response, NextResponse.redirect(url));
  }

  return response;
}

/** Copia las cookies de sesión refrescadas a una respuesta de redirección */
function copyCookies(from: NextResponse, to: NextResponse): NextResponse {
  from.cookies.getAll().forEach((cookie) => to.cookies.set(cookie));
  return to;
}

export const config = {
  matcher: [
    /*
     * Aplica a todas las rutas excepto archivos estáticos e imágenes:
     * - api            (route handlers de API)
     * - _next/static   (archivos estáticos)
     * - _next/image    (optimización de imágenes)
     * - favicon e imágenes comunes
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
