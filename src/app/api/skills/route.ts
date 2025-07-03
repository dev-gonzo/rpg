import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isInternalRequest } from "@/lib/checkOrigin";
import * as yup from "yup";
import { skillSchema } from "@/shared/schemas/character/skillSchema";

const extendedSkillSchema = skillSchema.concat(
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
    return NextResponse.json(
      { error: "characterId query param required" },
      { status: 400 }
    );
  }

  try {
    const skills = await prisma.skill.findMany({
      where: { characterId },
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json({ skills }, { status: 200 });
  } catch (err) {
    console.error("Error fetching skills:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  if (!isInternalRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    await extendedSkillSchema.validate(body, { abortEarly: false });

    const skill = await prisma.skill.create({
      data: {
        characterId: body.characterId,
        group: body.group,
        skill: body.skill,
        attribute: body.attribute,
        cost: body.cost,
        kitValue: body.kitValue,
      },
    });

    return NextResponse.json({ skill }, { status: 201 });
  } catch (err: any) {
    if (err.name === "ValidationError") {
      return NextResponse.json(
        { error: err.errors.join(", ") },
        { status: 400 }
      );
    }
    console.error("Error saving skill:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  if (!isInternalRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const skillId = searchParams.get("id");

    if (!skillId) {
      return NextResponse.json(
        { error: "Skill id is required" },
        { status: 400 }
      );
    }

    await prisma.skill.delete({
      where: { id: skillId },
    });

    return NextResponse.json({ message: "Skill deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting skill:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
