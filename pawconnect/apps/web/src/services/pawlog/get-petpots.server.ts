import { fetchServer } from "@/services/fetch/fetch.server";
import { ResponsePetPosts } from "@/types/pawlog/get-petposts.type";

export async function GetPetPosts(page: number, limit: number) {
    try {
        return await fetchServer.get<ResponsePetPosts>(`/petposts?page=${page}&limit=${limit}`);
    } catch (error) {

    }
}