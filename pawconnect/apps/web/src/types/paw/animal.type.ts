
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
    speciesId: number,
    breedId: number,
    // species: string;
    // breed: string;
    gender: AnimalGender;
    isNeutered: boolean;

    age: number | "";
    isEstimatedAge: boolean;

    weight: number | "";
    noticeStartDate: string;
    noticeEndDate: string;

    animalStatus: AnimalStatus;
    foundLocation: string;
    specialNotes: string;
    description: string;
    healthStatus: string;

    imgThumbnail?: File | null;
    // 기존 유지 썸네일
    existingThumbnail?:string;
    // 새로 추가하는 이미지
    images: File[];
    // 기존 유지 이미지
    existingImages: string[];
    // 삭제할 기존 이미지
    deletedImages: string[];
}