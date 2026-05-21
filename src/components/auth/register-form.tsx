"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { MailCheck, UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { getAuthErrorMessage } from "@/lib/auth/errors";
import { createClient } from "@/lib/supabase/client";
import { registerSchema, type RegisterInput } from "@/lib/validations/auth";

/* =====================================================================
   Formulario de registro
   ===================================================================== */

export function RegisterForm() {
  const router = useRouter();
  const [emailSent, setEmailSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

  async function onSubmit(data: RegisterInput) {
    let supabase;
    try {
      supabase = createClient();
    } catch {
      toast.error("Supabase no está configurado", {
        description: "Completa el archivo .env.local con tus credenciales.",
      });
      return;
    }

    const { data: result, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
          phone: data.phone,
          cedula: data.cedula,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      toast.error("No se pudo crear la cuenta", {
        description: getAuthErrorMessage(error.message),
      });
      return;
    }

    if (result.session) {
      // Confirmación de correo desactivada: sesión iniciada de inmediato
      toast.success("¡Cuenta creada con éxito!");
      router.push("/panel");
      router.refresh();
    } else {
      // Confirmación de correo activada: hay que verificar el email
      setEmailSent(true);
    }
  }

  if (emailSent) {
    return (
      <div className="text-center">
        <div className="mx-auto grid size-14 place-items-center rounded-full bg-primary/10 text-primary">
          <MailCheck className="size-7" />
        </div>
        <h3 className="mt-4 font-display text-lg font-bold text-foreground">
          Revisa tu correo
        </h3>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Te enviamos un enlace de confirmación. Ábrelo para activar tu cuenta
          de JRM Corp.
        </p>
        <Button asChild variant="outline" className="mt-5 w-full">
          <Link href="/login">Ir a iniciar sesión</Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <Label htmlFor="fullName">Nombre completo</Label>
        <Input
          id="fullName"
          placeholder="Juan Pérez"
          autoComplete="name"
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

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="phone">Número celular</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="0990000000"
            autoComplete="tel"
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
            placeholder="0102030405"
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
        <Label htmlFor="password">Contraseña</Label>
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
          placeholder="Repite tu contraseña"
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
        <UserPlus className="size-4" />
        {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
      </Button>
    </form>
  );
}
