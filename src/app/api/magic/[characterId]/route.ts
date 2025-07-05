// app/magic/[characterId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isInternalRequest } from "@/lib/checkOrigin";
import * as yup from "yup";

const magicSchema = yup.object({
  characterId: yup.string().uuid().required(),
  secretSociety: yup.string().nullable(),
  rank: yup.string().nullable(),
  cabala: yup.string().nullable(),
  mentor: yup.string().nullable(),
});

export async function GET(req: NextRequest, { params }: { params: { characterId: string } }) {
  const { characterId } = params;
  if (!characterId) {
    return NextResponse.json({ error: "characterId is required" }, { status: 400 });
  }

  try {
    const character = await prisma.character.findUnique({
      where: { id: characterId },
      select: {
        id: true,
        secretSociety: true,
        rank: true,
        cabala: true,
        mentor: true,
      },
    });

    if (!character) {
      return NextResponse.json({ error: "Character not found" }, { status: 404 });
    }

    return NextResponse.json({ character }, { status: 200 });
  } catch (error) {
    console.error("Error fetching magic data:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isInternalRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  try {
    const body = await req.json();
    await magicSchema.validate(body);

    const characterExists = await prisma.character.findUnique({
      where: { id: body.characterId },
    });
    if (!characterExists) {
      return NextResponse.json({ error: "Character not found" }, { status: 404 });
    }

    // Update magic fields on character
    const updatedCharacter = await prisma.character.update({
      where: { id: body.characterId },
      data: {
        secretSociety: body.secretSociety,
        rank: body.rank,
        cabala: body.cabala,
        mentor: body.mentor,
      },
    });

    return NextResponse.json({ character: updatedCharacter }, { status: 201 });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      return NextResponse.json({ error: error.errors.join(", ") }, { status: 400 });
    }
    console.error("Error creating magic data:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!isInternalRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body.characterId) {
      return NextResponse.json({ error: "characterId is required" }, { status: 400 });
    }

    await magicSchema.validate(body);

    const character = await prisma.character.findUnique({
      where: { id: body.characterId },
    });
    if (!character) {
      return NextResponse.json({ error: "Character not found" }, { status: 404 });
    }

    const updatedCharacter = await prisma.character.update({
      where: { id: body.characterId },
      data: {
        secretSociety: body.secretSociety,
        rank: body.rank,
        cabala: body.cabala,
        mentor: body.mentor,
      },
    });

    return NextResponse.json({ character: updatedCharacter }, { status: 200 });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      return NextResponse.json({ error: error.errors.join(", ") }, { status: 400 });
    }
    console.error("Error updating magic data:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
