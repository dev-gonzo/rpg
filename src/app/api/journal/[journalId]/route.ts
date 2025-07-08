import { verifyJwt } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as Yup from "yup";

// Schema do Journal
const journalSchema = Yup.object({
  image1: Yup.string().nullable(),
  image2: Yup.string().nullable(),
  image3: Yup.string().nullable(),
  text: Yup.string().required("O campo texto é obrigatório."),
  status: Yup.string().required("O campo status é obrigatório."),
  isPublic: Yup.boolean().default(false),
  featured: Yup.boolean().default(false),
});

export async function GET(req: NextRequest, context: any) {
  const { journalId } = context.params;

  if (!journalId) {
    return NextResponse.json(
      { error: "journalId is required" },
      { status: 400 }
    );
  }

  try {
    const journal = await prisma.journal.findUnique({
      where: { id: journalId },
    });

    if (!journal) {
      return NextResponse.json({ error: "Journal not found" }, { status: 404 });
    }

    return NextResponse.json({ journal }, { status: 200 });
  } catch (error) {
    console.error("Error fetching journal:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, context: any) {
  const payload = verifyJwt(req);
  if (!payload) {
    return NextResponse.json(
      { error: "Usuário não autenticado" },
      { status: 401 }
    );
  }

  const { journalId } = context.params;

  if (!journalId) {
    return NextResponse.json(
      { error: "journalId is required" },
      { status: 400 }
    );
  }

  try {
    await prisma.journal.delete({
      where: { id: journalId },
    });

    return NextResponse.json(
      { message: "Journal deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting journal:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, context: any) {
  const payload = verifyJwt(req);
  if (!payload) {
    return NextResponse.json(
      { error: "Usuário não autenticado" },
      { status: 401 }
    );
  }

  const { journalId } = context.params;

  if (!journalId) {
    return NextResponse.json(
      { error: "journalId is required" },
      { status: 400 }
    );
  }

  try {
    const body = await req.json();

    await journalSchema.validate(body, { abortEarly: false });

    const journal = await prisma.journal.update({
      where: { id: journalId },
      data: {
        image1: body.image1 ?? null,
        image2: body.image2 ?? null,
        image3: body.image3 ?? null,
        text: body.text,
        status: body.status,
        isPublic: body.isPublic ?? false,
        featured: body.featured ?? false,
      },
    });

    return NextResponse.json({ journal }, { status: 200 });
  } catch (err: any) {
    if (err.name === "ValidationError") {
      return NextResponse.json(
        { error: err.errors.join(", ") },
        { status: 400 }
      );
    }
    console.error("Error updating journal:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}