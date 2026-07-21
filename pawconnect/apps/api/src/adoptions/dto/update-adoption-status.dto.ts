import { ApiProperty } from "@nestjs/swagger";
import { AdoptionStatus } from "@prisma/client";
import { IsEnum } from "class-validator";


// 관리자 상태 변경
export class UpdateAdoptionStatusDto {
    @ApiProperty({enum: AdoptionStatus, example: "COUNSELING"})
    @IsEnum(AdoptionStatus)
    adoptionStatus: AdoptionStatus;
}
