// lib/prisma.ts

import { PrismaClient } from "@prisma/client";

// Evita múltiplas instâncias do PrismaClient no modo desenvolvimento (Hot Reload)
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query", "error", "warn"], // opcional, para debug
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
