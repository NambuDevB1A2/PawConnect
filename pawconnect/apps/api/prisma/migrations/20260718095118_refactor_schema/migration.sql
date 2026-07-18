/*
  Warnings:

  - You are about to drop the column `detailId` on the `Adoption` table. All the data in the column will be lost.
  - You are about to drop the column `adress` on the `AdoptionDetail` table. All the data in the column will be lost.
  - You are about to drop the column `adressDetail` on the `AdoptionDetail` table. All the data in the column will be lost.
  - The primary key for the `Animal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `detailId` on the `Animal` table. All the data in the column will be lost.
  - The `id` column on the `Animal` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `imgThumbnail` on the `Animal` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `img` on the `AnimalImage` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `img` on the `PetPostImage` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to drop the column `adress` on the `Shelter` table. All the data in the column will be lost.
  - You are about to drop the column `adressDetail` on the `Shelter` table. All the data in the column will be lost.
  - You are about to alter the column `imgBanner` on the `Shelter` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `img` on the `ShelterImage` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `imgProfile` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - A unique constraint covering the columns `[adoptionId]` on the table `AdoptionDetail` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[animalId]` on the table `AnimalDetail` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `animalId` on the `Adoption` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `address` to the `AdoptionDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adoptionId` to the `AdoptionDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `animalId` to the `AnimalDetail` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `animalId` on the `AnimalImage` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `address` to the `Shelter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressDetail` to the `Shelter` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Adoption" DROP CONSTRAINT "Adoption_animalId_fkey";

-- DropForeignKey
ALTER TABLE "Adoption" DROP CONSTRAINT "Adoption_detailId_fkey";

-- DropForeignKey
ALTER TABLE "Animal" DROP CONSTRAINT "Animal_detailId_fkey";

-- DropForeignKey
ALTER TABLE "AnimalImage" DROP CONSTRAINT "AnimalImage_animalId_fkey";

-- DropIndex
DROP INDEX "Adoption_detailId_key";

-- DropIndex
DROP INDEX "Animal_detailId_key";

-- AlterTable
ALTER TABLE "Adoption" DROP COLUMN "detailId",
DROP COLUMN "animalId",
ADD COLUMN     "animalId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "AdoptionDetail" DROP COLUMN "adress",
DROP COLUMN "adressDetail",
ADD COLUMN     "address" VARCHAR(255) NOT NULL,
ADD COLUMN     "addressDetail" VARCHAR(255),
ADD COLUMN     "adoptionId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Animal" DROP CONSTRAINT "Animal_pkey",
DROP COLUMN "detailId",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "imgThumbnail" SET DATA TYPE VARCHAR(100),
ADD CONSTRAINT "Animal_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "AnimalDetail" ADD COLUMN     "animalId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "AnimalImage" DROP COLUMN "animalId",
ADD COLUMN     "animalId" INTEGER NOT NULL,
ALTER COLUMN "img" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "PetPostImage" ALTER COLUMN "img" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "Shelter" DROP COLUMN "adress",
DROP COLUMN "adressDetail",
ADD COLUMN     "address" VARCHAR(255) NOT NULL,
ADD COLUMN     "addressDetail" VARCHAR(255) NOT NULL,
ALTER COLUMN "imgBanner" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "ShelterImage" ALTER COLUMN "img" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "imgProfile" SET DATA TYPE VARCHAR(100);

-- CreateIndex
CREATE INDEX "Adoption_animalId_idx" ON "Adoption"("animalId");

-- CreateIndex
CREATE UNIQUE INDEX "AdoptionDetail_adoptionId_key" ON "AdoptionDetail"("adoptionId");

-- CreateIndex
CREATE UNIQUE INDEX "AnimalDetail_animalId_key" ON "AnimalDetail"("animalId");

-- CreateIndex
CREATE INDEX "AnimalImage_animalId_idx" ON "AnimalImage"("animalId");

-- AddForeignKey
ALTER TABLE "AnimalDetail" ADD CONSTRAINT "AnimalDetail_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimalImage" ADD CONSTRAINT "AnimalImage_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adoption" ADD CONSTRAINT "Adoption_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdoptionDetail" ADD CONSTRAINT "AdoptionDetail_adoptionId_fkey" FOREIGN KEY ("adoptionId") REFERENCES "Adoption"("id") ON DELETE CASCADE ON UPDATE CASCADE;
