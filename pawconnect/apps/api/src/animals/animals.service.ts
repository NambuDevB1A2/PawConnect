import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { AnimalCardDto, GetAnimalsQueryDto, GetAnimalsResponseDto } from './dto/get-animals.dto';
import { Prisma } from '@prisma/client';
import { boolean } from 'joi';


// 보호동물 목록 한 페이지당 조회 개수
export const PAGE_SIZE = 12;

// 보호 동물 나이 필터
export enum AnimalAgeFilter {
    UNDER_6_MONTHS = 1,        // 0 ~ 6개월
    SIX_MONTHS_TO_ONE_YEAR,    // 6개월 ~ 1년
    ONE_TO_SEVEN_YEARS,        // 1 ~ 7세
    OVER_SEVEN_YEARS,          // 7세 이상
    UNKNOWN,                   // 확인 불가
}

@Injectable()
export class AnimalsService {
    constructor(private readonly prisma: PrismaService) { };

    // GET /animals/:id
    // POST /animals
    // PATCH /animals/:id
    // PATCH /animals/:id/status
    // DELETE /animals/:id

    // status: animal.animalStatus

    // 보호동물 목록 조회
    // GET /animals
    // (페이지네이션 + 검색 + 필터)
    async getAnimals(query: GetAnimalsQueryDto) : Promise<GetAnimalsResponseDto>{

        //(페이지네이션) 현재 Page 계산
        const page = query.page ?? 1;
        const skip = (page - 1) * PAGE_SIZE;
        const take = PAGE_SIZE;

        // 조회조건
        const where: Prisma.AnimalWhereInput = {};

        /**
         * 검색 조건
         */

        // keyword 검색(보호동물 이름 또는 보호소 이름 검색)
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

        // species 동물종류
        if (query.species) {
            where.species = query.species;
        }
        // breed 픔종
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
                // Todo: 확인 불가 저장 방식 논의 필요
                where.isEstimatedAge = true;
                break;
        }

        /**
         * DB 조회
         */
        const [animals, totalCount] = await Promise.all([
            this.prisma.animal.findMany({
                where,
                skip,
                take,
                orderBy: { createdAt: 'desc' },
                include: {
                    shelter: true,
                    animalSpecies: true,
                    animalBreed: true
                },
            }),
            this.prisma.animal.count({
                where,
            })
        ]);

        // 동물카드 
        const items: AnimalCardDto[] = animals.map((animal) => ({
                id: animal.id,
                imgThumbnail: animal.imgThumbnail,
                status: animal.animalStatus,
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
            }));
        // 전체 페이지 수
        const totalPages = Math.ceil(totalCount / PAGE_SIZE);

        /**
         * 응답 DTO 반환
         */
        return {
            items,
            page,
            totalPages,
            totalCount,
        };
    }
}
