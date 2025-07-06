import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ characterId: string }> }
) {
  const params = await context.params;
  const { characterId } = params;

  if (!characterId) {
    return NextResponse.json(
      { error: "characterId is required" },
      { status: 400 }
    );
  }

  try {
    const character = await prisma.character.findUnique({
      where: { id: characterId },
      select: {
        id: true,
        controlUserId: true,
      },
    });

    if (!character) {
      return NextResponse.json(
        { error: "Character not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { characterId: character.id, controlUserId: character.controlUserId },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching magic data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}