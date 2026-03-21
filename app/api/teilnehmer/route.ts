import { NextRequest, NextResponse } from "next/server";
import { list } from "@vercel/blob";

export async function GET(req: NextRequest) {
  const password = req.headers.get("x-admin-password");

  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { blobs } = await list({ prefix: "anmeldungen/" });

  const teilnehmer = await Promise.all(
    blobs.map(async (blob) => {
      const res = await fetch(blob.url, {
        headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` },
      });
      return res.json();
    })
  );

  teilnehmer.sort((a, b) => a.timestamp.localeCompare(b.timestamp));

  return NextResponse.json({ teilnehmer });
}
