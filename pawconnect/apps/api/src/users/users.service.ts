import { AuthRequest } from '@/auth/interfaces/auth-request.interface';
import { removeFile } from '@/common/utils/upload.util';
import { UPLOAD_DIR } from '@/config/upload.config';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateUserDataDto } from '@/users/dto/create-user.dto';
import { UpdateUserDto } from '@/users/dto/update-user.dto';
import { USER_SELECT } from '@/users/user.select';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AzureBlobService } from '../azure/azure-blob/azure-blob.service';

@Injectable()
export class UsersService {
    constructor (
        private readonly prisma: PrismaService,
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
            await this.azureBlob.uploadPublic(imgProfile, UPLOAD_DIR.userProfileDir) : 
            { blobName: `${UPLOAD_DIR.userProfileDir}/default_profile.png`};

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
        return this.find(auth.id, USER_SELECT);
    }
    
    // UPDATE
    async update(auth: AuthRequest, updateUserDto: UpdateUserDto, imgProfile?: Express.Multer.File) {
        const prevUser = await this.find(auth.id);
        const imgProfilePath = imgProfile ? imgProfile.path : prevUser.imgProfile;

        // 1. 유저 정보 업데이트
        const user = await this.prisma.user.update({
            where: { id: auth.id },
            data: {
                ...updateUserDto,
                imgProfile: imgProfilePath,
            },
            select: USER_SELECT,
        });

        // TODO: blob 이미지 지우기
        // 2. 프로필 변경시 이전 프로필 이미지 삭제
        // if (imgProfile) await removeFile(prevUser.imgProfile);

        return { user };
    }
}
