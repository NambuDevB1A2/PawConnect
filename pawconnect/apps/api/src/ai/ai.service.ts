import { AiPawLogDto } from '@/ai/dto/ai-pawlog.dto';
import { AuthRequest } from '@/auth/interfaces/auth-request.interface';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AiOpenAiService, ChatMessage } from '@/ai/ai-openai.service';
import { AiAnimalDto } from '@/ai/dto/ai-animal.dto';
import { PrismaService } from '@/prisma/prisma.service';

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
            this.openAiService.buildSystemMessage(
                '당신은 게시글 작성 도우미입니다. ' +
                '제공된 사진들과 사용자가 입력한 단편적인 내용을 참고해서 ' +
                '실제 사람이 작성할 법한 500자 이내의 게시글 내용과 50자 이내의 제목을 작성하세요. ' +
                '반드시 아래 JSON 형식으로만 응답하세요. 다른 설명은 절대 붙이지 마세요. ' +
                '{ "title": "게시글 제목", "content": "게시글 본문" }'),
            
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
        // 파일을 이미지 콘텐츠로 변환
        const imageContents = files ? this.openAiService.buildImageContents(files) : null;

        const animalSpecies = aiAnimalDto.species ? await this.prisma.animalSpecies.findUnique({ where: { id: aiAnimalDto.species }}) : null;
        const animalBreed = aiAnimalDto.breed ? await this.prisma.animalSpecies.findUnique({ where: { id: aiAnimalDto.breed }}) : null;

        const messages: ChatMessage[] = [
            // 시스템 지침
            this.openAiService.buildSystemMessage(
                '당신은 유기동물 입양 게시글 작성 도우미입니다. ' +
                '제공된 사진들과 사용자가 입력한 단편적인 내용을 참고해서 보는 사람이 관심을 가질 법한 게시글 내용과 제목을 작성하세요 ' +
                '동물 종류와 품종이 미설정된 경우 제공된 사진을 보고 동물 종류와 품종을 추론해서 species와 breed를 추론하세요 ' +
                '추론할 수 있는 동물 종류는 개, 고양이, 기타 동물로 고정됩니다' +
                '반드시 아래 JSON 형식으로만 응답하세요. 다른 설명은 절대 붙이지 마세요. ' +
                '{ "title": "게시글 제목", "content": "게시글 본문", species: "동물 종류", breed: "품종" }'),
            
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
}