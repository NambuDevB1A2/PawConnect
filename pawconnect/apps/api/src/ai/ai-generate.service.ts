import { AiOpenAiService, ChatMessage } from '@/ai/ai-openai.service';
import { AI_SYSTEM_PROMPTS } from '@/ai/constants/ai-prompt.constant';
import { AiAnimalDto } from '@/ai/dto/ai-animal.dto';
import { AiPawLogDto } from '@/ai/dto/ai-pawlog.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class AiGenerateService {
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
        return await this.openAiService.parseJsonResponse(rawContent);
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
                // { type: 'text', text: `종류: ${animalSpecies?.name ?? '미설정'}` },
                // { type: 'text', text: `품종: ${animalBreed?.name ?? '미설정'}` },
                { type: 'text', text: `description: ${aiAnimalDto.description ?? ''}` },
                { type: 'text', text: `healthStatus: ${aiAnimalDto.healthStatus ?? ''}` },
                ...(imageContents ? imageContents : []),
            ]),
        ];

        // Ai 호출
        const rawContent = await this.openAiService.callChatCompletion({
            messages,
            jsonResponse: true,
        });

        // Json 응답 파싱
        const { speciesName, breedName, ...result } = await this.openAiService.parseJsonResponse(rawContent);

        let species, breed;
        if (speciesName && speciesName !== "기타") species = await this.prisma.animalSpecies.findFirst({ where: { name: speciesName }});
        if (breedName && breedName !== "기타") breed = await this.prisma.animalBreed.findFirst({ where: { name: breedName }});

        return { ...result, species, breed };
    }
}
