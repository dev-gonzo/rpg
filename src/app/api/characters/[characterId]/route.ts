import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ characterId: string }> }
) {
  const params = await context.params;
  const { characterId } = params;

  if (!characterId) {
    return NextResponse.json(
      { error: "ID do personagem é obrigatório." },
      { status: 400 }
    );
  }

  try {
    const character = await prisma.character.findUnique({
      where: { id: characterId },
      include: {
        controlUser: { select: { id: true, name: true, email: true } },
        attributes: true,
        relevantPeople: true,
        improvements: true,
        skills: true,
        combatSkill: true,
      },
    });

    if (!character) {
      return NextResponse.json(
        { error: "Personagem não encontrado." },
        { status: 404 }
      );
    }

    return NextResponse.json({ character }, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar personagem:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}
