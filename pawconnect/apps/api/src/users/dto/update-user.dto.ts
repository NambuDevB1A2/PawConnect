import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsOptional, IsString, Length } from "class-validator";

export class UpdateUserDto {
    @ApiPropertyOptional({ example: "유저1234" })
    @IsOptional()
    @IsString()
    @Length(2, 16)
    nickname: string;

    @ApiPropertyOptional({ type: 'string', format: 'binary' })
    @IsOptional()
    imgProfile: any;
    
    @ApiPropertyOptional({ example: false })
    @IsOptional()
    @Transform(({ value }) => value === "true" || value === true)
    @IsBoolean()
    imgProfileRemoved?: boolean;
}