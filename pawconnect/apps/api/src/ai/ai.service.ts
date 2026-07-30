import { AiPawLogDto } from '@/ai/dto/ai-pawlog.dto';
import { Injectable } from '@nestjs/common';
import { AiAnimalDto } from '@/ai/dto/ai-animal.dto';
import { AiAgentChatDto } from '@/ai/dto/ai-agent.dto';
import { AiGenerateService } from '@/ai/ai-generate.service';
import { AiAgentService } from '@/ai/ai-agent.service';

@Injectable()
export class AiService {
    constructor(
        private readonly generateService: AiGenerateService,
        private readonly agentService: AiAgentService,
    ) {}

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
        const result = await this.agentService.agentChat(aiAgentChatDto);

        return { success: true, ...result };
    }
}