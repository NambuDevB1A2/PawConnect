
//보호동물 목록 조회 (검색 + 필터 + 페이지네이션)

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { AnimalGender, AnimalStatus } from "@prisma/client";
import { Transform, Type } from "class-transformer";
import { IsBoolean, IsDate, IsEnum, IsNumber, IsOptional, IsString, MaxLength, Min } from "class-validator";

// GET /animals
export class GetAnimalsQueryDto {
    @ApiPropertyOptional({example: "봉지", description: "보호동물 이름 또는 보호소 이름"})
    @IsOptional()
    @IsString()
    keyword?: string;
    
    @ApiPropertyOptional({example: 2, description: "동물 종류ID"})
    @IsOptional()
    @Type(()=> Number)
    @IsNumber()
    species?: number;
    
    @ApiPropertyOptional({example: 13, description: "동물 품종 선택(리트리버, 코숏 등)"})
    @IsOptional()
    @Type(()=> Number)
    @IsNumber()
    breed?: number;
    
    @ApiPropertyOptional({example: AnimalGender.MALE, description: "동물 성별 선택(남아, 여아)"})
    @IsOptional()
    @IsEnum(AnimalGender)
    gender?: AnimalGender;

    @ApiPropertyOptional({example: true, description: "동물 중성화 여부"})
    @IsOptional()
    @Transform(({value}) => value === 'true')
    isNeutered?:boolean;
    
    // 프론트 드롭다운 값
  // 1: 0~6개월
  // 2: 6개월~1년
  // 3: 1~7세
  // 4: 7세 이상
  // 5: 확인 불가
    @ApiPropertyOptional({example: 2, description: "나이 필터(1~5)"})  //enum: AnimalAgeFilter,
    @IsOptional()
    //@IsEnum(AnimalAgeFilter)
    @Type(() => Number)
    @IsNumber()
    ageFilter?: number;
    
    @ApiPropertyOptional({example: AnimalStatus.ADOPTED, description: "입양 상태"})
    @IsOptional()
    @IsEnum(AnimalStatus)
    status?: AnimalStatus;
    
    @ApiPropertyOptional({example: 2, description: "페이지 번호 기본값 1"})
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    page = 1;
}

//동물 카드용 Response 응답
export class AnimalCardDto {
    @ApiProperty({example: 1, description: "동물 카드 아이디"})
    id: number;

    @ApiProperty({example: "/uploads/animal/thumbnail.jpg", 
                description: "보호동물 썸네일 이미지"})
    @IsString()
    @MaxLength(100)
    imgThumbnail: string;

    @ApiProperty({example: AnimalStatus.PROTECTED, description: "보호동물 입양 상태"})
    @IsEnum(AnimalStatus)
    status: AnimalStatus;

    @ApiProperty({example: "고양이", description: "동물 종류"})
    @IsString()
    species: string;

    @ApiProperty({example: "리트리버", description: "동물 품종"})
    @IsString()
    breed: string;

    @ApiProperty({example: "봉지", description: "동물 이름"})
    @IsString()
    @MaxLength(50)
    name: string

    @ApiProperty({example: AnimalGender.MALE, description: "성별"})
    @IsEnum(AnimalGender)
    gender: AnimalGender;

    @ApiProperty({example: true, description: "중성화 여부"})    
    @IsBoolean()
    isNeutered: boolean;

    @ApiProperty({example: 2, description: "나이 선택"})
    @IsNumber()
    age: number;

    @ApiProperty({example: false, description: "추정 나이 여부"})
    @IsBoolean()
    isEstimatedAge: boolean;

    @ApiProperty({example: 4.2, description: "몸무게(kg)"})
    @IsNumber()
    weight: number;

    @ApiProperty({example: "행복 보호소", description: "보호소 이름"})
    @IsString()
    shelterName: string;

    @ApiProperty({example: "2025-09-08T12:30:00.000Z", 
                    description: "등록일"})
    createdAt: Date; 
}

// 페이지 네이션
export class GetAnimalsResponseDto {
    @ApiProperty({type: [AnimalCardDto], description: "보호동물 목록"})
    items:AnimalCardDto[];

    @ApiProperty({example: 1, description: "현재 페이지"})
    @IsNumber()
    page: number;

    @ApiProperty({example: 7, description: "전체 페이지 수"})
    @IsNumber()
    totalPages: number;

    @ApiProperty({example: 60, description: "전체 보호 동물 수"})
    @IsNumber()
    totalCount: number;
}