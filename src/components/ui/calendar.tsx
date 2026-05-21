"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { maxBookingDays } from "@/config/booking";

/* =====================================================================
   Calendar · Calendario mensual (semana de lunes a domingo).
   Deshabilita días pasados y posteriores al límite de reserva.
   ===================================================================== */

const WEEKDAYS = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"];

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

interface CalendarProps {
  selected: Date | null;
  onSelect: (date: Date) => void;
}

export function Calendar({ selected, onSelect }: CalendarProps) {
  const today = startOfDay(new Date());
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + maxBookingDays);

  const [view, setView] = useState(() => {
    const base = selected ?? today;
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });

  const year = view.getFullYear();
  const month = view.getMonth();
  const offset = (new Date(year, month, 1).getDay() + 6) % 7; // lunes = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthLabel = new Intl.DateTimeFormat("es", {
    month: "long",
    year: "numeric",
  }).format(view);

  const cells: (Date | null)[] = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

  const canGoPrev =
    new Date(year, month, 1) > new Date(today.getFullYear(), today.getMonth(), 1);
  const canGoNext =
    new Date(year, month, 1) <
    new Date(maxDate.getFullYear(), maxDate.getMonth(), 1);

  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      {/* Cabecera */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setView(new Date(year, month - 1, 1))}
          disabled={!canGoPrev}
          aria-label="Mes anterior"
          className="grid size-9 place-items-center rounded-lg text-foreground transition-colors hover:bg-secondary disabled:opacity-30"
        >
          <ChevronLeft className="size-4" />
        </button>
        <span className="font-display text-sm font-bold capitalize text-foreground">
          {monthLabel}
        </span>
        <button
          type="button"
          onClick={() => setView(new Date(year, month + 1, 1))}
          disabled={!canGoNext}
          aria-label="Mes siguiente"
          className="grid size-9 place-items-center rounded-lg text-foreground transition-colors hover:bg-secondary disabled:opacity-30"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      {/* Días de la semana */}
      <div className="mt-3 grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted-foreground">
        {WEEKDAYS.map((w) => (
          <div key={w} className="py-1">
            {w}
          </div>
        ))}
      </div>

      {/* Días */}
      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((date, i) => {
          if (!date) return <div key={`empty-${i}`} />;

          const disabled = date < today || date > maxDate;
          const isSelected = selected != null && sameDay(date, selected);
          const isToday = sameDay(date, today);

          return (
            <button
              key={date.toISOString()}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(date)}
              className={cn(
                "aspect-square rounded-lg text-sm transition-colors",
                disabled && "cursor-not-allowed text-muted-foreground/35",
                !disabled &&
                  !isSelected &&
                  "text-foreground hover:bg-secondary",
                isSelected &&
                  "bg-primary font-semibold text-primary-foreground",
                isToday && !isSelected && "ring-1 ring-inset ring-brand/50",
              )}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
