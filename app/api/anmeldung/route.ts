import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { put } from "@vercel/blob";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const MAIL_TO = process.env.MAIL_TO!;
  const body = await req.json();
  const { vorname, nachname, abteilung, standort, tshirt } = body;

  if (!vorname || !nachname || !abteilung || !standort || !tshirt) {
    return NextResponse.json({ error: "Fehlende Felder" }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Park Firmenlauf <onboarding@resend.dev>",
    to: MAIL_TO,
    subject: `Neue Anmeldung: ${vorname} ${nachname} (${standort})`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #f0f8ff; border-radius: 12px; overflow: hidden;">
        <div style="background: #2d78c3; padding: 28px 32px;">
          <h1 style="color: white; margin: 0; font-size: 22px;">🏃 Neue Anmeldung</h1>
          <p style="color: #b4e1f0; margin: 6px 0 0; font-size: 14px;">Park Firmenlauf Pirmasens 2026 · 11. September 2026</p>
        </div>
        <div style="padding: 28px 32px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #b4e1f0; color: #4b87c3; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; width: 140px;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #b4e1f0; color: #1a2a3a; font-weight: bold;">${vorname} ${nachname}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #b4e1f0; color: #4b87c3; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em;">Abteilung</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #b4e1f0; color: #1a2a3a;">${abteilung}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #b4e1f0; color: #4b87c3; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em;">Standort</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #b4e1f0; color: #1a2a3a;">${standort}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #4b87c3; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em;">T-Shirt-Größe</td>
              <td style="padding: 10px 0; color: #1a2a3a; font-weight: bold; font-size: 18px;">${tshirt}</td>
            </tr>
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

  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  await put(
    `anmeldungen/${id}.json`,
    JSON.stringify({ vorname, nachname, abteilung, standort, tshirt, timestamp: new Date().toISOString() }),
    { access: "private", contentType: "application/json" }
  );

  return NextResponse.json({ success: true });
}
