import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreatePersonalityTestDto } from './dto/create-personality-test.dto';
import { TestsService } from './tests.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PersonalityTestResultDto } from './dto/personality-test-result.dto';
import { Public } from '@/common/decorators/public.decorator';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';

@ApiTags('Tests')
@Controller('tests')
@UseGuards(JwtAuthGuard)    //기본적으로 JWT인증을 적용하고 인증필요없는 API는 @Public() 예외처리
@ApiBearerAuth()
export class TestsController {
    constructor(private readonly testsService:TestsService){}

    @Post('personality')
    @ApiResponse({status: 201, description: 'PawTI 결과 생성', type: PersonalityTestResultDto})
    @ApiOperation({summary: 'PawTI 성향 테스트'})
    @Public()   // 누구나 이용 가능한 성향 테스트
    createPersonalityResult(@Body() dto: CreatePersonalityTestDto){
        return this.testsService.createPersonalityResult(dto);
    }
}