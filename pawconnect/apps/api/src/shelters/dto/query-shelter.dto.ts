import { QueryPaginationDto } from "@/common/dto/query-pagination.dto";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { AdoptionStatus, AnimalStatus } from "@prisma/client";
import { IsEnum, IsOptional } from "class-validator";

export class QueryGetShelterAdoptionsDto extends QueryPaginationDto {
    @ApiPropertyOptional({ example: AdoptionStatus.PENDING })
    @IsEnum(AdoptionStatus)
    @IsOptional()
    status: AdoptionStatus;
}

// 내 보호소 동물 목록 조회 요청 DTO
export class QueryGetShelterAnimalsDto extends QueryPaginationDto {
    // 동물 상태 필터 (선택)
    // 전달하지 않으면 내 보호소의 모든 동물 조회
    @ApiPropertyOptional({ example: AnimalStatus.AVAILABLE,
        description: "동물 상태"})
    @IsEnum(AnimalStatus)
    @IsOptional()
    status?: AnimalStatus;
}