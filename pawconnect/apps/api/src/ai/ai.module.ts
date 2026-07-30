import { AiController } from '@/ai/ai.controller';
import { AiService } from '@/ai/ai.service';
import azureOpenAiConfig from '@/config/azure/azure-openai.config';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AiOpenAiService } from './ai-openai.service';
import { AiAgentService } from './ai-agent.service';
import { AiToolsService } from './ai-tools.service';
import { AiGenerateService } from './ai-generate.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forFeature(azureOpenAiConfig),
  ],
  providers: [AiService, AiOpenAiService, AiAgentService, AiToolsService, AiGenerateService],
  controllers: [AiController]
})
export class AiModule {}
