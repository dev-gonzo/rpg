import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isInternalRequest } from "@/lib/checkOrigin";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const characterId = url.searchParams.get("characterId");

  if (!characterId) {
    return NextResponse.json({ error: "characterId query param required" }, { status: 400 });
  }

  try {
    const attribute = await prisma.attribute.findUnique({
      where: { characterId },
    });

    if (!attribute) {
      return NextResponse.json({ error: "Attributes not found for character" }, { status: 404 });
    }

    return NextResponse.json({ attribute }, { status: 200 });
  } catch (err: any) {
    console.error("Error fetching attributes:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isInternalRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    const {
      characterId,
      CON,
      FR,
      DEX,
      AGI,
      INT,
      WILL,
      PER,
      CAR,
    } = body;

    const existing = await prisma.attribute.findUnique({
      where: { characterId },
    });

    if (existing) {
      const updated = await prisma.attribute.update({
        where: { characterId },
        data: { CON, FR, DEX, AGI, INT, WILL, PER, CAR },
      });
      return NextResponse.json({ attribute: updated }, { status: 200 });
    }

    const created = await prisma.attribute.create({
      data: { characterId, CON, FR, DEX, AGI, INT, WILL, PER, CAR },
    });
    return NextResponse.json({ attribute: created }, { status: 201 });
  } catch (err: any) {
    console.error("Error saving attributes:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
