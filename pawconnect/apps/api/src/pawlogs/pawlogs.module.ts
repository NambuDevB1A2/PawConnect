import { Module } from '@nestjs/common';
import { PawLogsDeleteService } from './pawlogs-delete.service';
import { PawLogsCreateService } from './pawlogs-create.service';
import { PawLogsReadService } from './pawlogs-read.service';
import { PawLogsUpdateService } from './pawlogs-update.service';
import { PawLogsController } from '@/pawlogs/pawlogs.controller';
import { PawLogsUploadService } from '@/pawlogs/pawlogs-upload.service';
import { PawLogsService } from '@/pawlogs/pawlogs.service';

@Module({
  providers: [PawLogsService, PawLogsCreateService, PawLogsReadService, PawLogsUpdateService, PawLogsDeleteService, PawLogsUploadService],
  controllers: [PawLogsController],
  exports: [PawLogsService]
})
export class PawLogsModule {}
