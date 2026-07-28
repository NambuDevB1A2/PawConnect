import { AuthRequest } from '@/auth/interfaces/auth-request.interface';
import { PAWLOG_SELECT } from '@/pawlogs/pawlog.select';
import { PawLogsReadService } from '@/pawlogs/pawlogs-read.service';
import { PawLogsUploadService } from '@/pawlogs/pawlogs-upload.service';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class PawLogsDeleteService {
    constructor (
        private readonly prisma: PrismaService,
        private readonly pawLogsUploadService: PawLogsUploadService,
        private readonly pawLogsReadService: PawLogsReadService,
    ) {}

    // 게시글 삭제
    async remove(auth: AuthRequest, id: number) {
        // 게시글 검색 (id)
        const pawLog = await this.pawLogsReadService.find(id, PAWLOG_SELECT);

        // 1. 권한 확인
        if (!auth.id || auth.id !== pawLog.author.id) 
            throw new UnauthorizedException({ message: "권한이 없습니다" });

        // 2. DB 삭제
        await this.prisma.pawLog.delete({ where: { id } });

        // 3. Azure Blob 삭제
        if (pawLog.images.length > 0) {
            await this.pawLogsUploadService.deleteBlobs(pawLog.images.map((img) => img.img));
        }

        return { pawLogId: id };
    }
}
