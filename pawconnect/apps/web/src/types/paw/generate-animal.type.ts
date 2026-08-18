import { ApiResponse } from "@/types/response.type";

export interface ResponseGenerateAnimal extends ApiResponse {
    description: string;
    healthStatus?: string;
    species?: { id: number; name: string } | null;
    breed?: { id: number; name: string } | null;
}

export interface GenerateAnimalState {
    description?: string;
    descriptionError?: string;
    healthStatus?: string;
    healthStatusError?: string;
    imagesError?: string;

    response?: ResponseGenerateAnimal;
}
