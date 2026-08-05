import { fetchServer } from "../fetch/fetch.server";
import { GetShelterAnimalsResponse } from "@/types/shelter/get-shelter-animals.type";
import { AnimalStatus } from "@/types/paw/animal.type";
import { getAccessToken } from "../auth/auth";

// 내 보호소 동물 목록 조회
export async function GetShelterAnimals(
    page: number, limit: number, status?: AnimalStatus) {
        // 인증이 필요한 API 요청을 위해 accessToken 가져오기
        const token = await getAccessToken();
        
    try {
        // 페이지네이션 요청 파라미터 생성
        const query = new URLSearchParams({
            page: String(page), limit: String(limit),
        });

        // 상태 필터가 있으면 query에 추가
        if (status) {
            query.append("status", status);
        }

        // 로그인한 보호소의 동물 목록 요청
        return await fetchServer.get<GetShelterAnimalsResponse>(
            `/shelters/me/animals?${query.toString()}`, token
        );
    } catch (error) {
        return undefined;
    }
}