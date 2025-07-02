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

-- CreateIndex
CREATE UNIQUE INDEX "Attribute_characterId_key" ON "Attribute"("characterId");

-- AddForeignKey
ALTER TABLE "Attribute" ADD CONSTRAINT "Attribute_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
