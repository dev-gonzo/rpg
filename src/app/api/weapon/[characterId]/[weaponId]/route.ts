// src/app/api/weapon/[characterId]/[weaponId]/route.ts

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";

const weaponSchema = yup.object({
  name: yup.string().required(),
  initiative: yup.number().required(),
  damage: yup.string().required(),
  rof: yup.string().nullable(),
  ammunition: yup.string().nullable(),
  bookPage: yup.string().nullable(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { characterId: string; weaponId: string } }
) {
  const { weaponId } = params;

  if (!weaponId) {
    return NextResponse.json({ error: "weaponId is required" }, { status: 400 });
  }

  try {
    const weapon = await prisma.weapon.findUnique({
      where: { id: weaponId },
    });

    if (!weapon) {
      return NextResponse.json({ error: "Weapon not found" }, { status: 404 });
    }

    return NextResponse.json({ weapon }, { status: 200 });
  } catch (error) {
    console.error("Error fetching weapon:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { characterId: string; weaponId: string } }
) {
  const { weaponId } = params;

  if (!weaponId) {
    return NextResponse.json({ error: "weaponId is required" }, { status: 400 });
  }

  try {
    await prisma.weapon.delete({
      where: { id: weaponId },
    });

    return NextResponse.json({ message: "Weapon deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting weapon:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { characterId: string; weaponId: string } }
) {
  const { weaponId } = params;

  if (!weaponId) {
    return NextResponse.json({ error: "weaponId is required" }, { status: 400 });
  }

  try {
    const body = await req.json();

    await weaponSchema.validate(body, { abortEarly: false });

    const weapon = await prisma.weapon.update({
      where: { id: weaponId },
      data: {
        name: body.name,
        initiative: body.initiative,
        damage: body.damage,
        rof: body.rof ?? null,
        ammunition: body.ammunition ?? null,
        bookPage: body.bookPage ?? null,
      },
    });

    return NextResponse.json({ weapon }, { status: 200 });
  } catch (err: any) {
    if (err.name === "ValidationError") {
      return NextResponse.json({ error: err.errors.join(", ") }, { status: 400 });
    }
    console.error("Error updating weapon:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
