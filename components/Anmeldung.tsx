"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface FormData {
  vorname: string;
  nachname: string;
  geschlecht: string;
  geburtsdatum: string;
  email: string;
  strasse: string;
  plz: string;
  ort: string;
  nationalitaet: string;
  bisherigeTeilnahmen: string;
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
  geschlecht: "",
  geburtsdatum: "",
  email: "",
  strasse: "",
  plz: "",
  ort: "",
  nationalitaet: "GER - Deutschland",
  bisherigeTeilnahmen: "0",
  abteilung: "",
  standort: "",
  tshirt: "",
};

function validate(form: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!form.vorname.trim()) errors.vorname = "Vorname ist erforderlich.";
  if (!form.nachname.trim()) errors.nachname = "Nachname ist erforderlich.";
  if (!form.geschlecht) errors.geschlecht = "Bitte Geschlecht wählen.";
  if (!form.geburtsdatum) errors.geburtsdatum = "Geburtsdatum ist erforderlich.";
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Bitte eine gültige E-Mail-Adresse eingeben.";
  }
  if (!form.strasse.trim()) errors.strasse = "Straße und Hausnummer sind erforderlich.";
  if (!form.plz.trim()) errors.plz = "PLZ ist erforderlich.";
  if (!form.ort.trim()) errors.ort = "Ort ist erforderlich.";
  if (!form.abteilung) errors.abteilung = "Bitte Abteilung wählen.";
  if (!form.standort) errors.standort = "Bitte Standort wählen.";
  if (!form.tshirt) errors.tshirt = "Bitte T-Shirt-Größe wählen.";
  return errors;
}

