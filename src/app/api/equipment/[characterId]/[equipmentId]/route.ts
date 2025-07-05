import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";

const equipmentSchema = yup.object({
  name: yup.string().required(),
  quantity: yup.number().required().min(1),
  classification: yup.string().required(),
  kineticProtection: yup.number().optional(),
  ballisticProtection: yup.number().optional(),
  dexterityPenalty: yup.number().optional(),
  agilityPenalty: yup.number().optional(),
  initiative: yup.number().optional(),
  bookPage: yup.string().optional(),
  description: yup.string().optional(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { equipmentId: string } }
) {
  const { equipmentId } = params;

  if (!equipmentId) {
    return NextResponse.json({ error: "equipmentId is required" }, { status: 400 });
  }

  try {
    const equipment = await prisma.equipment.findUnique({
      where: { id: equipmentId },
    });

    if (!equipment) {
      return NextResponse.json({ error: "Equipment not found" }, { status: 404 });
    }

    return NextResponse.json({ equipment }, { status: 200 });
  } catch (error) {
    console.error("Error fetching equipment:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { equipmentId: string } }
) {
  const { equipmentId } = params;

  if (!equipmentId) {
    return NextResponse.json({ error: "equipmentId is required" }, { status: 400 });
  }

  try {
    const body = await req.json();

    await equipmentSchema.validate(body, { abortEarly: false });

    const updatedEquipment = await prisma.equipment.update({
      where: { id: equipmentId },
      data: {
        name: body.name,
        quantity: body.quantity,
        classification: body.classification,
        kineticProtection: body.kineticProtection || null,
        ballisticProtection: body.ballisticProtection || null,
        dexterityPenalty: body.dexterityPenalty || null,
        agilityPenalty: body.agilityPenalty || null,
        initiative: body.initiative || null,
        bookPage: body.bookPage ?? null,
        description: body.description ?? null,
      },
    });

    return NextResponse.json({ equipment: updatedEquipment }, { status: 200 });
  } catch (err: any) {
    if (err.name === "ValidationError") {
      return NextResponse.json(
        { error: err.errors.join(", ") },
        { status: 400 }
      );
    }
    console.error("Error updating equipment:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { equipmentId: string } }
) {
  const { equipmentId } = params;

  if (!equipmentId) {
    return NextResponse.json({ error: "equipmentId is required" }, { status: 400 });
  }

  try {
    await prisma.equipment.delete({
      where: { id: equipmentId },
    });

    return NextResponse.json({ message: "Equipment deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting equipment:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
