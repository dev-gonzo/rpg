-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "socialClass" TEXT,
    "profession" TEXT,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "birthPlace" TEXT,
    "gender" TEXT,
    "heightCm" INTEGER,
    "weightKg" INTEGER,
    "apparentAge" INTEGER,
    "religion" TEXT,
    "secretSociety" TEXT,
    "cabala" TEXT,
    "rank" TEXT,
    "mentor" TEXT,
    "societyAllies" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RelevantPerson" (
    "id" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "apparentAge" INTEGER,
    "city" TEXT,
    "profession" TEXT,
    "briefDescription" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RelevantPerson_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RelevantPerson" ADD CONSTRAINT "RelevantPerson_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;
