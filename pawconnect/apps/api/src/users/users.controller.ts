import { CurrentAuth } from '@/auth/decorators/current-auth.decorator';
import { Roles } from '@/auth/decorators/roles.decorator';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/auth/guards/role.guard';
import { type AuthRequest } from '@/auth/interfaces/auth-request.interface';
import { UsersService } from '@/users/users.service';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';

@ApiTags('User')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard) // RolesGuard 추가
@ApiBearerAuth()
export class UsersController {
    constructor (private readonly usersService: UsersService) {}
    
    // 내 정보 조회
    @ApiOperation({ summary: "내 정보 조회" })
    @Get('me')
    me(@CurrentAuth() auth: AuthRequest) { 
        // Auth 검증이 필요한 경우 @CurrentAuth() 로 검증
        return this.usersService.me(auth);
    }

    // 내 정보 조회(일반 사용자) - RolesGuard 테스트
    @ApiOperation({ summary: "내 정보 조회(일반 사용자)"})
    @Roles(Role.USER)
    @Get('me/user')
    meUser(@CurrentAuth() auth: AuthRequest) {
        return this.usersService.meUser(auth);
    }

    // 내 정보 조회(보호소 관리자) - RolesGuard 테스트
    @ApiOperation({ summary: "내 정보 조회(보호소 관리자)"})
    @Roles(Role.SHELTER)
    @Get('me/shelter')
    meShelter(@CurrentAuth() auth: AuthRequest) {
        return this.usersService.meShelter(auth);
    }
}
