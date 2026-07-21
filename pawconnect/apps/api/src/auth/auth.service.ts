import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Prisma, Role } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';
import { UsersService } from '@/users/users.service';
import { SheltersService } from '@/shelters/shelters.service';
import { RegisterUserAuthDto, RegisterShelterAuthDto } from '@/auth/dto/register-auth.dto';
import { LoginAuthDto } from '@/auth/dto/login-auth.dto';
import { JwtPayload } from '@/auth/interfaces/jwt-payload.interface';
import { AuthRequest } from '@/auth/interfaces/auth-request.interface';
import { ConfigService } from '@nestjs/config';
import { UPLOAD_DIR } from '@/config/upload.config';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly prisma: PrismaService,
        private readonly usersService: UsersService,
        private readonly sheltersService: SheltersService,
    ) {}

    // 회원가입 - 공통
    async register(tx: Prisma.TransactionClient, role: Role, registerAuthDto: RegisterUserAuthDto, imgProfile?: Express.Multer.File, shelterId?: string) {
        const bcryptRound = this.configService.getOrThrow('bcrypt.bcrypt_round');
        const passwordHash = await bcrypt.hash(registerAuthDto.password, bcryptRound);

        // 파일 path 저장 (기본값 설정 로직)
        const imgProfilePath = imgProfile ? imgProfile.path : `${UPLOAD_DIR.userProfileDir}/default_profile.png`;
        
        const user = await this.usersService.create(tx, {
            role,
            ...registerAuthDto,
            imgProfile: imgProfilePath,
            passwordHash,
            shelterId,
        });

        return user;
    }

    // 회원가입 - 일반 사용자
    async registerUser(registerAuthDto: RegisterUserAuthDto, imgProfile?: Express.Multer.File) {
        return await this.register(this.prisma, Role.USER, registerAuthDto, imgProfile);
    }

    // 회원가입 - 보호소 관리자
    async registerShelter(registerShelterAuthDto: RegisterShelterAuthDto, 
        imgProfile?: Express.Multer.File, imgBanner?: Express.Multer.File, imgShelter?: Express.Multer.File[]) {
        return await this.prisma.$transaction(async (tx) => {
            // 보호소 생성
            const shelter = await this.sheltersService.create(tx, registerShelterAuthDto, imgBanner);
            // 이미지 새로 저장
            const shelterImages = await this.sheltersService.createImages(tx, shelter.id, imgShelter);
            // 사용자 생성
            const user = await this.register(tx, Role.SHELTER, registerShelterAuthDto, imgProfile, shelter.id);

            return { user, shelter, shelterImages };
        });
    }

    // 로그인
    async login(loginAuthDto: LoginAuthDto) {
        const user = await this.usersService.findByEmail(loginAuthDto.email);

        const isPasswordValid = await bcrypt.compare(loginAuthDto.password, user.password);
        if (!isPasswordValid) throw new UnauthorizedException();

        const authPayload: JwtPayload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };

        const accessToken = this.jwtService.sign(authPayload);
        return { login: true, accessToken };
    }

    // 로그아웃
    async logout(auth: AuthRequest) {
        return { login: false, auth };
    }
}
