import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { userLoginSchema } from "@/shared/schemas/userLoginSchema";
import bcrypt from "bcryptjs";

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
    const token = Buffer.from(`${user.id}|${Date.now()}`).toString("base64");

    // Cria o cookie de sessão válido por 8 horas
    const res = NextResponse.json({ user: userSafe }, { status: 200 });
    res.cookies.set("session_token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 8 * 60 * 60, // 8 horas
      sameSite: "lax",      // Funciona em localhost, portas iguais
      secure: false,        // Só true em produção HTTPS
    });

    return res;
  } catch (err: any) {
    if (err.name === "ValidationError") {
      return NextResponse.json({ error: err.errors?.[0] }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
