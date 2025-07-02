import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get("session_token");
  if (!cookie?.value) {
    return NextResponse.json({ error: "No session" }, { status: 401 });
  }

  const [userId] = Buffer.from(cookie.value, "base64").toString().split("|");
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }

  const { password, ...userSafe } = user;
  return NextResponse.json({ user: userSafe }, { status: 200 });
}
