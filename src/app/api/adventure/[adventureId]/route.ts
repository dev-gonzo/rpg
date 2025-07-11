import { verifyJwt } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as Yup from "yup";

// Schema do Journal
const adventureSchema = Yup.object({
  image1: Yup.string().nullable(),
  image2: Yup.string().nullable(),
  image3: Yup.string().nullable(),
  text: Yup.string().required("O campo texto é obrigatório."),
  status: Yup.string().required("O campo status é obrigatório."),
});

export async function GET(req: NextRequest, context: any) {
  const payload = verifyJwt(req);
  if (!payload) {
    return NextResponse.json(
      { error: "Usuário não autenticado" },
      { status: 401 }
    );
  }

  const { isMaster } = payload as { isMaster?: boolean };

  if (!isMaster) {
    return NextResponse.json(
      { error: "Usuário sem permissão" },
      { status: 403 }
    );
  }

  const { adventureId } = context.params;

  if (!adventureId) {
    return NextResponse.json(
      { error: "adventureId is required" },
      { status: 400 }
    );
  }

  try {
    const adventure = await prisma.adventure.findUnique({
      where: { id: adventureId },
    });

    if (!adventure) {
      return NextResponse.json(
        { error: "Adventure not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ adventure }, { status: 200 });
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

  const { isMaster } = payload as { isMaster?: boolean };

  if (!isMaster) {
    return NextResponse.json(
      { error: "Usuário sem permissão" },
      { status: 403 }
    );
  }

  const { adventureId } = context.params;

  if (!adventureId) {
    return NextResponse.json(
      { error: "journalId is required" },
      { status: 400 }
    );
  }

  try {
    await prisma.adventure.delete({
      where: { id: adventureId },
    });

    return NextResponse.json(
      { message: "Adventure deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting adventure:", error);
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

  const { isMaster } = payload as { isMaster?: boolean };

  if (!isMaster) {
    return NextResponse.json(
      { error: "Usuário sem permissão" },
      { status: 403 }
    );
  }

  const { adventureId } = context.params;

  if (!adventureId) {
    return NextResponse.json(
      { error: "adventureId is required" },
      { status: 400 }
    );
  }

  try {
    const body = await req.json();

    await adventureSchema.validate(body, { abortEarly: false });

    const adventure = await prisma.adventure.update({
      where: { id: adventureId },
      data: {
        image1: body.image1 ?? null,
        image2: body.image2 ?? null,
        image3: body.image3 ?? null,
        text: body.text,
        status: body.status,
        order: body.order ? Number(body.order) : null,
      },
    });

    return NextResponse.json({ adventure }, { status: 200 });
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
