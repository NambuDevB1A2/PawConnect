// 수정 DTO

import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { AnimalStatus } from "@prisma/client";
import { CreateAnimalDto } from "./create-animals.dto";
import { IsEnum, IsOptional } from "class-validator";

// 동물 수정 DTO
export class UpdateAnimalDto extends PartialType(CreateAnimalDto) {
    @ApiProperty({ example: "image", description: "기존썸네일이미지" })
    @ApiPropertyOptional()
    @IsOptional()
    existingThumbnail?:string;
    
    @ApiProperty({ example: "image", description: "기존이미지" })
    @ApiPropertyOptional()
    @IsOptional()
    existingImages?: string[];

    @ApiProperty({ example: "image", description: "삭제이미지" })
    @ApiPropertyOptional()
    @IsOptional()
    deletedImages?: string[];
}

// 동물 상태 DTO
export class UpdateAnimalStatusDto {
    @ApiProperty({ example: "AVAILABLE", description: "보호동물 상태" })
    @IsEnum(AnimalStatus)
    animalStatus: AnimalStatus;
}