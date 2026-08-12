import { getAccessToken } from "@/services/auth/auth";
import { fetchServer } from "@/services/fetch/fetch.server";
import { ResponseMyAdoptions } from "@/types/adopt/get-my-adoptions.type";

export async function GetMyAdoptions(page: number, limit: number) {
    const token = await getAccessToken();
    
    try {
        return await fetchServer.get<ResponseMyAdoptions>(`/adoptions/me?page=${page}&limit=${limit}`, token);
    } catch (error) {
        console.log(error);
        return undefined;
    }
}