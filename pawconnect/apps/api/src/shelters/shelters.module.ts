import { SheltersController } from '@/shelters/shelters.controller';
import { SheltersService } from '@/shelters/shelters.service';
import { UsersService } from '@/users/users.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [SheltersService, UsersService],
  controllers: [SheltersController],
  exports: [SheltersService]
})
export class SheltersModule {}
