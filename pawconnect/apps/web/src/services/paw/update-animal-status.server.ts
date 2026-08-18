'use server';

import { AnimalStatus } from "@/types/paw/animal.type";
import { fetchServer } from "@/services/fetch/fetch.server";
import { getAccessToken } from "@/services/auth/auth";

interface UpdateAnimalStatusResponse {
    success: boolean;
    animalId: number;
}

interface UpdateAnimalStatusRequest {
    animalStatus: AnimalStatus;
}

// 보호동물 상태 변경
export async function updateAnimalStatus(
    id: number, body: UpdateAnimalStatusRequest) {
    const token = await getAccessToken();
    return fetchServer.patch<UpdateAnimalStatusResponse>(
        `/animals/${id}/status`, token, body
    );
}
