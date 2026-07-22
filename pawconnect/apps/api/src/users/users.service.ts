import { AuthRequest } from '@/auth/interfaces/auth-request.interface';
import { removeFile } from '@/common/utils/upload.util';
import { UPLOAD_DIR } from '@/config/upload.config';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { UpdateUserDto } from '@/users/dto/update-user.dto';
import { USER_SELECT } from '@/users/user.select';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor (private readonly prisma: PrismaService) {}

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
            message: "존재하지 않는 이메일입니다",
            fields: { email: "존재하지 않는 이메일입니다" },
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
    async create(tx: Prisma.TransactionClient, createUserDto: CreateUserDto, imgProfile?: Express.Multer.File) {
        await this.existsByEmail(createUserDto.email);

        // 파일 path 저장 (기본값 설정 로직)
        const imgProfilePath = imgProfile ? imgProfile.path : `${UPLOAD_DIR.userProfileDir}/default_profile.png`;
        
        const user = await tx.user.create({
            data: {
                email: createUserDto.email,
                password: createUserDto.passwordHash,
                nickname: createUserDto.nickname,
                role: createUserDto.role,
                imgProfile: imgProfilePath,
                shelterId: createUserDto.shelterId,
            },
            select: USER_SELECT,
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

        const user = await this.prisma.user.update({
            where: { id: auth.id },
            data: {
                ...updateUserDto,
                imgProfile: imgProfilePath,
            },
            select: USER_SELECT,
        });

        if (imgProfile) await removeFile(prevUser.imgProfile);

        return { user };
    }
}
