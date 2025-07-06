import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isInternalRequest } from "@/lib/checkOrigin";
import * as yup from "yup";
import { combatSkillSchema } from "@/shared/schemas/character/combatSkillSchema";

const extendedCombatSkillSchema = combatSkillSchema.concat(
  yup.object({
    characterId: yup.string().uuid("ID inválido").required("Personagem é obrigatório"),
  })
);

export async function GET(req: NextRequest, context: any) {
  const { combatSkillId } = context.params;

  if (!combatSkillId) {
    return NextResponse.json(
      { error: "combatSkillId path param required" },
      { status: 400 }
    );
  }

  try {
    const combatSkill = await prisma.combatSkill.findUnique({
      where: { id: combatSkillId },
    });

    if (!combatSkill) {
      return NextResponse.json(
        { error: "Combat skill not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ combatSkill }, { status: 200 });
  } catch (err) {
    console.error("Error fetching combat skill:", err);
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

  const { combatSkillId } = context.params;

  if (!combatSkillId) {
    return NextResponse.json(
      { error: "combatSkillId path param required" },
      { status: 400 }
    );
  }

  try {
    await prisma.combatSkill.delete({
      where: { id: combatSkillId },
    });

    return NextResponse.json(
      { message: "Combat skill deleted" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error deleting combat skill:", err);
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

  const { characterId, combatSkillId } = context.params;

  if (!combatSkillId) {
    return NextResponse.json(
      { error: "combatSkillId path param required" },
      { status: 400 }
    );
  }

  try {
    const body = await req.json();

    // Garantir que characterId do path seja usado
    body.characterId = characterId;

    await extendedCombatSkillSchema.validate(body, { abortEarly: false });

    const updatedCombatSkill = await prisma.combatSkill.update({
      where: { id: combatSkillId },
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

    return NextResponse.json({ combatSkill: updatedCombatSkill }, { status: 200 });
  } catch (err: any) {
    if (err.name === "ValidationError") {
      return NextResponse.json(
        { error: err.errors.join(", ") },
        { status: 400 }
      );
    }
    console.error("Error updating combat skill:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
