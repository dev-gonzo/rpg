import { isInternalRequest } from "@/lib/checkOrigin";
import { prisma } from "@/lib/prisma";
import * as yup from "yup";
import { NextRequest, NextResponse } from "next/server";
import { skillSchema } from "@/shared/schemas/character/skillSchema";

const extendedSkillSchema = skillSchema.concat(
  yup.object({
    characterId: yup.string().uuid("ID inválido").required("Personagem é obrigatório"),
  })
);

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ characterId: string; skillId: string }> }
) {
  const params = await context.params;
  const { skillId } = params;

  if (!skillId) {
    return NextResponse.json(
      { error: "Skill id is required" },
      { status: 400 }
    );
  }

  try {
    const skill = await prisma.skill.findUnique({
      where: { id: skillId },
    });

    if (!skill) {
      return NextResponse.json(
        { error: "Skill not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ skill }, { status: 200 });
  } catch (error) {
    console.error("Error fetching skill:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ characterId: string; skillId: string }> }
) {
  if (!isInternalRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const params = await context.params;
  const { skillId } = params;

  if (!skillId) {
    return NextResponse.json(
      { error: "Skill id is required" },
      { status: 400 }
    );
  }

  try {
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

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ characterId: string; skillId: string }> }
) {
  if (!isInternalRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const params = await context.params;
  const { skillId } = params;

  if (!skillId) {
    return NextResponse.json(
      { error: "Skill id is required" },
      { status: 400 }
    );
  }

  try {
    const body = await req.json();

    await extendedSkillSchema.validate(body, { abortEarly: false });

    const updatedSkill = await prisma.skill.update({
      where: { id: skillId },
      data: {
        characterId: body.characterId,
        group: body.group,
        skill: body.skill,
        attribute: body.attribute,
        cost: body.cost,
        kitValue: body.kitValue,
      },
    });

    return NextResponse.json({ skill: updatedSkill }, { status: 200 });
  } catch (err: any) {
    if (err.name === "ValidationError") {
      return NextResponse.json(
        { error: err.errors.join(", ") },
        { status: 400 }
      );
    }
    console.error("Error updating skill:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
