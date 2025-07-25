import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isInternalRequest } from "@/lib/checkOrigin";
import * as yup from "yup";
import { combatSkillSchema } from "@/shared/schemas/character/combatSkillSchema";

const extendedCombatSkillSchema = combatSkillSchema.concat(
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
    const combatSkills = await prisma.combatSkill.findMany({
      where: { characterId },
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json({ combatSkills }, { status: 200 });
  } catch (err) {
    console.error("Error fetching combat skills:", err);
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

    await extendedCombatSkillSchema.validate(body, { abortEarly: false });

    const combatSkill = await prisma.combatSkill.create({
      data: {
        characterId: body.characterId,
        group: body.group ?? null,
        skill: body.skill,
        attribute: body.attribute ?? null,
        attackCost: body.attackCost,
        defenseCost: body.defenseCost,
        attackKitValue: body.attackKitValue,
        defenseKitValue: body.defenseKitValue,
      },
    });

    return NextResponse.json({ combatSkill }, { status: 201 });
  } catch (err: any) {
    if (err.name === "ValidationError") {
      return NextResponse.json(
        { error: err.errors.join(", ") },
        { status: 400 }
      );
    }
    console.error("Error saving combat skill:", err);
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
    const combatSkillId = searchParams.get("id");

    if (!combatSkillId) {
      return NextResponse.json(
        { error: "Combat skill id is required" },
        { status: 400 }
      );
    }

    await prisma.combatSkill.delete({
      where: { id: combatSkillId },
    });

    return NextResponse.json(
      { message: "Combat skill deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting combat skill:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
