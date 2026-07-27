/*
  Warnings:

  - You are about to drop the `PetPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PetPostImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PetPost" DROP CONSTRAINT "PetPost_authorId_fkey";

-- DropForeignKey
ALTER TABLE "PetPostImage" DROP CONSTRAINT "PetPostImage_petPostId_fkey";

-- DropTable
DROP TABLE "PetPost";

-- DropTable
DROP TABLE "PetPostImage";

-- CreateTable
CREATE TABLE "PawLog" (
    "id" SERIAL NOT NULL,
    "authorId" UUID NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "content" VARCHAR(500) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PawLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PawLogImage" (
    "id" UUID NOT NULL,
    "pawLogId" INTEGER NOT NULL,
    "img" VARCHAR(100) NOT NULL,

    CONSTRAINT "PawLogImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PawLog_authorId_idx" ON "PawLog"("authorId");

-- CreateIndex
CREATE INDEX "PawLogImage_pawLogId_idx" ON "PawLogImage"("pawLogId");

-- AddForeignKey
ALTER TABLE "PawLog" ADD CONSTRAINT "PawLog_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PawLogImage" ADD CONSTRAINT "PawLogImage_pawLogId_fkey" FOREIGN KEY ("pawLogId") REFERENCES "PawLog"("id") ON DELETE CASCADE ON UPDATE CASCADE;
