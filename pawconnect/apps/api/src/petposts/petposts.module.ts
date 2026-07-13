import { PetpostsController } from '@/petposts/petposts.controller';
import { PetpostsService } from '@/petposts/petposts.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [PetpostsService],
  controllers: [PetpostsController]
})
export class PetpostsModule {}
