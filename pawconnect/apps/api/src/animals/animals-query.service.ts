import { PrismaService } from "@/prisma/prisma.service";
import { Injectable, NotFoundException } from "@nestjs/common"
import { buildAnimalWhere } from "./animals.where";
import { getPagination, getTotalPage } from "@/common/utils/pagination.util";
import { toAnimalCardDto, toAnimalDetailDto } from "./animals.mapper";
import { GetAnimalsQueryDto } from "./dto/get-animals.dto";


@Injectable()
export class AnimalsQueryService {
    constructor(private readonly prisma:PrismaService) {}

    // 보호동물 목록 조회
    async findAll(query: GetAnimalsQueryDto){

        // 검색, 필터 where
        const where = buildAnimalWhere(query);

        // 보호동물 목록 및 전체 개수 조회
        const [animals, total] = await Promise.all([
            this.prisma.animal.findMany({
                where,
                orderBy:{createdAt: 'desc'},
                // 페이지네이션
                ...getPagination(query.page, query.limit),
                include:{
                    shelter: true,
                    animalSpecies: true,
                    animalBreed: true
                },
            }),
            this.prisma.animal.count({where})
        ]);

        return {
            success: true,
            animals: animals.map(toAnimalCardDto),  // 동물 카드정보
            pagination: {
                page: query.page,
                limit: query.limit,
                totalCount: total,
                totalPage: getTotalPage(total, query.limit)
            }
        }
    };

    // 보호동물 상세 조회
    async findOne(id: number) {
        // 조회
        const animal = await this.prisma.animal.findUnique({
            where:{id},
            include:{
                shelter: true,
                animalSpecies: true,
                animalBreed: true,
                images: true,
                detail: true,
            }
        });
        // 동물 없을 경우 예외처리
        if(!animal) throw new NotFoundException("보호동물을 찾을 수 없습니다");
        // 동물 상세정보 없으면 처리
        if (!animal.detail) throw new NotFoundException("보호동물 상세 정보가 없습니다");

        return {
            success: true,
            animal: toAnimalDetailDto(animal)
        }        
    }
}