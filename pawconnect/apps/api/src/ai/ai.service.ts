import { AiPawLogDto } from '@/ai/dto/ai-pawlog.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AiOpenAiService, ChatMessage } from '@/ai/ai-openai.service';
import { AiAnimalDto } from '@/ai/dto/ai-animal.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { AI_SYSTEM_PROMPTS } from '@/ai/constants/ai-prompt.constant';
import { AiAgentChatDto } from '@/ai/dto/ai-agent.dto';
import { TOOLS } from '@/ai/constants/ai-openai.constant';

@Injectable()
export class AiService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly openAiService: AiOpenAiService,
    ) {}

    // ai 자동 생성 게시글
    async generatePawLog(aiPawLogDto: AiPawLogDto, files?: Express.Multer.File[]) {
        if (!files || files.length === 0) {
            throw new BadRequestException({ message: '잘못된 접근입니다' });
        }

        // 파일을 이미지 콘텐츠로 변환
        const imageContents = this.openAiService.buildImageContents(files);

        const messages: ChatMessage[] = [
            // 시스템 지침
            this.openAiService.buildSystemMessage(AI_SYSTEM_PROMPTS.PAWLOG_GENERATION),
            
            // 전송할 정보
            this.openAiService.buildUserMessage([
                { type: 'text', text: aiPawLogDto.content ?? '' },
                ...imageContents]),
        ];

        // Ai 호출
        const rawContent = await this.openAiService.callChatCompletion({
            messages,
            jsonResponse: true,
        });

        // Json 응답 파싱
        const result = await this.openAiService.parseJsonResponse(rawContent);

        return { success: true, ...result };
    }

    // ai 품종 추론 및 자동 생성 게시글
    async generateAnimal(aiAnimalDto: AiAnimalDto, files?: Express.Multer.File[]) {
        if (!files || files.length === 0) {
            throw new BadRequestException({ message: '잘못된 접근입니다' });
        }
        
        // 파일을 이미지 콘텐츠로 변환
        const imageContents = files ? this.openAiService.buildImageContents(files) : null;

        const animalSpecies = aiAnimalDto.species ? await this.prisma.animalSpecies.findUnique({ where: { id: aiAnimalDto.species }}) : null;
        const animalBreed = aiAnimalDto.breed ? await this.prisma.animalBreed.findUnique({ where: { id: aiAnimalDto.breed }}) : null;

        const messages: ChatMessage[] = [
            // 시스템 지침
            this.openAiService.buildSystemMessage(AI_SYSTEM_PROMPTS.ANIMAL_GENERATION),
            
            // 전송할 정보
            this.openAiService.buildUserMessage([
                { type: 'text', text: `종류: ${animalSpecies?.name ?? '미설정'}` },
                { type: 'text', text: `품종: ${animalBreed?.name ?? '미설정'}` },
                { type: 'text', text: aiAnimalDto.content ?? '' },
                ...(imageContents ? imageContents : []),
            ]),
        ];

        // Ai 호출
        const rawContent = await this.openAiService.callChatCompletion({
            messages,
            jsonResponse: true,
        });

        // Json 응답 파싱
        const result = await this.openAiService.parseJsonResponse(rawContent);

        return { success: true, ...result };
    }

    // ai 에이전트 채팅
    async agentChat(aiAgentChatDto: AiAgentChatDto) {
        
        let messages: ChatMessage[] = [
            // 시스템 지침
            this.openAiService.buildSystemMessage(AI_SYSTEM_PROMPTS.AGENT_CHAT),
            
            // 전송할 정보
            this.openAiService.buildUserMessage([
                { type: 'text', text: `질문: ${aiAgentChatDto.content}` },
            ]),
        ];

        // Ai 호출
        let response = await this.openAiService.callChatCompletionRaw({
            messages,
            tools: TOOLS,
        });

        let message = response.choices[0].message;

        if (message.tool_calls && message.tool_calls.length > 0) {
            messages.push(message); // assistant의 toll_call 메세지를 히스토리에 추가

            for (const toolCall of message.tool_calls) {
                if (toolCall.function.name === 'getAnimals') {
                    const args = JSON.parse(toolCall.function.arguments);

                    // 실제 DB 조회
                    const resultAnimals = await this.prisma.animal.findMany({
                        take: 3,
                    });

                    // 함수 실행 결과를 다시 대화에 추가
                    messages.push({
                        role: 'tool',
                        tool_call_id: toolCall.id,
                        content: JSON.stringify(resultAnimals),
                    } as ChatMessage);
                }
            }
            
            // Ai 재호출
            response = await this.openAiService.callChatCompletionRaw({
                messages,
                jsonResponse: true,
            });

            message = response.choices[0].message;
        }


        // Json 응답 파싱
        const result = await this.openAiService.parseJsonResponse(message.content);

        return { success: true, ...result };
    }
}