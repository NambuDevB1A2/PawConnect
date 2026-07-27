import { PawLogsCreateService } from '@/pawlogs/pawlogs-create.service';
import { PawLogsDeleteService } from '@/pawlogs/pawlogs-delete.service';
import { PawLogsReadService } from '@/pawlogs/pawlogs-read.service';
import { PawLogsUpdateService } from '@/pawlogs/pawlogs-update.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PawLogsService {
    constructor (
        private readonly pawLogsCreateService: PawLogsCreateService,
        private readonly pawLogsReadService: PawLogsReadService,
        private readonly pawLogsUpdateService: PawLogsUpdateService,
        private readonly pawLogsDeleteService: PawLogsDeleteService,
    ) {}

}
