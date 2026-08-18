'use server';

import { fetchServer } from "@/services/fetch/fetch.server";
import { getAccessToken } from "@/services/auth/auth";
import { AdoptionStatus } from "@/types/adopt/adoption.type";
import { AnimalStatus } from "@/types/paw/animal.type";
import { ApiResponse } from "@/types/response.type";

export async function UpdateAdoptionStatus(adoptionId: string, animalStatus:AnimalStatus, adoptionStatus: AdoptionStatus) {
    try {
        const token = await getAccessToken();
        return await fetchServer.patch<ApiResponse>(`/adoptions/${adoptionId}/status`, token, {
            animalStatus,
            adoptionStatus
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}
