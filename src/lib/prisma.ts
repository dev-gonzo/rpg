import { PrismaClient } from "@prisma/client";

declare global {
  // Evita múltiplas instâncias em ambiente dev
  // @ts-ignore
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ??
  new PrismaClient({
    log: ["query"], // opcional para debug
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
