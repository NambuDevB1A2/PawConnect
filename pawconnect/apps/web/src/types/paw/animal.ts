// 보호동물 타입
export interface AnimalCard {
    id: number;
    name: string;
    imgThumbnail: string;
    status: string;
    statusLavel: string;
    species : string;
    breed: string;
    gender: string;
    isNeutered: boolean;
    age: number;
    isEstimatedAge: string;
    weight: number;
    shelterName: string;
    createdAt: string;
}

// 페이지네이션 타입
export interface Pagination {
    page: number;
    limit: number;
    totalCount: number;
    totalPage: number;
}

// 목록리스트 Response 타입
export interface AnimalListResponse {
    success: boolean;
    animals: AnimalCard[];
    pagination: Pagination;
}