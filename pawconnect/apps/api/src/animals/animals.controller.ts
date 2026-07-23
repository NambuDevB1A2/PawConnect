import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
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


@ApiTags('Animals')
@Controller('animals')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) { }

  @Post()
  @Roles(Role.SHELTER)
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'imgThumbnail', maxCount: 1 },
    { name: 'images', maxCount: 10 },
  ]))
  @ApiOperation({ summary: "보호동물 등록" })
  create(
    @CurrentAuth() auth: AuthRequest,
     @UploadedFiles()
     files: {
      imgThumbnail?: Express.Multer.File[];
      images?: Express.Multer.File[];
     },
    @Body() createAnimalDto: CreateAnimalDto) {
    return this.animalsService.create(auth, createAnimalDto, files);
  }

  @Get()
  @ApiOkResponse({ type: GetAnimalsResponseDto })
  @ApiOperation({ summary: "보호동물 목록 조회" })
  @Public()
  getAnimals(@Query() query: GetAnimalsQueryDto) {
    console.log(query);
    return this.animalsService.getAnimals(query);
  }

  @Get(':id')
  @ApiOkResponse({ type: AnimalDetailResponseDto })
  @ApiOperation({ summary: "보호동물 상세조회" })
  @Public()
  findOne(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    return this.animalsService.findOne(id);
  }


  //   @Get(':id')
  //   @ApiOperation({summary:"입양 신청 상세 조회"})
  //   findOne(
  //     @CurrentAuth() auth: AuthRequest,
  //     @Param('id', new ParseUUIDPipe()) id: string) {
  //     return this.adoptionsService.findOne(auth, id);
  //   }

  //   @Patch(':id/status')
  //   @Roles(Role.SHELTER)
  //   @ApiOperation({summary:"입양 신청 상태 변경"})
  //   update(@CurrentAuth() auth:AuthRequest,
  //          @Param('id', new ParseUUIDPipe()) id: string, 
  //          @Body() updateAdoptionStatusDto: UpdateAdoptionStatusDto) {
  //     return this.adoptionsService.update(auth ,id, updateAdoptionStatusDto);
  //   }

  //   @Delete(':id')
  //   remove(@Param('id') id: string) {
  //     return this.adoptionsService.remove(id);
  //   }

}
