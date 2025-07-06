import { verifyJwt } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { basicDataSchema } from "@/shared/schemas/character/basicDataSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const payload = verifyJwt(req);
  if (!payload) {
    return NextResponse.json(
      { error: "Usuário não autenticado" },
      { status: 401 }
    );
  }

  const { isMaster } = payload as { isMaster?: boolean };

  try {
    if (isMaster) {
      const characters = await prisma.character.findMany({
        orderBy: { name: "asc" },
        select: {
          id: true,
          name: true,
          age: true,
          apparentAge: true,
          profession: true,

          hitPoints: true,
          currentHitPoints: true,
          initiative: true,
          currentInitiative: true,
          heroPoints: true,
          currentHeroPoints: true,
          magicPoints: true,
          currentMagicPoints: true,
          faithPoints: true,
          currentFaithPoints: true,
          protectionIndex: true,
          currentProtectionIndex: true,
          
          controlUserId: true,
        },
      });

      return NextResponse.json({ characters });
    } else {
      const controlledCharacters = await prisma.character.findMany({
        where: {
          NOT: { controlUserId: null },
        },
        orderBy: { name: "asc" },
        select: {
          id: true,
          name: true,
          age: true,
          apparentAge: true,
          profession: true,
          
          hitPoints: true,
          currentHitPoints: true,
          initiative: true,
          currentInitiative: true,
          heroPoints: true,
          currentHeroPoints: true,
          magicPoints: true,
          currentMagicPoints: true,
          faithPoints: true,
          currentFaithPoints: true,
          protectionIndex: true,
          currentProtectionIndex: true,

          controlUserId: true,
        },
      });

      const knownCharacters = await prisma.character.findMany({
        where: {
          controlUserId: null,
          isKnown: true,
        },
        orderBy: { name: "asc" },
        select: {
          id: true,
          name: true,
          age: true,
          apparentAge: true,
          profession: true,
        },
      });

      const characters = [...controlledCharacters, ...knownCharacters];

      return NextResponse.json({ characters });
    }
  } catch (error) {
    console.error("Erro ao listar personagens:", error);
    return NextResponse.json(
      { error: "Erro ao buscar personagens." },
      { status: 500 }
    );
  }
}
