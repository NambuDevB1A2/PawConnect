// 수정 DTO

import { ApiProperty, PartialType } from "@nestjs/swagger";
import { AnimalStatus } from "@prisma/client";
import { CreateAnimalDto } from "./create-animals.dto";
import { IsEnum } from "class-validator";

// 동물 수정 DTO
export class UpdateAnimalDto extends PartialType(CreateAnimalDto) {}

// 동물 상태 DTO
export class UpdateAnimalStatusDto {
    @ApiProperty({example:"AVAILABLE", description:"보호동물 상태"})
    @IsEnum(AnimalStatus)
    animalStatus: AnimalStatus;
}