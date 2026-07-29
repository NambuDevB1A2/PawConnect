import { AuthRequest } from '@/auth/interfaces/auth-request.interface';
import { UPLOAD_DIR } from '@/config/upload.config';
import { PrismaService } from '@/prisma/prisma.service';
import { UpdateUserDto } from '@/users/dto/update-user.dto';
import { USER_DETAIL_SELECT, USER_SELECT } from '@/users/user.select';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { UpdatePasswordDto } from '@/users/dto/update-password.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { UsersUploadService } from '@/users/users-upload.service';

function getDefaultProfile() {
    return `${UPLOAD_DIR.userProfileDir}/default_profile.png`;
}

function isDefaultProfile(blobName: string) {
    return blobName === getDefaultProfile();
}

@Injectable()
export class UsersService {
    constructor (
        private readonly prisma: PrismaService,
        private readonly configService: ConfigService,
        private readonly usersUploadService: UsersUploadService,
    ) {}

    // 회원 검색 (id)
    async find(id: string, select?: Prisma.UserSelect) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: select
        });
        if (!user) throw new UnauthorizedException({
            message: "존재하지 않는 유저입니다",
        });
        
        return user;
    }

    // 회원 검색 (email)
    async findByEmail(email: string, select?: Prisma.UserSelect) {
        const user = await this.prisma.user.findUnique({ 
            where: { email }, 
            select: select
        });
        if (!user) throw new UnauthorizedException({
            message: "존재하지 않는 유저입니다",
        });
        
        return user;
    }

    // 회원 중복 검사 (email)
    async existsByEmail(email: string) {
        const user = await this.prisma.user.findUnique({ where: { email }});
        if (user) throw new UnauthorizedException({
            message: "이미 사용중인 이메일입니다",
            fields: { email: "이미 사용중인 이메일입니다" },
        });
    }

    // 중복 검사
    async checkUser(email: string) {
        await this.existsByEmail(email);
    }

    // 이미지 업로드
    async createImage(imgProfileFile?: Express.Multer.File) {
        // 1. Azure Blob에 이미지 업로드 (없을시 기본값)
        let uploadedImgProfile = imgProfileFile ? await this.usersUploadService.uploadImage(imgProfileFile) : undefined;
        if (!uploadedImgProfile) uploadedImgProfile = getDefaultProfile();
        
        return { uploadedImgProfile };
    }

    // 신규 사용자 생성
    async createUser(tx: Prisma.TransactionClient, role: Role, createUserDto: CreateUserDto, uploadedImgProfile: string, shelterId?: string) {
        
        // 2. DB 작업
        // 신규 사용자 DB 생성
        const user = await tx.user.create({
            data: {
                email: createUserDto.email,
                password: createUserDto.passwordHash,
                nickname: createUserDto.nickname,
                role: role,
                imgProfile: uploadedImgProfile ?? getDefaultProfile(),
                shelterId: shelterId,
            },
            select: USER_SELECT,
        });

        // 사용자 약관 동의 DB 생성
        await tx.userAgreement.createMany({
            data: [{
                userId: user.id,
                agreementId: 1,
                isAgreed: createUserDto.agreedToTerms,
            }, {
                userId: user.id,
                agreementId: 2,
                isAgreed: createUserDto.agreedToTerms,
            }]
        });

        return user;
    }

    // 이미지 롤백
    async rollbackImage(uploadedImgProfile: string) {
        if (uploadedImgProfile && !isDefaultProfile(uploadedImgProfile)) {
            await this.usersUploadService.rollback(uploadedImgProfile);
        }
    }

    // 내 정보 조회
    async me(auth: AuthRequest) {
        const user = await this.find(auth.id, USER_DETAIL_SELECT);

        return { success: true, user };
    }
    
    // 내 정보 수정
    async update(auth: AuthRequest, updateUserDto: UpdateUserDto, file?: Express.Multer.File) {
        const user = await this.find(auth.id);

        let uploadedImgProfile: string | undefined = user.imgProfile;
        let oldImgProfile: string | null = null;

        // 1. 이미지 업로드
        // 새로운 이미지로 교체
        if (file) {
            uploadedImgProfile = await this.usersUploadService.uploadImage(file);

            if (!isDefaultProfile(user.imgProfile)) {
                oldImgProfile = user.imgProfile;
            }
        } 
        // 기존 이미지만 삭제
        else if (updateUserDto.imgProfileRemoved && !isDefaultProfile(user.imgProfile)) {
            oldImgProfile = user.imgProfile;
            uploadedImgProfile = getDefaultProfile();
        }

        // 2. DB 수정
        try {
            await this.prisma.user.update({
                where: { id: auth.id },
                data: {
                    nickname: updateUserDto.nickname,
                    imgProfile: uploadedImgProfile,
                },
            });
        } catch (error) {
            // DB 실패 시 업로드했던 Blob 파일 삭제
            if (uploadedImgProfile && !isDefaultProfile(uploadedImgProfile)) {
                await this.usersUploadService.rollback(uploadedImgProfile);
            }
            throw error;
        }

        // 3. Azure Blob 삭제
        if (oldImgProfile && !isDefaultProfile(oldImgProfile)) {
            await this.usersUploadService.deleteBlob(oldImgProfile);
        }

        return { success: true, userId: user.id };
    }

    // 비밀번호 변경
    async updatePassword(auth: AuthRequest, updatePasswordDto: UpdatePasswordDto) {
        const prevUser = await this.find(auth.id);
        
        const isPasswordValid = await bcrypt.compare(updatePasswordDto.prevPassword, prevUser.password);
        if (!isPasswordValid) throw new UnauthorizedException({
            message: "비밀번호가 틀렸습니다",
            fields: { prevPassword: "비밀번호가 틀렸습니다" },
        });

        const bcryptRound = this.configService.getOrThrow('bcrypt.bcrypt_round');
        const passwordHash = await bcrypt.hash(updatePasswordDto.newPassword, bcryptRound);

        await this.prisma.user.update({
            where: { id: auth.id },
            data: {
                password: passwordHash,
            },
        });

        return { success: true, userId: auth.id };
    }
}
