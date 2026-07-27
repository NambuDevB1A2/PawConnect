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
        return this.pawLogsReadService.getPawLogs(pagination);
    }

    // 게시글 상세 조회
    async getPawLog(id: number) {
        return this.pawLogsReadService.getPawLog(id);
    }

    // 내 게시글 목록 조회
    async getMyPawLog(auth: AuthRequest, pagination: QueryPaginationDto) {
        return this.pawLogsReadService.getMyPawLogs(auth, pagination);
    }

    // 게시글 작성
    async createPawLog(auth: AuthRequest, createPawLogDto: CreatePawLogDto, files: Express.Multer.File[]) {
        return this.pawLogsCreateService.create(auth, createPawLogDto, files);
    }

    // 게시글 수정
    async updatePawLog(auth: AuthRequest, id: number) {
        
    }

    // 게시글 삭제
    async deletePawLog(auth: AuthRequest, id: number) {
        
    }
}
