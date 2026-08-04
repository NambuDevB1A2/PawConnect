import { fetchClient } from "@/services/fetch/fetch.client";
import { ApiResponse } from "@/types/response.type";

export async function UpdateAdoptionStatus(adoptionId: string, animalStatus:string, adoptionStatus: string) {
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