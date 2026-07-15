import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Prisma, Role } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';
import { UsersService } from '@/users/users.service';
import { SheltersService } from '@/shelters/shelters.service';
import { RegisterAuthDto, RegisterShelterAuthDto } from '@/auth/dto/register-auth.dto';
import { LoginAuthDto } from '@/auth/dto/login-auth.dto';
import { JwtPayload } from '@/auth/interfaces/jwt-payload.interface';
import { AuthRequest } from '@/auth/interfaces/auth-request.interface';
import { ConfigService } from '@nestjs/config';

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
    async register(tx: Prisma.TransactionClient, role: Role, registerAuthDto: RegisterAuthDto, shelterId?: string) {
        const bcryptRound = this.configService.getOrThrow('bcrypt.bcrypt_round');
        const passwordHash = await bcrypt.hash(registerAuthDto.password, bcryptRound);
        
        const user = await this.usersService.create(tx, {
            role,
            ...registerAuthDto,
            passwordHash,
            shelterId,
        });

        return user;
    }

    // 회원가입 - 일반 사용자
    async registerUser(registerAuthDto: RegisterAuthDto) {
        return await this.register(this.prisma, Role.USER, registerAuthDto);
    }

    // 회원가입 - 보호소 관리자
    async registerShelter(registerShelterAuthDto: RegisterShelterAuthDto) {
        return await this.prisma.$transaction(async (tx) => {
            const shelter = await this.sheltersService.create(tx, registerShelterAuthDto);
            const user = await this.register(tx, Role.SHELTER, registerShelterAuthDto, shelter.id);

            return { user, shelter };
        });
    }

    // 로그인
    async login(loginAuthDto: LoginAuthDto) {
        const user = await this.usersService.findByEmail(loginAuthDto.email);

        const isPasswordValid = await bcrypt.compare(loginAuthDto.password, user.password);
        if (!isPasswordValid) throw new UnauthorizedException();

        const authPayload: JwtPayload = {
            sub: user.email,
            role: user.role,
        };

        const accessToken = this.jwtService.sign(authPayload);
        return { login: true, accessToken };
    }

    // 로그아웃
    async logout(auth: AuthRequest) {
        return { login: false };
    }
}
