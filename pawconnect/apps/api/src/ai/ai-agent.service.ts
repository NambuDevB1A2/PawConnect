import { Injectable, InternalServerErrorException, Inject } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { DefaultAzureCredential } from '@azure/identity';
import { AIProjectClient } from '@azure/ai-projects';
import { AiToolsService } from '@/ai/ai-tools.service';
import azureAgentConfig from '@/config/azure/azure-agent.config';
import type { ResponseCreateParamsNonStreaming } from 'openai/resources/responses/responses';
import { AI_SYSTEM_PROMPTS } from '@/ai/constants/ai-prompt.constant';

// Azure Foundry 전용 확장 필드를 추가한 타입
type AzureAgentResponseCreateParams = ResponseCreateParamsNonStreaming & {
    agent_reference: { name: string; version: string; type: 'agent_reference' };
};

interface ResponseFunctionCallItem {
    type: 'function_call';
    call_id: string;
    name: string;
    arguments: string;
}

@Injectable()
export class AiAgentService {
    private readonly projectClient: AIProjectClient;

    constructor(
        @Inject(azureAgentConfig.KEY)
        private readonly agentConfig: ConfigType<typeof azureAgentConfig>,
        private readonly toolsService: AiToolsService,
    ) {
        if (!this.agentConfig.endpoint) {
            throw new Error('AZURE_AGENT_PROJECT_ENDPOINT가 설정되지 않았습니다');
        }

        this.projectClient = new AIProjectClient(
            this.agentConfig.endpoint,
            new DefaultAzureCredential(),
        );
    }

    private get agentReference() {
        const { agentName, agentVersion } = this.agentConfig;
        return { name: agentName, version: agentVersion, type: 'agent_reference' as const };
    }

    // ai 에이전트 빌드 사용
    async agentChat(userMessage: string): Promise<string> {
        const openAIClient = this.projectClient.getOpenAIClient();

        const conversation = await openAIClient.conversations.create({
            items: [
                { type: 'message', role: 'system', content: AI_SYSTEM_PROMPTS.AGENT_CHAT },
                { type: 'message', role: 'user', content: userMessage }
            ],
        });

        let response = await openAIClient.responses.create({
            conversation: conversation.id,
            agent_reference: this.agentReference,
            // tools: RESPONSES_TOOLS,
        } as AzureAgentResponseCreateParams);

        // function_call 이 없어질 때까지 반복 처리
        let iteration = 0;
        const MAX_ITERATIONS = 5; // 무한루프 방지 (모델이 계속 함수 호출만 반복하는 상황 대비)

        while (iteration < MAX_ITERATIONS) {
            const functionCalls = (response.output ?? []).filter(
                (item): item is ResponseFunctionCallItem => item.type === 'function_call',
            );

            if (functionCalls.length === 0) {
                break; // 더 이상 함수 호출이 없으면 최종 응답으로 간주
            }

            // 모든 함수 호출을 실행하고 결과를 모아서 한 번에 제출
            const functionOutputs = await Promise.all(
                functionCalls.map(async (call) => {
                    const args = JSON.parse(call.arguments);
                    const result = await this.toolsService.executeTool(call.name, args);

                    return {
                        type: 'function_call_output' as const,
                        call_id: call.call_id,
                        output: JSON.stringify(result ?? null),
                    };
                }),
            );

            response = await openAIClient.responses.create({
                conversation: conversation.id,
                input: functionOutputs,
                agent_reference: this.agentReference,
                // tools: RESPONSES_TOOLS,
            } as AzureAgentResponseCreateParams);

            iteration++;
        }

        if (iteration >= MAX_ITERATIONS) {
            throw new InternalServerErrorException({ message: 'AI가 함수 호출을 반복하여 최종 응답을 생성하지 못했습니다' });
        }

        if (!response.output_text) {
            throw new InternalServerErrorException({ message: 'AI 응답이 비어있습니다' });
        }

        return response.output_text;
    }
}