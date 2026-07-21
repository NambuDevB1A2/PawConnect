import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '@/common/decorators/public.decorator';
import { CreatePersonalityAnalysisDto } from './dto/create-personality-analysis.dto.js';
import { PersonalityAnalysisResultDto } from './dto/personality-analysis-result.dto.ts';

@ApiTags('AI')
@Controller('ai')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AiController {
    constructor(private readonly aiService: AiService) {}

    @Post('tests/personality/analysis')
    @Public()
    @ApiOperation({summary: 'PawTI AI 성향 분석'})
    @ApiResponse({status: 201,
        description: 'AI 성향 분석 결과',
        type: PersonalityAnalysisResultDto,
    })
    analysis(@Body() dto: CreatePersonalityAnalysisDto){
        return this.aiService.analysis(dto);
    }
}