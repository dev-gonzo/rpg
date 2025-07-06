// src/app/api/weapon/[characterId]/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";

const weaponSchema = yup.object({
  characterId: yup.string().uuid().required(),
  name: yup.string().required(),
  description: yup.string().nullable(),
  damage: yup.string().required(),
  initiative: yup.number().required(),
  range: yup.string().nullable(),
  rof: yup.string().nullable(),
  ammunition: yup.string().nullable(),
  bookPage: yup.string().nullable(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { characterId: string } }
) {
  const { characterId } = params;

  if (!characterId) {
    return NextResponse.json(
      { error: "characterId path param required" },
      { status: 400 }
    );
  }

  try {
    const weapons = await prisma.weapon.findMany({
      where: { characterId },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({ weapons }, { status: 200 });
  } catch (error) {
    console.error("Error fetching weapons:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { characterId: string } }
) {
  const { characterId } = params;

  try {
    const body = await req.json();

    // Add characterId from path param into body for validation and creation
    const dataToValidate = { ...body, characterId };

    await weaponSchema.validate(dataToValidate, { abortEarly: false });

    const weapon = await prisma.weapon.create({
      data: {
        characterId,
        name: body.name,
        description: body.description ?? null,
        damage: body.damage,
        initiative: body.initiative,
        range: body.range ?? null,
        rof: body.rof ?? null,
        ammunition: body.ammunition ?? null,
        bookPage: body.bookPage ?? null,
      },
    });

    return NextResponse.json({ weapon }, { status: 201 });
  } catch (err: any) {
    if (err.name === "ValidationError") {
      return NextResponse.json(
        { error: err.errors.join(", ") },
        { status: 400 }
      );
    }
    console.error("Error creating weapon:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
