import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isInternalRequest } from "@/lib/checkOrigin";
import * as yup from "yup";

const pathsFormsSchema = yup.object({
  characterId: yup.string().uuid().required(),
  understandForm: yup.number().required().min(0),
  createForm: yup.number().required().min(0),
  controlForm: yup.number().required().min(0),

  fire: yup.number().required().min(0),
  water: yup.number().required().min(0),
  earth: yup.number().required().min(0),
  air: yup.number().required().min(0),
  light: yup.number().required().min(0),
  darkness: yup.number().required().min(0),

  plants: yup.number().required().min(0),
  animals: yup.number().required().min(0),
  humans: yup.number().required().min(0),
  spiritum: yup.number().required().min(0),
  arkanun: yup.number().required().min(0),
  metamagic: yup.number().required().min(0),
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
    const pathsAndForms = await prisma.pathsAndForms.findUnique({
      where: { characterId },
    });

    if (!pathsAndForms) {
      return NextResponse.json(
        { error: "PathsAndForms not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ pathsAndForms }, { status: 200 });
  } catch (err) {
    console.error("Error fetching paths and forms:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  if (!isInternalRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    await pathsFormsSchema.validate(body, { abortEarly: false });

    // Check if already exists to avoid duplicate
    const existing = await prisma.pathsAndForms.findUnique({
      where: { characterId: body.characterId },
    });
    if (existing) {
      return NextResponse.json(
        { error: "PathsAndForms already exists for this character" },
        { status: 409 }
      );
    }

    const created = await prisma.pathsAndForms.create({
      data: body,
    });

    return NextResponse.json({ pathsAndForms: created }, { status: 201 });
  } catch (err: any) {
    if (err.name === "ValidationError") {
      return NextResponse.json(
        { error: err.errors.join(", ") },
        { status: 400 }
      );
    }
    console.error("Error creating paths and forms:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  if (!isInternalRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    await pathsFormsSchema.validate(body, { abortEarly: false });

    const updated = await prisma.pathsAndForms.update({
      where: { characterId: body.characterId },
      data: body,
    });

    return NextResponse.json({ pathsAndForms: updated }, { status: 200 });
  } catch (err: any) {
    if (err.name === "ValidationError") {
      return NextResponse.json(
        { error: err.errors.join(", ") },
        { status: 400 }
      );
    }
    console.error("Error updating paths and forms:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
