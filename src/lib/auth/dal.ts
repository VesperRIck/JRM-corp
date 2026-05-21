import { cache } from "react";
import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";

import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import type { Profile, UserRole } from "@/types";

/* =====================================================================
   DAL · Data Access Layer de autenticación (solo servidor)
   Centraliza la verificación de sesión y la carga del perfil.
   `cache()` evita consultas duplicadas en un mismo render.
   ===================================================================== */

/** Devuelve el usuario autenticado, o `null` si no hay sesión */
export const getCurrentUser = cache(async (): Promise<User | null> => {
  if (!isSupabaseConfigured) return null;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
});

/** Devuelve el perfil del usuario autenticado, o `null` */
export const getCurrentProfile = cache(async (): Promise<Profile | null> => {
  const user = await getCurrentUser();
  if (!user) return null;

  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (data as Profile | null) ?? null;
});

/** Exige sesión iniciada; si no la hay, redirige a /login */
export async function requireAuth(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

/** Exige un rol concreto; redirige si no se cumple */
export async function requireRole(role: UserRole): Promise<Profile> {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");
  if (profile.role !== role) redirect("/panel");
  return profile;
}
