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

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const characterId = url.searchParams.get("characterId");

  if (!characterId) {
    return NextResponse.json({ error: "characterId query param required" }, { status: 400 });
  }

  try {
    const improvements = await prisma.improvement.findMany({
      where: { characterId },
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json({ improvements }, { status: 200 });
  } catch (err) {
    console.error("Error fetching improvements:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isInternalRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    await extendedImprovementSchema.validate(body, { abortEarly: false });

    const improvement = await prisma.improvement.create({
      data: {
        characterId: body.characterId,
        name: body.name,
        cost: body.cost,
        kitValue: body.kitValue,
      },
    });

    return NextResponse.json({ improvement }, { status: 201 });
  } catch (err: any) {
    if (err.name === "ValidationError") {
      return NextResponse.json({ error: err.errors.join(", ") }, { status: 400 });
    }
    console.error("Error saving improvement:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isInternalRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const improvementId = searchParams.get("id");

    if (!improvementId) {
      return NextResponse.json({ error: "Improvement id is required" }, { status: 400 });
    }

    await prisma.improvement.delete({
      where: { id: improvementId },
    });

    return NextResponse.json({ message: "Improvement deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting improvement:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
