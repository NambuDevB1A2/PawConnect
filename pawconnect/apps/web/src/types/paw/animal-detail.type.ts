// 상세조회 Response 타입

import { ApiResponse } from "../response.type";
import { AnimalGender, AnimalStatus } from "./animal.type";

export interface AnimalDetail {
    id: number;
    
    shelterId: string;
    shelterName: string;

    name: string;
    species: string;
    breed: string;

    gender: AnimalGender;
    isNeutered: boolean;

    age: number;
    isEstimatedAge: boolean;
    weight: number;

    animalStatus: AnimalStatus;
    animalStatusLabel: string;

    images: string[];

    // 공고 시작일
    noticeStartDate?: string;
    // 공고 종료일
    noticeEndDate?: string;

    foundLocation?: string;
    specialNotes?: string;
    description?: string;
    healthStatus?: string;
}

export interface ResponseAnimalDetail extends ApiResponse{
    animal: AnimalDetail;
}

// // 동물 상세
// export interface AnimalBase {
//     id: number;
//     name: string;
//     species: string;
//     breed: string;
//     gender: AnimalGender;
// }

// export interface Animal extends AnimalBase{
//     imgThumbnail:string;
// }

// export interface AnimalDetail extends AnimalBase{
//     images:string[];
// }