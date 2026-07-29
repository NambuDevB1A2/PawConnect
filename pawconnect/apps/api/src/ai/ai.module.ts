import { AiController } from '@/ai/ai.controller';
import { AiService } from '@/ai/ai.service';
import azureOpenAiConfig from '@/config/azure/azure-openai.config';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AiOpenAiService } from './ai-openai.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forFeature(azureOpenAiConfig),
  ],
  providers: [AiService, AiOpenAiService],
  controllers: [AiController]
})
export class AiModule {}
