import { CurrentAuth } from '@/auth/decorators/current-auth.decorator';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { type AuthRequest } from '@/auth/interfaces/auth-request.interface';
import { UsersService } from '@/users/users.service';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
    constructor (private readonly usersService: UsersService) {}
    
    // 내 정보 조회
    @ApiOperation({ summary: "내 정보 조회" })
    @Get('me')
    logout(@CurrentAuth() auth: AuthRequest) { 
        // Auth 검증이 필요한 경우 @CurrentAuth() 로 검증
        return this.usersService.me(auth);
    }
}
