// 보호동물 등록

import { fetchClient } from "@/services/fetch/fetch.client";

interface CreateAnimalResponse {
    success: boolean;
    animalId: number;
}

export async function CreateAnimal(formData: FormData) {
    try {
        return fetchClient.post<CreateAnimalResponse>(
            "/animals", formData);
    } catch (error) {
        console.error(error);
        return undefined;
    }
} 