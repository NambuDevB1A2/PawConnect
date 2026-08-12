import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Prisma, Role } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';
import { UsersService } from '@/users/users.service';
import { RegisterUserAuthDto, RegisterShelterAuthDto } from '@/auth/dto/register-auth.dto';
import { LoginAuthDto } from '@/auth/dto/login-auth.dto';
import { JwtPayload } from '@/auth/interfaces/jwt-payload.interface';
import { AuthRequest } from '@/auth/interfaces/auth-request.interface';
import { ConfigService } from '@nestjs/config';
import { SheltersCreateService } from '@/shelters/shelters-create.service';
import { USER_SELECT } from '@/users/user.select';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly prisma: PrismaService,
        private readonly usersService: UsersService,
        private readonly sheltersService: SheltersCreateService,
    ) {}

    // 회원가입 - 공통
    async register(tx: Prisma.TransactionClient, role: Role, registerAuthDto: RegisterUserAuthDto, uploadedImgProfile: string, shelterId?: string) {
        // 비밀번호 해시
        const bcryptRound = this.configService.getOrThrow('bcrypt.bcrypt_round');
        const passwordHash = await bcrypt.hash(registerAuthDto.password, bcryptRound);

        // UsersService에서 유저 생성
        const user = await this.usersService.createUser(tx,
            role,
            {
                ...registerAuthDto,
                passwordHash,
            },
            uploadedImgProfile,
            shelterId);

        return user;
    }

    // 회원가입 - 일반 사용자
    async registerUser(registerAuthDto: RegisterUserAuthDto, imgProfileFile?: Express.Multer.File) {
        // 중복 검사
        await this.usersService.checkUser(registerAuthDto.email);

        const { uploadedImgProfile } = await this.usersService.createImage(imgProfileFile);

        try {
            return await this.prisma.$transaction(async (tx) => {
                // 사용자 생성
                const user = await this.register(tx, Role.USER, registerAuthDto, uploadedImgProfile);
                
                return { success: true, userId: user.id };
            });
        } catch (error) {
            await this.usersService.rollbackImage(uploadedImgProfile);

            throw error;
        }
    }

    // 회원가입 - 보호소 관리자
    async registerShelter(registerShelterAuthDto: RegisterShelterAuthDto, 
        imgProfileFile?: Express.Multer.File, imgBannerFile?: Express.Multer.File, imgShelterFiles?: Express.Multer.File[]) {
        
        // 중복 검사
        await this.sheltersService.checkShelter(registerShelterAuthDto.name);
        await this.usersService.checkUser(registerShelterAuthDto.email);

        const { uploadedImgBanner, uploadedImgShelter } = await this.sheltersService.createImages(imgBannerFile, imgShelterFiles);
        const { uploadedImgProfile } = await this.usersService.createImage(imgProfileFile);

        try {
            return await this.prisma.$transaction(async (tx) => {
                // 보호소 생성
                const shelter = await this.sheltersService.createShelter(tx, registerShelterAuthDto, uploadedImgBanner, uploadedImgShelter);
                
                // 사용자 생성
                const user = await this.register(tx, Role.SHELTER, registerShelterAuthDto, uploadedImgProfile, shelter.id);
                
                return { success: true, userId: user.id, shelterId: shelter.id };
            });
        } catch (error) {
            await this.sheltersService.rollbackImages(uploadedImgBanner, uploadedImgShelter);
            await this.usersService.rollbackImage(uploadedImgProfile);

            throw error;
        }
    }

    // 로그인
    async login(loginAuthDto: LoginAuthDto) {
        const user = await this.usersService.findByEmail(loginAuthDto.email);

        // 비밀번호 검증
        const isPasswordValid = await bcrypt.compare(loginAuthDto.password, user.password);
        if (!isPasswordValid) throw new UnauthorizedException({
            message: "이메일 또는 비밀번호가 틀렸습니다",
            fields: { email: "이메일 또는 비밀번호가 틀렸습니다" },
        });

        // PayLoad 생성
        const authPayload: JwtPayload = {
            sub: user.id,
            email: user.email,
            role: user.role,
            shelterId: user.shelterId,
        };

        // 토큰 생성
        const accessToken = this.jwtService.sign(authPayload);

        const { password, createdAt, updatedAt, status, ...result } = user;

        return { success: true, accessToken, user: result };
    }

    // 로그아웃
    async logout(auth: AuthRequest) {
        // TODO: 블랙리스트 토큰 로직 구현
        return { success: true };
    }
    
}
