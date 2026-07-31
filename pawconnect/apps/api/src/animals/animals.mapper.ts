// Entity → Response DTO 변환

import { Animal, AnimalBreed, AnimalDetail, AnimalImage, AnimalSpecies, Shelter } from "@prisma/client";
import { AnimalCardDto } from "./dto/get-animals.dto";
import { AnimalDetailResponseDto } from "./dto/get-animals-detail.dto";
import { ANIMAL_STATUS_LABEL } from "./constants/animal-status.constant";

type AnimalWithRelation = Animal & {
    shelter: Shelter;
    animalSpecies: AnimalSpecies;
    animalBreed: AnimalBreed;
};

// 목록 조회용 DTO
export function toAnimalCardDto(animal: AnimalWithRelation): AnimalCardDto {
    return {
        id: animal.id,
        shelterId: animal.shelterId,
        imgThumbnail: animal.imgThumbnail,
        animalStatus: animal.animalStatus,
        animalStatusLabel: ANIMAL_STATUS_LABEL[animal.animalStatus],
        species: animal.animalSpecies.name,
        breed: animal.animalBreed.name,
        name: animal.name,
        gender: animal.gender,
        isNeutered: animal.isNeutered,
        age: animal.age,
        isEstimatedAge: animal.isEstimatedAge,
        weight: Number(animal.weight),
        shelterName: animal.shelter.name,
        createdAt: animal.createdAt,
    };
}

type AnimalDetailWithRelation = Animal & {
    shelter: Shelter;
    animalSpecies: AnimalSpecies;
    animalBreed: AnimalBreed;
    images: AnimalImage[];
    detail: AnimalDetail | null;
};

// 보호동물 상세 DTO 변환
export function toAnimalDetailDto(animal: AnimalDetailWithRelation):
    AnimalDetailResponseDto {
    return {
        id: animal.id,
        shelterId: animal.shelter.id,     // 보호소 아이디
        shelterName: animal.shelter.name, // 보호소 이름
        //thumbnail: animal.imgThumbnail,      //보호소 썸네일 이미지
        images: animal.images.map(image => image.img), // 보호소 이미지들
        name: animal.name,      // 보호동물 이름
        gender: animal.gender,  // 성별
        isNeutered: animal.isNeutered,   // 중성화
        species: animal.animalSpecies.name, // 동물종류 이름
        breed: animal.animalBreed.name,  // 품종
        age: animal.age,                 // 나이
        isEstimatedAge: animal.isEstimatedAge,  //나이 추정
        weight: Number(animal.weight),   // 몸무게
        noticeStartDate: animal.detail?.noticeStartDate,    // 공고기간-시작일
        noticeEndDate: animal.detail?.noticeEndDate,    // 공고기간-마감일
        animalStatus: animal.animalStatus,      // 동물상태(영문)
        animalStatusLabel: ANIMAL_STATUS_LABEL[animal.animalStatus], // 동물상태(한글)
        foundLocation: animal.detail?.foundLocation,    // 발견장소
        specialNotes: animal.detail?.specialNotes,      // 특이사항
        description: animal.detail?.description,        // 소개말
        healthStatus: animal.detail?.healthStatus,      // 건강상태
    }
}