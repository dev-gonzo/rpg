import { prisma } from "@/lib/prisma";
import { userRegisterSchema } from "@/shared/schemas/userRegisterSchema";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const existing = await prisma.user.findUnique({
      where: { email: body.email },
    });

    const hash = await bcrypt.hash(body.password, 10);

    const user = await prisma.user.update({
      where: { id: existing?.id },
      data: {
        password: hash,
      },
    });

    const { password, ...userSafe } = user;
    return NextResponse.json({ user: userSafe }, { status: 201 });
  } catch (err: any) {
    if (err.name === "ValidationError" || err.name === "ValidationError") {
      return NextResponse.json(
        { error: err.errors?.[0] || "Validation error" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
