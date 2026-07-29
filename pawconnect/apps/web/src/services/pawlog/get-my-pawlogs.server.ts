import { getAccessToken } from "@/services/auth/auth";
import { fetchServer } from "@/services/fetch/fetch.server";
import { ResponseMyPawLogs } from "@/types/pawlog/get-my-pawlogs.type";

export async function GetMyPawLogs(page: number, limit: number) {
    const token = await getAccessToken();
    
    try {
        return await fetchServer.get<ResponseMyPawLogs>(`/pawlogs/me?page=${page}&limit=${limit}`, token);
    } catch (error) {
        console.log(error);
        return undefined;
    }
}