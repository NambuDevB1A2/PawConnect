'use server';

import { fetchServer } from "@/services/fetch/fetch.server";
import { getAccessToken } from "@/services/auth/auth";
import { ApiResponse } from "@/types/response.type";

export async function CancelAdoption(adoptionId: string) {
    try {
        const token = await getAccessToken();
        return await fetchServer.patch<ApiResponse>(`/adoptions/${adoptionId}/status`, token, {
            "adoptionStatus": "CANCELED",
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}
