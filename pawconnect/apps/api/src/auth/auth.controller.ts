import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Auth')
@Controller('auth')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // 회원가입 - 일반 사용자 (ROLE.USER)
    @ApiOperation({ summary: "회원가입 - 일반 사용자" })
    @Public()
    @Post('register/user')
    registerUser(@Body() registerAuthDto: RegisterAuthDto) {
        return this.authService.registerUser(registerAuthDto);
    }
    
    // 회원가입 - 보호소 관리자 (ROLE.SHELTER)
    @ApiOperation({ summary: "회원가입 - 보호소 관리자" })
    @Public()
    @Post('register/shelter')
    registerShelter(@Body() registerAuthDto: RegisterAuthDto) {
        return this.authService.registerShelter(registerAuthDto);
    }

    // 로그인
    @ApiOperation({ summary: "로그인" })
    @Public()
    @Post('login')
    login(@Body() loginAuthDto: LoginAuthDto) {
        return this.authService.login(loginAuthDto);
    }

    // 로그아웃
    @ApiOperation({ summary: "로그아웃" })
    @Post('logout')
    logout() {
        return this.authService.logout();
    }
}
