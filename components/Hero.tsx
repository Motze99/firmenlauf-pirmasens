"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const AuroraCanvas = dynamic(
  () => import("@/components/ui/aurora-flow").then((m) => m.AuroraCanvas),
  { ssr: false }
);

const facts = [
  { value: "11.09.", label: "September 2026", sub: "Freitag" },
  { value: "19:30", label: "Startzeit", sub: "Uhr" },
  { value: "4,2 km", label: "Stadtkurs", sub: "Strecke" },
  { value: "20.", label: "PW-Marathon", sub: "Jubiläum" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#1a2a3a]">
      {/* Aurora WebGL background */}
      <div className="absolute inset-0">
        <AuroraCanvas />
      </div>
      {/* Overlay for text legibility */}
      <div className="absolute inset-0 bg-[#1a2a3a]/40" />
      {/* Right-side accent */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#2d78c3]/10 to-transparent pointer-events-none" />
      <div className="absolute right-[30%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#4bc3f0]/20 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-[#2d78c3]/30 border border-[#4bc3f0]/40 rounded-full px-4 py-1.5 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#4bc3f0] animate-pulse" />
          <span className="text-[#b4e1f0] text-sm font-semibold tracking-wide">
            MVZ Südwest — Wir laufen gemeinsam!
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tight mb-6"
        >
          PARK
          <br />
          <span
            className="text-[#4bc3f0]"
            style={{ animation: "aurora-glow 3s ease-in-out infinite" }}
          >
            FIRMEN
            <wbr />
            LAUF
          </span>
          <br />
          <span className="text-3xl md:text-5xl text-white/60 tracking-widest font-black">
            PIRMASENS
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-[#b4e1f0] mb-4 max-w-lg leading-relaxed"
        >
          Sei dabei und lauf für MVZ Südwest — gemeinsam durch die Innenstadt, Fußgängerzone und das Parkgelände von Pirmasens.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="text-[#4bc3f0] font-semibold mb-10"
        >
          Danach feiern wir zusammen am Beckenhof. 🎉
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-wrap gap-4 mb-16"
        >
          <a
            href="#anmeldung"
            className="bg-[#2d78c3] hover:bg-[#3ca5e1] text-white font-bold px-8 py-4 rounded-full text-lg transition-colors shadow-lg shadow-[#2d78c3]/30"
          >
            Ich bin dabei →
          </a>
          <a
            href="#strecke"
            className="border border-[#4bc3f0]/50 text-[#4bc3f0] hover:bg-[#4bc3f0]/10 font-semibold px-8 py-4 rounded-full text-lg transition-colors"
          >
            Zur Strecke
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-8"
        >
          {facts.map((s) => (
            <div key={s.label} className="flex flex-col">
              <div className="text-3xl font-black text-white tabular-nums">{s.value}</div>
              <div className="text-[#4bc3f0] text-xs font-bold uppercase tracking-widest mt-0.5">{s.sub}</div>
              <div className="text-[#b4e1f0]/70 text-xs mt-0.5">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[#4bc3f0]/50"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
