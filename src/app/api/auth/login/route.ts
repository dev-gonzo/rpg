import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { userLoginSchema } from "@/shared/schemas/userLoginSchema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!; 

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await userLoginSchema.validate(body);

    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });
    if (!user || !(await bcrypt.compare(body.password, user.password))) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const { password, ...userSafe } = user;

    // Cria o JWT com id e outras infos
    const token = jwt.sign(
      { userId: user.id, email: user.email, isMaster: user.isMaster },
      JWT_SECRET,
      { expiresIn: "8h" }
    );

    const res = NextResponse.json({ user: userSafe }, { status: 200 });
    res.cookies.set("session_token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 8 * 60 * 60,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return res;
  } catch (err: any) {
     console.error("Erro no login:", err);
    if (err.name === "ValidationError") {
      return NextResponse.json({ error: err.errors?.[0] }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
