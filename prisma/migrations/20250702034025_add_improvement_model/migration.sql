-- DropForeignKey
ALTER TABLE "Improvement" DROP CONSTRAINT "Improvement_characterId_fkey";

-- DropIndex
DROP INDEX "Improvement_characterId_key";

-- AddForeignKey
ALTER TABLE "Improvement" ADD CONSTRAINT "Improvement_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;
