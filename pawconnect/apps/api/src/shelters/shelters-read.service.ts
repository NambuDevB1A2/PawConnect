import { AdoptionsService } from '@/adoptions/adoptions.service';
import { toAnimalCardDto } from '@/animals/animals.mapper';
import { AnimalsService } from '@/animals/animals.service';
import { AuthRequest } from '@/auth/interfaces/auth-request.interface';
import { QueryPaginationDto } from '@/common/dto/query-pagination.dto';
import { getPagination, getTotalPage } from '@/common/utils/pagination.util';
import { UPLOAD_DIR } from '@/config/upload.config';
import { PrismaService } from '@/prisma/prisma.service';
import { QueryGetShelterAdoptionsDto, QueryGetShelterAnimalsDto } from '@/shelters/dto/query-shelter.dto';
import { SHELTER_DETAIL_SELECT, SHELTER_ORDERBY, SHELTERS_SELECT } from '@/shelters/shelter.select';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AnimalStatus, Prisma } from '@prisma/client';

export function getDefaultBanner() {
    return `${UPLOAD_DIR.shelterBannerDir}/default_banner.png`;
}

export function isDefaultBanner(blobName: string) {
    return blobName === getDefaultBanner();
}

@Injectable()
export class SheltersReadService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly adoptionsService: AdoptionsService,
    ) { }

    // 보호소 검색 (id)
    async find<T extends Prisma.ShelterSelect = Prisma.ShelterSelect>(id: string | null, select?: T)
        : Promise<Prisma.ShelterGetPayload<{ select: T }>> {
        if (!id) throw new UnauthorizedException({
            message: "존재하지 않는 보호소입니다",
        });

        const shelter = await this.prisma.shelter.findUnique({
            where: { id },
            select: select
        }) as Prisma.ShelterGetPayload<{ select: T }> | null;

        if (!shelter) throw new UnauthorizedException({
            message: "존재하지 않는 보호소입니다",
        });

        return shelter;
    }

    // 보호소 검색 (name)
    async findByName<T extends Prisma.ShelterSelect = Prisma.ShelterSelect>(name: string, select?: T)
        : Promise<Prisma.ShelterGetPayload<{ select: T }>> {

        const shelter = await this.prisma.shelter.findUnique({
            where: { name },
            select: select
        }) as Prisma.ShelterGetPayload<{ select: T }> | null;;

        if (!shelter) throw new UnauthorizedException({
            message: "존재하지 않는 보호소입니다",
        });

        return shelter;
    }

    // 보호소 중복 검사 (name)
    async existsByName(name: string) {
        const shelter = await this.prisma.shelter.findUnique({ where: { name } });
        if (shelter) throw new UnauthorizedException({
            message: "이미 사용중인 보호소 이름입니다",
            fields: { name: "이미 사용중인 보호소 이름입니다" },
        });
    }

    // 보호소 목록 조회
    async getShelters({ page, limit }: QueryPaginationDto) {
        const [shelters, totalCount] = await Promise.all([
            this.prisma.shelter.findMany({
                select: SHELTERS_SELECT, // Select 상수화
                orderBy: SHELTER_ORDERBY.NEWEST, // OrderBy 상수화
                ...getPagination(page, limit), // 페이지네이션
            }),
            this.prisma.shelter.count(), // total 값 추출
        ]);

        const totalPage = getTotalPage(totalCount, limit); // totalPage 값 추출
        return { shelters, pagination: { page, limit, totalCount, totalPage } };
    }

    // 보호소 상세 조회 (id)
    async getShelter(id: string) {
        const shelter = await this.find(id, { 
            ...SHELTER_DETAIL_SELECT, 
            animals: {
                include:{
                    shelter: true,
                    animalSpecies: true,
                    animalBreed: true
                },
                take: 4,
                orderBy:{ createdAt: 'desc' },
            }
        });

        return { shelter };
    }

    // 보호소 상세 조회 (name)
    async getShelterByName(name: string) {
        const { animals, ...result } = await this.findByName(name, {
            ...SHELTER_DETAIL_SELECT,
            animals: {
                include: {
                    shelter: true,
                    animalSpecies: true,
                    animalBreed: true
                },
                take: 4,
                orderBy:{ createdAt: 'desc' },
            }
        });

        return { shelter: result, animals: animals.map(toAnimalCardDto) };
    }

    // 내 보호소 정보 조회
    async getMyShelter(auth: AuthRequest) {
        const shelter = await this.find(auth.shelterId, SHELTER_DETAIL_SELECT);

        return { shelter };
    }

    // 내 보호소 입양 신청 목록 조회
    async getMyShelterAdoptions(auth: AuthRequest, { page, limit, status }: QueryGetShelterAdoptionsDto) {
        await this.find(auth.shelterId);

        const { adoptions, pagination } =
            await this.adoptionsService.findByShelter(auth.shelterId as string, { page, limit }, status);

        return { adoptions, pagination };
    }

    // 내 보호소 동물 목록 조회
    async getMyAnimals(auth: AuthRequest,
        { page, limit, status }: QueryGetShelterAnimalsDto) {

        // 로그인한 사용자의 shelterId가 실제 존재하는 보호소인지 확인
        const shelter = await this.find(auth.shelterId);


        // 기본적으로 내 보호소(shelterId)의 동물만 조회
        // status가 전달되면 상태 조건 추가
        const where: Prisma.AnimalWhereInput = {
            shelterId: shelter.id,
            ...(status && { animalStatus: status }),
        };

        // 동물 목록 조회 + 전체 개수 조회를 동시에 실행
        const [animals, totalCount] = await Promise.all([
            // 동물 목록
            this.prisma.animal.findMany({
                where,
                orderBy: {
                    createdAt: 'desc',  //최신 등록 순
                },
                // 페이지 네이션
                ...getPagination(page, limit),
                // 카드화면에 필요한 관계 데이터 조회
                include: {
                    shelter: true,
                    animalSpecies: true,
                    animalBreed: true,
                },
            }),
            //전체 개수
            this.prisma.animal.count({ where }),
        ]);

        // 카드 DTO 반환 후 변환
        return {
            animals: animals.map(toAnimalCardDto),
            pagination: {
                page,
                limit,
                totalCount,
                totalPage: getTotalPage(totalCount, limit)
            }
        };
    }
}
