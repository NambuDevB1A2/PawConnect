// 검색/필터 where 생성

import { Prisma } from "@prisma/client";
import { GetAnimalsQueryDto } from "./dto/get-animals.dto";
import { AnimalAgeFilter } from "./constants/animal-age-filter.enum";

export function buildAnimalWhere(query: GetAnimalsQueryDto): Prisma.AnimalWhereInput {

    // 조회 조건
    const where: Prisma.AnimalWhereInput = {};

    // 검색 조건 (보호동물 이름 또는 보호소 이름 검색)
    if (query.keyword) {
        where.OR = [{
            name: { contains: query.keyword, mode: "insensitive" },
        },
        {
            shelter: {
                name: { contains: query.keyword, mode: "insensitive" },
            },
        },
        ];
    }

    // 필터 조건
    // species 동물종류
    if (query.species) {
        where.species = query.species;
    }
    // breed 품종
    if (query.breed) {
        where.breed = query.breed;
    }
    // gender 성별
    if (query.gender) {
        where.gender = query.gender;
    }
    // 중성화 여부
    if (query.isNeutered !== undefined) {
        where.isNeutered = query.isNeutered;
    }
    // status 보호 상태
    if (query.status) {
        where.animalStatus = query.status;
    }
    // ageFilter 나이 필터
    switch (query.ageFilter) {
        // 0 ~ 6개월
        case AnimalAgeFilter.UNDER_6_MONTHS:
            where.age = { gte: 0, lte: 6 };
            break;
        // 6개월 ~ 12개월
        case AnimalAgeFilter.SIX_MONTHS_TO_ONE_YEAR:
            where.age = { gt: 6, lte: 12 };
            break;
        // 1세~ 7세
        case AnimalAgeFilter.ONE_TO_SEVEN_YEARS:
            where.age = { gt: 12, lte: 84 };
            break;
        // 7세 이상
        case AnimalAgeFilter.OVER_SEVEN_YEARS:
            where.age = { gt: 84 };
            break;
        // 확인 불가
        case AnimalAgeFilter.UNKNOWN:
            // TODO: 확인 불가 저장 방식 논의 후 수정
            where.isEstimatedAge = true;
            break;
    }
    return where;
}