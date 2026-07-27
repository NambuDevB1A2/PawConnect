import { AuthRequest } from '@/auth/interfaces/auth-request.interface';
import { UPLOAD_DIR } from '@/config/upload.config';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateUserDataDto } from '@/users/dto/create-user.dto';
import { UpdateUserDto } from '@/users/dto/update-user.dto';
import { USER_DETAIL_SELECT, USER_SELECT } from '@/users/user.select';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AzureBlobService } from '../azure/azure-blob/azure-blob.service';
import { ConfigService } from '@nestjs/config';
import { UpdatePasswordDto } from '@/users/dto/update-password.dto';
import * as bcrypt from 'bcrypt';

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
        private readonly azureBlob: AzureBlobService,
    ) {}

    // 회원 검색 (아이디)
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

    // 회원 검색 (이메일)
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

    // 회원 중복 검사 (이메일)
    async existsByEmail(email: string) {
        const user = await this.prisma.user.findUnique({ where: { email }});
        if (user) throw new UnauthorizedException({
            message: "이미 사용중인 이메일입니다",
            fields: { email: "이미 사용중인 이메일입니다" },
        });
    }

    // CREATE
    async create(tx: Prisma.TransactionClient, createUserDto: CreateUserDataDto, imgProfile?: Express.Multer.File) {
        await this.existsByEmail(createUserDto.email);

        // blob 스토리지에 이미지 업로드
        const { blobName, url } = imgProfile ? 
            await this.azureBlob.uploadPublic(imgProfile, UPLOAD_DIR.userProfileDir) : { blobName: getDefaultProfile() };

        // 1. 신규 유저 생성
        const user = await tx.user.create({
            data: {
                email: createUserDto.email,
                password: createUserDto.passwordHash,
                nickname: createUserDto.nickname,
                role: createUserDto.role,
                imgProfile: blobName,
                shelterId: createUserDto.shelterId,
            },
            select: USER_SELECT,
        });

        // 2. 약관 동의 생성
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

    // READ
    async me(auth: AuthRequest) {
        const user = await this.find(auth.id, USER_DETAIL_SELECT);

        return { success: true, user };
    }
    
    // UPDATE
    async update(auth: AuthRequest, updateUserDto: UpdateUserDto, imgProfile?: Express.Multer.File) {
        const prevUser = await this.find(auth.id);

        let imgProfilePath = prevUser.imgProfile;
        let imgProfileOld: string | null = null;

        // 1. 새로운 파일 업로드
        // 새로운 이미지로 교체
        if (imgProfile) {
            const uploaded = await this.azureBlob.uploadPublic(imgProfile, UPLOAD_DIR.userProfileDir);
            imgProfilePath = uploaded.blobName;
            if (!isDefaultProfile(prevUser.imgProfile)) {
                imgProfileOld = prevUser.imgProfile;
            }
        } 
        // 기존 이미지만 삭제
        else if (updateUserDto.imgProfileRemoved) {
            imgProfileOld = prevUser.imgProfile;
            imgProfilePath = getDefaultProfile();
        }

        // 2. 유저 정보 업데이트
        const user = await this.prisma.user.update({
            where: { id: auth.id },
            data: {
                nickname: updateUserDto.nickname,
                imgProfile: imgProfilePath,
            },
            select: USER_SELECT,
        });

        // 3. DB 저장 성공 후에 실제 파일 삭제
        if (imgProfileOld) await this.azureBlob.deleteBlob(imgProfileOld);

        return { success: true, user };
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

        return { success: true };
    }
}
