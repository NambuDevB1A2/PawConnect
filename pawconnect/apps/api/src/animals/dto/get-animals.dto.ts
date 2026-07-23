/**
 * 보호동물 목록 조회 API DTO
 * - 검색
 * - 필터
 * - 페이지네이션
 */

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { AnimalGender, AnimalStatus } from "@prisma/client";
import { Transform, Type } from "class-transformer";
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString, Min } from "class-validator";

/**
 * GET /animals
 * 보호동물 목록 조회 요청 DTO
 * 검색, 필터, 페이지네이션 조건 전달
 */
export class GetAnimalsQueryDto {
    @ApiPropertyOptional({example: "봉지", description: "보호동물 이름 또는 보호소 이름"})
    @IsOptional()
    @IsString()
    keyword?: string;
    
    @ApiPropertyOptional({example: 1, description: "동물 종류 ID"})
    @IsOptional()
    @Type(()=> Number)
    @IsNumber()
    species?: number;
    
    @ApiPropertyOptional({example: 8, description: "동물 품종 ID"})
    @IsOptional()
    @Type(()=> Number)
    @IsNumber()
    breed?: number;
    
    @ApiPropertyOptional({example: AnimalGender.MALE, description: "동물 성별(남아, 여아)"})
    @IsOptional()
    @IsEnum(AnimalGender)
    gender?: AnimalGender;

    @ApiPropertyOptional({example: true, description: "동물 중성화 여부"})
    @IsOptional()
    @Transform(({value}) => value === 'true')
    @IsBoolean()
    isNeutered?:boolean;
    
    @ApiPropertyOptional({example: 2, description: "나이 필터(1~5)"})
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    ageFilter?: number;
    
    @ApiPropertyOptional({example: AnimalStatus.AVAILABLE, description: "입양 상태"})
    @IsOptional()
    @IsEnum(AnimalStatus)
    status?: AnimalStatus;
    
    @ApiPropertyOptional({example: 1, default:1, description: "페이지 번호 기본값 1"})
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    page?:number;
}

/**
 * 보호동물 목록 카드 응답 DTO (Response)
 * 목록 화면 카드 1개 데이터
 */
export class AnimalCardDto {
    @ApiProperty({example: 1, description: "동물 카드 아이디"})
    id: number;

    @ApiProperty({example: "/uploads/animal/thumbnail.jpg", 
                description: "보호동물 썸네일 이미지"})
    imgThumbnail: string;

    @ApiProperty({example: AnimalStatus.PROTECTED, description: "보호동물 입양 상태"})
    status: AnimalStatus;

    @ApiProperty({example: "고양이", description: "동물 종류"})
    species: string;

    @ApiProperty({example: "리트리버", description: "동물 품종"})
    breed: string;

    @ApiProperty({example: "봉지", description: "동물 이름"})
    name: string

    @ApiProperty({example: AnimalGender.MALE, description: "성별"})
    gender: AnimalGender;

    @ApiProperty({example: true, description: "중성화 여부"})    
    isNeutered: boolean;

    @ApiProperty({example: 2, description: "나이(개월)"})
    age: number;

    @ApiProperty({example: false, description: "추정 나이 여부"})
    isEstimatedAge: boolean;

    @ApiProperty({example: 4.2, description: "몸무게(kg)"})
    weight: number;

    @ApiProperty({example: "행복 보호소", description: "보호소 이름"})
    shelterName: string;

    @ApiProperty({example: "2025-09-08T12:30:00.000Z", 
                    description: "등록일시"})
    createdAt: Date;
}

/**
 * 보호동물 목록 조회 응답 DTO
 * 카드 목록 + 페이지네이션 정보 반환
 */
export class GetAnimalsResponseDto {
    @ApiProperty({type: [AnimalCardDto], description: "보호동물 목록"})
    items: AnimalCardDto[];

    @ApiProperty({example: 1, description: "현재 페이지"})
    page: number;

    @ApiProperty({example: 7, description: "전체 페이지 수"})
    totalPages: number;

    @ApiProperty({example: 60, description: "전체 보호 동물 수"})
    totalCount: number;
}