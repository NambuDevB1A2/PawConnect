
// 보호동물 타입
export interface Animal {
    id: number;
    shelterId: string;
    name: string;
    imgThumbnail: string;
    animalStatus: AnimalStatus;
    animalStatusLabel: string;
    species: string;
    breed: string;
    gender: AnimalGender;
    isNeutered: boolean;
    age: number;
    isEstimatedAge: boolean;
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
    animals: Animal[];
    pagination: Pagination;
}

// AnimalStatus
export type AnimalStatus =
    "PROTECTED"
    | "AVAILABLE"
    | "ADOPTED"
    | "REUNITED"
    | "DECEASED"
    | "EUTHANIZED";

// AnimalGender
export type AnimalGender = "MALE" | "FEMALE" | "UNKNOWN";


// 동물폼 생성
export interface CreateAnimalForm {
    name: string;
    species: number;
    breed: number;
    gender: AnimalGender;
    isNeutered: boolean;

    age: number;
    isEstimatedAge: boolean;

    weight: number;
    noticeStartDate: string;
    noticeEndDate: string;

    animalStatus: AnimalStatus;
    foundLocation: string;
    description: string;
    healthStatus: string;

    imgThumbnail?: File | null;
    images: File[];
}