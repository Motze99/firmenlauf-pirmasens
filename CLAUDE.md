# CLAUDE.md — Firmenlauf Webseite

## Arbeitsweise

- Antworten auf Deutsch, kurz und direkt
- Erst verstehen, dann umsetzen — bei Unklarheiten kurz nachfragen
- Keine unnötigen Erklärungen oder Zusammenfassungen nach Änderungen
- Immer erst die betroffene Datei lesen, bevor Änderungen vorgeschlagen werden
- Kleine, gezielte Änderungen bevorzugen — kein Over-Engineering
- Keine Features hinzufügen, die nicht explizit angefragt wurden

## Tech Stack

- Next.js 15 + TypeScript + Tailwind CSS
- Framer Motion für Animationen

## Coding-Konventionen

### Allgemein
- Einrückung: 2 Leerzeichen
- Keine trailing whitespace
- Dateien mit Newline am Ende abschließen
- Kommentare nur wo die Logik nicht selbsterklärend ist

### TypeScript
- Strikte Typisierung, kein `any`
- Interfaces für Props und Datenstrukturen
- `const` und `let` statt `var`

### React / Next.js
- Server Components bevorzugen, Client Components nur wenn nötig (`"use client"`)
- Komponenten klein und fokussiert halten
- Dateinamen in kebab-case, Komponenten in PascalCase

### CSS / Tailwind
- Mobile-first Ansatz
- Tailwind-Klassen, keine eigenen CSS-Dateien außer für globale Variablen
- Keine Magic Numbers — Tailwind-Skala verwenden

### Dateistruktur
```
/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
├── lib/
├── public/
└── CLAUDE.md
```

## Design-Regeln

- Nutze den `frontend-design` Skill für alle UI-Entscheidungen
- Nutze `ui-ux-pro-max` für Design-System-Generierung
- Keine generischen AI-Aesthetics
- Bold, distinctive Design-Choices
- Performance-optimiert (Core Web Vitals)
- Vor Beginn: Nutzer per AskUserQuestion über Design-Vorstellungen interviewen

## Projekt-Kontext

**Event:** Park Firmenlauf Pirmasens 2026
**Datum:** Freitag, 11. September 2026, 19:30 Uhr
**Start/Ziel:** Messehalle Pirmasens (Messegelände)
**Strecke:** ca. 4,2 km (Innenstadt, Fußgängerzone, Parkgelände)
**Rahmen:** Teil des 20. Pfälzerwald-Marathon-Wochenendes

**Zielgruppe:** Firmen-Teams, Einzelläufer, Sponsoren

**Design:**
- Stil: Energetisch & sportlich
- Keine generischen AI-Aesthetics, bold und distinctive

**Farbpalette (aus MVZ Südwest Logo extrahiert):**
- `#2d78c3` — Deep Blue (Anker, Headlines, CTAs)
- `#4b87c3` — Primary Blue (Hauptfarbe)
- `#3ca5e1` — Medium Sky Blue (Sekundärfarbe)
- `#4bc3f0` — Light Sky Blue (Akzente, Highlights)
- `#b4e1f0` — Pale Blue (Hintergründe, Karten)
- `#ffffff` — Weiß (Kontrast)
- `#1a2a3a` — Near Black (Text)

**Logo:** `public/logo.png` (extrahiert aus MVZ Südwest SVG)

**Sektionen:**
1. Hero (Datum, Ort, CTA)
2. Anmeldung (Formular direkt auf der Seite)
3. Strecke & Infos (Karte, Distanz, Ablauf)

**Branding:** Logo wird vom Nutzer geliefert — Platzhalter bis dahin einbauen
