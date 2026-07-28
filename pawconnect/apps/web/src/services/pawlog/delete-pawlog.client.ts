import { fetchClient } from "@/services/fetch/fetch.client";
import { ApiResponse } from "@/types/response.type";

export async function DeletePawLog(pawLogId: number) {
    try {
        return await fetchClient.delete<ApiResponse>(`/pawlogs/${pawLogId}`);
    } catch (error) {
        console.log(error);
        throw error;
    }
}