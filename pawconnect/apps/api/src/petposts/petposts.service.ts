import { AzureBlobService } from '@/azure/azure-blob/azure-blob.service';
import { QueryPaginationDto } from '@/common/dto/query-pagination.dto';
import { getPagination, getTotalPage } from '@/common/utils/pagination.util';
import { PETPOST_DETAIL_SELECT, PETPOST_ORDERBY, PETPOST_SELECT } from '@/petposts/petpost.select';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class PetpostsService {
    constructor (
        private readonly prisma: PrismaService,
        private readonly azureBlob: AzureBlobService,
    ) {}
    
    // 게시글 검색 (id)
    async find(id: number, select?: Prisma.PetPostSelect)  {
        const petPost = await this.prisma.petPost.findUnique({ 
            where: { id }, 
            select: select 
        });

        if (!petPost) throw new UnauthorizedException({
            message: "존재하지 않는 게시글입니다",
        });
        
        return petPost;
    }

    // CREATE


    // READ

    // 게시글 목록 조회
    async getPetposts({ page, limit }: QueryPaginationDto) {
        const [petPosts, total] = await Promise.all([
            this.prisma.petPost.findMany({
                select: PETPOST_SELECT, // Select 상수화
                orderBy: PETPOST_ORDERBY.NEWEST, // OrderBy 상수화
                ...getPagination(page, limit), // 페이지네이션
            }),
            this.prisma.petPost.count(), // total 값 추출
        ]);

        const totalPage = getTotalPage(total, limit); // totalPage 값 추출
        return { success: true, petPosts, pagination: { page, limit, total, totalPage }};
    }

    // 게시글 상세 조회
    async getPetpost(id: number) {
        const petPost = await this.find(id, PETPOST_DETAIL_SELECT);

        return { success: true, petPost };
    }
}
