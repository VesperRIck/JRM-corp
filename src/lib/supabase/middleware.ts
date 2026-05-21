import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { User } from "@supabase/supabase-js";

import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./config";

/* =====================================================================
   updateSession · Refresca la sesión de Supabase en cada petición.
   Lo usa `proxy.ts`. Devuelve el usuario actual y la respuesta con
   las cookies de sesión actualizadas.
   ===================================================================== */

export async function updateSession(request: NextRequest): Promise<{
  user: User | null;
  response: NextResponse;
}> {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    SUPABASE_URL ?? "",
    SUPABASE_ANON_KEY ?? "",
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // IMPORTANTE: getUser() valida el token y refresca la sesión.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { user, response };
}
