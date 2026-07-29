import { AiService } from '@/ai/ai.service';
import { AiAgentChatDto } from '@/ai/dto/ai-agent.dto';
import { AiAnimalDto } from '@/ai/dto/ai-animal.dto';
import { AiPawLogDto } from '@/ai/dto/ai-pawlog.dto';
import { Public } from '@/auth/decorators/public.decorator';
import { Roles } from '@/auth/decorators/roles.decorator';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/auth/guards/role.guard';
import { createFieldsImageUploadOptions } from '@/config/upload.config';
import { Body, Controller, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';

@ApiTags('AI')
@Controller('ai')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class AiController {
    constructor (
        private readonly aiService: AiService,
    ) {}
    
    // post - ai/pawlog/generate
    // ai 자동 생성 게시글
    @ApiOperation({ summary: "ai 자동 생성 게시글" })
    @ApiConsumes('multipart/form-data')
    @ApiBody({ type: AiPawLogDto })
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'images', maxCount: 4 },
        ],
        createFieldsImageUploadOptions()
    ))
    @Roles(Role.USER, Role.SHELTER)
    @Post('pawlogs/generate')
    generatePawLog(
        @Body() aiPawLogDto: AiPawLogDto,
        @UploadedFiles() file: {
            images: Express.Multer.File[],
        },
    ) {
        const images = file.images ?? [];

        return this.aiService.generatePawLog(aiPawLogDto, images);
    }
    
    // post - ai/animal/generate
    // ai 품종 추론 및 자동 생성 게시글
    @ApiOperation({ summary: "ai 품종 추론 및 자동 생성 게시글" })
    @ApiConsumes('multipart/form-data')
    @ApiBody({ type: AiAnimalDto })
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'images', maxCount: 4 },
        ],
        createFieldsImageUploadOptions()
    ))
    @Roles(Role.SHELTER)
    @Post('animals/generate')
    generateAnimal(
        @Body() aiAnimalDto: AiAnimalDto,
        @UploadedFiles() file: {
            images: Express.Multer.File[],
        },
    ) {
        const images = file.images ?? [];

        return this.aiService.generateAnimal(aiAnimalDto, images);
    }

    // post - ai/agent
    // ai 에이전트 채팅
    @ApiOperation({ summary: "ai 에이전트 채팅" })
    @Public()
    @Post('agent')
    agentChat(@Body() aiAgentChatDto: AiAgentChatDto) {
        return this.aiService.agentChat(aiAgentChatDto);
    }
    
}
