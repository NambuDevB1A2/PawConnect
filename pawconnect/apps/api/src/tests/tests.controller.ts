import { Body, Controller, Post } from '@nestjs/common';
import { CreatePersonalityTestDto } from './dto/create-personality-test.dto';
import { TestsService } from './tests.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PersonalityTestResultDto } from './dto/personality-test-result.dto';

@ApiTags('Tests')
@Controller('tests')
export class TestsController {
    constructor(private readonly testService:TestsService){}

    @Post('personality')
    @ApiResponse({status: 201, description: 'PawTI 결과 생성', type: PersonalityTestResultDto})
    @ApiOperation({summary: 'PawTI 성향 테스트'})
    createPersonalityResult(@Body() dto: CreatePersonalityTestDto){
        return this.testService.createPersonalityResult(dto);
    }
}