import { AdoptionsService } from '@/adoptions/adoptions.service';
import { SheltersController } from '@/shelters/shelters.controller';
import { SheltersService } from '@/shelters/shelters.service';
import { Module } from '@nestjs/common';
import { SheltersUploadService } from './shelters-upload.service';
import { SheltersCreateService } from './shelters-create.service';
import { SheltersUpdateService } from './shelters-update.service';
import { SheltersReadService } from './shelters-read.service';

@Module({
  providers: [SheltersService, SheltersUploadService, AdoptionsService, SheltersCreateService, SheltersUpdateService, SheltersReadService],
  controllers: [SheltersController],
  exports: [SheltersService, SheltersCreateService]
})
export class SheltersModule {}
