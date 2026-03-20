"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface FormData {
  vorname: string;
  nachname: string;
  abteilung: string;
  standort: string;
  tshirt: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

const TSHIRT_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

const ABTEILUNGEN = [
  "Allgemeinmedizin",
  "Neurologie",
  "Orthopädie",
  "Gynäkologie",
  "Urologie",
];

const STANDORTE = [
  "Pirmasens",
  "Waldfischbach-Burgalben",
  "Zweibrücken",
];

const initialForm: FormData = {
  vorname: "",
  nachname: "",
  abteilung: "",
  standort: "",
  tshirt: "",
};

function validate(form: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!form.vorname.trim()) errors.vorname = "Vorname ist erforderlich.";
  if (!form.nachname.trim()) errors.nachname = "Nachname ist erforderlich.";
  if (!form.abteilung) errors.abteilung = "Bitte Abteilung wählen.";
  if (!form.standort) errors.standort = "Bitte Standort wählen.";
  if (!form.tshirt) errors.tshirt = "Bitte T-Shirt-Größe wählen.";
  return errors;
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-[#4bc3f0] uppercase tracking-wider mb-1.5">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
}

const inputClass = (error?: string) =>
  `w-full border rounded-xl px-4 py-2.5 text-[#1a2a3a] bg-white focus:outline-none transition-colors ${
    error ? "border-red-400 focus:border-red-500" : "border-[#b4e1f0] focus:border-[#3ca5e1]"
  }`;

export default function Anmeldung() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);
    if (touched[name as keyof FormData]) {
      setErrors(validate(updated));
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
    const name = e.target.name as keyof FormData;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(form));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const allTouched = Object.fromEntries(
      Object.keys(initialForm).map((k) => [k, true])
    ) as Record<keyof FormData, boolean>;
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    try {
      const res = await fetch("/api/anmeldung", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      alert("Fehler beim Senden. Bitte versuche es erneut.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="anmeldung" className="py-24 bg-[#1a2a3a]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-12 items-start">

          {/* Left: Motivation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2"
          >
            <span className="text-[#4bc3f0] font-bold text-sm uppercase tracking-widest">Interne Anmeldung</span>
            <h2 className="text-4xl font-black text-white mt-2 mb-5 leading-tight">
              Dein Platz<br />im Team.
            </h2>
            <p className="text-[#b4e1f0] leading-relaxed mb-4">
              Trag dich hier intern ein — das Orgateam meldet alle Teilnehmenden dann gemeinsam beim Veranstalter an.
            </p>
            <div className="bg-[#2d78c3]/20 border border-[#2d78c3]/40 rounded-xl px-4 py-3 mb-8">
              <p className="text-[#b4e1f0] text-sm leading-relaxed">
                <span className="font-bold text-white">Wichtig:</span> Dies ist eine interne Interessenbekundung. Die offizielle Anmeldung beim Veranstalter erfolgt gesammelt durch das Orgateam von MVZ Südwest.
              </p>
            </div>

            <div className="flex flex-col gap-3.5 text-sm">
              {[
                { emoji: "📅", text: "Fr., 11. September 2026" },
                { emoji: "🕣", text: "Startzeit: 19:30 Uhr" },
                { emoji: "📍", text: "Messehalle Pirmasens" },
                { emoji: "🏃", text: "Ca. 4,2 km Stadtkurs" },
                { emoji: "🎉", text: "After-Run am Beckenhof" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 text-[#b4e1f0]">
                  <span className="text-lg w-6 text-center shrink-0">{item.emoji}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-3"
          >
            {submitted ? (
              <div className="bg-white/5 border border-[#4bc3f0]/30 rounded-2xl p-10 text-center backdrop-blur-sm">
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="text-6xl mb-5"
                >
                  🎉
                </motion.div>
                <h3 className="text-2xl font-black text-white mb-2">
                  Du bist dabei, {form.vorname}!
                </h3>
                <p className="text-[#b4e1f0] mb-1">
                  Anmeldung für <strong>{form.vorname} {form.nachname}</strong> erhalten.
                </p>
                <p className="text-[#b4e1f0] text-sm">
                  T-Shirt-Größe: <strong>{form.tshirt}</strong> · Standort: <strong>{form.standort}</strong>
                </p>
                <p className="text-[#4bc3f0] text-sm mt-4 font-medium">
                  Das Orgateam kümmert sich um die offizielle Anmeldung beim Veranstalter. Wir freuen uns auf dich am 11. September!
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="bg-white/5 border border-[#2d78c3]/40 rounded-2xl p-8 flex flex-col gap-5 backdrop-blur-sm"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Vorname *" error={touched.vorname ? errors.vorname : undefined}>
                    <input
                      type="text"
                      name="vorname"
                      value={form.vorname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Max"
                      autoComplete="given-name"
                      className={inputClass(touched.vorname ? errors.vorname : undefined)}
                    />
                  </Field>
                  <Field label="Nachname *" error={touched.nachname ? errors.nachname : undefined}>
                    <input
                      type="text"
                      name="nachname"
                      value={form.nachname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Mustermann"
                      autoComplete="family-name"
                      className={inputClass(touched.nachname ? errors.nachname : undefined)}
                    />
                  </Field>
                </div>

                <Field label="Abteilung *" error={touched.abteilung ? errors.abteilung : undefined}>
                  <select
                    name="abteilung"
                    value={form.abteilung}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={inputClass(touched.abteilung ? errors.abteilung : undefined)}
                  >
                    <option value="">— Abteilung wählen —</option>
                    {ABTEILUNGEN.map((a) => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Standort *" error={touched.standort ? errors.standort : undefined}>
                  <select
                    name="standort"
                    value={form.standort}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={inputClass(touched.standort ? errors.standort : undefined)}
                  >
                    <option value="">— Standort wählen —</option>
                    {STANDORTE.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </Field>

                <Field label="T-Shirt-Größe *" error={touched.tshirt ? errors.tshirt : undefined}>
                  <div className="flex flex-wrap gap-2 mt-0.5">
                    {TSHIRT_SIZES.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => {
                          const updated = { ...form, tshirt: size };
                          setForm(updated);
                          setTouched((prev) => ({ ...prev, tshirt: true }));
                          setErrors(validate(updated));
                        }}
                        className={`px-4 py-2 rounded-xl text-sm font-bold border transition-colors ${
                          form.tshirt === size
                            ? "bg-[#2d78c3] border-[#2d78c3] text-white"
                            : "bg-white border-[#b4e1f0] text-[#4b87c3] hover:border-[#2d78c3]"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  {touched.tshirt && errors.tshirt && (
                    <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.tshirt}</p>
                  )}
                </Field>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#2d78c3] hover:bg-[#3ca5e1] disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-colors text-lg mt-1 shadow-md shadow-[#2d78c3]/20"
                >
                  {loading ? "Wird gespeichert …" : "Ich bin dabei! →"}
                </button>

                <p className="text-xs text-[#b4e1f0]/50 text-center">
                  * Pflichtfelder. Das Orgateam meldet alle intern Angemeldeten gesammelt beim Veranstalter an.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
