import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";

const noteSchema = yup.object({
  characterId: yup.string().uuid().required(),
  note: yup.string().required("Nota é obrigatória"),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { noteId: string } }
) {
  const { noteId } = params;

  if (!noteId) {
    return NextResponse.json(
      { error: "noteId is required" },
      { status: 400 }
    );
  }

  try {
    const note = await prisma.note.findUnique({
      where: { id: noteId },
    });

    if (!note) {
      return NextResponse.json(
        { error: "Note not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ note }, { status: 200 });
  } catch (error) {
    console.error("Error fetching note:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { noteId: string } }
) {
  const { noteId } = params;

  if (!noteId) {
    return NextResponse.json(
      { error: "noteId is required" },
      { status: 400 }
    );
  }

  try {
    await prisma.note.delete({
      where: { id: noteId },
    });

    return NextResponse.json(
      { message: "Note deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting note:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { noteId: string } }
) {
  const { noteId } = params;

  if (!noteId) {
    return NextResponse.json(
      { error: "noteId is required" },
      { status: 400 }
    );
  }

  try {
    const body = await req.json();

    await noteSchema.validate(body, { abortEarly: false });

    const updatedNote = await prisma.note.update({
      where: { id: noteId },
      data: {
        note: body.note,
      },
    });

    return NextResponse.json({ note: updatedNote }, { status: 200 });
  } catch (err: any) {
    if (err.name === "ValidationError") {
      return NextResponse.json(
        { error: err.errors.join(", ") },
        { status: 400 }
      );
    }
    console.error("Error updating note:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
