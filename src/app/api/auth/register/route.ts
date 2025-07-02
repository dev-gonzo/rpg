import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { userRegisterSchema } from "@/shared/schemas/userRegisterSchema";
import bcrypt from "bcryptjs";
import { isInternalRequest } from "@/lib/checkOrigin";

export async function POST(req: NextRequest) {
  // **Adicione a validação logo no início**
  if (!isInternalRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    await userRegisterSchema.validate(body);

    const existing = await prisma.user.findUnique({
      where: { email: body.email }
    });
    if (existing) {
      return NextResponse.json({ error: "Email already registered." }, { status: 409 });
    }

    const hash = await bcrypt.hash(body.password, 10);

    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hash
      }
    });

    const { password, ...userSafe } = user;
    return NextResponse.json({ user: userSafe }, { status: 201 });

  } catch (err: any) {
    if (err.name === "ValidationError" || err.name === "ValidationError") {
      return NextResponse.json({ error: err.errors?.[0] || "Validation error" }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
