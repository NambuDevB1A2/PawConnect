import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class LoginAuthDto {
    @ApiProperty({ example: "example@email.com" })
    @IsEmail()
    email: string;

    @ApiProperty({ example: "Aa123456789!" })
    @IsString()
    @MinLength(6)
    @MaxLength(30)
    password: string;
}