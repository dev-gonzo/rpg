-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isMaster" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profession" TEXT,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "birthPlace" TEXT,
    "gender" TEXT,
    "heightCm" INTEGER,
    "weightKg" INTEGER,
    "age" INTEGER,
    "apparentAge" INTEGER,
    "religion" TEXT,
    "secretSociety" TEXT,
    "cabala" TEXT,
    "rank" TEXT,
    "mentor" TEXT,
    "societyAllies" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "controlUserId" TEXT,
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

-- CreateTable
CREATE TABLE "Attribute" (
    "id" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    "CON" INTEGER NOT NULL,
    "FR" INTEGER NOT NULL,
    "DEX" INTEGER NOT NULL,
    "AGI" INTEGER NOT NULL,
    "INT" INTEGER NOT NULL,
    "WILL" INTEGER NOT NULL,
    "PER" INTEGER NOT NULL,
    "CAR" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Attribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Improvement" (
    "id" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "kitValue" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Improvement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    "group" TEXT,
    "skill" TEXT NOT NULL,
    "attribute" TEXT,
    "cost" INTEGER NOT NULL,
    "kitValue" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CombatSkill" (
    "id" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    "group" TEXT,
    "skill" TEXT NOT NULL,
    "attribute" TEXT,
    "attackCost" INTEGER NOT NULL,
    "defenseCost" INTEGER NOT NULL,
    "attackKitValue" INTEGER NOT NULL,
    "defenseKitValue" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CombatSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharacterBackground" (
    "id" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CharacterBackground_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PathsAndForms" (
    "characterId" TEXT NOT NULL,
    "understandForm" INTEGER NOT NULL,
    "createForm" INTEGER NOT NULL,
    "controlForm" INTEGER NOT NULL,
    "fire" INTEGER NOT NULL,
    "water" INTEGER NOT NULL,
    "earth" INTEGER NOT NULL,
    "air" INTEGER NOT NULL,
    "light" INTEGER NOT NULL,
    "darkness" INTEGER NOT NULL,
    "plants" INTEGER NOT NULL,
    "animals" INTEGER NOT NULL,
    "humans" INTEGER NOT NULL,
    "spiritum" INTEGER NOT NULL,
    "arkanun" INTEGER NOT NULL,
    "metamagic" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PathsAndForms_pkey" PRIMARY KEY ("characterId")
);

-- CreateTable
CREATE TABLE "Ritual" (
    "id" TEXT NOT NULL,
    "characterId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pathsForms" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "bookPage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ritual_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Attribute_characterId_key" ON "Attribute"("characterId");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_controlUserId_fkey" FOREIGN KEY ("controlUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelevantPerson" ADD CONSTRAINT "RelevantPerson_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attribute" ADD CONSTRAINT "Attribute_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Improvement" ADD CONSTRAINT "Improvement_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CombatSkill" ADD CONSTRAINT "CombatSkill_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterBackground" ADD CONSTRAINT "CharacterBackground_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PathsAndForms" ADD CONSTRAINT "PathsAndForms_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ritual" ADD CONSTRAINT "Ritual_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;
