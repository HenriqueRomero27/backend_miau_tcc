/*
  Warnings:

  - Changed the type of `address` on the `AdoptionShelter` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "AdoptionShelter" DROP COLUMN "address",
ADD COLUMN     "address" JSONB NOT NULL;
