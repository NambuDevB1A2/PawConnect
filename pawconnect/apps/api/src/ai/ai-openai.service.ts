import { HttpService } from '@nestjs/axios';
import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { AxiosError } from 'axios';
import azureOpenAiConfig from '@/config/azure/azure-openai.config';
import { firstValueFrom } from 'rxjs';

export interface ChatMessageContent {
    type: 'text' | 'image_url';
    text?: string;
    image_url?: { url: string };
}

export interface ChatMessage {
    role: 'system' | 'user' | 'assistant';
    content: string | ChatMessageContent[];
}

export interface ChatCompletionOptions {
    messages: ChatMessage[];
    maxCompletionTokens?: number;
    temperature?: number;
    jsonResponse?: boolean;
}

@Injectable()
export class AiOpenAiService {
    constructor(
        private readonly httpService: HttpService,
        @Inject(azureOpenAiConfig.KEY)
        private readonly openAiConfig: ConfigType<typeof azureOpenAiConfig>,
    ) {}

    // 파일을 이미지 콘텐츠로 변환
    buildImageContents(files: Express.Multer.File[]) {
        const imageContents: ChatMessageContent[] = files.map((file) => ({
            type: 'image_url',
            image_url: {
                url: `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
            },
        }));

        return imageContents;
    }

    // 유저 메세지 생성
    buildUserMessage(contents: ChatMessageContent[]): ChatMessage {
        return {
            role: 'user',
            content: [...contents],
        };
    }

    // 시스템 메세지 생성
    buildSystemMessage(content: string): ChatMessage {
        return { role: 'system', content };
    }

    // 요청 바디 생성
    private buildRequestBody(options: ChatCompletionOptions) {
        const { deployment } = this.openAiConfig;

        return {
            model: deployment,
            messages: options.messages,
            ...(options.maxCompletionTokens && { max_completion_tokens: options.maxCompletionTokens }),
            ...(options.temperature !== undefined && { temperature: options.temperature }),
            ...(options.jsonResponse && { response_format: { type: 'json_object' } }),
        };
    }

    // Azure OpenAI 호출 (재사용 가능)
    async callChatCompletion({
        messages,
        maxCompletionTokens = 800,
        temperature = 0.7,
        jsonResponse,
    }: ChatCompletionOptions): Promise<string> {

        const { endpoint, apiKey, apiVersion } = this.openAiConfig;
        const url = `${endpoint}/chat/completions`;
        const requestBody = this.buildRequestBody({
            messages,
            maxCompletionTokens,
            temperature,
            jsonResponse,
        });

        try {
            const { data } = await firstValueFrom(
                this.httpService.post(url, requestBody, {
                    params: { 'api-version': apiVersion },
                    headers: {
                        'Content-Type': 'application/json',
                        'api-key': apiKey,
                    },
                }),
            );

            const rawContent = data.choices?.[0]?.message?.content;
            if (!rawContent) {
                throw new InternalServerErrorException({ message: 'AI 응답이 비어있습니다' });
            }

            return rawContent;
        } catch (err) {
            if (err instanceof InternalServerErrorException) {
                throw err;
            }
            const axiosErr = err as AxiosError<any>;
            throw new BadRequestException({
                message: 'AI 게시글 생성 실패',
                detail: axiosErr.response?.data?.error?.message ?? axiosErr.message,
            });
        }
    }

    // JSON 응답 파싱 (코드블록 방어 포함)
    async parseJsonResponse(rawContent: string) {
        const cleaned = rawContent.replace(/```json|```/g, '').trim();
        try {
            return JSON.parse(cleaned);
        } catch {
            throw new InternalServerErrorException({
                message: 'AI 응답 파싱 실패',
                detail: rawContent,
            });
        }
    }
}
