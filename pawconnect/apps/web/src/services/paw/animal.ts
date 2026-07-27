import { AnimalListResponse } from "@/types/paw/animal";

// url 주소 상수 선언
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// 보호동물 목록 조회(1페이지)
export async function getAnimals(page=1) {
    // 백 api 요청
    const res = await fetch(`${BASE_URL}/animals?page=${page}`);

    if(!res.ok) {
        console.log("status:", res.status);
    console.log(await res.text());
        throw new Error("보호동물 조회 실패");}

    return res.json() as Promise<AnimalListResponse>;    
}