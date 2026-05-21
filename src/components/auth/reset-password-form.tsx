"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { KeyRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { getAuthErrorMessage } from "@/lib/auth/errors";
import { createClient } from "@/lib/supabase/client";
import {
  resetPasswordSchema,
  type ResetPasswordInput,
} from "@/lib/validations/auth";

/* =====================================================================
   Formulario para establecer una nueva contraseña.
   El usuario llega aquí con una sesión de recuperación activa.
   ===================================================================== */

export function ResetPasswordForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });

  async function onSubmit(data: ResetPasswordInput) {
    let supabase;
    try {
      supabase = createClient();
    } catch {
      toast.error("Supabase no está configurado", {
        description: "Completa el archivo .env.local con tus credenciales.",
      });
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: data.password,
    });

    if (error) {
      toast.error("No se pudo actualizar la contraseña", {
        description: getAuthErrorMessage(error.message),
      });
      return;
    }

    toast.success("Contraseña actualizada", {
      description: "Ya puedes usar tu nueva contraseña.",
    });
    router.push("/panel");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <Label htmlFor="password">Nueva contraseña</Label>
        <PasswordInput
          id="password"
          placeholder="Mínimo 8 caracteres"
          autoComplete="new-password"
          className="mt-1.5"
          aria-invalid={!!errors.password}
          {...register("password")}
        />
        {errors.password && (
          <p className="mt-1 text-xs text-destructive">
            {errors.password.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
        <PasswordInput
          id="confirmPassword"
          placeholder="Repite tu nueva contraseña"
          autoComplete="new-password"
          className="mt-1.5"
          aria-invalid={!!errors.confirmPassword}
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-xs text-destructive">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        variant="gradient"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        <KeyRound className="size-4" />
        {isSubmitting ? "Actualizando..." : "Actualizar contraseña"}
      </Button>
    </form>
  );
}
