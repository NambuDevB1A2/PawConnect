import { ApiProperty } from "@nestjs/swagger";

// AI 반환 dto
export class AiPawtiAnalysisResponseDto {
    @ApiProperty({example:"새로운 경험을 즐기고 사람과 교감하는 성향입니다",
        description: "결과 성향 분석"})
    analysis: string;

    @ApiProperty({example: "리트리버의 친화적인 성향이 당신과 잘 맞습니다.",
        description: "추천 이유"})
    recommendReason: string;

    @ApiProperty({example: "활동량과 산책 시간을 고려해주세요.",
        description: "입양 전 체크포인트"})
    adoptionCheckPoint: string;

    @ApiProperty({example: "좋은 가족이 될 가능성이 높아요",
        description:  "AI 한마디"})
    aiComment:string;
}