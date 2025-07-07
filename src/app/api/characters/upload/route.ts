// src/app/api/characters/upload/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import sharp from "sharp";
import { verifyJwt } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const payload = verifyJwt(req);

  if (!payload) {
    return NextResponse.json(
      { error: "Usuário não autenticado." },
      { status: 401 }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const characterId = formData.get("characterId") as string;

    if (!file || !characterId) {
      return NextResponse.json(
        { error: "Arquivo ou characterId ausente." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const inputBuffer = Buffer.from(bytes);

    // Redimensionar, converter para JPEG e remover metadados
    const processedBuffer = await sharp(inputBuffer)
      .resize({ width: 1080, withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toBuffer();

    const base64Image = processedBuffer.toString("base64");
    const base64WithMime = `data:image/jpeg;base64,${base64Image}`;

    // Atualiza imagem no banco
    await prisma.character.update({
      where: { id: characterId },
      data: { image: base64WithMime },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Erro ao processar upload da imagem:", err);
    return NextResponse.json(
      { error: "Erro interno ao processar imagem." },
      { status: 500 }
    );
  }
}
