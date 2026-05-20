"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";

import { SocialIcon } from "@/components/shared/social-icon";
import { whatsappContacts, whatsappLink } from "@/config/social";

/* =====================================================================
   WhatsAppFloat · Botón flotante que despliega los 4 contactos.
   ===================================================================== */

export function WhatsAppFloat() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      {/* Panel de contactos */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-72 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/20"
          >
            <div className="bg-[#25D366] px-4 py-3 text-white">
              <p className="font-display text-sm font-bold">
                Atención por WhatsApp
              </p>
              <p className="text-xs text-white/85">
                Elige un área para chatear
              </p>
            </div>
            <ul className="p-2">
              {whatsappContacts.map((contact) => (
                <li key={contact.number}>
                  <a
                    href={whatsappLink(
                      contact.number,
                      `Hola JRM Corp, escribo al área de ${contact.area}.`,
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-secondary"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#25D366]/10 text-[#1ba94c]">
                      <SocialIcon platform="whatsapp" className="size-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-foreground">
                        {contact.area}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {contact.agent}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón principal */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Cerrar WhatsApp" : "Abrir WhatsApp"}
        aria-expanded={open}
        className="relative grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 transition-transform duration-200 hover:scale-105"
      >
        {!open && (
          <motion.span
            className="absolute inset-0 rounded-full bg-[#25D366]"
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            aria-hidden
          />
        )}
        <span className="relative">
          {open ? (
            <X className="size-6" />
          ) : (
            <SocialIcon platform="whatsapp" className="size-7" />
          )}
        </span>
      </button>
    </div>
  );
}
