import { checkSitesByName } from "@/app/lib/actions";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const siteName = searchParams.get("name");

  if (!siteName) {
    return NextResponse.json({ error: "Missing site name" }, { status: 400 });
  }

  const result = await checkSitesByName(siteName);

  if (!result.ok) {
    return NextResponse.json(result, { status: 500 });
  }

  return NextResponse.json(result);
}
