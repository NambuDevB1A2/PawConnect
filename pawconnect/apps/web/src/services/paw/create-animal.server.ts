// 보호동물 등록

'use server';

import { fetchServer } from "@/services/fetch/fetch.server";
import { getAccessToken } from "@/services/auth/auth";

interface CreateAnimalResponse {
    success: boolean;
    animalId: number;
}

export async function CreateAnimal(formData: FormData) {
    try {
        const token = await getAccessToken();
        return await fetchServer.post<CreateAnimalResponse>("/animals", token, formData);
    } catch (error) {
        console.error(error);
        return undefined;
    }
}
