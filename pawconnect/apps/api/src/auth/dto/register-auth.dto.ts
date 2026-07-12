import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";
import { IsEnum, IsString, Length } from "class-validator";

export class RegisterAuthDto {
    @ApiProperty({ example: "example@email.com" })
    @IsString()
    email: string;

    @ApiProperty({ example: "a123456789!" })
    @IsString()
    @Length(6, 30)
    password: string;

    @ApiProperty({ example: "유저1234" })
    @IsString()
    @Length(2, 16)
    nickname: string;

    @ApiProperty({ example: Role.USER })
    @IsEnum(Role)
    role: Role;

    // TODO : 이미지 추가
    @ApiProperty({ example: "/defualt_profile.png" })
    @IsString()
    imgProfile: string;
}