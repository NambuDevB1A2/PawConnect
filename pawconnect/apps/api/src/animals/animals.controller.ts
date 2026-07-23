import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/auth/guards/role.guard';
import { GetAnimalsQueryDto, GetAnimalsResponseDto } from './dto/get-animals.dto';


@ApiTags('Animals')
@Controller('animals')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class AnimalsController {
    constructor(private readonly animalsService: AnimalsService) {}
// @Post()
//   @Roles(Role.USER)
//   @ApiOperation({summary:"입양 신청 등록"})
//   create(
//     @CurrentAuth() auth:AuthRequest,
//     @Body() createAdoptionDto: CreateAdoptionDto) {
//       return this.adoptionsService.create(auth, createAdoptionDto);
//   }

  @Get()
  @ApiOkResponse({type: GetAnimalsResponseDto})
  @ApiOperation({ summary:"보호동물 목록 조회"})
  getAnimals(@Query() query: GetAnimalsQueryDto) {
    return this.animalsService.getAnimals(query);
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
