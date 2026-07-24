import { Public } from '@/auth/decorators/public.decorator';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/auth/guards/role.guard';
import { QueryPaginationDto } from '@/common/dto/query-pagination.dto';
import { PetpostsService } from '@/petposts/petposts.service';
import { Controller, Get, Param, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Pet Post')
@Controller('petposts')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class PetpostsController {
    constructor (private readonly petpostsService: PetpostsService) {}

    // 게시글 목록 조회
    @ApiOperation({ summary: "보호소 목록 조회" })
    @Public()
    @Get()
    getPetposts(@Query() pagination: QueryPaginationDto) {
        return this.petpostsService.getPetposts(pagination);
    }

    // 게시글 상세 조회
    @ApiOperation({ summary: "게시글 상세 조회" })
    @Public()
    @Get(':id')
    getPetpost(@Param('id', ParseIntPipe) id: number) {
        return this.petpostsService.getPetpost(id);
    }
}
