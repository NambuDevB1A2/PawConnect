import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';
import { CurrentAuth } from './decorators/current-auth.decorator';
import { type AuthRequest } from './interfaces/auth-request.interface';

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
    registerShelter(@Body() registerAuthDto: RegisterAuthDto) {
        return this.authService.registerShelter(registerAuthDto);
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
