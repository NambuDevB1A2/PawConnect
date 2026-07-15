import { AnimalsController } from '@/animals/animals.controller';
import { AnimalsService } from '@/animals/animals.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [AnimalsService],
  controllers: [AnimalsController]
})
export class AnimalsModule {}
