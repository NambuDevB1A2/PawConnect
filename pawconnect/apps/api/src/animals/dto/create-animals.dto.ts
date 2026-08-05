// 등록 DTO

import { ApiProperty } from "@nestjs/swagger";
import { AnimalGender, AnimalStatus } from "@prisma/client";
import { Transform, Type } from "class-transformer";
import { IsBoolean, IsDate, IsEnum, IsInt, IsNumber, IsString, MaxLength, Min } from "class-validator";

export class CreateAnimalDto {

  @ApiProperty({ example: "세상에서제일귀여운우리집막내니노막시무스", description: "동물 이름(최대 20자)" })
  @IsString()
  @MaxLength(20)
  name: string;

  @ApiProperty({ example: 1, description: "동물 종류 ID" })
  @Type(() => Number)
  @IsInt()
  species: number;

  @ApiProperty({ example: 3, description: "품종 ID" })
  @Type(() => Number)
  @IsInt()
  breed: number;

  @ApiProperty({ enum: AnimalGender, description: "동물 성별" })
  @IsEnum(AnimalGender)
  gender: AnimalGender;

  @ApiProperty({ example: true, description:"중성화 여부" })
  @Transform(({ value }) => value === 'true' || value === true)
  @Type(() => Boolean)
  @IsBoolean()
  isNeutered: boolean;

  @ApiProperty({ example: 24, description: "개월 수" })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  age: number;

  @ApiProperty({ example: false, description:"추정나이 여부" })
  @Transform(({ value }) => value === 'true' || value === true)
  @Type(() => Boolean)
  @IsBoolean()
  isEstimatedAge: boolean;

  @ApiProperty({ example: 4.3, description:"동물 몸무게" })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  weight: number;

  @ApiProperty({ example: "2025-09-15", description:"공고 시작일" })
  @Type(() => Date)
  @IsDate()
  noticeStartDate: Date;

  @ApiProperty({ example: "2025-09-30", description:"공고 마감일" })
  @Type(() => Date)
  @IsDate()
  noticeEndDate: Date;

  @ApiProperty({ enum: AnimalStatus ,description: "동물 상태" })
  @IsEnum(AnimalStatus)
  animalStatus: AnimalStatus;

  @ApiProperty({ example: "서울시 강남구", description:"발견장소" })
  @IsString()
  @MaxLength(50)
  foundLocation: string;

  @ApiProperty({ example: "사람을 잘 따름", description:"특이사항" })
  @IsString()
  @MaxLength(100)
  specialNotes: string;

  @ApiProperty({ example: "건강하고 활발한 아이입니다.", description:"소개" })
  @IsString()
  @MaxLength(500)
  description: string;

  @ApiProperty({ example: "예방접종 완료", description:"건강상태" })
  @IsString()
  @MaxLength(500)
  healthStatus: string;
}