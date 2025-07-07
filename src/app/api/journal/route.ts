import { verifyJwt } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as Yup from "yup";

const PUBLIC_STATUSES = ["DRAFT", "FINALIZED"];

// Schema de validação Yup
const journalSchema = Yup.object({
  image1: Yup.string().nullable(),
  image2: Yup.string().nullable(),
  image3: Yup.string().nullable(),
  text: Yup.string().required("O campo texto é obrigatório."),
  status: Yup.string().required("O campo status é obrigatório."),
  isPublic: Yup.boolean().default(false),
});

export async function GET(req: NextRequest) {
  const payload = verifyJwt(req);

  if (!payload) {
    return NextResponse.json(
      { error: "Usuário não autenticado" },
      { status: 401 }
    );
  }

  const { isMaster } = payload as { isMaster?: boolean };

  try {
    let journals;

    if (isMaster) {
      journals = await prisma.journal.findMany({
        orderBy: { createdAt: "desc" },
      });
    } else {
      journals = await prisma.journal.findMany({
        where: {
          isPublic: true,
          status: { in: PUBLIC_STATUSES },
        },
        orderBy: { createdAt: "desc" },
      });
    }

    return NextResponse.json({ journals });
  } catch (error) {
    console.error("Erro ao buscar journals: ", error);
    return NextResponse.json(
      { error: "Erro ao buscar diários." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const payload = verifyJwt(req);

  if (!payload) {
    return NextResponse.json(
      { error: "Usuário não autenticado" },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();

    // Validação Yup
    await journalSchema.validate(body, { abortEarly: false });

    const { image1, image2, image3, text, status, isPublic } = body;

    const newJournal = await prisma.journal.create({
      data: {
        image1: "",
        image2: "",
        image3: "",
        text,
        status,
        isPublic: isPublic ?? false,
      },
    });

    return NextResponse.json(newJournal, { status: 201 });
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      return NextResponse.json(
        { error: "Erro de validação", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Erro ao criar diário: ", error);
    return NextResponse.json(
      { error: "Erro ao criar diário." },
      { status: 500 }
    );
  }
}