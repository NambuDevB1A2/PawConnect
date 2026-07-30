import { AnimalListResponse } from "@/types/paw/animal.type";
import { fetchServer } from "../fetch/fetch.server";


// 보호동물 목록 조회
// 검색조건 (filters)을 query parameter로 변환하여 API 요청
export async function getAnimals(page: number, limit: number,
    filters?: Record<string, string | undefined>) {
    const params = new URLSearchParams();

    params.set("page", String(page));
    params.set("limit", String(limit));

    Object.entries(filters ?? {}).forEach(([key,value])=>{
        if(value){
            params.set(key,value);
        }
    });

    try{
        return await fetchServer.get<AnimalListResponse>(
        `/animals?${params.toString()}`);
        // `/animals?page=${page}&limit=${limit}`);
    } catch (error){
        console.log(error);
        return undefined;
    }
}