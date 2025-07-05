-- CreateTable
CREATE TABLE "Equipment" (
    "id" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "classification" TEXT NOT NULL,
    "kineticProtection" INTEGER,
    "ballisticProtection" INTEGER,
    "dexPenalty" INTEGER,
    "agiPenalty" INTEGER,
    "initiative" INTEGER,
    "bookPage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;
