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
          image: true,

          controlUserId: true,
          controlUser: true,

          isKnown: true,
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
          image: true,

          controlUserId: true,
          controlUser: true,
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
          image: true,
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

export async function PUT(req: NextRequest) {
  const payload = verifyJwt(req);
  if (!payload)
    return NextResponse.json(
      { error: "Usuário não autenticado" },
      { status: 401 }
    );

  try {
    const body = await req.json();
    if (!body.id)
      return NextResponse.json(
        { error: "Id do personagem é obrigatório para atualização" },
        { status: 400 }
      );

    const existingCharacter = await prisma.character.findUnique({
      where: { id: body.id },
    });
    if (!existingCharacter)
      return NextResponse.json(
        { error: "Personagem não encontrado" },
        { status: 404 }
      );

    const updateData = {
      ...existingCharacter,
      isKnown: !existingCharacter?.isKnown,
    };

    const character = await prisma.character.update({
      where: { id: body.id },
      data: updateData,
    });

    return NextResponse.json({ character }, { status: 200 });
  } catch (err: any) {
    console.error("Erro na atualização do personagem:", err);
    if (err.name === "ValidationError") {
      return NextResponse.json(
        { error: err.errors?.[0] ?? "Validation error" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
