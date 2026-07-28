import { AnimalListResponse } from "@/types/paw/animal.type";
import { fetchServer } from "../fetch/fetch.server";


// 보호동물 목록 조회(1페이지)
export async function getAnimals(page: number, limit: number) {
    
    return fetchServer.get<AnimalListResponse>(
        `/animals?page=${page}&limit=${limit}`);
}