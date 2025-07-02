// app/api/characters/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { characterBasicDataSchema } from "@/shared/schemas/characterBasicDataSchema";
import { isInternalRequest } from "@/lib/checkOrigin"; // sua função para validar origem segura

function normalizePayload(data: any) {
  const normalized = { ...data };

  // Transformar strings vazias em null para campos opcionais string
  ["religion", "gender", "birthPlace", "secretSociety", "cabala", "rank", "mentor"].forEach((field) => {
    if (normalized[field] === "") normalized[field] = null;
  });

  // Para campos numéricos aceitar null
  ["apparentAge", "weightKg", "heightCm"].forEach((field) => {
    if (normalized[field] === null || normalized[field] === undefined) {
      normalized[field] = null;
    }
  });

  return normalized;
}

export async function POST(req: NextRequest) {
  if (!isInternalRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const normalizedBody = normalizePayload(body);

    await characterBasicDataSchema.validate(normalizedBody);

    const birthDate = new Date(normalizedBody.birthDate);
    if (isNaN(birthDate.getTime())) {
      return NextResponse.json({ error: "Data de nascimento inválida." }, { status: 400 });
    }

    const exists = await prisma.character.findFirst({
      where: {
        name: normalizedBody.name,
        birthDate,
      },
    });

    if (exists) {
      return NextResponse.json({ error: "Character already exists." }, { status: 409 });
    }

    const dataToCreate = {
      ...normalizedBody,
      birthDate,
      societyAllies: normalizedBody.societyAllies ?? [],
    };

    console.log("Dados para criar personagem:", dataToCreate);

    const character = await prisma.character.create({
      data: dataToCreate,
    });

    return NextResponse.json({ character }, { status: 201 });
  } catch (err: any) {
    console.error("Erro na criação do personagem:", err);
    if (err.name === "ValidationError") {
      return NextResponse.json({ error: err.errors?.[0] ?? "Validation error" }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

