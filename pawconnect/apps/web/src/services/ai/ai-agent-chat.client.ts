import { fetchClient } from "@/services/fetch/fetch.client";
import { ResponseAiAgentChat } from "@/types/ai/ai-agent-chat.type";

export async function PostAiAgentChat(content: string, conversationId?: string) {
    try {
        return await fetchClient.post<ResponseAiAgentChat>(`/ai/agent`, {
            content,
            conversationId,
        });
    } catch (error) {
        console.log(error);
        return undefined;
    }
}