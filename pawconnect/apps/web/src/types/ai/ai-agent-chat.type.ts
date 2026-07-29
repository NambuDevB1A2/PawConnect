import { ApiResponse } from "@/types/response.type";

export interface ResponseAiAgentChat extends ApiResponse {
    content: string;
}