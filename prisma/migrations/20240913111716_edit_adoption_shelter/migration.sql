/*
  Warnings:

  - You are about to drop the column `adoptionShelterId` on the `Address` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_adoptionShelterId_fkey";

-- DropIndex
DROP INDEX "Address_adoptionShelterId_key";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "adoptionShelterId";
