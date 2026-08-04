import { fetchClient } from "@/services/fetch/fetch.client";
import { ApiResponse } from "@/types/response.type";

export async function CancelAdoption(adoptionId: string) {
    try {
        return await fetchClient.patch<ApiResponse>(`/adoptions/${adoptionId}/status`, {
            "adoptionStatus": "CANCELED",
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}