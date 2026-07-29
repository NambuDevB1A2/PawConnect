import { AnimalCard } from "@/types/paw/animal.type";
import { ApiResponse } from "@/types/response.type";

export interface ResponseAiAgentChat extends ApiResponse {
    content: string;
    animals?: AnimalCard[];
}