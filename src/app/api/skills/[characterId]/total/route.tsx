import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ characterId: string }> }
) {
  const params = await context.params;
  const characterId = params.characterId;

  if (!characterId) {
    return NextResponse.json(
      { error: "characterId is required" },
      { status: 400 }
    );
  }

  try {
    const skillTotals = await prisma.skill.aggregate({
      where: { characterId },
      _sum: {
        cost: true,
        kitValue: true,
      },
    });

    const combatTotals = await prisma.combatSkill.aggregate({
      where: { characterId },
      _sum: {
        attackCost: true,
        defenseCost: true,
        attackKitValue: true,
        defenseKitValue: true,
      },
    });

    const totalCost =
      (skillTotals._sum.cost ?? 0) +
      (combatTotals._sum.attackCost ?? 0) +
      (combatTotals._sum.defenseCost ?? 0);

    const totalKit =
      (skillTotals._sum.kitValue ?? 0) +
      (combatTotals._sum.attackKitValue ?? 0) +
      (combatTotals._sum.defenseKitValue ?? 0);

    return NextResponse.json(
      {
        skill: {
          totalCost: skillTotals._sum.cost ?? 0,
          totalKit: skillTotals._sum.kitValue ?? 0,
        },
        combatSkill: {
          totalCost:
            (combatTotals._sum.attackCost ?? 0) +
            (combatTotals._sum.defenseCost ?? 0),
          totalKit:
            (combatTotals._sum.attackKitValue ?? 0) +
            (combatTotals._sum.defenseKitValue ?? 0),
        },
        totalCost,
        totalKit,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching totals:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
