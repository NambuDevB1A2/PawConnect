import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, Length } from "class-validator";

export class UpdateUserDto {
    @ApiPropertyOptional({ example: "a123456789!" })
    @IsOptional()
    @IsString()
    @Length(6, 30)
    password: string;

    @ApiPropertyOptional({ example: "유저1234" })
    @IsOptional()
    @IsString()
    @Length(2, 16)
    nickname: string;

    @ApiPropertyOptional({ type: 'string', format: 'binary' })
    @IsOptional()
    imgProfile: any;
}