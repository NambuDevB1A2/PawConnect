import { AuthService } from '@/auth/auth.service';
import { CurrentAuth } from '@/auth/decorators/current-auth.decorator';
import { LoginAuthDto } from '@/auth/dto/login-auth.dto';
import { RegisterUserAuthDto, RegisterShelterAuthDto } from '@/auth/dto/register-auth.dto';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/auth/guards/role.guard';
import type { AuthRequest } from '@/auth/interfaces/auth-request.interface';
import { Public } from '@/auth/decorators/public.decorator';
import { Body, Controller, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { createFieldsImageUploadOptions, createImageUploadOptions, UPLOAD_DIR } from '@/config/upload.config';

@ApiTags('Auth')
@Controller('auth')
@UseGuards(JwtAuthGuard,RolesGuard) // 컨트롤러 전체에 JwtGuard 사용
@ApiBearerAuth() // 컨트롤러 전체에 JwtGuard 사용
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // post - auth/register/user
    // 회원가입 - 일반 사용자 (ROLE.USER)
    @ApiOperation({ summary: "회원가입 - 일반 사용자" })
    @ApiConsumes('multipart/form-data')
    @ApiBody({ type: RegisterUserAuthDto })
    @UseInterceptors( 
         // createImageUploadOptions로 파일 저장 위치 지정
        FileInterceptor(
            'imgProfile', 
            createImageUploadOptions(UPLOAD_DIR.userProfileDir)
        ))
    @Public() // Auth 검증이 필요하지 않은 메소드에 @Public() 사용
    @Post('register/user')
    registerUser(
        @Body() registerAuthDto: RegisterUserAuthDto,
        @UploadedFile() imgProfile?: Express.Multer.File) {
        return this.authService.registerUser(registerAuthDto, imgProfile);
    }
    
    // post - auth/register/shelter
    // 회원가입 - 보호소 관리자 (ROLE.SHELTER)
    @ApiOperation({ summary: "회원가입 - 보호소 관리자" })
    @ApiConsumes('multipart/form-data')
    @ApiBody({ type: RegisterShelterAuthDto })
    @UseInterceptors(
        // createFieldsImageUploadOptions로 필드별 파일 저장 위치 지정
        FileFieldsInterceptor([
            // 파일을 필드명으로 구분
            { name: 'imgProfile', maxCount: 1 },
            { name: 'imgBanner', maxCount: 1 },
            { name: 'imgShelter', maxCount: 4 },
        ], createFieldsImageUploadOptions({
            // 파일 저장 위치, 옵션 지정
            imgProfile: UPLOAD_DIR.userProfileDir,
            imgBanner: UPLOAD_DIR.shelterBannerDir,
            imgShelter: UPLOAD_DIR.shelterImgDir,
        })))
    @Public() // Auth 검증이 필요하지 않은 메소드에 @Public() 사용
    @Post('register/shelter')
    registerShelter(
        @Body() registerShelterAuthDto: RegisterShelterAuthDto,
        @UploadedFiles() file: { 
            imgProfile?: Express.Multer.File[],
            imgBanner?: Express.Multer.File[],
            imgShelter?: Express.Multer.File[],
        }) {
        const imgProfile = file.imgProfile?.[0];
        const imgBanner = file.imgBanner?.[0];
        const imgShelter = file.imgShelter ? file.imgShelter : [];

        return this.authService.registerShelter(registerShelterAuthDto, imgProfile, imgBanner, imgShelter);
    }

    // post - auth/login
    // 로그인
    @ApiOperation({ summary: "로그인" })
    @Public() // Auth 검증이 필요하지 않은 메소드에 @Public() 사용
    @Post('login')
    login(@Body() loginAuthDto: LoginAuthDto) {
        return this.authService.login(loginAuthDto);
    }

    // post - auth/logout
    // 로그아웃
    @ApiOperation({ summary: "로그아웃" })
    @Post('logout')
    logout(@CurrentAuth() auth: AuthRequest) { 
        // Auth 검증이 필요한 경우 @CurrentAuth() 로 검증
        return this.authService.logout(auth);
    }
}
