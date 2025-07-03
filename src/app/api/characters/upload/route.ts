// src/app/api/characters/upload/route.ts

import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { mkdirSync, existsSync } from "fs";

export async function POST(req: NextRequest) {
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
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true });
    }

    // const ext = path.extname(file.name) || ".jpg"; 
    const ext = ".jpg"; 
    const filename = `${characterId}${ext}`;
    const filepath = path.join(uploadDir, filename);

    await writeFile(filepath, buffer);

    const imageUrl = `/uploads/${filename}`;
    return NextResponse.json({ imageUrl }, { status: 201 });
  } catch (err) {
    console.error("Erro ao fazer upload da imagem:", err);
    return NextResponse.json(
      { error: "Erro ao fazer upload da imagem." },
      { status: 500 }
    );
  }
}
