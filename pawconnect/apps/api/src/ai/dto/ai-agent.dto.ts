import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class AiAgentChatDto {
    @ApiPropertyOptional({ example: 'conv_abc123', description: '이전 대화를 이어가려면 응답으로 받은 conversationId를 그대로 보내주세요.' })
    @IsOptional()
    @IsString()
    conversationId?: string;
    
    @ApiProperty({ example: "성향에 맞는 아이를 추천해주세요" })
    @IsString()
    @MinLength(1, { message: "필수로 작성해주세요" })
    @MaxLength(500, { message: "500자 이하여야 합니다" })
    content: string;
}