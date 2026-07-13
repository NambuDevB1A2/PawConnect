import { AuthService } from '@/auth/auth.service';
import { CurrentAuth } from '@/auth/decorators/current-auth.decorator';
import { LoginAuthDto } from '@/auth/dto/login-auth.dto';
import { RegisterAuthDto, RegisterShelterAuthDto } from '@/auth/dto/register-auth.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import type { AuthRequest } from '@/auth/interfaces/auth-request.interface';
import { Public } from '@/common/decorators/public.decorator';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
@UseGuards(JwtAuthGuard) // 컨트롤러 전체에 JwtGuard 사용
@ApiBearerAuth() // 컨트롤러 전체에 JwtGuard 사용
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // 회원가입 - 일반 사용자 (ROLE.USER)
    @ApiOperation({ summary: "회원가입 - 일반 사용자" })
    @Public() // Auth 검증이 필요하지 않은 메소드에 @Public() 사용
    @Post('register/user')
    registerUser(@Body() registerAuthDto: RegisterAuthDto) {
        return this.authService.registerUser(registerAuthDto);
    }
    
    // 회원가입 - 보호소 관리자 (ROLE.SHELTER)
    @ApiOperation({ summary: "회원가입 - 보호소 관리자" })
    @Public() // Auth 검증이 필요하지 않은 메소드에 @Public() 사용
    @Post('register/shelter')
    registerShelter(@Body() registerShelterAuthDto: RegisterShelterAuthDto) {
        return this.authService.registerShelter(registerShelterAuthDto);
    }

    // 로그인
    @ApiOperation({ summary: "로그인" })
    @Public() // Auth 검증이 필요하지 않은 메소드에 @Public() 사용
    @Post('login')
    login(@Body() loginAuthDto: LoginAuthDto) {
        return this.authService.login(loginAuthDto);
    }

    // 로그아웃
    @ApiOperation({ summary: "로그아웃" })
    @Post('logout')
    logout(@CurrentAuth() auth: AuthRequest) { 
        // Auth 검증이 필요한 경우 @CurrentAuth() 로 검증
        return this.authService.logout(auth);
    }
}
