import { fetchServer } from "@/services/fetch/fetch.server";
import { ResponseShelterDetail } from "@/types/shelter/get-shelter-detail.type";

export async function GetShelterDetail(name: string) {
    try {
        return await fetchServer.get<ResponseShelterDetail>(`/shelters/${name}`);
    } catch (error) {
        console.log(error);
        return undefined;
    }
}