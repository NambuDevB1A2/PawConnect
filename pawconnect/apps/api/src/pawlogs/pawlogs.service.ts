import { AuthRequest } from '@/auth/interfaces/auth-request.interface';
import { QueryPaginationDto } from '@/common/dto/query-pagination.dto';
import { PawLogsCreateService } from '@/pawlogs/pawlogs-create.service';
import { PawLogsDeleteService } from '@/pawlogs/pawlogs-delete.service';
import { PawLogsReadService } from '@/pawlogs/pawlogs-read.service';
import { PawLogsUpdateService } from '@/pawlogs/pawlogs-update.service';
import { Injectable } from '@nestjs/common';
import { CreatePawLogDto } from '@/pawlogs/dto/create-pawlog.dto';

@Injectable()
export class PawLogsService {
    constructor (
        private readonly pawLogsCreateService: PawLogsCreateService,
        private readonly pawLogsReadService: PawLogsReadService,
        private readonly pawLogsUpdateService: PawLogsUpdateService,
        private readonly pawLogsDeleteService: PawLogsDeleteService,
    ) {}

    // 게시글 목록 조회
    async getPawLogs(pagination: QueryPaginationDto) {
        const result = await this.pawLogsReadService.getPawLogs(pagination);
        return { success: true, ...result };
    }

    // 내 게시글 목록 조회
    async getMyPawLogs(auth: AuthRequest, pagination: QueryPaginationDto) {
        const result = await this.pawLogsReadService.getMyPawLogs(auth, pagination);
        return { success: true, ...result };
    }

    // 게시글 작성
    async create(auth: AuthRequest, createPawLogDto: CreatePawLogDto, files: Express.Multer.File[]) {
        const result = await this.pawLogsCreateService.create(auth, createPawLogDto, files);
        return { success: true, ...result };
    }

    // 게시글 상세 조회
    async getPawLog(id: number) {
        const result = await this.pawLogsReadService.getPawLog(id);
        return { success: true, ...result };
    }

    // 게시글 수정
    async update(auth: AuthRequest, id: number) {
        
    }

    // 게시글 삭제
    async remove(auth: AuthRequest, id: number) {
        
    }
}
