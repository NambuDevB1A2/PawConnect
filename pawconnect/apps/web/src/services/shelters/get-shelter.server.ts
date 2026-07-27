import { getAccessToken } from "@/services/auth/auth";
import { fetchServer } from "@/services/fetch/fetch.server";
import { ResponseShelter } from "@/types/mypage/get-shelter.type";

export async function GetShelter() {
    const token = await getAccessToken();

    try {
        return await fetchServer.get<ResponseShelter>('/shelters/me', token);
    } catch (error) {
        console.log(error);
        throw error;
    }
}