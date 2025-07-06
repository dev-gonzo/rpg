import { isInternalRequest } from "@/lib/checkOrigin";
import { prisma } from "@/lib/prisma";
import * as yup from "yup";
import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "@/lib/auth";

const characterBackgroundSchema = yup.object({
  characterId: yup
    .string()
    .uuid("ID inválido")
    .required("Personagem é obrigatório"),
  title: yup.string().required("Título é obrigatório"),
  text: yup.string().required("Texto é obrigatório"),
  isPublic: yup.boolean().default(false),
});

export async function GET(req: NextRequest) {
  const payload = verifyJwt(req);
  if (!payload) {
    return NextResponse.json(
      { error: "Usuário não autenticado" },
      { status: 401 }
    );
  }

  const { isMaster, userId } = payload as {
    isMaster?: boolean;
    userId: string;
  };

  const url = new URL(req.url);
  const characterId = url.searchParams.get("characterId");

  if (!characterId) {
    return NextResponse.json(
      { error: "characterId query param required" },
      { status: 400 }
    );
  }

  try {
    const backgrounds = await prisma.characterBackground.findMany({
      where: { characterId },
      orderBy: { createdAt: "asc" },
      include: { character: true },
    });

    let backgroundResponse = backgrounds;

    if (!isMaster) {
      backgroundResponse = backgrounds.filter((item) => {
        const controlUserIdRaw = item.character?.controlUserId;
        const userIdRaw = userId;

        console.log(
          "Comparando controlUserId:",
          `"${controlUserIdRaw}"`,
          typeof controlUserIdRaw
        );
        console.log("Com userId:", `"${userIdRaw}"`, typeof userIdRaw);

        if (!controlUserIdRaw || !userIdRaw) return false;

        const controlUserId = controlUserIdRaw.trim().toLowerCase();
        const currentUserId = userIdRaw.trim().toLowerCase();

        const equal = controlUserId === currentUserId;

        console.log("IDs iguais?", equal);

        return item.isPublic === true || equal;
      });
    }

    return NextResponse.json({ backgrounds: backgroundResponse }, { status: 200 });
  } catch (err) {
    console.error("Error fetching character backgrounds:", err);
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
    await characterBackgroundSchema.validate(body, { abortEarly: false });

    const background = await prisma.characterBackground.create({
      data: {
        characterId: body.characterId,
        title: body.title,
        text: body.text,
        isPublic: body.isPublic ?? false,
      },
    });

    return NextResponse.json({ background }, { status: 201 });
  } catch (err: any) {
    if (err.name === "ValidationError") {
      return NextResponse.json(
        { error: err.errors.join(", ") },
        { status: 400 }
      );
    }
    console.error("Error creating character background:", err);
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
    await characterBackgroundSchema
      .concat(
        yup.object({
          id: yup.string().uuid("ID inválido").required("ID é obrigatório"),
        })
      )
      .validate(body, { abortEarly: false });

    const background = await prisma.characterBackground.update({
      where: { id: body.id },
      data: {
        title: body.title,
        text: body.text,
        isPublic: body.isPublic ?? false,
      },
    });

    return NextResponse.json({ background }, { status: 200 });
  } catch (err: any) {
    if (err.name === "ValidationError") {
      return NextResponse.json(
        { error: err.errors.join(", ") },
        { status: 400 }
      );
    }
    console.error("Error updating character background:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  if (!isInternalRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Background id is required" },
        { status: 400 }
      );
    }

    await prisma.characterBackground.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Character background deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting character background:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
