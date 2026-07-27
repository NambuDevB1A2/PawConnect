import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, MaxLength } from "class-validator";

export class CreatePawLogDto {
    @ApiProperty({ example: "00000000-0000-0000-0000-000000000001" })
    @IsString()
    authorId: string;

    @ApiProperty({ example: "우리 강아지 첫 산책 기념샷" })
    @IsString()
    @MaxLength(1, { message: "제목을 필수로 작성해주세요" })
    @MaxLength(50, { message: "제목은 50자 이하여야 합니다" })
    title: string;

    @ApiProperty({ example: "오늘 드디어 첫 산책을 나갔어요! 처음엔 무서워하더니 금방 신나서 뛰어다니네요. 앞으로 매일 산책 나가야겠어요." })
    @IsString()
    @MaxLength(500, { message: "게시글 내용은 500자 이하여야 합니다" })
    content: string;

    @ApiPropertyOptional({ type: 'string', format: 'binary', isArray: true, })
    @IsOptional()
    imgPawLog: any[];
}