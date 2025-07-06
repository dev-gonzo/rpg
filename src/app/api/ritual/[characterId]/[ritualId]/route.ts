import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: any) {
  const { ritualId } = context.params;

  if (!ritualId) {
    return NextResponse.json(
      { error: "ritualId is required" },
      { status: 400 }
    );
  }

  try {
    const ritual = await prisma.ritual.findUnique({
      where: { id: ritualId },
    });

    if (!ritual) {
      return NextResponse.json({ error: "Ritual not found" }, { status: 404 });
    }

    return NextResponse.json({ ritual }, { status: 200 });
  } catch (err) {
    console.error("Error fetching ritual:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, context: any) {
  const { ritualId } = context.params;

  if (!ritualId) {
    return NextResponse.json(
      { error: "ritualId is required" },
      { status: 400 }
    );
  }

  try {
    const body = await req.json();

    if (!body.name || !body.pathsForms) {
      return NextResponse.json(
        { error: "Name and pathsForms are required" },
        { status: 400 }
      );
    }

    const ritual = await prisma.ritual.update({
      where: { id: ritualId },
      data: {
        name: body.name,
        pathsForms: body.pathsForms,
        description: body.description ?? null,
        bookPage: body.bookPage ?? null,
      },
    });

    return NextResponse.json({ ritual }, { status: 200 });
  } catch (err) {
    console.error("Error updating ritual:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, context: any) {
  const { characterId, ritualId } = context.params;

  if (!characterId || !ritualId) {
    return NextResponse.json(
      { error: "characterId and ritualId are required" },
      { status: 400 }
    );
  }

  try {
    const ritual = await prisma.ritual.findUnique({
      where: { id: ritualId },
    });

    if (!ritual) {
      return NextResponse.json(
        { error: "Ritual not found" },
        { status: 404 }
      );
    }

    await prisma.ritual.delete({
      where: { id: ritualId },
    });

    return NextResponse.json(
      { message: "Ritual deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error deleting ritual:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
