import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ characterId: string }> }
) {
  const { params } = context;
  const resolvedParams = await params;
  const characterId = resolvedParams.characterId;

  if (!characterId) {
    return NextResponse.json(
      { error: "characterId is required" },
      { status: 400 }
    );
  }

  try {
    const total = await prisma.improvement.aggregate({
      where: { characterId },
      _sum: {
        cost: true,
        kitValue: true,
      },
    });

    return NextResponse.json(
      {
        totalCost: total._sum.cost ?? 0,
        totalKit: total._sum.kitValue ?? 0,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching improvements total:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

