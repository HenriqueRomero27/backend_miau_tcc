/*
  Warnings:

  - You are about to drop the `_ShelterAnimals` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ShelterAnimals" DROP CONSTRAINT "_ShelterAnimals_A_fkey";

-- DropForeignKey
ALTER TABLE "_ShelterAnimals" DROP CONSTRAINT "_ShelterAnimals_B_fkey";

-- DropTable
DROP TABLE "_ShelterAnimals";
