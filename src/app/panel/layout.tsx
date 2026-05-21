import type { Metadata } from "next";

import { PanelShell } from "@/components/panel/panel-shell";
import { getCurrentProfile, requireAuth } from "@/lib/auth/dal";

export const metadata: Metadata = { title: "Mi Panel" };

/* =====================================================================
   Layout del Panel de Cliente · Ruta protegida.
   ===================================================================== */

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAuth();
  const profile = await getCurrentProfile();

  return <PanelShell profile={profile}>{children}</PanelShell>;
}
