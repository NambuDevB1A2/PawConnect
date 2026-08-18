'use server';

import { fetchServer } from "@/services/fetch/fetch.server";
import { getAccessToken } from "@/services/auth/auth";
import { ApiResponse } from "@/types/response.type";

export async function DeletePawLog(pawLogId: number) {
    try {
        const token = await getAccessToken();
        return await fetchServer.delete<ApiResponse>(`/pawlogs/${pawLogId}`, token);
    } catch (error) {
        console.log(error);
        throw error;
    }
}
