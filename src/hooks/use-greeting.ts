"use client";

import { useEffect, useState } from "react";

/* =====================================================================
   useGreeting · Devuelve un saludo según la hora del día.
   - 05:00 a 11:59  → Buenos días
   - 12:00 a 18:59  → Buenas tardes
   - 19:00 a 04:59  → Buenas noches

   Devuelve `null` en el primer render para evitar desajustes de
   hidratación (servidor vs. cliente); el saludo se calcula al montar.
   ===================================================================== */

export type GreetingPeriod = "morning" | "afternoon" | "evening";

export interface Greeting {
  text: string;
  period: GreetingPeriod;
}

export function getGreeting(hour: number): Greeting {
  if (hour >= 5 && hour < 12) return { text: "Buenos días", period: "morning" };
  if (hour >= 12 && hour < 19) return { text: "Buenas tardes", period: "afternoon" };
  return { text: "Buenas noches", period: "evening" };
}

export function useGreeting(): Greeting | null {
  const [greeting, setGreeting] = useState<Greeting | null>(null);

  useEffect(() => {
    setGreeting(getGreeting(new Date().getHours()));
  }, []);

  return greeting;
}
