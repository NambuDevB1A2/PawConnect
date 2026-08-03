import { PrismaService } from "@/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { AiPawtiAnalysisRequestDto } from "./dto/ai-pawti-analysis-request.dto";
import { AiPawtiAnalysisResponseDto } from "./dto/ai-pawti-analysis-response.dto";       // 보호소 관리자


// PawTI AI 분석 생성
@Injectable()
export class AiPawtiService {

    async analysis(dto: AiPawtiAnalysisRequestDto):
        Promise<AiPawtiAnalysisResponseDto> {
        return {
            analysis:
                `${dto.mbti} 유형은 ${dto.title} 성향으로,
                            ${dto.keywords.join(',')} 특징을 가지고 있습니다.`,

            recommendReason:
                `${dto.breed} 품종은 당신의 성향과 잘 맞는 친구입니다.`,

            adoptionCheckPoint:
                "입양 전 생활 환경과 활동량을 확인해주세요.",

            aiComment:
                "서로에게 좋은 가족이 될 수 있는 친구입니다."
        };
    }
}
