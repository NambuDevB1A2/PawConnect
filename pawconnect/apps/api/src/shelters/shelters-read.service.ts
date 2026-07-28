import { AdoptionsService } from '@/adoptions/adoptions.service';
import { AuthRequest } from '@/auth/interfaces/auth-request.interface';
import { QueryPaginationDto } from '@/common/dto/query-pagination.dto';
import { getPagination, getTotalPage } from '@/common/utils/pagination.util';
import { UPLOAD_DIR } from '@/config/upload.config';
import { PrismaService } from '@/prisma/prisma.service';
import { QueryGetShelterAdoptionsDto } from '@/shelters/dto/query-shelter.dto';
import { SHELTER_DETAIL_SELECT, SHELTER_ORDERBY, SHELTERS_SELECT } from '@/shelters/shelter.select';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

export function getDefaultBanner() {
    return `${UPLOAD_DIR.shelterBannerDir}/default_banner.png`;
}

export  function isDefaultBanner(blobName: string) {
    return blobName === getDefaultBanner();
}

@Injectable()
export class SheltersReadService {
    constructor (
        private readonly prisma: PrismaService,
        private readonly adoptionsService: AdoptionsService,
    ) {}

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
    async findByName(name: string, select?: Prisma.ShelterSelect) {
        const shelter = await this.prisma.shelter.findUnique({ where: { name }, select: select});
        if (!shelter) throw new UnauthorizedException({
            message: "존재하지 않는 보호소입니다",
        });
        
        return shelter;
    }

    // 보호소 중복 검사 (name)
    async existsByName(name: string) {
        const shelter = await this.prisma.shelter.findUnique({ where: { name }});
        if (shelter) throw new UnauthorizedException({
            message: "이미 사용중인 보호소 이름입니다",
            fields: { name: "이미 사용중인 보호소 이름입니다" },
        });
    }

    // 보호소 목록 조회
    async getShelters({ page, limit }: QueryPaginationDto) {
        const [shelters, total] = await Promise.all([
            this.prisma.shelter.findMany({
                select: SHELTERS_SELECT, // Select 상수화
                orderBy: SHELTER_ORDERBY.NEWEST, // OrderBy 상수화
                ...getPagination(page, limit), // 페이지네이션
            }),
            this.prisma.shelter.count(), // total 값 추출
        ]);

        const totalPage = getTotalPage(total, limit); // totalPage 값 추출
        return { shelters, pagination: { page, limit, total, totalPage }};
    }

    // 보호소 상세 조회 (id)
    async getShelter(id: string) {
        const shelter = await this.find(id, { 
            ...SHELTER_DETAIL_SELECT, 
            animals: { take: 5, }, // 상세 페이지 최대 보호동물 표시 개수 (limit)
        });

        return { shelter };
    }

    // 보호소 상세 조회 (name)
    async getShelterByName(name: string) {
        const shelter = await this.findByName(name, { 
            ...SHELTER_DETAIL_SELECT, 
            animals: { take: 5, }, // 상세 페이지 최대 보호동물 표시 개수 (limit)
        });

        return { shelter };
    }

    // 내 보호소 정보 조회
    async getMyShelter(auth: AuthRequest) {
        const shelter = await this.find(auth.shelterId, SHELTER_DETAIL_SELECT);

        return { shelter };
    }

    // 내 보호소 입양 신청 목록 조회
    async getMyShelterAdoptions(auth: AuthRequest, { page, limit, status }: QueryGetShelterAdoptionsDto) {
        await this.find(auth.shelterId);

        const { adoptions, total, totalPage } = 
            await this.adoptionsService.findByShelter(auth.shelterId as string, { page, limit }, status);

        return { adoptions, pagination: { page, limit, total, totalPage }};
    }
}
