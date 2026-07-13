import { SheltersController } from '@/shelters/shelters.controller';
import { SheltersService } from '@/shelters/shelters.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [SheltersService],
  controllers: [SheltersController],
  exports: [SheltersService]
})
export class SheltersModule {}
