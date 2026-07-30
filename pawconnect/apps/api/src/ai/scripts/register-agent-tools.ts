import 'dotenv/config'; // .env 로드 (NestJS ConfigModule과 별개로 직접 로드)
import { AIProjectClient } from '@azure/ai-projects';
import { DefaultAzureCredential } from '@azure/identity';
import { FIND_ANIMALS_TOOL } from '@/ai/constants/ai-tools.constant';
import { AI_SYSTEM_PROMPTS } from '@/ai/constants/ai-prompt.constant';

async function registerAgentTools() {
    const endpoint = process.env.AZURE_AGENT_PROJECT_ENDPOINT;
    const agentName = process.env.AZURE_AGENT_NAME;
    const modelDeployment = process.env.AZURE_AGENT_DEPLOYMENT;

    if (!endpoint || !agentName || !modelDeployment) {
        throw new Error('필요한 환경변수가 설정되지 않았습니다 (endpoint / agentName / modelDeployment)');
    }

    const credential = new DefaultAzureCredential();
    const tokenResponse = await credential.getToken('https://ai.azure.com/.default');

    if (!tokenResponse) {
        throw new Error('Azure AD 토큰 발급 실패');
    }

    const url = `${endpoint}/agents/${agentName}/versions?api-version=v1`;

    const body = {
        definition: {
            kind: 'prompt', // discriminator 필드 - 에러가 요구하던 값
            model: modelDeployment,
            instructions: AI_SYSTEM_PROMPTS.AGENT_CHAT,
            tools: [FIND_ANIMALS_TOOL],
        },
    };

    console.log(`에이전트 "${agentName}"의 새 버전을 생성합니다...`);

    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokenResponse.token}`,
        },
        body: JSON.stringify(body),
    });

    const responseData = await res.json();

    if (!res.ok) {
        console.error('에이전트 tool 등록 실패:', JSON.stringify(responseData, null, 2));
        process.exit(1);
    }

    console.log('생성된 새 버전:', responseData.version ?? responseData);
    console.log(`.env의 AZURE_AGENT_VERSION을 위 버전 값으로 갱신하세요.`);
}

// pnpm run ai:register-agent-tools
registerAgentTools().catch((err) => {
    console.error('에이전트 tool 등록 실패:', err);
    process.exit(1);
});