// import { prisma } from "@/lib/prisma";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest) {
//   const url = new URL(req.url);
//   const characterId = url.searchParams.get("characterId");

//   try {
//     // Buscar personagem por ID
//     const character = await prisma.character.findUnique({
//       where: { id: characterId },
//       include: {
//         controlUser: {
//           select: {
//             id: true,
//             name: true,
//             email: true,
//           },
//         },
//         attributes: true,
//         relevantPeople: true,
//         improvements: true,
//         skills: true,
//         combatSkill: true,
//       },
//     });

//     if (!character) {
//       return NextResponse.json(
//         { error: "Personagem não encontrado" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ character }, { status: 200 });
//   } catch (error) {
//     console.error("Erro ao buscar personagens:", error);
//     return NextResponse.json(
//       { error: "Erro ao buscar personagem(ns)." },
//       { status: 500 }
//     );
//   }
// }
