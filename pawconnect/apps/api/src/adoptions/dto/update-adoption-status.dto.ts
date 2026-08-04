import { ApiProperty } from "@nestjs/swagger";
import { AdoptionStatus, AnimalStatus } from "@prisma/client";
import { IsEnum, IsOptional } from "class-validator";


// 관리자 상태 변경
export class UpdateAdoptionStatusDto {
    @ApiProperty({enum: AdoptionStatus, example: "COUNSELING"})
    @IsOptional()
    @IsEnum(AdoptionStatus)
    adoptionStatus: AdoptionStatus;
    
    @ApiProperty({enum: AdoptionStatus, example: "PROTECTED"})
    @IsOptional()
    @IsEnum(AnimalStatus)
    animalStatus: AnimalStatus;
}
