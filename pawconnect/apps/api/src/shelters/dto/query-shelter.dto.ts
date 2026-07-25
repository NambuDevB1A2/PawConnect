import { QueryPaginationDto } from "@/common/dto/query-pagination.dto";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { AdoptionStatus } from "@prisma/client";
import { IsEnum, IsOptional } from "class-validator";

export class QueryGetShelterAdoptionsDto extends QueryPaginationDto {
    @ApiPropertyOptional({ example: AdoptionStatus.PENDING })
    @IsEnum(AdoptionStatus)
    @IsOptional()
    status: AdoptionStatus;
}