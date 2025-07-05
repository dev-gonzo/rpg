// src/app/api/relevant-person/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";

const relevantPersonUpdateSchema = yup.object({
  id: yup.string().uuid().required(),
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
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const relevantPerson = await prisma.relevantPerson.findUnique({
      where: { id },
    });
    if (!relevantPerson) {
      return NextResponse.json(
        { error: "Relevant person not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ relevantPerson });
  } catch (error) {
    console.error("Error fetching relevant person:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const body = await req.json();
    await relevantPersonUpdateSchema.validate(body, { abortEarly: false });

    if (id !== body.id) {
      return NextResponse.json({ error: "ID mismatch" }, { status: 400 });
    }

    const updatedPerson = await prisma.relevantPerson.update({
      where: { id },
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

    return NextResponse.json({ relevantPerson: updatedPerson });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      return NextResponse.json(
        { error: error.errors.join(", ") },
        { status: 400 }
      );
    }
    console.error("Error updating relevant person:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await prisma.relevantPerson.delete({
      where: { id },
    });
    return NextResponse.json(
      { message: "Relevant person deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting relevant person:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
