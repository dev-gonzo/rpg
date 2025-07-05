/*
  Warnings:

  - You are about to drop the column `agiPenalty` on the `Equipment` table. All the data in the column will be lost.
  - You are about to drop the column `dexPenalty` on the `Equipment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Equipment" DROP COLUMN "agiPenalty",
DROP COLUMN "dexPenalty",
ADD COLUMN     "agilityPenalty" INTEGER,
ADD COLUMN     "dexterityPenalty" INTEGER;
