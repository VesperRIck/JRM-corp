"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { MailCheck, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAuthErrorMessage } from "@/lib/auth/errors";
import { createClient } from "@/lib/supabase/client";
import {
  forgotPasswordSchema,
  type ForgotPasswordInput,
} from "@/lib/validations/auth";

/* =====================================================================
   Formulario de recuperación de contraseña
   ===================================================================== */

export function ForgotPasswordForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function onSubmit(data: ForgotPasswordInput) {
    let supabase;
    try {
      supabase = createClient();
    } catch {
      toast.error("Supabase no está configurado", {
        description: "Completa el archivo .env.local con tus credenciales.",
      });
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/restablecer-password`,
    });

    if (error) {
      toast.error("No se pudo enviar el correo", {
        description: getAuthErrorMessage(error.message),
      });
      return;
    }

    setSent(true);
  }

  if (sent) {
    return (
      <div className="text-center">
        <div className="mx-auto grid size-14 place-items-center rounded-full bg-primary/10 text-primary">
          <MailCheck className="size-7" />
        </div>
        <h3 className="mt-4 font-display text-lg font-bold text-foreground">
          Correo enviado
        </h3>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Si el correo está registrado, recibirás un enlace para restablecer tu
          contraseña.
        </p>
        <Button asChild variant="outline" className="mt-5 w-full">
          <Link href="/login">Volver a iniciar sesión</Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <Label htmlFor="email">Correo electrónico</Label>
        <Input
          id="email"
          type="email"
          placeholder="correo@ejemplo.com"
          autoComplete="email"
          className="mt-1.5"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="gradient"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        <Send className="size-4" />
        {isSubmitting ? "Enviando..." : "Enviar enlace de recuperación"}
      </Button>
    </form>
  );
}
