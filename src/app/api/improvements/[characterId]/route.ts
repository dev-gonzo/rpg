import { isInternalRequest } from "@/lib/checkOrigin";
import { prisma } from "@/lib/prisma";
import { improvementSchema } from "@/shared/schemas/character/improvementSchema";
import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";

const extendedImprovementSchema = improvementSchema.concat(
  yup.object({
    characterId: yup
      .string()
      .uuid("ID inválido")
      .required("Personagem é obrigatório"),
  })
);

export async function GET(req: NextRequest, context: any) {
  const { improvementId } = context.params;

  if (!improvementId) {
    return NextResponse.json(
      { error: "Improvement id is required" },
      { status: 400 }
    );
  }

  try {
    const improvement = await prisma.improvement.findUnique({
      where: { id: improvementId },
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

export async function DELETE(req: NextRequest, context: any) {
  if (!isInternalRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { improvementId } = context.params;

  if (!improvementId) {
    return NextResponse.json(
      { error: "Improvement id is required" },
      { status: 400 }
    );
  }

  try {
    await prisma.improvement.delete({
      where: { id: improvementId },
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

export async function PUT(req: NextRequest, context: any) {
  if (!isInternalRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { improvementId } = context.params;

  if (!improvementId) {
    return NextResponse.json(
      { error: "Improvement id is required" },
      { status: 400 }
    );
  }

  try {
    const body = await req.json();

    await extendedImprovementSchema.validate(body, { abortEarly: false });

    const updatedImprovement = await prisma.improvement.update({
      where: { id: improvementId },
      data: {
        characterId: body.characterId,
        name: body.name,
        cost: body.cost,
        kitValue: body.kitValue,
      },
    });

    return NextResponse.json({ improvement: updatedImprovement }, { status: 200 });
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
