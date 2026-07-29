import { Public } from '@/auth/decorators/public.decorator';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/auth/guards/role.guard';
import { HomeService } from '@/home/home.service';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Home')
@Controller('home')
@UseGuards(JwtAuthGuard,RolesGuard)
@ApiBearerAuth()
export class HomeController {
    constructor(private readonly homeService: HomeService) {}

    // get - home/
    // 홈 화면 필요 정보 조회
    @ApiOperation({ summary: "홈 화면 필요 정보 조회" })
    @Public()
    @Get()
    getHome() {
        return this.homeService.getHome();
    }
}
