-- CreateTable
CREATE TABLE "CombatSkill" (
    "id" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    "group" TEXT,
    "skill" TEXT NOT NULL,
    "attribute" TEXT NOT NULL,
    "attackCost" INTEGER NOT NULL,
    "defenseCost" INTEGER NOT NULL,
    "attackKitValue" INTEGER NOT NULL,
    "defenseKitValue" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CombatSkill_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CombatSkill" ADD CONSTRAINT "CombatSkill_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;
