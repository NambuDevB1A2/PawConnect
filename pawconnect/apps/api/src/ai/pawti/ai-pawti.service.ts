import { Injectable } from "@nestjs/common";
import { AiPawtiAnalysisRequestDto } from "./dto/ai-pawti-analysis-request.dto";
import { AiOpenAiService, ChatMessage } from '@/ai/ai-openai.service';
import { AI_PAWTI_SYSTEM_PROMPTS } from "../constants/ai-pawtiPrompt.constant";
import { AiPawtiAnalysisResponseDto } from "./dto/ai-pawti-analysis-response.dto";


// PawTI AI 분석 생성
// 사용자의 PawTI 결과를 Azure OpenAI에게 전달하고 분석 결과 반환
@Injectable()
export class AiPawtiService {
    constructor(private readonly openAiService: AiOpenAiService,) { }

    // pawTI 테스트 결과 분석
    async analysis(dto: AiPawtiAnalysisRequestDto):
        Promise<AiPawtiAnalysisResponseDto> {

        // 1. Azure OpenAI에게 전달할 메시지 생성
        const messages: ChatMessage[] = [
            // AI 역할과 응답 규칙
            this.openAiService.buildSystemMessage(
                AI_PAWTI_SYSTEM_PROMPTS.PAWTI_ANALYSIS),

             // 사용자 PawTI 결과 데이터
            this.openAiService.buildUserMessage([
                {
                    type: 'text', text: `
                    MBTI: ${dto.mbti}            
                    결과 제목: ${dto.title}
                    성향 키워드: ${dto.keywords.map(v => `- ${v}`).join("\n")}
                    추천 품종:${dto.breed}
                    `
                },
            ])
        ];

        // 추천 동물 이름:${dto.animalName ?? "없음"}
        //추천 동물 나이:${dto.animalAge ?? "정보 없음"}
        //추천 동물 특징:${dto.animalDescription ?? "정보 없음"}

        // 2. Azure OpenAI 호출
        const rawContent = await this.openAiService.callChatCompletion({
            messages, jsonResponse: true, temperature: 0.5
        });

        // 3. AI JSON 결과 변환
        const result = await this.openAiService.parseJsonResponse(rawContent);

        return result as AiPawtiAnalysisResponseDto;
    }
}