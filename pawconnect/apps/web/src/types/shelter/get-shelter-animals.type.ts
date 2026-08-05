import { Animal, Pagination } from "../paw/animal.type";

// 내 보호소 동물 목록 조회 Response
export interface GetShelterAnimalsResponse {
    success: boolean;
    animals: Animal[];
    pagination: Pagination;
}