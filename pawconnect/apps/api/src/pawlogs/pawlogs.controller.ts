import { Public } from '@/auth/decorators/public.decorator';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/auth/guards/role.guard';
import { PawLogsService } from '@/pawlogs/pawlogs.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { QueryPaginationDto } from '@/common/dto/query-pagination.dto';
import { CurrentAuth } from '@/auth/decorators/current-auth.decorator';
import type { AuthRequest } from '@/auth/interfaces/auth-request.interface';
import { Roles } from '@/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { CreatePawLogDto } from '@/pawlogs/dto/create-pawlog.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { createFieldsImageUploadOptions, UPLOAD_DIR } from '@/config/upload.config';
import { UpdatePawLogDto } from '@/pawlogs/dto/update-pawlog.dto';

@ApiTags('PawLog')
@Controller('pawlogs')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class PawLogsController {
    constructor (
        private readonly pawLogsService: PawLogsService,
    ) {}

    // get - pawlog/
    // 게시글 목록 조회
    @ApiOperation({ summary: "게시글 목록 조회" })
    @Public()
    @Get()
    getPawLogs(@Query() pagination: QueryPaginationDto) {
        return this.pawLogsService.getPawLogs(pagination);
    }

    // get - pawlog/me
    // 내 게시글 목록 조회
    @ApiOperation({ summary: "내 게시글 목록 조회" })
    @Roles(Role.USER, Role.SHELTER)
    @Get('me')
    getMyPawLogs(
        @CurrentAuth() auth: AuthRequest,
        @Query() pagination: QueryPaginationDto
    ) {
        return this.pawLogsService.getMyPawLogs(auth, pagination);
    }

    // post - pawlog/
    // 게시글 작성
    @ApiOperation({ summary: "게시글 작성" })
    @ApiConsumes('multipart/form-data')
    @ApiBody({ type: CreatePawLogDto })
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'imgPawLog', maxCount: 4 },
        ],
        createFieldsImageUploadOptions({
            imgPawLog: UPLOAD_DIR.pawLogImgDir,
        })
    ))
    @Roles(Role.USER, Role.SHELTER)
    @Post()
    createPawLog(
        @CurrentAuth() auth: AuthRequest,
        @Body() createPawLogDto: CreatePawLogDto,
        @UploadedFiles() file: {
            imgPawLog: Express.Multer.File[],
        },
    ) {
        const imgPawLog = file.imgPawLog ? file.imgPawLog : [];

        return this.pawLogsService.create(auth, createPawLogDto, imgPawLog);
    }

    // get - pawlog/:id
    // 게시글 상세 조회
    @ApiOperation({ summary: "게시글 상세 조회" })
    @Public()
    @Get(':id')
    getPawLog(@Param('id', ParseIntPipe) id: number) {
        return this.pawLogsService.getPawLog(id);
    }

    // patch - pawlog/:id
    // 게시글 수정
    @ApiOperation({ summary: "게시글 수정" })
    @ApiConsumes('multipart/form-data')
    @ApiBody({ type: UpdatePawLogDto })
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'imgPawLog', maxCount: 4 },
        ],
        createFieldsImageUploadOptions({
            imgPawLog: UPLOAD_DIR.pawLogImgDir,
        })
    ))
    @Roles(Role.USER, Role.SHELTER)
    @Patch(':id')
    updatePawLog(
        @CurrentAuth() auth: AuthRequest,
        @Param('id', ParseIntPipe) id: number,
        @Body() updatePawLogDto: UpdatePawLogDto,
        @UploadedFiles() file: {
            imgPawLog: Express.Multer.File[],
        },
    ) {
        const imgPawLog = file.imgPawLog ? file.imgPawLog : [];

        return this.pawLogsService.update(auth, id, updatePawLogDto, imgPawLog);
    }

    // delete - pawlog/:id
    // 게시글 삭제
    @ApiOperation({ summary: "게시글 삭제" })
    @Roles(Role.USER, Role.SHELTER)
    @Delete(':id')
    deletePawLog(
        @CurrentAuth() auth: AuthRequest,
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.pawLogsService.remove(auth, id);
    }
}
