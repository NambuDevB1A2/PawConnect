import { AiPawLogDto } from '@/ai/dto/ai-pawlog.dto';
import { Injectable } from '@nestjs/common';
import { AiAnimalDto } from '@/ai/dto/ai-animal.dto';
import { AiAgentChatDto } from '@/ai/dto/ai-agent.dto';
import { AiGenerateService } from '@/ai/ai-generate.service';
import { AiAgentService } from '@/ai/ai-agent.service';
import { AiOpenAiService } from '@/ai/ai-openai.service';
import { AiPawtiAnalysisRequestDto } from './pawti/dto/ai-pawti-analysis-request.dto';
import { AiPawtiAnalysisResponseDto } from './pawti/dto/ai-pawti-analysis-response.dto';
import { AiPawtiService } from './pawti/ai-pawti.service';

@Injectable()
export class AiService {
    constructor(
        private readonly openAiService: AiOpenAiService,
        private readonly generateService: AiGenerateService,
        private readonly agentService: AiAgentService,
        private readonly aipawtiService: AiPawtiService,
    ) {}

    // PawTI AI 분석 생성
    async analysis(dto: AiPawtiAnalysisRequestDto) {
            const result = await this.aipawtiService.analysis(dto);

        return {success: true, ...result};
    }

    // ai 자동 생성 게시글
    async generatePawLog(aiPawLogDto: AiPawLogDto, files?: Express.Multer.File[]) {
        const result = await this.generateService.generatePawLog(aiPawLogDto, files);

        return { success: true, ...result };
    }

    // ai 품종 추론 및 자동 생성 게시글
    async generateAnimal(aiAnimalDto: AiAnimalDto, files?: Express.Multer.File[]) {
        const result = await this.generateService.generateAnimal(aiAnimalDto, files);

        return { success: true, ...result };
    }

    // ai 에이전트 채팅
    async agentChat(aiAgentChatDto: AiAgentChatDto) {
        const { content, conversationId } = await this.agentService.agentChat(
            aiAgentChatDto.content, 
            aiAgentChatDto.conversationId
        );
        const result = await this.openAiService.parseJsonResponse(content);

        return { success: true, conversationId, ...result };
    }
}