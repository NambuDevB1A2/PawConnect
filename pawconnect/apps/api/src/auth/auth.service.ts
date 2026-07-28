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
    async register(tx: Prisma.TransactionClient, role: Role, registerAuthDto: RegisterUserAuthDto, imgProfile?: Express.Multer.File, shelterId?: string) {
        // 비밀번호 해시
        const bcryptRound = this.configService.getOrThrow('bcrypt.bcrypt_round');
        const passwordHash = await bcrypt.hash(registerAuthDto.password, bcryptRound);

        // UsersService에서 유저 생성
        const user = await this.usersService.create(tx,
            role,
            {
                ...registerAuthDto,
                passwordHash,
            },
            shelterId,
            imgProfile);

        return user;
    }

    // 회원가입 - 일반 사용자
    async registerUser(registerAuthDto: RegisterUserAuthDto, imgProfile?: Express.Multer.File) {
        // 사용자 생성
        const user = await this.register(this.prisma, Role.USER, registerAuthDto, imgProfile);

        return { success: true, userId: user.id };
    }

    // 회원가입 - 보호소 관리자
    async registerShelter(registerShelterAuthDto: RegisterShelterAuthDto, 
        imgProfile?: Express.Multer.File, imgBanner?: Express.Multer.File, imgShelter?: Express.Multer.File[]) {

        return await this.prisma.$transaction(async (tx) => {
            // 보호소 생성
            const shelter = await this.sheltersService.create(tx, registerShelterAuthDto, imgBanner, imgShelter);

            // 사용자 생성
            const user = await this.register(tx, Role.SHELTER, registerShelterAuthDto, imgProfile, shelter.id);

            return { success: true, userId: user.id, shelterId: shelter.id };
        });
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
        return { success: true, accessToken };
    }

    // 로그아웃
    async logout(auth: AuthRequest) {
        // TODO: 블랙리스트 토큰 로직 구현
        return { success: true };
    }
    
}
