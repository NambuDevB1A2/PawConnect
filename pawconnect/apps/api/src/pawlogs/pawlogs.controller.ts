import { Public } from '@/auth/decorators/public.decorator';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/auth/guards/role.guard';
import { PawLogsService } from '@/pawlogs/pawlogs.service';
import { Controller, Get, Param, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PawLogsReadService } from '@/pawlogs/pawlogs-read.service';
import { QueryPaginationDto } from '@/common/dto/query-pagination.dto';

@ApiTags('PawLog')
@Controller('pawlogs')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class PawLogsController {
    constructor (
        private readonly pawLogsService: PawLogsService,
        private readonly pawLogsReadService: PawLogsReadService,
    ) {}

    // 게시글 목록 조회
    @ApiOperation({ summary: "보호소 목록 조회" })
    @Public()
    @Get()
    getPawLogs(@Query() pagination: QueryPaginationDto) {
        return this.pawLogsReadService.getPawLogs(pagination);
    }

    // 게시글 상세 조회
    @ApiOperation({ summary: "게시글 상세 조회" })
    @Public()
    @Get(':id')
    getPawLog(@Param('id', ParseIntPipe) id: number) {
        return this.pawLogsReadService.getPawLog(id);
    }
}
