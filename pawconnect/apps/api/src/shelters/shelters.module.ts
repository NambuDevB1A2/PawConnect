import { AdoptionsService } from '@/adoptions/adoptions.service';
import { SheltersController } from '@/shelters/shelters.controller';
import { SheltersService } from '@/shelters/shelters.service';
import { Module } from '@nestjs/common';
import { SheltersUploadService } from './shelters-upload.service';

@Module({
  providers: [SheltersService, SheltersUploadService, AdoptionsService],
  controllers: [SheltersController],
  exports: [SheltersService]
})
export class SheltersModule {}
