"use client";

import { motion } from "framer-motion";

const waypoints = [
  {
    num: "01",
    name: "Start",
    detail: "Messehalle Pirmasens",
    desc: "Gemeinsamer Start mit allen Teams — Atmosphäre pur am Messegelände.",
    color: "#2d78c3",
  },
  {
    num: "02",
    name: "Innenstadt",
    detail: "Fußgängerzone",
    desc: "Durch die beleuchtete Fußgängerzone — mitten durch das Herz der Stadt.",
    color: "#3ca5e1",
  },
  {
    num: "03",
    name: "Parkgelände",
    detail: "Grüne Lunge Pirmasens",
    desc: "Durch das grüne Parkgelände — der schönste Teil der 4,2 km Runde.",
    color: "#4bc3f0",
  },
  {
    num: "04",
    name: "Ziel",
    detail: "Messehalle Pirmasens",
    desc: "Zieleinlauf im Jubel — und direkt weiter zur Abschlussparty in der Messehalle.",
    color: "#4b87c3",
  },
];

const infos = [
  { label: "Distanz", value: "ca. 4,2 km", icon: "📏" },
  { label: "Untergrund", value: "Asphalt & Pflaster", icon: "🛣️" },
];

export default function StreckeSection() {
  return (
    <section id="strecke" className="py-24 bg-[#f0f8ff]">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <span className="text-[#2d78c3] font-bold text-sm uppercase tracking-widest">Die Strecke</span>
          <h2 className="text-4xl md:text-5xl font-black text-[#1a2a3a] mt-2 leading-tight">
            4,2 km durch<br />
            <span className="text-[#2d78c3]">Pirmasens.</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[2.25rem] top-10 bottom-10 w-0.5 bg-gradient-to-b from-[#2d78c3] via-[#4bc3f0] to-[#4b87c3] hidden md:block" />
          <div className="flex flex-col gap-5">
            {waypoints.map((wp, i) => (
              <motion.div
                key={wp.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="flex items-start gap-5 group"
              >
                <div
                  className="shrink-0 w-[4.5rem] h-[4.5rem] rounded-2xl flex items-center justify-center font-black text-xl text-white shadow-md"
                  style={{ backgroundColor: wp.color }}
                >
                  {wp.num}
                </div>
                <div className="flex-1 bg-white border border-[#b4e1f0] rounded-2xl p-5 hover:border-[#3ca5e1] hover:shadow-md transition-all">
                  <div className="flex flex-wrap items-baseline gap-2 mb-1">
                    <span className="text-lg font-black text-[#1a2a3a]">{wp.name}</span>
                    <span className="text-sm font-semibold text-[#4b87c3]">{wp.detail}</span>
                  </div>
                  <p className="text-[#4a5568] text-sm leading-relaxed">{wp.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 grid sm:grid-cols-3 gap-4"
        >
          {infos.map((info) => (
            <div
              key={info.label}
              className="bg-white border border-[#b4e1f0] rounded-2xl p-5 flex items-center gap-4"
            >
              <span className="text-2xl">{info.icon}</span>
              <div>
                <div className="text-xs font-bold text-[#4b87c3] uppercase tracking-wider">{info.label}</div>
                <div className="font-bold text-[#1a2a3a] mt-0.5">{info.value}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
