import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber } from "class-validator";

// 입양 약관 동의
export class AdoptionAgreementDto{
    @ApiProperty({example:1, description: "약관 ID",})
    @IsNumber()
    agreementId: number;

    @ApiProperty({example:true, description: "약관 동의 여부",})
    @IsBoolean()
    isAgreed: boolean;
}