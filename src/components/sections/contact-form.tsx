"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { whatsappContacts, whatsappLink } from "@/config/social";
import { contactSchema, type ContactFormData } from "@/lib/validations/contact";

/* =====================================================================
   ContactForm · Formulario de contacto validado.
   Sin backend aún (Fase 3): al enviar, compone un mensaje y abre
   WhatsApp con los datos para completar el envío.
   ===================================================================== */

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  function onSubmit(data: ContactFormData) {
    const text =
      `Hola JRM Corp, soy ${data.name}.\n\n` +
      `Correo: ${data.email}\n` +
      `Teléfono: ${data.phone}\n\n` +
      `Mensaje: ${data.message}`;

    // Se envía al primer número de WhatsApp (Ventas)
    window.open(whatsappLink(whatsappContacts[0].number, text), "_blank");

    toast.success("¡Mensaje preparado!", {
      description: "Te redirigimos a WhatsApp para completar el envío.",
    });
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <Label htmlFor="name">Nombre completo</Label>
        <Input
          id="name"
          placeholder="Tu nombre"
          aria-invalid={!!errors.name}
          className="mt-1.5"
          {...register("name")}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            type="email"
            placeholder="correo@ejemplo.com"
            aria-invalid={!!errors.email}
            className="mt-1.5"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="phone">Teléfono</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+593 99 000 0000"
            aria-invalid={!!errors.phone}
            className="mt-1.5"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-destructive">
              {errors.phone.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="message">Mensaje</Label>
        <Textarea
          id="message"
          placeholder="Cuéntanos en qué podemos ayudarte..."
          aria-invalid={!!errors.message}
          className="mt-1.5"
          {...register("message")}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-destructive">
            {errors.message.message}
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
        <Send className="size-4" />
        Enviar mensaje
      </Button>
    </form>
  );
}
