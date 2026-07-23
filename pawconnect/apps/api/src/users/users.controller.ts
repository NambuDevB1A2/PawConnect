import { CurrentAuth } from '@/auth/decorators/current-auth.decorator';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/auth/guards/role.guard';
import { type AuthRequest } from '@/auth/interfaces/auth-request.interface';
import { cleanupOnError } from '@/common/utils/upload.util';
import { createImageUploadOptions, UPLOAD_DIR } from '@/config/upload.config';
import { UpdatePasswordDto } from '@/users/dto/update-password.dto';
import { UpdateUserDto } from '@/users/dto/update-user.dto';
import { UsersService } from '@/users/users.service';
import { Body, Controller, Get, Patch, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { isDefined } from 'class-validator';

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
        return this.usersService.me(auth);
    }

    // 내 정보 수정
    @ApiOperation({ summary: "내 정보 수정" })
    @ApiConsumes('multipart/form-data')
    @ApiBody({ type: UpdateUserDto })
    @UseInterceptors(FileInterceptor('imgProfile', createImageUploadOptions(UPLOAD_DIR.userProfileDir)))
    @Patch('me')
    update(
        @CurrentAuth() auth: AuthRequest, 
        @Body() updateUserDto: UpdateUserDto,
        @UploadedFile() imgProfile?: Express.Multer.File) {
        return this.usersService.update(auth, updateUserDto, imgProfile);
    }

    // 비밀번호 변경
    @ApiOperation({ summary: "비밀번호 변경" })
    @Patch('password')
    updatePassword(
        @CurrentAuth() auth: AuthRequest,
        @Body() updatePasswordDto: UpdatePasswordDto) {
        return this.usersService.updatePassword(auth, updatePasswordDto);
    }
}
