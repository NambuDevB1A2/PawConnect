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

    @ApiProperty({ example: "친절하고 사람을 좋아하는 성격 왼쪽 다리가 아픔" })
    @IsString()
    @MaxLength(500, { message: "게시글 내용은 500자 이하여야 합니다" })
    content: string;

    @ApiPropertyOptional({ type: 'string', format: 'binary', isArray: true, })
    @IsOptional()
    images: any[];
}