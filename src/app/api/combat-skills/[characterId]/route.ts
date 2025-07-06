// src/app/api/combat-skills/[characterId]/route.ts
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

export async function POST(
  req: NextRequest,
  { params }: { params: { characterId: string } }
) {
  if (!isInternalRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { characterId } = params;

  if (!characterId) {
    return NextResponse.json(
      { error: "characterId path param required" },
      { status: 400 }
    );
  }

  try {
    const body = await req.json();

    // Ensure body.characterId matches path param
    body.characterId = characterId;

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
