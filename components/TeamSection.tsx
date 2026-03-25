"use client";

import { motion } from "framer-motion";

const gruende = [
  {
    icon: (
      <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Gemeinsam stärker",
    text: "Ob Sprinter oder gemütlicher Jogger — beim Firmenlauf zählt das Team. Wir zeigen gemeinsam Flagge für MVZ Südwest.",
  },
  {
    icon: (
      <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    title: "Spaß & Sport",
    text: "4,2 km durch die beleuchtete Innenstadt — ein unvergessliches Erlebnis mit Kolleginnen und Kollegen aus allen Standorten.",
  },
  {
    icon: (
      <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: "Für einen guten Zweck",
    text: "Der Park Firmenlauf ist Teil des 20. Pfälzerwald-Marathon-Wochenendes — Bewegung, die verbindet und die Region stärkt.",
  },
];

export default function TeamSection() {
  return (
    <>
      {/* Team-Gedanke */}
      <section id="team" className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <span className="text-[#2d78c3] font-bold text-sm uppercase tracking-widest">Warum mitmachen?</span>
              <h2 className="text-4xl md:text-5xl font-black text-[#1a2a3a] mt-2 mb-6 leading-tight">
                Wir laufen als<br />
                <span className="text-[#2d78c3]">ein Team.</span>
              </h2>
              <p className="text-[#4a5568] leading-relaxed text-lg">
                Der Park Firmenlauf Pirmasens ist mehr als ein Lauf — er ist eine Chance,
                abseits des Alltags zusammenzukommen, den Teamgeist zu stärken und
                gemeinsam etwas zu erleben, worüber man noch lange spricht.
              </p>
              <p className="text-[#4a5568] leading-relaxed mt-4">
                Egal ob du sportlich aktiv bist oder einfach dabei sein willst —
                jede und jeder ist willkommen. Wir laufen in unserem MVZ-Südwest-Trikot
                und machen als Team eine gute Figur.
              </p>
            </motion.div>

            <div className="flex flex-col gap-4">
              {gruende.map((g, i) => (
                <motion.div
                  key={g.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="relative flex items-start gap-5 bg-[#f0f8ff] border border-[#b4e1f0] rounded-2xl p-5 hover:border-[#3ca5e1] hover:shadow-md transition-all group overflow-hidden"
                >
                  <span className="absolute right-4 top-2 text-6xl font-black text-[#2d78c3]/8 leading-none select-none pointer-events-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="text-[#2d78c3] shrink-0 mt-0.5 group-hover:text-[#3ca5e1] transition-colors">
                    {g.icon}
                  </div>
                  <div className="relative z-10">
                    <div className="font-black text-[#1a2a3a] mb-1">{g.title}</div>
                    <div className="text-[#4a5568] text-sm leading-relaxed">{g.text}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Abschlussparty Messehalle */}
      <section className="py-20 bg-[#1a2a3a] overflow-hidden">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative rounded-3xl bg-gradient-to-br from-[#2d78c3]/30 to-[#4bc3f0]/10 border border-[#2d78c3]/40 p-10 md:p-14">
            {/* Deco */}
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-[#4bc3f0]/10 blur-2xl" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative z-10 grid md:grid-cols-2 gap-10 items-center"
            >
              <div>
                <div className="inline-flex items-center gap-2 bg-[#4bc3f0]/20 border border-[#4bc3f0]/40 rounded-full px-4 py-1.5 mb-6">
                  <span className="text-lg">🎉</span>
                  <span className="text-[#4bc3f0] text-sm font-semibold">Nach dem Lauf</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                  Abschlussparty in der<br />
                  <span className="text-[#4bc3f0]">Messehalle</span>
                </h2>
                <p className="text-[#b4e1f0] leading-relaxed text-lg">
                  Das Beste kommt nach dem Zieleinlauf: Wir feiern gemeinsam
                  in der Messehalle — mit kühlen Getränken, gutem Essen und
                  dem wohlverdienten Jubel über unsere gemeinsame Leistung.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {[
                  { emoji: "🍺", label: "Kühle Getränke & Verpflegung" },
                  { emoji: "🎵", label: "Musik & gute Stimmung" },
                  { emoji: "🏅", label: "Siegerehrung & Teamfotos" },
                  { emoji: "💬", label: "Zeit zum Ankommen & Feiern" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 text-[#b4e1f0]">
                    <span className="text-2xl">{item.emoji}</span>
                    <span className="font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
