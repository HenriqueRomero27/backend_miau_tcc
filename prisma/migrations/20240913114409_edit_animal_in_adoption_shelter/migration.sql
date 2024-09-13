/*
  Warnings:

  - You are about to drop the column `adoptionShelterId` on the `Animal` table. All the data in the column will be lost.
  - Added the required column `animals` to the `AdoptionShelter` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Animal" DROP CONSTRAINT "Animal_adoptionShelterId_fkey";

-- AlterTable
ALTER TABLE "AdoptionShelter" ADD COLUMN     "animals" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Animal" DROP COLUMN "adoptionShelterId";
