import { NextResponse } from "next/server";
import { checkSites } from "../../lib/actions";

export async function GET() {
  await checkSites();
  return NextResponse.json({ ok: true });
}
