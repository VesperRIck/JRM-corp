"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

/* =====================================================================
   LoadingScreen · Pantalla de carga premium de JRM Corp.
   Se muestra una vez por sesión, con fondo tecnológico y animaciones.
   ===================================================================== */

const SESSION_KEY = "jrm-corp-loaded";
const DURATION_MS = 2400;

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Si ya se mostró en esta sesión, no volver a mostrarla
    if (sessionStorage.getItem(SESSION_KEY)) {
      setVisible(false);
      return;
    }
    const timer = setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, "1");
      setVisible(false);
    }, DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="jrm-loading"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-brand-ink"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Fondo tecnológico */}
          <div className="bg-grid absolute inset-0 opacity-30" aria-hidden />
          <motion.div
            className="blur-orb absolute left-1/4 top-1/4 size-72 rounded-full bg-brand"
            animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />
          <motion.div
            className="blur-orb absolute bottom-1/4 right-1/4 size-72 rounded-full bg-brand-deep"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />

          {/* Monograma con anillo giratorio */}
          <motion.div
            className="relative"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              className="absolute -inset-3 rounded-3xl border border-brand/40"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              aria-hidden
            />
            <motion.span
              className="absolute -inset-6 rounded-[2rem] border border-brand/15"
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              aria-hidden
            />
            <span className="grid size-24 place-items-center rounded-3xl bg-gradient-to-br from-brand-deep to-brand text-2xl font-bold tracking-tight text-white shadow-2xl shadow-brand/40">
              JRM
            </span>
          </motion.div>

          {/* Nombre */}
          <motion.h1
            className="mt-9 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl"
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            JRM Corp
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            className="mt-2 text-sm text-white/55"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Cargando experiencia premium...
          </motion.p>

          {/* Barra de progreso */}
          <div className="mt-8 h-1 w-56 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-brand to-brand-light"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: DURATION_MS / 1000 - 0.3, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
