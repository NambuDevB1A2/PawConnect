import { fetchClient } from "@/services/fetch/fetch.client";
import { AdoptionStatus } from "@/types/adopt/adoption.type";
import { AnimalStatus } from "@/types/paw/animal.type";
import { ApiResponse } from "@/types/response.type";

export async function UpdateAdoptionStatus(adoptionId: string, animalStatus:AnimalStatus, adoptionStatus: AdoptionStatus) {
    try {
        return await fetchClient.patch<ApiResponse>(`/adoptions/${adoptionId}/status`, {
            animalStatus,
            adoptionStatus
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}