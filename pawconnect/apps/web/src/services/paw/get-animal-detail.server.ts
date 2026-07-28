import { ResponseAnimalDetail } from "@/types/paw/animal-detail.type";
import { fetchServer } from "../fetch/fetch.server";

// 보호동물 상세 조회
export async function getAnimalDetail(id:number) {
    return fetchServer.get<ResponseAnimalDetail>(`/animals/${id}`);
}