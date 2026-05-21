import type { Metadata } from "next";

import { AdminShell } from "@/components/admin/admin-shell";
import { requireRole } from "@/lib/auth/dal";

export const metadata: Metadata = { title: "Administración" };

/* =====================================================================
   Layout del Panel de Administración · Requiere rol 'admin'.
   ===================================================================== */

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await requireRole("admin");

  return <AdminShell profile={profile}>{children}</AdminShell>;
}
