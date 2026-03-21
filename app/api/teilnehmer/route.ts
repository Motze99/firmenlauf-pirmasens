import { NextRequest, NextResponse } from "next/server";
import { list, del, put } from "@vercel/blob";

function auth(req: NextRequest) {
  const password = req.headers.get("x-admin-password");
  return process.env.ADMIN_PASSWORD && password === process.env.ADMIN_PASSWORD;
}

export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { blobs } = await list({ prefix: "anmeldungen/" });

  const teilnehmer = await Promise.all(
    blobs.map(async (blob) => {
      const res = await fetch(blob.url, {
        headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` },
      });
      const data = await res.json();
      return { ...data, blobUrl: blob.url, blobPathname: blob.pathname };
    })
  );

  teilnehmer.sort((a, b) => a.timestamp.localeCompare(b.timestamp));

  return NextResponse.json({ teilnehmer });
}

export async function DELETE(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { blobUrl } = await req.json();
  if (!blobUrl) return NextResponse.json({ error: "blobUrl fehlt" }, { status: 400 });

  await del(blobUrl);
  return NextResponse.json({ success: true });
}

export async function PATCH(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { blobUrl, blobPathname, vorname, nachname, abteilung, standort, tshirt } = await req.json();
  if (!blobUrl || !blobPathname) return NextResponse.json({ error: "blobUrl fehlt" }, { status: 400 });

  const existing = await fetch(blobUrl, {
    headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` },
  });
  const current = await existing.json();

  await del(blobUrl);
  await put(
    blobPathname,
    JSON.stringify({ ...current, vorname, nachname, abteilung, standort, tshirt }),
    { access: "private", contentType: "application/json" }
  );

  return NextResponse.json({ success: true });
}
