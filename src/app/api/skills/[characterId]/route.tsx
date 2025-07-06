import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import * as yup from "yup";

const skillSchema = yup.object({
  characterId: yup.string().uuid().required(),
  group: yup.string().nullable(),
  skill: yup.string().required(),
  attribute: yup.string().nullable(),
  cost: yup.number().required().min(0),
  kitValue: yup.number().required().min(0),
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
    const skills = await prisma.skill.findMany({
      where: { characterId },
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json({ skills }, { status: 200 });
  } catch (err) {
    console.error("Error fetching skills:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    await skillSchema.validate(body, { abortEarly: false });

    const skill = await prisma.skill.create({
      data: {
        characterId: body.characterId,
        group: body.group,
        skill: body.skill,
        attribute: body.attribute,
        cost: body.cost,
        kitValue: body.kitValue,
      },
    });

    return NextResponse.json({ skill }, { status: 201 });
  } catch (err: any) {
    if (err.name === "ValidationError") {
      return NextResponse.json(
        { error: err.errors.join(", ") },
        { status: 400 }
      );
    }
    console.error("Error creating skill:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
