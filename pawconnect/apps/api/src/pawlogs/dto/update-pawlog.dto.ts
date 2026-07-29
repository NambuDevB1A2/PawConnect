import { TRANSFORM_STRING_TO_ARRAY } from "@/common/dto/format.dto";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, IsOptional, IsString, MaxLength } from "class-validator";

export class UpdatePawLogDto {
    @ApiPropertyOptional({ example: "우리 강아지 첫 산책 기념샷" })
    @IsOptional()
    @IsString()
    @MaxLength(50, { message: "제목은 50자 이하여야 합니다" })
    title: string;

    @ApiPropertyOptional({ example: "오늘 드디어 첫 산책을 나갔어요! 처음엔 무서워하더니 금방 신나서 뛰어다니네요. 앞으로 매일 산책 나가야겠어요." })
    @IsOptional()
    @IsString()
    @MaxLength(500, { message: "게시글 내용은 500자 이하여야 합니다" })
    content: string;

    @ApiPropertyOptional({ type: 'string', format: 'binary', isArray: true, })
    imgPawLog: Express.Multer.File[];

    @ApiPropertyOptional()
    @IsOptional()
    @Transform(TRANSFORM_STRING_TO_ARRAY)
    @IsArray()
    @IsString({ each: true })
    imgPawLogKeeps?: string[];
}