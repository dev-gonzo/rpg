import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";

const equipmentSchema = yup.object({
  characterId: yup.string().uuid().required(),
  name: yup.string().required(),
  quantity: yup.number().required().min(1),
  classification: yup.string().required(),
  kineticProtection: yup.number().optional(),
  ballisticProtection: yup.number().optional(),
  dexterityPenalty: yup.number().optional(),
  agilityPenalty: yup.number().optional(),
  initiative: yup.number().optional(),
  bookPage: yup.string().optional(),
  description: yup.string().optional(),
});

export async function GET(req: NextRequest, context: any) {
  const { characterId } = context.params;

  if (!characterId) {
    return NextResponse.json(
      { error: "characterId query param required" },
      { status: 400 }
    );
  }

  try {
    const equipments = await prisma.equipment.findMany({
      where: { characterId },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({ equipments }, { status: 200 });
  } catch (error) {
    console.error("Error fetching equipments:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest, context: any) {
  const { characterId } = context.params;

  try {
    const body = await req.json();

    // Adiciona characterId do params ao body para validação
    const dataToValidate = { ...body, characterId };

    await equipmentSchema.validate(dataToValidate, { abortEarly: false });

    const equipment = await prisma.equipment.create({
      data: {
        characterId,
        name: body.name,
        quantity: body.quantity,
        classification: body.classification,
        kineticProtection: body.kineticProtection ?? null,
        ballisticProtection: body.ballisticProtection ?? null,
        dexterityPenalty: body.dexterityPenalty ?? null,
        agilityPenalty: body.agilityPenalty ?? null,
        initiative: body.initiative ?? null,
        bookPage: body.bookPage ?? null,
        description: body.description ?? null,
      },
    });

    return NextResponse.json({ equipment }, { status: 201 });
  } catch (err: any) {
    if (err.name === "ValidationError") {
      return NextResponse.json(
        { error: err.errors.join(", ") },
        { status: 400 }
      );
    }
    console.error("Error creating equipment:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
