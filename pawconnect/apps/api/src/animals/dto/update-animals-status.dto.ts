import { AnimalStatus } from "@prisma/client";
import { IsEnum } from "class-validator";

// 상태변경 DTO
export class UpdateAnimalStatusDto {
  @IsEnum(AnimalStatus)
  status: AnimalStatus;
}