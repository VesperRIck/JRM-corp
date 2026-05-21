"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { profileSchema, type ProfileInput } from "@/lib/validations/profile";
import type { Profile } from "@/types";

/* =====================================================================
   ProfileForm · Edición de los datos del perfil del cliente.
   ===================================================================== */

export function ProfileForm({ profile }: { profile: Profile }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: profile.full_name ?? "",
      phone: profile.phone ?? "",
      cedula: profile.cedula ?? "",
    },
  });

  async function onSubmit(data: ProfileInput) {
    let supabase;
    try {
      supabase = createClient();
    } catch {
      toast.error("Supabase no está configurado");
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: data.fullName,
        phone: data.phone,
        cedula: data.cedula,
      })
      .eq("id", profile.id);

    if (error) {
      toast.error("No se pudieron guardar los cambios", {
        description: error.message,
      });
      return;
    }

    toast.success("Perfil actualizado correctamente");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div>
        <Label htmlFor="fullName">Nombre completo</Label>
        <Input
          id="fullName"
          className="mt-1.5"
          aria-invalid={!!errors.fullName}
          {...register("fullName")}
        />
        {errors.fullName && (
          <p className="mt-1 text-xs text-destructive">
            {errors.fullName.message}
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="phone">Número celular</Label>
          <Input
            id="phone"
            type="tel"
            className="mt-1.5"
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-destructive">
              {errors.phone.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="cedula">Cédula</Label>
          <Input
            id="cedula"
            inputMode="numeric"
            className="mt-1.5"
            aria-invalid={!!errors.cedula}
            {...register("cedula")}
          />
          {errors.cedula && (
            <p className="mt-1 text-xs text-destructive">
              {errors.cedula.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="email">Correo electrónico</Label>
        <Input
          id="email"
          type="email"
          className="mt-1.5"
          value={profile.email ?? ""}
          disabled
        />
        <p className="mt-1 text-xs text-muted-foreground">
          El correo electrónico no se puede modificar.
        </p>
      </div>

      <Button type="submit" variant="gradient" disabled={isSubmitting}>
        <Save className="size-4" />
        {isSubmitting ? "Guardando..." : "Guardar cambios"}
      </Button>
    </form>
  );
}
