import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { AuthRequest } from './interfaces/auth-request.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
    ) {}

    // 회원가입 - 일반 사용자
    async registerUser(registerAuthDto: RegisterAuthDto) {
        const passwordHash = await bcrypt.hash(registerAuthDto.password, 10);
        
        const user = await this.usersService.create({
            email: registerAuthDto.email,
            passwordHash: passwordHash,
            nickname: registerAuthDto.nickname,
            role: registerAuthDto.role,
            imgProfile: registerAuthDto.imgProfile,
        });

        return user;
    }

    // 회원가입 - 보호소 관리자
    async registerShelter(registerAuthDto: RegisterAuthDto) {
        return this.registerUser(registerAuthDto);
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
