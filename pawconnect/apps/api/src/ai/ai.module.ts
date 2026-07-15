import { AiController } from '@/ai/ai.controller';
import { AiService } from '@/ai/ai.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [AiService],
  controllers: [AiController]
})
export class AiModule {}
