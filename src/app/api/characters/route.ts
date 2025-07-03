import { verifyJwt } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { basicDataSchema } from "@/shared/schemas/character/basicDataSchema";
import { NextRequest, NextResponse } from "next/server";

function normalizePayload(data: any) {
  const normalized = { ...data };

  // Strings vazias viram null
  [
    "religion",
    "gender",
    "birthPlace",
    "secretSociety",
    "cabala",
    "rank",
    "mentor",
  ].forEach((field) => {
    if (normalized[field] === "") normalized[field] = null;
  });

  // Campos numéricos null ou undefined viram null
  ["apparentAge", "weightKg", "heightCm"].forEach((field) => {
    if (normalized[field] === null || normalized[field] === undefined)
      normalized[field] = null;
  });

  return normalized;
}

export async function GET(req: NextRequest) {
  const payload = verifyJwt(req);
  if (!payload) {
    return NextResponse.json({ error: "Usuário não autenticado" }, { status: 401 });
  }
  
  const { userId, isMaster } = payload as { userId: string; isMaster?: boolean };

  try {
    const characters = await prisma.character.findMany({
      where: isMaster
        ? {} 
        : { controlUserId: userId },
      orderBy: { name: "asc" },
      include: {
        controlUser: {
          select: { id: true, name: true, email: true },
        },
        attributes: true,
        relevantPeople: true,
        improvements: true,
        skills: true,
        combatSkill: true,
      },
    });

    return NextResponse.json({ characters });
  } catch (error) {
    console.error("Erro ao listar personagens:", error);
    return NextResponse.json({ error: "Erro ao buscar personagens." }, { status: 500 });
  }
}



export async function POST(req: NextRequest) {
  const payload = verifyJwt(req);

  if (!payload) {
    return NextResponse.json(
      { error: "Usuário não autenticado" },
      { status: 401 }
    );
  }

  const { userId, isMaster } = payload as {
    userId: string;
    isMaster?: boolean;
  };

  try {
    const body = await req.json();
    const normalizedBody = normalizePayload(body);

    await basicDataSchema.validate(normalizedBody);

    const birthDate = new Date(normalizedBody.birthDate);
    if (isNaN(birthDate.getTime())) {
      return NextResponse.json(
        { error: "Data de nascimento inválida." },
        { status: 400 }
      );
    }

    const dataToCreate = {
      ...normalizedBody,
      birthDate,
      societyAllies: normalizedBody.societyAllies ?? [],
      ...(isMaster ? {} : { controlUserId: userId }),
    };

    const character = await prisma.character.create({
      data: dataToCreate,
    });

    return NextResponse.json({ character }, { status: 201 });
  } catch (err: any) {
    console.error("Erro na criação do personagem:", err);
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

export async function PUT(req: NextRequest) {
  const payload = verifyJwt(req);

  if (!payload) {
    return NextResponse.json(
      { error: "Usuário não autenticado" },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    if (!body.id) {
      return NextResponse.json(
        { error: "Id do personagem é obrigatório para atualização" },
        { status: 400 }
      );
    }

    const normalizedBody = normalizePayload(body);
    await basicDataSchema.validate(normalizedBody);

    const birthDate = new Date(normalizedBody.birthDate);
    if (isNaN(birthDate.getTime())) {
      return NextResponse.json(
        { error: "Data de nascimento inválida." },
        { status: 400 }
      );
    }

    const character = await prisma.character.update({
      where: { id: body.id },
      data: {
        ...normalizedBody,
        birthDate,
        societyAllies: normalizedBody.societyAllies ?? [],
      },
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

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const characterId = searchParams.get("characterId");

  if (!characterId) {
    return NextResponse.json(
      { error: "ID do personagem não informado." },
      { status: 400 }
    );
  }

  try {
    // Deleta o personagem e, por causa do `onDelete: Cascade`, tudo relacionado será removido
    await prisma.character.delete({
      where: { id: characterId },
    });

    return NextResponse.json(
      { message: "Personagem e dados relacionados deletados com sucesso." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao deletar personagem:", error);
    return NextResponse.json(
      { error: "Erro ao deletar personagem." },
      { status: 500 }
    );
  }
}
