import { AuthRequest } from '@/auth/interfaces/auth-request.interface';
import { getImageIdByString } from '@/common/utils/upload.util';
import { CreatePawLogDto } from '@/pawlogs/dto/create-pawlog.dto';
import { PawLogsUploadService } from '@/pawlogs/pawlogs-upload.service';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class PawLogsCreateService {
    constructor (
        private readonly prisma: PrismaService,
        private readonly pawLogsUploadService: PawLogsUploadService,
    ) {}
    
    // 게시글 작성
    async create(auth: AuthRequest, createPawLogDto: CreatePawLogDto, imgPawLogFiles?: Express.Multer.File[]) {

        // 1. Azure Blob에 이미지 업로드
        let uploadedImgPawLog = imgPawLogFiles ? await this.pawLogsUploadService.uploadImages(imgPawLogFiles) : [];
        if (!uploadedImgPawLog) uploadedImgPawLog = [];

        // 2. DB 작업
        try {
            // DB 작업은 하나의 트랜잭션으로 처리
            return await this.prisma.$transaction(async (tx) => {
                // 게시글 DB 생성
                const pawLog = await this.createPawLog(tx, auth.id, createPawLogDto);
                // 게시글 이미지 DB 생성
                await this.createImages(tx, pawLog.id, uploadedImgPawLog);

                return { pawLogId: pawLog.id };
            });
        } catch (error) {
            // DB 실패 시 업로드했던 Blob 파일 삭제
            await this.pawLogsUploadService.rollback(uploadedImgPawLog);

            throw error;
        };
    }

    // 게시글 DB 생성
    async createPawLog(tx: Prisma.TransactionClient, authorId: string, createPawLogDto: CreatePawLogDto) {
        return await tx.pawLog.create({
            data: {
                authorId: authorId,
                title: createPawLogDto.title,
                content: createPawLogDto.content,
            },
            select: {
                id: true,
            },
        });
    }

    // 게시글 이미지 DB 생성
    async createImages(tx: Prisma.TransactionClient, pawLogId: number, blobNames: string []) {
        await tx.pawLogImage.createMany({
            data: blobNames.map((img) => ({
                pawLogId: pawLogId,
                id: getImageIdByString(img),
                img: img,  
            })),
        });
    }
}
