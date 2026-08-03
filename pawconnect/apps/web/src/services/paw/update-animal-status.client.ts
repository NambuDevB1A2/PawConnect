import { AnimalStatus } from "@/types/paw/animal.type";
import { fetchClient } from "../fetch/fetch.client";


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
    return fetchClient.patch<UpdateAnimalStatusResponse>(
        `/animals/${id}/status`, 
        body
    );
} 