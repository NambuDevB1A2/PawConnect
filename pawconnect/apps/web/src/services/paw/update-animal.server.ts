'use server';

import { fetchServer } from "@/services/fetch/fetch.server";
import { getAccessToken } from "@/services/auth/auth";

interface UpdateAnimalResponse {
    success: boolean;
    animalId: number;
}

// 보호동물 수정
export async function updateAnimal(id: number, formData: FormData) {
    const token = await getAccessToken();
    return fetchServer.patch<UpdateAnimalResponse>(
        `/animals/${id}`, token, formData);
}
