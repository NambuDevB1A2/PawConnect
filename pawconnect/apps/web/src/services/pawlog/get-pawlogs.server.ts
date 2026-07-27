import { fetchServer } from "@/services/fetch/fetch.server";
import { ResponsePawLogs } from "@/types/pawlog/get-pawlogs.type";

export async function GetPawLogs(page: number, limit: number) {
    try {
        return await fetchServer.get<ResponsePawLogs>(`/petposts?page=${page}&limit=${limit}`);
    } catch (error) {
        console.log(error);
        throw error;
    }
}