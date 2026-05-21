"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CalendarCheck, Check, CircleCheck, Clock } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ServiceIcon } from "@/components/shared/service-icon";
import { services } from "@/config/services";
import { timeSlots } from "@/config/booking";
import { createClient } from "@/lib/supabase/client";
import { formatLongDate, toISODate } from "@/lib/format";
import { cn } from "@/lib/utils";

/* =====================================================================
   BookingForm · Flujo de reserva de citas.
   ===================================================================== */

interface BookingSuccess {
  serviceTitle: string;
  date: string;
  time: string;
}

export function BookingForm({ defaultService }: { defaultService?: string }) {
  const router = useRouter();

  const [serviceSlug, setServiceSlug] = useState(
    defaultService && services.some((s) => s.slug === defaultService)
      ? defaultService
      : "",
  );
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<BookingSuccess | null>(null);

  async function handleSubmit() {
    if (!serviceSlug || !date || !time) return;
    const service = services.find((s) => s.slug === serviceSlug);
    if (!service) return;

    setSubmitting(true);
    let supabase;
    try {
      supabase = createClient();
    } catch {
      toast.error("Supabase no está configurado");
      setSubmitting(false);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Tu sesión expiró", { description: "Inicia sesión de nuevo." });
      setSubmitting(false);
      return;
    }

    const { error } = await supabase.from("appointments").insert({
      user_id: user.id,
      service_slug: service.slug,
      service_title: service.title,
      appointment_date: toISODate(date),
      appointment_time: time,
      status: "confirmed",
      notes: notes.trim() || null,
    });

    setSubmitting(false);

    if (error) {
      toast.error("No se pudo agendar la cita", { description: error.message });
      return;
    }

    setSuccess({ serviceTitle: service.title, date: toISODate(date), time });
    router.refresh();
  }

  /* ---------- Confirmación ---------- */
  if (success) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-8 text-center">
        <div className="mx-auto grid size-16 place-items-center rounded-full bg-primary/10 text-primary">
          <CircleCheck className="size-9" />
        </div>
        <h2 className="mt-5 font-display text-2xl font-bold text-foreground">
          ¡Cita agendada!
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Tu cita quedó confirmada. Te esperamos.
        </p>

        <dl className="mt-6 space-y-2 rounded-xl bg-secondary/60 p-4 text-left text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Servicio</dt>
            <dd className="font-medium text-foreground">{success.serviceTitle}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Fecha</dt>
            <dd className="text-right font-medium capitalize text-foreground">
              {formatLongDate(success.date)}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Hora</dt>
            <dd className="font-medium text-foreground">{success.time}</dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <Button asChild variant="gradient" className="flex-1">
            <Link href="/panel/citas">Ver mis citas</Link>
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => {
              setSuccess(null);
              setDate(null);
              setTime(null);
              setNotes("");
            }}
          >
            Agendar otra
          </Button>
        </div>
      </div>
    );
  }

  /* ---------- Formulario ---------- */
  return (
    <div className="space-y-8">
      {/* 1. Servicio */}
      <section>
        <h2 className="font-display text-lg font-bold text-foreground">
          1. Elige el servicio
        </h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {services.map((service) => {
            const active = service.slug === serviceSlug;
            return (
              <button
                key={service.slug}
                type="button"
                onClick={() => setServiceSlug(service.slug)}
                className={cn(
                  "flex items-center gap-3 rounded-2xl border bg-card p-4 text-left transition-all",
                  active
                    ? "border-brand ring-2 ring-brand/30"
                    : "border-border hover:border-brand/40",
                )}
              >
                <ServiceIcon
                  icon={service.icon}
                  accent={service.accent}
                  className="shrink-0"
                />
                <span>
                  <span className="block font-semibold text-foreground">
                    {service.title}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {service.tagline}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 2 y 3. Fecha y hora */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section>
          <h2 className="font-display text-lg font-bold text-foreground">
            2. Elige la fecha
          </h2>
          <div className="mt-3">
            <Calendar
              selected={date}
              onSelect={(d) => {
                setDate(d);
                setTime(null);
              }}
            />
          </div>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-foreground">
            3. Elige la hora
          </h2>
          {date ? (
            <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-3">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setTime(slot)}
                  className={cn(
                    "rounded-lg border py-2.5 text-sm font-medium transition-colors",
                    slot === time
                      ? "border-brand bg-brand text-white"
                      : "border-border bg-card text-foreground hover:border-brand/40 hover:bg-secondary",
                  )}
                >
                  {slot}
                </button>
              ))}
            </div>
          ) : (
            <div className="mt-3 flex items-center gap-2 rounded-2xl border border-dashed border-border bg-card/60 p-6 text-sm text-muted-foreground">
              <Clock className="size-4" />
              Primero selecciona una fecha.
            </div>
          )}

          {/* 4. Notas */}
          <div className="mt-6">
            <Label htmlFor="notes">Notas (opcional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              maxLength={500}
              placeholder="Cuéntanos algún detalle sobre tu cita..."
              className="mt-1.5 min-h-24"
            />
          </div>
        </section>
      </div>

      {/* Resumen + confirmar */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Check
              className={cn(
                "size-4",
                serviceSlug ? "text-primary" : "text-muted-foreground/40",
              )}
            />
            Servicio
          </span>
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Check
              className={cn(
                "size-4",
                date ? "text-primary" : "text-muted-foreground/40",
              )}
            />
            {date ? (
              <span className="capitalize">{formatLongDate(date)}</span>
            ) : (
              "Fecha"
            )}
          </span>
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Check
              className={cn(
                "size-4",
                time ? "text-primary" : "text-muted-foreground/40",
              )}
            />
            {time ?? "Hora"}
          </span>
        </div>

        <Button
          variant="gradient"
          size="lg"
          className="mt-4 w-full"
          disabled={!serviceSlug || !date || !time || submitting}
          onClick={handleSubmit}
        >
          <CalendarCheck className="size-4" />
          {submitting ? "Agendando..." : "Confirmar cita"}
        </Button>
      </div>
    </div>
  );
}
