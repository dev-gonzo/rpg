import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";

const noteSchema = yup.object({
  characterId: yup.string().uuid().required(),
  note: yup.string().required("Nota é obrigatória"),
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
    const notes = await prisma.note.findMany({
      where: { characterId },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({ notes }, { status: 200 });
  } catch (error) {
    console.error("Error fetching notes:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest, context: any) {
  const { characterId } = context.params;

  if (!characterId) {
    return NextResponse.json(
      { error: "characterId is required" },
      { status: 400 }
    );
  }

  try {
    const body = await req.json();

    const payload = { ...body, characterId };

    await noteSchema.validate(payload, { abortEarly: false });

    const note = await prisma.note.create({
      data: {
        characterId,
        note: body.note,
      },
    });

    return NextResponse.json({ note }, { status: 201 });
  } catch (err: any) {
    if (err.name === "ValidationError") {
      return NextResponse.json({ error: err.errors.join(", ") }, { status: 400 });
    }
    console.error("Error creating note:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
