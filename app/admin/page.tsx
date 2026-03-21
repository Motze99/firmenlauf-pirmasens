"use client";

import { useState, useMemo } from "react";

interface Teilnehmer {
  vorname: string;
  nachname: string;
  abteilung: string;
  standort: string;
  tshirt: string;
  timestamp: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function exportCsv(teilnehmer: Teilnehmer[]) {
  const header = "Vorname,Nachname,Abteilung,Standort,T-Shirt,Angemeldet am";
  const rows = teilnehmer.map((t) =>
    [t.vorname, t.nachname, t.abteilung, t.standort, t.tshirt, formatDate(t.timestamp)]
      .map((v) => `"${v}"`)
      .join(",")
  );
  const csv = [header, ...rows].join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `firmenlauf-anmeldungen-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [teilnehmer, setTeilnehmer] = useState<Teilnehmer[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [filterAbteilung, setFilterAbteilung] = useState("");
  const [filterStandort, setFilterStandort] = useState("");
  const [filterTshirt, setFilterTshirt] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/teilnehmer", {
        headers: { "x-admin-password": password },
      });
      if (res.status === 401) {
        setError("Falsches Passwort.");
        return;
      }
      if (!res.ok) throw new Error();
      const data = await res.json();
      setTeilnehmer(data.teilnehmer);
    } catch {
      setError("Fehler beim Laden der Daten.");
    } finally {
      setLoading(false);
    }
  }

  const abteilungen = useMemo(
    () => (teilnehmer ? [...new Set(teilnehmer.map((t) => t.abteilung))].sort() : []),
    [teilnehmer]
  );
  const standorte = useMemo(
    () => (teilnehmer ? [...new Set(teilnehmer.map((t) => t.standort))].sort() : []),
    [teilnehmer]
  );
  const tshirtSizes = useMemo(
    () => (teilnehmer ? [...new Set(teilnehmer.map((t) => t.tshirt))].sort() : []),
    [teilnehmer]
  );

  const filtered = useMemo(() => {
    if (!teilnehmer) return [];
    return teilnehmer.filter(
      (t) =>
        (!filterAbteilung || t.abteilung === filterAbteilung) &&
        (!filterStandort || t.standort === filterStandort) &&
        (!filterTshirt || t.tshirt === filterTshirt)
    );
  }, [teilnehmer, filterAbteilung, filterStandort, filterTshirt]);

  const tshirtStats = useMemo(() => {
    if (!filtered.length) return {};
    return filtered.reduce<Record<string, number>>((acc, t) => {
      acc[t.tshirt] = (acc[t.tshirt] ?? 0) + 1;
      return acc;
    }, {});
  }, [filtered]);

  if (teilnehmer === null) {
    return (
      <main className="min-h-screen bg-[#1a2a3a] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <span className="text-[#4bc3f0] font-bold text-xs uppercase tracking-widest">Admin</span>
            <h1 className="text-3xl font-black text-white mt-1">Teilnehmerliste</h1>
            <p className="text-[#b4e1f0] text-sm mt-2">Park Firmenlauf Pirmasens 2026</p>
          </div>
          <form
            onSubmit={handleLogin}
            className="bg-white/5 border border-[#2d78c3]/40 rounded-2xl p-8 flex flex-col gap-4"
          >
            <label htmlFor="password" className="block text-xs font-bold text-[#4bc3f0] uppercase tracking-wider">
              Passwort
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin-Passwort eingeben"
              className="w-full border border-[#b4e1f0] rounded-xl px-4 py-2.5 text-[#1a2a3a] bg-white outline-none focus-visible:ring-2 focus-visible:ring-[#2d78c3]"
              autoFocus
            />
            {error && <p className="text-red-400 text-sm font-medium">{error}</p>}
            <button
              type="submit"
              disabled={loading || !password}
              className="bg-[#2d78c3] hover:bg-[#3ca5e1] disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-colors"
            >
              {loading ? "Laden …" : "Anmelden"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f0f8ff] px-4 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
          <div>
            <span className="text-[#2d78c3] font-bold text-xs uppercase tracking-widest">Admin</span>
            <h1 className="text-3xl font-black text-[#1a2a3a] mt-0.5">Teilnehmerliste</h1>
            <p className="text-[#4b87c3] text-sm mt-1">Park Firmenlauf Pirmasens · 11. September 2026</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => exportCsv(filtered)}
              className="bg-[#2d78c3] hover:bg-[#3ca5e1] text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"
            >
              CSV exportieren
            </button>
            <button
              onClick={() => { setTeilnehmer(null); setPassword(""); }}
              className="border border-[#b4e1f0] text-[#4b87c3] hover:border-[#2d78c3] font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"
            >
              Abmelden
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-[#b4e1f0] rounded-2xl p-5">
            <p className="text-xs font-bold text-[#4b87c3] uppercase tracking-wider mb-1">Gesamt</p>
            <p className="text-4xl font-black text-[#2d78c3]">{filtered.length}</p>
          </div>
          {Object.entries(tshirtStats)
            .sort(([a], [b]) => ["XS", "S", "M", "L", "XL", "XXL", "XXXL"].indexOf(a) - ["XS", "S", "M", "L", "XL", "XXL", "XXXL"].indexOf(b))
            .slice(0, 3)
            .map(([size, count]) => (
              <div key={size} className="bg-white border border-[#b4e1f0] rounded-2xl p-5">
                <p className="text-xs font-bold text-[#4b87c3] uppercase tracking-wider mb-1">T-Shirt {size}</p>
                <p className="text-4xl font-black text-[#1a2a3a]">{count}</p>
              </div>
            ))}
        </div>

        {/* T-Shirt Übersicht (alle Größen) */}
        {Object.keys(tshirtStats).length > 0 && (
          <div className="bg-white border border-[#b4e1f0] rounded-2xl p-5 mb-6">
            <p className="text-xs font-bold text-[#4b87c3] uppercase tracking-wider mb-3">T-Shirt-Größen Übersicht</p>
            <div className="flex flex-wrap gap-3">
              {["XS", "S", "M", "L", "XL", "XXL", "XXXL"].map((size) =>
                tshirtStats[size] ? (
                  <div key={size} className="flex items-center gap-2 bg-[#f0f8ff] border border-[#b4e1f0] rounded-xl px-4 py-2">
                    <span className="font-bold text-[#1a2a3a]">{size}</span>
                    <span className="text-[#2d78c3] font-black">{tshirtStats[size]}x</span>
                  </div>
                ) : null
              )}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white border border-[#b4e1f0] rounded-2xl p-5 mb-6 flex flex-wrap gap-4">
          <div className="flex flex-col gap-1.5 min-w-[160px]">
            <label className="text-xs font-bold text-[#4b87c3] uppercase tracking-wider">Abteilung</label>
            <select
              value={filterAbteilung}
              onChange={(e) => setFilterAbteilung(e.target.value)}
              className="border border-[#b4e1f0] rounded-xl px-3 py-2 text-sm text-[#1a2a3a] outline-none focus-visible:ring-2 focus-visible:ring-[#2d78c3]"
            >
              <option value="">Alle</option>
              {abteilungen.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5 min-w-[160px]">
            <label className="text-xs font-bold text-[#4b87c3] uppercase tracking-wider">Standort</label>
            <select
              value={filterStandort}
              onChange={(e) => setFilterStandort(e.target.value)}
              className="border border-[#b4e1f0] rounded-xl px-3 py-2 text-sm text-[#1a2a3a] outline-none focus-visible:ring-2 focus-visible:ring-[#2d78c3]"
            >
              <option value="">Alle</option>
              {standorte.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5 min-w-[120px]">
            <label className="text-xs font-bold text-[#4b87c3] uppercase tracking-wider">T-Shirt</label>
            <select
              value={filterTshirt}
              onChange={(e) => setFilterTshirt(e.target.value)}
              className="border border-[#b4e1f0] rounded-xl px-3 py-2 text-sm text-[#1a2a3a] outline-none focus-visible:ring-2 focus-visible:ring-[#2d78c3]"
            >
              <option value="">Alle</option>
              {tshirtSizes.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          {(filterAbteilung || filterStandort || filterTshirt) && (
            <div className="flex items-end">
              <button
                onClick={() => { setFilterAbteilung(""); setFilterStandort(""); setFilterTshirt(""); }}
                className="text-sm text-[#4b87c3] hover:text-[#2d78c3] font-medium py-2"
              >
                Filter zurücksetzen
              </button>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="bg-white border border-[#b4e1f0] rounded-2xl overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-[#4b87c3]">
              {teilnehmer.length === 0 ? "Noch keine Anmeldungen vorhanden." : "Keine Einträge für diesen Filter."}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#f0f8ff] border-b border-[#b4e1f0]">
                    <th className="text-left px-5 py-3.5 text-xs font-bold text-[#4b87c3] uppercase tracking-wider">#</th>
                    <th className="text-left px-5 py-3.5 text-xs font-bold text-[#4b87c3] uppercase tracking-wider">Name</th>
                    <th className="text-left px-5 py-3.5 text-xs font-bold text-[#4b87c3] uppercase tracking-wider">Abteilung</th>
                    <th className="text-left px-5 py-3.5 text-xs font-bold text-[#4b87c3] uppercase tracking-wider">Standort</th>
                    <th className="text-left px-5 py-3.5 text-xs font-bold text-[#4b87c3] uppercase tracking-wider">T-Shirt</th>
                    <th className="text-left px-5 py-3.5 text-xs font-bold text-[#4b87c3] uppercase tracking-wider">Angemeldet</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((t, i) => (
                    <tr key={i} className="border-b border-[#f0f8ff] hover:bg-[#f0f8ff]/60 transition-colors">
                      <td className="px-5 py-3.5 text-[#4b87c3] font-medium">{i + 1}</td>
                      <td className="px-5 py-3.5 font-bold text-[#1a2a3a]">{t.vorname} {t.nachname}</td>
                      <td className="px-5 py-3.5 text-[#1a2a3a]">{t.abteilung}</td>
                      <td className="px-5 py-3.5 text-[#1a2a3a]">{t.standort}</td>
                      <td className="px-5 py-3.5">
                        <span className="bg-[#2d78c3] text-white font-bold text-xs px-2.5 py-1 rounded-lg">{t.tshirt}</span>
                      </td>
                      <td className="px-5 py-3.5 text-[#4b87c3] text-xs">{formatDate(t.timestamp)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
