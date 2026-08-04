import { fetchClient } from "@/services/fetch/fetch.client";
import { ResponseAdoption } from "@/types/adopt/get-adoption.type";

export async function GetAdoption(adoptionId: string) {
    try {
        return await fetchClient.get<ResponseAdoption>(`/adoptions/${adoptionId}`);
    } catch (error) {
        console.log(error);
        return undefined;
    }
}