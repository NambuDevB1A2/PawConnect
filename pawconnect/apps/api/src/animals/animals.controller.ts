import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/auth/guards/role.guard';
import { GetAnimalsQueryDto, GetAnimalsResponseDto } from './dto/get-animals.dto';
import { Public } from '@/auth/decorators/public.decorator';
import { AnimalDetailResponseDto } from './dto/get-animals-detail.dto';
import { Roles } from '@/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { CurrentAuth } from '@/auth/decorators/current-auth.decorator';
import type { AuthRequest } from '@/auth/interfaces/auth-request.interface';
import { CreateAnimalDto } from './dto/create-animals.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { createFieldsImageUploadOptions, UPLOAD_DIR } from '@/config/upload.config';
import { CreateAnimalRequestDto } from './dto/create-animals-swagger.dto';
import { UpdateAnimalDto, UpdateAnimalStatusDto } from './dto/update-animals.dto';
import { UpdateAnimalRequestDto } from './dto/update-animal-swagger.dto';


@ApiTags('Animals')
@Controller('animals')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) { }

  // 보호동물 등록
  @Post()
  @Roles(Role.SHELTER)
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateAnimalRequestDto })
  @UseInterceptors(
    FileFieldsInterceptor([
      // 파일 필드명으로 구분
      { name: 'imgThumbnail', maxCount: 1 },
      { name: 'images', maxCount: 4 },
    ], createFieldsImageUploadOptions({
      // 파일 저장 위치, 옵션 지정
      imgThumbnail: UPLOAD_DIR.animalThumbnailDir,
      images: UPLOAD_DIR.animalImgDir,
    })))
  @ApiOperation({ summary: "보호동물 등록" })
  create(
    @CurrentAuth() auth: AuthRequest,
    @UploadedFiles()
    files: {
      imgThumbnail: Express.Multer.File[];
      images: Express.Multer.File[];
    },
    @Body() createAnimalDto: CreateAnimalDto) {
    return this.animalsService.create(auth, createAnimalDto, files);
  }

  // 보호동물 목록 조회
  @Get()
  @ApiOkResponse({ type: GetAnimalsResponseDto })
  @ApiOperation({ summary: "보호동물 목록 조회" })
  @Public()
  findAll(@Query() query: GetAnimalsQueryDto) {
    return this.animalsService.findAll(query);
  }

  // 보호동물 상세조회
  @Get(':id')
  @ApiOkResponse({ type: AnimalDetailResponseDto })
  @ApiOperation({ summary: "보호동물 상세조회" })
  @Public()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.animalsService.findOne(id);
  }

  // 보호동물 수정
  @Patch(':id')
  @ApiOkResponse({ type: AnimalDetailResponseDto })
  @ApiOperation({ summary: "보호동물 수정" })
  @Roles(Role.SHELTER)
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateAnimalRequestDto })
  @UseInterceptors(
    FileFieldsInterceptor([
      // 파일 필드명으로 구분
      { name: 'imgThumbnail', maxCount: 1 },
      { name: 'images', maxCount: 4 },
    ], createFieldsImageUploadOptions({
      // 파일 저장 위치, 옵션 지정
      imgThumbnail: UPLOAD_DIR.animalThumbnailDir,
      images: UPLOAD_DIR.animalImgDir,
    })))
  update(
    @CurrentAuth() auth: AuthRequest,
    @UploadedFiles()
    files: {
      imgThumbnail?: Express.Multer.File[];
      images?: Express.Multer.File[];
    },
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAnimalDto) {
    return this.animalsService.update(auth, id, dto, files);
  }


  // 보호동물 삭제
  @Delete(':id')
  @Roles(Role.SHELTER)
  @ApiOperation({ summary: "보호동물 삭제" })
  remove(
    @CurrentAuth() auth: AuthRequest,
    @Param('id', ParseIntPipe) id: number) {
    return this.animalsService.remove(auth, id);
  }

  // 보호동물 상태 변경
  @Patch(':id/status')
  @Roles(Role.SHELTER)
  @ApiOperation({ summary: "보호동물 상태 변경" })
  updateState(
    @CurrentAuth() auth: AuthRequest,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAnimalStatusDto) {
    return this.animalsService.updateState(auth, id, dto.animalStatus);
  }
}
