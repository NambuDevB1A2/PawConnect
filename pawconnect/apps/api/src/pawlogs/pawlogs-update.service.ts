import { AuthRequest } from '@/auth/interfaces/auth-request.interface';
import { getImageIdByString } from '@/common/utils/upload.util';
import { UpdatePawLogDto } from '@/pawlogs/dto/update-pawlog.dto';
import { PAWLOG_SELECT } from '@/pawlogs/pawlog.select';
import { PawLogsReadService } from '@/pawlogs/pawlogs-read.service';
import { PawLogsUploadService } from '@/pawlogs/pawlogs-upload.service';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class PawLogsUpdateService {
    constructor (
        private readonly prisma: PrismaService,
        private readonly pawLogsUploadService: PawLogsUploadService,
        private readonly pawLogsReadService: PawLogsReadService,
    ) {}

    // 게시글 수정
    async update(auth: AuthRequest, id: number, updatePawLogDto: UpdatePawLogDto, files: Express.Multer.File[]) {
        // 게시글 검색 (id)
        const pawLog = await this.pawLogsReadService.find(id, PAWLOG_SELECT);
        
        const keepSet = new Set(updatePawLogDto.imgPawLogKeeps ?? []);
        const toDelete = pawLog.images.filter(img => !keepSet.has(img.img));

        // 1. 권한 확인
        if (!auth.id || auth.id !== pawLog.author.id) 
            throw new UnauthorizedException({ message: "권한이 없습니다" });

        // 2. 이미지 업로드
        const uploadedImgPawLog = await this.pawLogsUploadService.uploadImages(files) ?? [];

        // 3. DB 일괄 수정
        try {
            await this.prisma.$transaction(async (tx) => {
                // 게시글 정보 업데이트
                await tx.pawLog.update({ 
                    where: { id },
                    data: {
                        title: updatePawLogDto.title,
                        content: updatePawLogDto.content,
                    },
                });

                // 기존 이미지 삭제
                if (toDelete.length > 0) {
                    await tx.pawLogImage.deleteMany({
                        where: { id: { in: toDelete.map((img) => img.id) } },
                    });
                }

                // 신규 이미지 생성
                if (uploadedImgPawLog.length > 0) {
                    await tx.pawLogImage.createMany({ 
                        data: uploadedImgPawLog.map((img) => ({
                            id: getImageIdByString(img.blobName),
                            img: img.blobName,
                            pawLogId: id,
                        })),
                    });
                }
            });
        } catch (error) {
            // DB 실패 시 업로드했던 Blob 파일 삭제
            await this.pawLogsUploadService.rollback(uploadedImgPawLog.map((img) => img.blobName));
        }

        // 3. Azure Blob 삭제
        if (toDelete.length > 0) {
            await this.pawLogsUploadService.deleteBlobs(toDelete.map((img) => img.img));
        }

        return { pawLogId: id };
    }
}
