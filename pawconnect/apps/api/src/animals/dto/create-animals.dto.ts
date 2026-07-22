// 등록 DTO

import { AnimalGender } from "@prisma/client";

export class CreateAnimalDto {
  name: string;

  species: number;

  breed: number;

  gender: AnimalGender;

  isNeutered: boolean;

  age: number;

  isEstimatedAge: boolean;

  weight: number;

  imgThumbnail: Express.Multer.File;

  images: Express.Multer.File[];

  noticeStartDate: Date;

  noticeEndDate: Date;

  foundLocation: string;

  specialNotes: string;

  description: string;

  healthStatus: string;
}