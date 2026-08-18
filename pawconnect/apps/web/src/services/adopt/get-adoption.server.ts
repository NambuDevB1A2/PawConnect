'use server';

import { fetchServer } from "@/services/fetch/fetch.server";
import { getAccessToken } from "@/services/auth/auth";
import { ResponseAdoption } from "@/types/adopt/get-adoption.type";

export async function GetAdoption(adoptionId: string) {
    try {
        const token = await getAccessToken();
        return await fetchServer.get<ResponseAdoption>(`/adoptions/${adoptionId}`, token);
    } catch (error) {
        console.log(error);
        return undefined;
    }
}
