import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class LoginAuthDto {
    @ApiProperty({ example: "example@email.com" })
    @IsString()
    email: string;

    @ApiProperty({ example: "a123456789!" })
    @IsString()
    @Length(6, 30)
    password: string;
}