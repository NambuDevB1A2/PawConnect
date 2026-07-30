import { AnimalCard } from "@/types/paw/animal.type";
import { ApiResponse } from "@/types/response.type";
import { Shelter } from "@/types/shelter/shelter.type";

export interface ResponseAiAgentChat extends ApiResponse {
    conversationId: string;
    content: string;
    animal?: AnimalCard;
    shelter?: Shelter;
}