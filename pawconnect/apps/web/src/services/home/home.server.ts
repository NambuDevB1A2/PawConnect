import { fetchServer } from "@/services/fetch/fetch.server";
import { ResponseHome } from "@/types/home/home.type";

export async function Home() {
    try {
        return await fetchServer.get<ResponseHome>(`/home`);
    } catch (error) {
        console.log(error);
        return undefined;
    }
}