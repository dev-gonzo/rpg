import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: any) {
  const { id } = context.params;

  if (!id) {
    return NextResponse.json({ error: "backgroundId is required" }, { status: 400 });
  }

  try {
    const background = await prisma.characterBackground.findUnique({ where: { id } });

    if (!background) {
      return NextResponse.json({ error: "Background not found" }, { status: 404 });
    }

    return NextResponse.json({ background }, { status: 200 });
  } catch (err) {
    console.error("Error fetching character background:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context: any) {
  const { id } = context.params;

  if (!id) {
    return NextResponse.json({ error: "backgroundId is required" }, { status: 400 });
  }

  try {
    const body = await req.json();

    const background = await prisma.characterBackground.update({
      where: { id },
      data: {
        title: body.title,
        text: body.text,
        isPublic: body.isPublic ?? false,
      },
    });

    return NextResponse.json({ background }, { status: 200 });
  } catch (err) {
    console.error("Error updating character background:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: any) {
  const { id } = context.params;

  if (!id) {
    return NextResponse.json({ error: "backgroundId is required" }, { status: 400 });
  }

  try {
    const background = await prisma.characterBackground.findUnique({ where: { id } });

    if (!background) {
      return NextResponse.json({ error: "Background not found" }, { status: 404 });
    }

    await prisma.characterBackground.delete({ where: { id } });

    return NextResponse.json({ message: "Background deleted successfully" }, { status: 200 });
  } catch (err) {
    console.error("Error deleting character background:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
