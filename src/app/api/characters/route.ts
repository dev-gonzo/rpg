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
  const url = new URL(req.url);
  const characterId = url.searchParams.get("characterId");

  if (!characterId) {
    return NextResponse.json(
      { error: "Parâmetro 'characterId' é obrigatório" },
      { status: 400 }
    );
  }

  try {
    const character = await prisma.character.findUnique({
      where: { id: characterId },
    });

    if (!character) {
      return NextResponse.json(
        { error: "Personagem não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ character }, { status: 200 });
  } catch (err) {
    console.error("Erro ao buscar personagem:", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
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
      ...(isMaster ? {} : { controlUserId: userId }), // se isMaster true, não vincula usuário
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
