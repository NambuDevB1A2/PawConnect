import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class UpdatePasswordDto {
    @ApiProperty({ example: "Aa123456789!" })
    @IsString()
    @MinLength(6, { message: "비밀번호는 6자 이상이어야 합니다" })
    @MaxLength(30, { message: "비밀번호는 30자 이하여야 합니다" })
    prevPassword: string;
    
    @ApiProperty({ example: "Aa12345678900!" })
    @IsString()
    @MinLength(6, { message: "비밀번호는 6자 이상이어야 합니다" })
    @MaxLength(30, { message: "비밀번호는 30자 이하여야 합니다" })
    @Matches(/^(?=.*[a-z]).+$/, { message: "영문 소문자를 포함해주세요" })
    @Matches(/^(?=.*[A-Z]).+$/, { message: "영문 대문자를 포함해주세요" })
    @Matches(/^(?=.*\d).+$/, { message: "최소 1자 이상의 숫자를 포함해주세요" })
    @Matches(/^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/, { message: "최소 1자 이상의 특수문자를 포함해주세요" })
    newPassword: string;
}