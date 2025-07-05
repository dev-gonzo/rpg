-- CreateTable
CREATE TABLE "Weapon" (
    "id" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "damage" TEXT NOT NULL,
    "initiative" INTEGER NOT NULL,
    "range" TEXT,
    "rof" TEXT,
    "ammunition" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Weapon_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Weapon" ADD CONSTRAINT "Weapon_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;
