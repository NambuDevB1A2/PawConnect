import { CurrentAuth } from '@/auth/decorators/current-auth.decorator';
import { Roles } from '@/auth/decorators/roles.decorator';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/auth/guards/role.guard';
import type { AuthRequest } from '@/auth/interfaces/auth-request.interface';
import { cleanupOnError } from '@/common/utils/upload.util';
import { createFieldsImageUploadOptions, UPLOAD_DIR } from '@/config/upload.config';
import { UpdateShelterDto } from '@/shelters/dto/update-shelter.dto';
import { SheltersService } from '@/shelters/shelters.service';
import { Body, Controller, Get, Patch, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { isDefined } from 'class-validator';

@ApiTags('Shelter')
@Controller('shelters')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class SheltersController {
    constructor (private readonly sheltersService: SheltersService) {}

    // 내 보호소 정보 조회
    @ApiOperation({ summary: "내 보호소 정보 조회" })
    @Roles(Role.SHELTER)
    @Get('me')
    me(@CurrentAuth() auth: AuthRequest) { 
        // Auth 검증이 필요한 경우 @CurrentAuth() 로 검증
        return this.sheltersService.me(auth);
    }

    // 내 보호소 정보 수정
    @ApiOperation({ summary: "내 보호소 정보 수정" })
    @ApiConsumes('multipart/form-data')
    @ApiBody({ type: UpdateShelterDto })
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'imgBanner', maxCount: 1 },
            { name: 'imgShelter', maxCount: 4 },
        ], createFieldsImageUploadOptions({
            imgBanner: UPLOAD_DIR.shelterBannerDir,
            imgShelter: UPLOAD_DIR.shelterImgDir,
        })))
    @Roles(Role.SHELTER)
    @Patch('me')
    update(
        @CurrentAuth() auth: AuthRequest, 
        @Body() updateShelterDto: UpdateShelterDto,
        @UploadedFiles() file: { 
            imgBanner?: Express.Multer.File[],
            imgShelter?: Express.Multer.File[],
        }) {
        const imgBanner = file.imgBanner?.[0];
        const imgShelter = file.imgShelter ? file.imgShelter : [];

        return this.sheltersService.update(auth, updateShelterDto, imgBanner, imgShelter);
    }
}
