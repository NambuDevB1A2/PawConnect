import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PawLogsUploadService {
    constructor (
        private readonly prisma: PrismaService,
    ) {}
}
