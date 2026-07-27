import { AuthRequest } from '@/auth/interfaces/auth-request.interface';
import { QueryPaginationDto } from '@/common/dto/query-pagination.dto';
import { getPagination, getTotalPage } from '@/common/utils/pagination.util';
import { PAWLOG_ORDERBY, PAWLOG_SELECT } from '@/pawlogs/pawlog.select';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class PawLogsReadService {
    constructor (
        private readonly prisma: PrismaService,
    ) {}

    // 게시글 검색 (id)
    async find(id: number, select?: Prisma.PawLogSelect)  {
        const pawLog = await this.prisma.pawLog.findUnique({ 
            where: { id }, 
            select: select 
        });

        if (!pawLog) throw new UnauthorizedException({
            message: "존재하지 않는 게시글입니다",
        });
        
        return pawLog;
    }

    // 게시글 목록 조회
    async getPawLogs({ page, limit }: QueryPaginationDto) {
        const [pawLogs, totalCount] = await Promise.all([
            this.prisma.pawLog.findMany({
                select: PAWLOG_SELECT, // Select 상수화
                orderBy: PAWLOG_ORDERBY.NEWEST, // OrderBy 상수화
                ...getPagination(page, limit), // 페이지네이션
            }),
            this.prisma.pawLog.count(), // total 값 추출
        ]);

        const totalPage = getTotalPage(totalCount, limit); // totalPage 값 추출
        return { pawLogs, pagination: { page, limit, totalCount, totalPage }};
    }

    // 게시글 상세 조회
    async getPawLog(id: number) {
        const pawLog = await this.find(id, PAWLOG_SELECT);

        const [prev, next] = await Promise.all([
            // 이전 글: 현재보다 먼저 작성된 것 중 가장 최근 것
            this.prisma.pawLog.findFirst({
            where: { createdAt: { lt: pawLog.createdAt } },
            orderBy: PAWLOG_ORDERBY.NEWEST,
            select: { id: true, title: true },
            }),
            // 다음 글: 현재보다 나중에 작성된 것 중 가장 오래된 것
            this.prisma.pawLog.findFirst({
            where: { createdAt: { gt: pawLog.createdAt } },
            orderBy: PAWLOG_ORDERBY.OLDEST,
            select: { id: true, title: true },
            }),
        ]);
        
        return { pawLog, prev, next };
    }

    // 내 게시글 목록 조회
    async getMyPawLogs(auth: AuthRequest, { page, limit }: QueryPaginationDto) {
        const [pawLogs, totalCount] = await Promise.all([
            this.prisma.pawLog.findMany({
                where: { authorId: auth.id },
                select: PAWLOG_SELECT, // Select 상수화
                orderBy: PAWLOG_ORDERBY.NEWEST, // OrderBy 상수화
                ...getPagination(page, limit), // 페이지네이션
            }),
            this.prisma.pawLog.count({
                where: { authorId: auth.id },
            }), // total 값 추출
        ]);

        const totalPage = getTotalPage(totalCount, limit); // totalPage 값 추출
        return { pawLogs, pagination: { page, limit, totalCount, totalPage }};
    }
}
