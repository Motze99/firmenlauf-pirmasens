import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { put } from "@vercel/blob";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const MAIL_TO = process.env.MAIL_TO!;
  const body = await req.json();
  const {
    vorname, nachname, geschlecht, geburtsdatum, email,
    strasse, plz, ort, nationalitaet, bisherigeTeilnahmen,
    abteilung, standort, tshirt,
  } = body;

  if (!vorname || !nachname || !geschlecht || !geburtsdatum || !strasse || !plz || !ort || !abteilung || !standort || !tshirt) {
    return NextResponse.json({ error: "Fehlende Felder" }, { status: 400 });
  }

  function row(label: string, value: string, last = false) {
    return `
      <tr>
        <td style="padding: 10px 0; ${last ? "" : "border-bottom: 1px solid #b4e1f0;"} color: #4b87c3; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; width: 180px;">${label}</td>
        <td style="padding: 10px 0; ${last ? "" : "border-bottom: 1px solid #b4e1f0;"} color: #1a2a3a;">${value}</td>
      </tr>`;
  }

  const { error } = await resend.emails.send({
    from: "Park Firmenlauf <onboarding@resend.dev>",
    to: MAIL_TO,
    subject: `Neue Anmeldung: ${vorname} ${nachname} (${standort})`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f0f8ff; border-radius: 12px; overflow: hidden;">
        <div style="background: #2d78c3; padding: 28px 32px;">
          <h1 style="color: white; margin: 0; font-size: 22px;">Neue Anmeldung</h1>
          <p style="color: #b4e1f0; margin: 6px 0 0; font-size: 14px;">Park Firmenlauf Pirmasens 2026 · 11. September 2026</p>
        </div>
        <div style="padding: 28px 32px;">
          <p style="color: #4b87c3; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 8px;">Persönliche Daten</p>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            ${row("Name", `${vorname} ${nachname}`)}
            ${row("Geschlecht", geschlecht)}
            ${row("Geburtsdatum", geburtsdatum)}
            ${row("E-Mail", email || "—", true)}
          </table>
          <p style="color: #4b87c3; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 8px;">Adresse</p>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            ${row("Straße / Hausnr.", strasse)}
            ${row("PLZ / Ort", `${plz} ${ort}`)}
            ${row("Nationalität", nationalitaet || "GER - Deutschland")}
            ${row("Bisherige Teilnahmen", bisherigeTeilnahmen ?? "0", true)}
          </table>
          <p style="color: #4b87c3; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 8px;">Intern</p>
          <table style="width: 100%; border-collapse: collapse;">
            ${row("Abteilung", abteilung)}
            ${row("Standort", standort)}
            ${row("T-Shirt-Größe", `<strong style="font-size: 18px;">${tshirt}</strong>`, true)}
          </table>
        </div>
        <div style="background: #e8f4fd; padding: 16px 32px; font-size: 12px; color: #4b87c3; text-align: center;">
          Automatisch generiert · Park Firmenlauf Pirmasens 2026
        </div>
      </div>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "E-Mail konnte nicht gesendet werden." }, { status: 500 });
  }

  if (email) {
    const { error: confirmError } = await resend.emails.send({
      from: process.env.MAIL_FROM ?? "Park Firmenlauf <onboarding@resend.dev>",
      to: email,
      subject: `Anmeldebestätigung – Park Firmenlauf Pirmasens 2026`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #f0f8ff; border-radius: 12px; overflow: hidden;">
          <div style="background: #2d78c3; padding: 28px 32px;">
            <h1 style="color: white; margin: 0; font-size: 22px;">Du bist dabei, ${vorname}!</h1>
            <p style="color: #b4e1f0; margin: 6px 0 0; font-size: 14px;">Park Firmenlauf Pirmasens 2026 · Fr., 11. September 2026 · 19:30 Uhr</p>
          </div>
          <div style="padding: 28px 32px;">
            <p style="color: #1a2a3a; margin: 0 0 20px; line-height: 1.6;">
              Deine interne Anmeldung für den <strong>Park Firmenlauf Pirmasens 2026</strong> ist eingegangen.
              Das Orgateam von MVZ Südwest meldet alle Teilnehmenden gesammelt beim Veranstalter an – du musst nichts weiter tun.
            </p>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              ${row("Name", `${vorname} ${nachname}`)}
              ${row("T-Shirt-Größe", `<strong style="font-size: 18px;">${tshirt}</strong>`)}
              ${row("Abteilung", abteilung)}
              ${row("Standort", standort, true)}
            </table>
            <div style="background: #2d78c3/10; border-left: 4px solid #2d78c3; padding: 14px 18px; border-radius: 0 8px 8px 0; margin-bottom: 8px;">
              <p style="margin: 0; color: #1a2a3a; font-size: 14px; line-height: 1.6;">
                <strong>Start & Ziel:</strong> Messehalle Pirmasens (Messegelände)<br>
                <strong>Strecke:</strong> ca. 4,2 km durch Innenstadt und Parkgelände<br>
                <strong>After-Run:</strong> Beckenhof
              </p>
            </div>
          </div>
          <div style="background: #e8f4fd; padding: 16px 32px; font-size: 12px; color: #4b87c3; text-align: center;">
            Bei Fragen wende dich an das Orgateam von MVZ Südwest.
          </div>
        </div>
      `,
    });
    if (confirmError) console.error("Bestätigungsmail Fehler:", confirmError);
  }

  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  await put(
    `anmeldungen/${id}.json`,
    JSON.stringify({
      vorname, nachname, geschlecht, geburtsdatum, email,
      strasse, plz, ort,
      nationalitaet: nationalitaet || "GER - Deutschland",
      bisherigeTeilnahmen: bisherigeTeilnahmen ?? "0",
      abteilung, standort, tshirt,
      timestamp: new Date().toISOString(),
    }),
    { access: "private", contentType: "application/json" }
  );

  return NextResponse.json({ success: true });
}
