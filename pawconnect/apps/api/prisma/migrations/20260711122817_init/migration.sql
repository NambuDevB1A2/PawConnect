-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'SHELTER', 'ADMIN');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED', 'WITHDRAWN');

-- CreateEnum
CREATE TYPE "AnimalStatus" AS ENUM ('PROTECTED', 'AVAILABLE', 'ADOPTED', 'REUNITED', 'DECEASED', 'EUTHANIZED');

-- CreateEnum
CREATE TYPE "AnimalGender" AS ENUM ('MALE', 'FEMALE', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "AdoptionStatus" AS ENUM ('PENDING', 'COUNSELING', 'INTERVIEW', 'ADDITIONAL_INTERVIEW', 'FOSTERING', 'FINAL_REVIEW', 'APPROVED', 'REJECTED', 'CANCELED');

-- CreateEnum
CREATE TYPE "PetExperience" AS ENUM ('NONE', 'PAST', 'CURRENT');

-- CreateEnum
CREATE TYPE "PetExperiencePeriod" AS ENUM ('LESS_THAN_1_YEAR', 'ONE_TO_THREE_YEARS', 'THREE_TO_FIVE_YEARS', 'OVER_FIVE_YEARS');

-- CreateEnum
CREATE TYPE "ResidenceType" AS ENUM ('APARTMENT', 'VILLA', 'DETACHED_HOUSE', 'OFFICETEL', 'DORMITORY');

-- CreateEnum
CREATE TYPE "PetAllowedStatus" AS ENUM ('ALLOWED', 'NOT_ALLOWED', 'NEED_CONFIRMATION');

-- CreateEnum
CREATE TYPE "FamilySize" AS ENUM ('ONE', 'TWO', 'THREE', 'FOUR_OR_MORE');

-- CreateEnum
CREATE TYPE "YoungChildStatus" AS ENUM ('NONE', 'UNDER_SEVEN', 'SEVEN_OR_OLDER');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "shelterId" UUID,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "nickname" VARCHAR(20) NOT NULL,
    "role" "Role" NOT NULL,
    "imgProfile" TEXT NOT NULL,
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shelter" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "adress" VARCHAR(255) NOT NULL,
    "adressDetail" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "operatingHours" VARCHAR(100) NOT NULL,
    "description" VARCHAR(500) NOT NULL,
    "imgBanner" TEXT NOT NULL,

    CONSTRAINT "Shelter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShelterImage" (
    "id" UUID NOT NULL,
    "shelterId" UUID NOT NULL,
    "img" TEXT NOT NULL,

    CONSTRAINT "ShelterImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnimalSpecies" (
    "id" SMALLSERIAL NOT NULL,
    "name" VARCHAR(30) NOT NULL,

    CONSTRAINT "AnimalSpecies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnimalBreed" (
    "id" SMALLSERIAL NOT NULL,
    "species" SMALLINT NOT NULL,
    "name" VARCHAR(30) NOT NULL,

    CONSTRAINT "AnimalBreed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Animal" (
    "id" UUID NOT NULL,
    "shelterId" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "species" SMALLINT NOT NULL,
    "breed" SMALLINT NOT NULL,
    "gender" "AnimalGender" NOT NULL,
    "isNeutered" BOOLEAN NOT NULL,
    "age" SMALLINT NOT NULL,
    "isEstimatedAge" BOOLEAN NOT NULL,
    "animalStatus" "AnimalStatus" NOT NULL DEFAULT 'PROTECTED',
    "weight" DECIMAL(5,2) NOT NULL,
    "imgThumbnail" TEXT NOT NULL,
    "detailId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Animal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnimalDetail" (
    "id" UUID NOT NULL,
    "noticeStartDate" DATE NOT NULL,
    "noticeEndDate" DATE NOT NULL,
    "foundLocation" VARCHAR(50) NOT NULL,
    "specialNotes" VARCHAR(100) NOT NULL,
    "description" VARCHAR(500) NOT NULL,
    "healthStatus" VARCHAR(500) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AnimalDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnimalImage" (
    "id" UUID NOT NULL,
    "animalId" UUID NOT NULL,
    "img" TEXT NOT NULL,

    CONSTRAINT "AnimalImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Adoption" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "animalId" UUID NOT NULL,
    "adoptionStatus" "AdoptionStatus" NOT NULL DEFAULT 'PENDING',
    "detailId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Adoption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdoptionDetail" (
    "id" UUID NOT NULL,
    "userName" VARCHAR(30) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "adress" VARCHAR(255) NOT NULL,
    "adressDetail" VARCHAR(255),
    "petExperience" "PetExperience" NOT NULL,
    "petsDescription" VARCHAR(100),
    "petExperiencePeriod" "PetExperiencePeriod",
    "residenceType" "ResidenceType" NOT NULL,
    "petAllowedStatus" "PetAllowedStatus" NOT NULL,
    "familySize" "FamilySize" NOT NULL,
    "youngChildStatus" "YoungChildStatus" NOT NULL,
    "isFamilyConsent" BOOLEAN NOT NULL,
    "adoptionPurpose" VARCHAR(100) NOT NULL,
    "isCanVaccinate" BOOLEAN NOT NULL,
    "isCanProvideMedicalCare" BOOLEAN NOT NULL,
    "isCanProvideExercise" BOOLEAN NOT NULL,
    "isAcceptLifetimeResponsibility" BOOLEAN NOT NULL,
    "additionalNotes" VARCHAR(500) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdoptionDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Agreement" (
    "id" SMALLSERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "content" TEXT,

    CONSTRAINT "Agreement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAgreement" (
    "id" UUID NOT NULL,
    "agreementId" SMALLINT NOT NULL,
    "userId" UUID NOT NULL,
    "isAgreed" BOOLEAN NOT NULL,
    "agreedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserAgreement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdoptionAgreement" (
    "id" UUID NOT NULL,
    "agreementId" SMALLINT NOT NULL,
    "adoptionId" UUID NOT NULL,
    "isAgreed" BOOLEAN NOT NULL,
    "agreedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdoptionAgreement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetPost" (
    "id" SERIAL NOT NULL,
    "authorId" UUID NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "content" VARCHAR(500) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PetPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetPostImage" (
    "id" UUID NOT NULL,
    "petPostId" INTEGER NOT NULL,
    "img" TEXT NOT NULL,

    CONSTRAINT "PetPostImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_shelterId_idx" ON "User"("shelterId");

-- CreateIndex
CREATE INDEX "ShelterImage_shelterId_idx" ON "ShelterImage"("shelterId");

-- CreateIndex
CREATE INDEX "AnimalBreed_species_idx" ON "AnimalBreed"("species");

-- CreateIndex
CREATE UNIQUE INDEX "AnimalBreed_id_species_key" ON "AnimalBreed"("id", "species");

-- CreateIndex
CREATE UNIQUE INDEX "Animal_detailId_key" ON "Animal"("detailId");

-- CreateIndex
CREATE INDEX "Animal_shelterId_idx" ON "Animal"("shelterId");

-- CreateIndex
CREATE INDEX "Animal_species_idx" ON "Animal"("species");

-- CreateIndex
CREATE INDEX "Animal_breed_idx" ON "Animal"("breed");

-- CreateIndex
CREATE INDEX "AnimalImage_animalId_idx" ON "AnimalImage"("animalId");

-- CreateIndex
CREATE UNIQUE INDEX "Adoption_detailId_key" ON "Adoption"("detailId");

-- CreateIndex
CREATE INDEX "Adoption_userId_idx" ON "Adoption"("userId");

-- CreateIndex
CREATE INDEX "Adoption_animalId_idx" ON "Adoption"("animalId");

-- CreateIndex
CREATE INDEX "UserAgreement_agreementId_idx" ON "UserAgreement"("agreementId");

-- CreateIndex
CREATE INDEX "UserAgreement_userId_idx" ON "UserAgreement"("userId");

-- CreateIndex
CREATE INDEX "AdoptionAgreement_agreementId_idx" ON "AdoptionAgreement"("agreementId");

-- CreateIndex
CREATE INDEX "AdoptionAgreement_adoptionId_idx" ON "AdoptionAgreement"("adoptionId");

-- CreateIndex
CREATE INDEX "PetPost_authorId_idx" ON "PetPost"("authorId");

-- CreateIndex
CREATE INDEX "PetPostImage_petPostId_idx" ON "PetPostImage"("petPostId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_shelterId_fkey" FOREIGN KEY ("shelterId") REFERENCES "Shelter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShelterImage" ADD CONSTRAINT "ShelterImage_shelterId_fkey" FOREIGN KEY ("shelterId") REFERENCES "Shelter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimalBreed" ADD CONSTRAINT "AnimalBreed_species_fkey" FOREIGN KEY ("species") REFERENCES "AnimalSpecies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_shelterId_fkey" FOREIGN KEY ("shelterId") REFERENCES "Shelter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_species_fkey" FOREIGN KEY ("species") REFERENCES "AnimalSpecies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_breed_species_fkey" FOREIGN KEY ("breed", "species") REFERENCES "AnimalBreed"("id", "species") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_detailId_fkey" FOREIGN KEY ("detailId") REFERENCES "AnimalDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimalImage" ADD CONSTRAINT "AnimalImage_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adoption" ADD CONSTRAINT "Adoption_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adoption" ADD CONSTRAINT "Adoption_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adoption" ADD CONSTRAINT "Adoption_detailId_fkey" FOREIGN KEY ("detailId") REFERENCES "AdoptionDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAgreement" ADD CONSTRAINT "UserAgreement_agreementId_fkey" FOREIGN KEY ("agreementId") REFERENCES "Agreement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAgreement" ADD CONSTRAINT "UserAgreement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdoptionAgreement" ADD CONSTRAINT "AdoptionAgreement_agreementId_fkey" FOREIGN KEY ("agreementId") REFERENCES "Agreement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdoptionAgreement" ADD CONSTRAINT "AdoptionAgreement_adoptionId_fkey" FOREIGN KEY ("adoptionId") REFERENCES "Adoption"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetPost" ADD CONSTRAINT "PetPost_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PetPostImage" ADD CONSTRAINT "PetPostImage_petPostId_fkey" FOREIGN KEY ("petPostId") REFERENCES "PetPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;
