/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Shelter` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Shelter_name_key" ON "Shelter"("name");
