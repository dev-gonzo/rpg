// src/app/api/relevant-person/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";

const relevantPersonSchema = yup.object({
  id: yup.string().uuid().notRequired(),
  characterId: yup.string().uuid().required(),
  category: yup.string().required(),
  name: yup.string().required(),
  apparentAge: yup.number().nullable().notRequired(),
  city: yup.string().nullable().notRequired(),
  profession: yup.string().nullable().notRequired(),
  briefDescription: yup.string().nullable().notRequired(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { characterId: string } }
) {
  const { characterId } = params;
  if (!characterId) {
    return NextResponse.json(
      { error: "characterId param required" },
      { status: 400 }
    );
  }

  try {
    const relevantPeople = await prisma.relevantPerson.findMany({
      where: { characterId },
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json({ relevantPeople });
  } catch (error) {
    console.error("Error fetching relevant people:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await relevantPersonSchema.validate(body, { abortEarly: false });

    const newPerson = await prisma.relevantPerson.create({
      data: {
        characterId: body.characterId,
        category: body.category,
        name: body.name,
        apparentAge: body.apparentAge ?? null,
        city: body.city ?? null,
        profession: body.profession ?? null,
        briefDescription: body.briefDescription ?? null,
      },
    });

    return NextResponse.json({ relevantPerson: newPerson }, { status: 201 });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      return NextResponse.json(
        { error: error.errors.join(", ") },
        { status: 400 }
      );
    }
    console.error("Error creating relevant person:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
