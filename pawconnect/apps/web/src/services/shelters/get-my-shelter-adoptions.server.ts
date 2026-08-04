import { getAccessToken } from "@/services/auth/auth";
import { fetchServer } from "@/services/fetch/fetch.server";
import { ResponseMyShelterAdoptions } from "@/types/shelter/get-my-shelter-adoptions.type";

export async function GetMyShelterAdoptions(page: number, limit: number) {
    const token = await getAccessToken();
    
    try {
        return await fetchServer.get<ResponseMyShelterAdoptions>(`/shelters/me/adoptions?page=${page}&limit=${limit}`, token);
    } catch (error) {
        console.log(error);
        return undefined;
    }
}