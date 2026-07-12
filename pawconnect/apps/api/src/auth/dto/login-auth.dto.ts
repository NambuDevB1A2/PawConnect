import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginAuthDto {
    @ApiProperty({ example: "example@email.com" })
    @IsString()
    email: string;

    @ApiProperty({ example: "a123456789!" })
    password: string;
}