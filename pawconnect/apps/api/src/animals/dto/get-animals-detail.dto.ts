// 상세조회 DTO

import { AnimalGender, AnimalStatus } from "@prisma/client";

export class AnimalDetailDto {
  id: number;

  shelterId: string;

  shelterName: string;

  name: string;

  species: string;

  breed: string;

  gender: AnimalGender;

  isNeutered: boolean;

  age: number;

  isEstimatedAge: boolean;

  weight: number;

  animalStatus: AnimalStatus;

  thumbnail: string;

  images: string[];

  noticeStartDate: Date;

  noticeEndDate: Date;

  foundLocation: string;

  specialNotes: string;

  description: string;

  healthStatus: string;
}