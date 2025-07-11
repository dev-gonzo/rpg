import { verifyJwt } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as Yup from "yup";

// Schema de validação Yup
const adventureSchema = Yup.object({
  image1: Yup.string().nullable(),
  image2: Yup.string().nullable(),
  image3: Yup.string().nullable(),
  text: Yup.string().required("O campo texto é obrigatório."),
  status: Yup.string().required("O campo status é obrigatório."),
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

  if (!isMaster) {
    return NextResponse.json(
      { error: "Usuário sem permissão" },
      { status: 403 }
    );
  }

  try {
    const pageParam = req.nextUrl.searchParams.get("pag");
    const page = parseInt(pageParam || "1", 10);

    const pageSize = 3;
    const skip = (page - 1) * pageSize;

    const totalAdventures = await prisma.adventure.count();
    const totalPages = Math.ceil(totalAdventures / pageSize);

    const adventures = await prisma.adventure.findMany({
      skip: skip,
      take: pageSize,
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({
      adventures,
      pagination: {
        page: page,
        totalPages: totalPages,
        pageSize: pageSize, 
        totalItems: totalAdventures, 
      },
    });
  } catch (error) {
    console.error("Erro ao buscar adventures: ", error);
    return NextResponse.json(
      { error: "Erro ao buscar diários." },
      { status: 500 }
    );
  }
}


export async function POST(req: NextRequest, context: any) {
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

  try {
    const body = await req.json();

    await adventureSchema.validate(body, { abortEarly: false });

    const adventure = await prisma.adventure.create({
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
    console.error("Error creating adventure:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
