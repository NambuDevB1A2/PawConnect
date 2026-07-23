// 등록 DTO

import { ApiProperty } from "@nestjs/swagger";
import { AnimalGender } from "@prisma/client";
import { Type } from "class-transformer";
import { IsBoolean, IsDateString, IsEnum, IsInt, IsNumber, IsString, MaxLength, Min } from "class-validator";

export class CreateAnimalDto {
 
  @ApiProperty({example: "봉지", description: "동물 이름"})
  @IsString()
  @MaxLength(50)
  name: string;

  @ApiProperty({example:1, description: "동물 종류"})
  @Type(()=> Number)
  @IsInt()
  species: number;

  @ApiProperty({example: 3, description: "품종 ID"})
  @Type(()=> Number)
  @IsInt()
  breed: number;

  @ApiProperty({ enum: AnimalGender })
  @IsEnum(AnimalGender)
  gender: AnimalGender;

  @ApiProperty({ example: true })
  @IsBoolean()
  isNeutered: boolean;

  @ApiProperty({ example: 24, description: "개월 수" })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  age: number;

  @ApiProperty({ example: false })
  @IsBoolean()
  isEstimatedAge: boolean;

  @ApiProperty({ example: 4.3 })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  weight: number;

  // imgThumbnail: Express.Multer.File;
  // images: Express.Multer.File[];

  @ApiProperty({ example: "2025-09-15" })
  @IsDateString()
  noticeStartDate: Date;

  @ApiProperty({ example: "2025-09-30" })
  @IsDateString()
  noticeEndDate: Date;

  @ApiProperty({ example: "서울시 강남구" })
  @IsString()
  @MaxLength(50)
  foundLocation: string;

  @ApiProperty({ example: "사람을 잘 따름" })
  @IsString()
  @MaxLength(100)
  specialNotes: string;

  @ApiProperty({ example: "건강하고 활발한 아이입니다." })
  @IsString()
  @MaxLength(500)
  description: string;

  @ApiProperty({ example: "예방접종 완료" })
  @IsString()
  @MaxLength(500)
  healthStatus: string;
}