function Field({
  label,
  error,
  htmlFor,
  children,
}: {
  label: string;
  error?: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-xs font-bold text-[#4bc3f0] uppercase tracking-wider mb-1.5">
        {label}
      </label>
      {children}
      {error && <p id={`${htmlFor}-error`} role="alert" className="mt-1.5 text-xs text-red-400 font-medium">{error}</p>}
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="border-t border-white/10 pt-5 mt-1">
      <p className="text-xs font-bold text-white/40 uppercase tracking-widest">{title}</p>
    </div>
  );
}

const inputClass = (error?: string) =>
  `w-full border rounded-xl px-4 py-2.5 text-[#1a2a3a] bg-white outline-none focus-visible:ring-2 focus-visible:ring-[#2d78c3] focus-visible:ring-offset-1 transition-colors ${
    error ? "border-red-400" : "border-[#b4e1f0] focus-visible:border-[#3ca5e1]"
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
                { emoji: "🎉", text: "Abschlussparty in der Messehalle" },
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
                {/* Name */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Vorname *" htmlFor="vorname" error={touched.vorname ? errors.vorname : undefined}>
                    <input
                      id="vorname" type="text" name="vorname" value={form.vorname}
                      onChange={handleChange} onBlur={handleBlur}
                      placeholder="Max" autoComplete="given-name"
                      aria-describedby={touched.vorname && errors.vorname ? "vorname-error" : undefined}
                      className={inputClass(touched.vorname ? errors.vorname : undefined)}
                    />
                  </Field>
                  <Field label="Nachname *" htmlFor="nachname" error={touched.nachname ? errors.nachname : undefined}>
                    <input
                      id="nachname" type="text" name="nachname" value={form.nachname}
                      onChange={handleChange} onBlur={handleBlur}
                      placeholder="Mustermann" autoComplete="family-name"
                      aria-describedby={touched.nachname && errors.nachname ? "nachname-error" : undefined}
                      className={inputClass(touched.nachname ? errors.nachname : undefined)}
                    />
                  </Field>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Geschlecht *" htmlFor="geschlecht" error={touched.geschlecht ? errors.geschlecht : undefined}>
                    <select
                      id="geschlecht" name="geschlecht" value={form.geschlecht}
                      onChange={handleChange} onBlur={handleBlur}
                      aria-describedby={touched.geschlecht && errors.geschlecht ? "geschlecht-error" : undefined}
                      className={inputClass(touched.geschlecht ? errors.geschlecht : undefined)}
                    >
                      <option value="">— wählen —</option>
                      <option value="Männlich">Männlich</option>
                      <option value="Weiblich">Weiblich</option>
                      <option value="Divers">Divers</option>
                    </select>
                  </Field>
                  <Field label="Geburtsdatum *" htmlFor="geburtsdatum" error={touched.geburtsdatum ? errors.geburtsdatum : undefined}>
                    <input
                      id="geburtsdatum" type="date" name="geburtsdatum" value={form.geburtsdatum}
                      onChange={handleChange} onBlur={handleBlur}
                      aria-describedby={touched.geburtsdatum && errors.geburtsdatum ? "geburtsdatum-error" : undefined}
                      className={inputClass(touched.geburtsdatum ? errors.geburtsdatum : undefined)}
                    />
                  </Field>
                </div>

                <Field label="E-Mail (optional)" htmlFor="email" error={touched.email ? errors.email : undefined}>
                  <input
                    id="email" type="email" name="email" value={form.email}
                    onChange={handleChange} onBlur={handleBlur}
                    placeholder="max.mustermann@mvz-suedwest.de" autoComplete="email"
                    aria-describedby={touched.email && errors.email ? "email-error" : undefined}
                    className={inputClass(touched.email ? errors.email : undefined)}
                  />
                </Field>

                {/* Adresse */}
                <SectionHeader title="Adresse" />

                <Field label="Straße und Hausnummer *" htmlFor="strasse" error={touched.strasse ? errors.strasse : undefined}>
                  <input
                    id="strasse" type="text" name="strasse" value={form.strasse}
                    onChange={handleChange} onBlur={handleBlur}
                    placeholder="Musterstraße 1" autoComplete="street-address"
                    aria-describedby={touched.strasse && errors.strasse ? "strasse-error" : undefined}
                    className={inputClass(touched.strasse ? errors.strasse : undefined)}
                  />
                </Field>

                <div className="grid grid-cols-5 gap-4">
                  <div className="col-span-2">
                    <Field label="PLZ *" htmlFor="plz" error={touched.plz ? errors.plz : undefined}>
                      <input
                        id="plz" type="text" name="plz" value={form.plz}
                        onChange={handleChange} onBlur={handleBlur}
                        placeholder="66953" autoComplete="postal-code" inputMode="numeric"
                        aria-describedby={touched.plz && errors.plz ? "plz-error" : undefined}
                        className={inputClass(touched.plz ? errors.plz : undefined)}
                      />
                    </Field>
                  </div>
                  <div className="col-span-3">
                    <Field label="Ort *" htmlFor="ort" error={touched.ort ? errors.ort : undefined}>
                      <input
                        id="ort" type="text" name="ort" value={form.ort}
                        onChange={handleChange} onBlur={handleBlur}
                        placeholder="Pirmasens" autoComplete="address-level2"
                        aria-describedby={touched.ort && errors.ort ? "ort-error" : undefined}
                        className={inputClass(touched.ort ? errors.ort : undefined)}
                      />
                    </Field>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Nationalität" htmlFor="nationalitaet">
                    <input
                      id="nationalitaet" type="text" name="nationalitaet" value={form.nationalitaet}
                      onChange={handleChange} onBlur={handleBlur}
                      className={inputClass()}
                    />
                  </Field>
                  <Field label="Anzahl bisheriger Teilnahmen" htmlFor="bisherigeTeilnahmen">
                    <input
                      id="bisherigeTeilnahmen" type="number" name="bisherigeTeilnahmen" value={form.bisherigeTeilnahmen}
                      min="0" onChange={handleChange} onBlur={handleBlur}
                      className={inputClass()}
                    />
                  </Field>
                </div>

                {/* Intern */}
                <SectionHeader title="Interne Angaben" />

                <Field label="Abteilung *" htmlFor="abteilung" error={touched.abteilung ? errors.abteilung : undefined}>
                  <select
                    id="abteilung" name="abteilung" value={form.abteilung}
                    onChange={handleChange} onBlur={handleBlur}
                    aria-describedby={touched.abteilung && errors.abteilung ? "abteilung-error" : undefined}
                    className={inputClass(touched.abteilung ? errors.abteilung : undefined)}
                  >
                    <option value="">— Abteilung wählen —</option>
                    {ABTEILUNGEN.map((a) => <option key={a} value={a}>{a}</option>)}
                  </select>
                </Field>

                <Field label="Standort *" htmlFor="standort" error={touched.standort ? errors.standort : undefined}>
                  <select
                    id="standort" name="standort" value={form.standort}
                    onChange={handleChange} onBlur={handleBlur}
                    aria-describedby={touched.standort && errors.standort ? "standort-error" : undefined}
                    className={inputClass(touched.standort ? errors.standort : undefined)}
                  >
                    <option value="">— Standort wählen —</option>
                    {STANDORTE.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>

                <Field label="T-Shirt-Größe *" htmlFor="tshirt" error={touched.tshirt ? errors.tshirt : undefined}>
                  <div role="group" aria-labelledby="tshirt-label" className="flex flex-wrap gap-2 mt-0.5">
                    {TSHIRT_SIZES.map((size) => (
                      <button
                        key={size}
                        type="button"
                        aria-pressed={form.tshirt === size}
                        onClick={() => {
                          const updated = { ...form, tshirt: size };
                          setForm(updated);
                          setTouched((prev) => ({ ...prev, tshirt: true }));
                          setErrors(validate(updated));
                        }}
                        className={`px-4 py-2 rounded-xl text-sm font-bold border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2d78c3] ${
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
                    <p id="tshirt-error" role="alert" className="mt-1.5 text-xs text-red-400 font-medium">{errors.tshirt}</p>
                  )}
                </Field>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#2d78c3] hover:bg-[#3ca5e1] disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-colors text-lg mt-1 shadow-md shadow-[#2d78c3]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a2a3a]"
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
