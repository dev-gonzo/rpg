import { prisma } from "@/lib/prisma";
import { improvementSchema } from "@/shared/schemas/character/improvementSchema";
import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";

const extendedImprovementSchema = improvementSchema.concat(
  yup.object({
    characterId: yup.string().uuid("ID inválido").required("Personagem é obrigatório"),
  })
);

export async function GET(
  req: NextRequest,
  { params }: { params: { characterId: string; improvementId: string } }
) {
  const { characterId, improvementId } = params;

  if (!characterId || !improvementId) {
    return NextResponse.json(
      { error: "characterId and improvementId are required" },
      { status: 400 }
    );
  }

  try {
    const improvement = await prisma.improvement.findFirst({
      where: {
        id: improvementId,
        characterId,
      },
    });

    if (!improvement) {
      return NextResponse.json(
        { error: "Improvement not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ improvement }, { status: 200 });
  } catch (error) {
    console.error("Error fetching improvement:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { characterId: string; improvementId: string } }
) {
  const { characterId, improvementId } = params;

  if (!characterId || !improvementId) {
    return NextResponse.json(
      { error: "characterId and improvementId are required" },
      { status: 400 }
    );
  }

  try {
    await prisma.improvement.deleteMany({
      where: {
        id: improvementId,
        characterId,
      },
    });

    return NextResponse.json({ message: "Improvement deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting improvement:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { characterId: string; improvementId: string } }
) {
  const { characterId, improvementId } = params;

  if (!characterId || !improvementId) {
    return NextResponse.json(
      { error: "characterId and improvementId are required" },
      { status: 400 }
    );
  }

  try {
    const body = await req.json();

    await extendedImprovementSchema.validate(body, { abortEarly: false });

    const updatedImprovement = await prisma.improvement.updateMany({
      where: {
        id: improvementId,
        characterId,
      },
      data: {
        characterId: body.characterId,
        name: body.name,
        cost: body.cost,
        kitValue: body.kitValue,
      },
    });

    // updateMany returns count, so refetch updated record:
    const improvement = await prisma.improvement.findFirst({
      where: {
        id: improvementId,
        characterId,
      },
    });

    return NextResponse.json({ improvement }, { status: 200 });
  } catch (err: any) {
    if (err.name === "ValidationError") {
      return NextResponse.json(
        { error: err.errors.join(", ") },
        { status: 400 }
      );
    }
    console.error("Error updating improvement:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
