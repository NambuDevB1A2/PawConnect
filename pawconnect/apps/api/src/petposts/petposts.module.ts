import { Module } from '@nestjs/common';
import { PetpostsService } from './petposts.service';
import { PetpostsController } from './petposts.controller';

@Module({
  providers: [PetpostsService],
  controllers: [PetpostsController]
})
export class PetpostsModule {}
