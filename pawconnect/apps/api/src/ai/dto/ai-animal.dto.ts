import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString, MaxLength } from "class-validator";

export class AiAnimalDto {
    @ApiPropertyOptional({ example: 1 })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    species: number;

    @ApiPropertyOptional({ example: 2 })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    breed: number;

    @ApiPropertyOptional({ example: "친절하고 사람을 좋아하는 성격" })
    @IsOptional()
    @IsString()
    @MaxLength(500, { message: "게시글 내용은 500자 이하여야 합니다" })
    description: string;
    
    @ApiPropertyOptional({ example: "왼쪽 다리가 아픔" })
    @IsOptional()
    @IsString()
    @MaxLength(500, { message: "게시글 내용은 500자 이하여야 합니다" })
    healthStatus: string;

    @ApiPropertyOptional({ type: 'string', format: 'binary', isArray: true, })
    images: Express.Multer.File[];
}