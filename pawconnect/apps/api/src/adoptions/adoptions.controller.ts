import { Controller, Get, Post, Body, Patch, Param, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { AdoptionsService } from './adoptions.service';
import { CreateAdoptionDto } from './dto/create-adoption.dto';
import { CurrentAuth } from '@/auth/decorators/current-auth.decorator';
import type { AuthRequest } from '@/auth/interfaces/auth-request.interface';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { UpdateAdoptionStatusDto } from './dto/update-adoption-status.dto';

@Controller('adoptions')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AdoptionsController {
  constructor(private readonly adoptionsService: AdoptionsService) {}

  @Post()
  @ApiOperation({summary:"입양 신청 등록"})
  create(
    @CurrentAuth() auth:AuthRequest,
    @Body() createAdoptionDto: CreateAdoptionDto) {
    console.log(auth);
      return this.adoptionsService.create(auth, createAdoptionDto);
  }

  @Get()
  @ApiOperation({summary:"내 입양신청 목록 조회"})
  findAll(@CurrentAuth() auth:AuthRequest) {
    return this.adoptionsService.findAll(auth);
  }

  // 보호소안에서 하기
  // @Get(':id/adoptions')
  // @ApiOperation({summary:"보호소 입양신청 목록 조회"})
  // findAllShelter(@CurrentAuth() auth:AuthRequest){
  //   return this.adoptionsService.findAllShelter(auth);
  // }

  @Get(':id')
  @ApiOperation({summary:"입양 신청 상세 조회"})
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.adoptionsService.findOne(id);
  }

  @Patch(':id/status')
  @ApiOperation({summary:"입양 신청 상태 변경"})
  update(@Param('id', new ParseUUIDPipe()) id: string, 
         @Body() updateAdoptionStatusDto: UpdateAdoptionStatusDto) {
    return this.adoptionsService.update(id, updateAdoptionStatusDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.adoptionsService.remove(id);
  // }
}
