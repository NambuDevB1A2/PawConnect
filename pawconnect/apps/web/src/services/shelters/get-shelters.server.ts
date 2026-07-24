import { fetchServer } from "@/services/fetch/fetch.server";
import { ResponseShelters } from "@/types/shelter/get-shelters.type";

export async function GetShelters(page: number, limit: number) {
    try {
        return await fetchServer.get<ResponseShelters>(`/shelters?page=${page}&limit=${limit}`);
    } catch (error) {

    }
}