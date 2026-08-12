import { Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';
import { AnimalsModule } from '@/animals/animals.module';
import { SheltersModule } from '@/shelters/shelters.module';

@Module({
  imports: [AnimalsModule, SheltersModule],
  controllers: [HomeController],
  providers: [HomeService]
})
export class HomeModule {}
