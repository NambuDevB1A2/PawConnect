import { Module } from '@nestjs/common';
import { SheltersService } from './shelters.service';
import { SheltersController } from './shelters.controller';

@Module({
  providers: [SheltersService],
  controllers: [SheltersController],
  exports: [SheltersService]
})
export class SheltersModule {}
