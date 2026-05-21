import { createClient } from "@/lib/supabase/server";
import type { Appointment, Payment, Profile } from "@/types";

/* =====================================================================
   Capa de datos del Administrador (lado servidor).
   Las políticas RLS "Admin ve todo..." permiten leer todos los registros
   cuando el usuario autenticado tiene rol 'admin'.
   ===================================================================== */

export async function getAllProfiles(): Promise<Profile[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });
  return (data as Profile[] | null) ?? [];
}

export async function getAllAppointments(): Promise<Appointment[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("appointments")
    .select("*")
    .order("appointment_date", { ascending: false });
  return (data as Appointment[] | null) ?? [];
}

export async function getAllPayments(): Promise<Payment[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("payments")
    .select("*")
    .order("created_at", { ascending: false });
  return (data as Payment[] | null) ?? [];
}

/* ---------- Estadísticas para el dashboard ---------- */

export interface AdminStats {
  totalUsers: number;
  totalAppointments: number;
  totalPayments: number;
  /** Ingresos totales en centavos */
  totalRevenue: number;
  /** Ingresos por mes (en dólares) — últimos 6 meses */
  revenueByMonth: { month: string; total: number }[];
  /** Cantidad de pagos por servicio */
  servicePopularity: { name: string; count: number }[];
}

export async function getAdminStats(): Promise<AdminStats> {
  const [profiles, appointments, payments] = await Promise.all([
    getAllProfiles(),
    getAllAppointments(),
    getAllPayments(),
  ]);

  const paidPayments = payments.filter((p) => p.status === "paid");
  const totalRevenue = paidPayments.reduce((sum, p) => sum + p.amount, 0);

  /* Ingresos de los últimos 6 meses */
  const now = new Date();
  const months: { key: string; month: string; total: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      key: `${d.getFullYear()}-${d.getMonth()}`,
      month: new Intl.DateTimeFormat("es", { month: "short" }).format(d),
      total: 0,
    });
  }
  for (const p of paidPayments) {
    const d = new Date(p.created_at);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    const bucket = months.find((m) => m.key === key);
    if (bucket) bucket.total += p.amount / 100;
  }

  /* Servicios más vendidos */
  const counts = new Map<string, number>();
  for (const p of paidPayments) {
    counts.set(p.service_title, (counts.get(p.service_title) ?? 0) + 1);
  }
  const servicePopularity = [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  return {
    totalUsers: profiles.length,
    totalAppointments: appointments.length,
    totalPayments: paidPayments.length,
    totalRevenue,
    revenueByMonth: months.map((m) => ({
      month: m.month,
      total: Math.round(m.total),
    })),
    servicePopularity,
  };
}
