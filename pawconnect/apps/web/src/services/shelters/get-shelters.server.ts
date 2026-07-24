import { fetchServer } from "@/services/fetch/fetch.server";
import { ResponseShelters } from "@/types/shelter/get-shelters.type";

export async function GetShelters() {
    try {
        return await fetchServer.get<ResponseShelters>('/shelters');
    } catch (error) {

    }
}