import { AiOpenAiService, ChatMessage } from '@/ai/ai-openai.service';
import { buildAnimalWhere } from '@/animals/animals.where';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { AnimalGender, AnimalStatus } from '@prisma/client';

@Injectable()
export class AiToolsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly openAiService: AiOpenAiService,
    ) {}

    // Tools 호출
    async callTools(messages, message) {
        if (!message.tool_calls || message.tool_calls.length === 0) {
            return { resMessages: messages, resMessage: message };
        }

        messages.push(message); // assistant의 toll_call 메세지를 히스토리에 추가

        for (const toolCall of message.tool_calls) {
            const args = JSON.parse(toolCall.function.arguments);

            // 실제 DB 조회
            let result;

            console.log(args);

            switch (toolCall.function.name) {
                case "findAnimals": 
                    result = await this.findAnimals({ ...args });
                    break;
            }

            // 함수 실행 결과를 다시 대화에 추가
            messages.push({
                role: 'tool',
                tool_call_id: toolCall.id,
                content: JSON.stringify(result),
            } as ChatMessage);
        }
        
        // Ai 재호출
        const response = await this.openAiService.callChatCompletionRaw({
            messages,
            jsonResponse: true,
        });

        return { resMessages: messages, resMessage: response.choices[0].message };
    }

    // TOOL_FIND_ANIMALS
    async findAnimals({
        keyword, species, breed, gender, isNeutered, ageFilter, status,
    }: {
        keyword?: string, species?: number, breed?: number, gender?: AnimalGender, isNeutered?: boolean, ageFilter?: number, status?: AnimalStatus,
    }) {

        console.log(keyword);
        console.log(species);
        console.log(breed);
        console.log(gender);
        console.log(isNeutered);
        console.log(ageFilter);
        console.log(status);

        // 검색, 필터 where
        const where = buildAnimalWhere({
            keyword,
            species,
            breed,
            gender,
            isNeutered,
            ageFilter,
            status,
            limit: 0,
            page: 0,
        });

        // 보호동물 목록 조회
        const animals = await this.prisma.animal.findMany({
                where,
                orderBy:{ createdAt: 'desc' },
            });

        return animals;
    }
}
