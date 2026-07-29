import { TRANSFORM_STRING_TO_BOOLEAN } from "@/common/dto/format.dto";
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
    imgProfile: Express.Multer.File;
    
    @ApiPropertyOptional({ example: false })
    @IsOptional()
    @Transform(TRANSFORM_STRING_TO_BOOLEAN)
    @IsBoolean()
    imgProfileRemoved?: boolean;
}