import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, MaxLength } from "class-validator";

export class AiPawLogDto {
    @ApiProperty({ example: "강아지 농구공 모양 장난감 생일선물" })
    @IsString()
    @MaxLength(500, { message: "게시글 내용은 500자 이하여야 합니다" })
    content: string;

    @ApiPropertyOptional({ type: 'string', format: 'binary', isArray: true, })
    images: Express.Multer.File[];
}