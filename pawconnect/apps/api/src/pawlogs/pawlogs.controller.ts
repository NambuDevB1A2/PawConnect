import { Public } from '@/auth/decorators/public.decorator';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/auth/guards/role.guard';
import { PawLogsService } from '@/pawlogs/pawlogs.service';
import { Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { QueryPaginationDto } from '@/common/dto/query-pagination.dto';
import { CurrentAuth } from '@/auth/decorators/current-auth.decorator';
import type { AuthRequest } from '@/auth/interfaces/auth-request.interface';
import { Roles } from '@/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('PawLog')
@Controller('pawlogs')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class PawLogsController {
    constructor (
        private readonly pawLogsService: PawLogsService,
    ) {}

    // 게시글 목록 조회
    @ApiOperation({ summary: "게시글 목록 조회" })
    @Public()
    @Get()
    getPawLogs(@Query() pagination: QueryPaginationDto) {
        return this.pawLogsService.getPawLogs(pagination);
    }

    // 게시글 상세 조회
    @ApiOperation({ summary: "게시글 상세 조회" })
    @Public()
    @Get(':id')
    getPawLog(@Param('id', ParseIntPipe) id: number) {
        return this.pawLogsService.getPawLog(id);
    }

    // 내 게시글 목록 조회
    @ApiOperation({ summary: "내 게시글 목록 조회" })
    @Public()
    @Get('me')
    getMyPawLog(
        @CurrentAuth() auth: AuthRequest,
        @Query() pagination: QueryPaginationDto
    ) {
        return this.pawLogsService.getMyPawLog(auth, pagination);
    }

    // 게시글 작성
    @ApiOperation({ summary: "게시글 작성" })
    @Roles(Role.USER, Role.SHELTER)
    @Post()
    createPawLog(
        @CurrentAuth() auth: AuthRequest
    ) {
        return this.pawLogsService.createPawLog(auth);
    }

    // 게시글 수정
    @ApiOperation({ summary: "게시글 수정" })
    @Roles(Role.USER, Role.SHELTER)
    @Patch(':id')
    updatePawLog(
        @CurrentAuth() auth: AuthRequest,
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.pawLogsService.updatePawLog(auth, id);
    }

    // 게시글 삭제
    @ApiOperation({ summary: "게시글 삭제" })
    @Roles(Role.USER, Role.SHELTER)
    @Delete(':id')
    deletePawLog(
        @CurrentAuth() auth: AuthRequest,
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.pawLogsService.deletePawLog(auth, id);
    }
}
