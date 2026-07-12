import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    // 회원가입 - 일반 사용자
    async registerUser(registerAuthDto: RegisterAuthDto) {

    }

    // 회원가입 - 보호소 관리자
    async registerShelter(registerAuthDto: RegisterAuthDto) {

    }

    // 로그인
    async login(loginAuthDto: LoginAuthDto) {

    }

    // 로그아웃
    async logout() {
        
    }
}
