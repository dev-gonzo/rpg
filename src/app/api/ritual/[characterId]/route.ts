import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";

const ritualSchema = yup.object({
  characterId: yup.string().uuid().required(),
  name: yup.string().required("Nome é obrigatório"),
  pathsForms: yup.string().required("Forma e Caminhos é obrigatório"),
  description: yup.string().notRequired(),
  bookPage: yup.string().notRequired(),
});

export async function GET(req: NextRequest, context: any) {
  const { characterId } = context.params;

  if (!characterId) {
    return NextResponse.json(
      { error: "characterId is required" },
      { status: 400 }
    );
  }

  try {
    const rituals = await prisma.ritual.findMany({
      where: { characterId },
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json({ rituals }, { status: 200 });
  } catch (err) {
    console.error("Error fetching rituals:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    await ritualSchema.validate(body, { abortEarly: false });

    const ritual = await prisma.ritual.create({
      data: {
        characterId: body.characterId,
        name: body.name,
        pathsForms: body.pathsForms,
        description: body.description,
        bookPage: body.bookPage,
      },
    });

    return NextResponse.json({ ritual }, { status: 201 });
  } catch (err: any) {
    if (err.name === "ValidationError") {
      return NextResponse.json(
        { error: err.errors.join(", ") },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
