/*
  Warnings:

  - A unique constraint covering the columns `[cnpj]` on the table `AdoptionShelter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `AdoptionShelter` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `AdoptionShelter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AdoptionShelter" ADD COLUMN     "address" TEXT NOT NULL,
ALTER COLUMN "updated_at" DROP DEFAULT;

-- CreateTable
CREATE TABLE "_ShelterAnimals" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ShelterAnimals_AB_unique" ON "_ShelterAnimals"("A", "B");

-- CreateIndex
CREATE INDEX "_ShelterAnimals_B_index" ON "_ShelterAnimals"("B");

-- CreateIndex
CREATE UNIQUE INDEX "AdoptionShelter_cnpj_key" ON "AdoptionShelter"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "AdoptionShelter_email_key" ON "AdoptionShelter"("email");

-- AddForeignKey
ALTER TABLE "_ShelterAnimals" ADD CONSTRAINT "_ShelterAnimals_A_fkey" FOREIGN KEY ("A") REFERENCES "AdoptionShelter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ShelterAnimals" ADD CONSTRAINT "_ShelterAnimals_B_fkey" FOREIGN KEY ("B") REFERENCES "Animal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
