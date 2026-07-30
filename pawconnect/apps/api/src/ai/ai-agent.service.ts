import { AiOpenAiService, ChatMessage } from '@/ai/ai-openai.service';
import { AiToolsService } from '@/ai/ai-tools.service';
import { TOOLS } from '@/ai/constants/ai-tools.constant';
import { AI_SYSTEM_PROMPTS } from '@/ai/constants/ai-prompt.constant';
import { AiAgentChatDto } from '@/ai/dto/ai-agent.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AiAgentService {
    constructor(
        private readonly openAiService: AiOpenAiService,
        private readonly toolsService: AiToolsService,
    ) {}

    // ai 에이전트 채팅
    async agentChat(aiAgentChatDto: AiAgentChatDto) {
        
        const messages: ChatMessage[] = [
            // 시스템 지침
            this.openAiService.buildSystemMessage(AI_SYSTEM_PROMPTS.AGENT_CHAT),
            
            // 전송할 정보
            this.openAiService.buildUserMessage([
                { type: 'text', text: `질문: ${aiAgentChatDto.content}` },
            ]),
        ];

        // Ai 호출
        const response = await this.openAiService.callChatCompletionRaw({
            messages,
            tools: TOOLS,
        });

        const { resMessage } = await this.toolsService.callTools(messages, response.choices[0].message);

        // Json 응답 파싱
        return await this.openAiService.parseJsonResponse(resMessage.content);
    }
}
