import { fetchServer } from "@/services/fetch/fetch.server";
import { ResponsePawLogDetail } from "@/types/pawlog/get-pawlog-detail.type";

export async function GetPawLogDetail(id: string) {
    try {
        return await fetchServer.get<ResponsePawLogDetail>(`/pawlogs/${id}`);
    } catch (error) {
        console.log(error);
        return undefined;
    }
}