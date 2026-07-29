import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, MinLength } from "class-validator";

export class AiAgentChatDto {
    @ApiProperty({ example: "성향에 맞는 아이를 추천해주세요" })
    @IsString()
    @MinLength(1, { message: "필수로 작성해주세요" })
    @MaxLength(500, { message: "500자 이하여야 합니다" })
    content: string;
}