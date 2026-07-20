import { AuthRequest } from '@/auth/interfaces/auth-request.interface';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { USER_SELECT } from '@/users/user.select';
import { Injectable, UnauthorizedException } from '@nestjs/common';
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
        if (!user) throw new UnauthorizedException();
        
        return user;
    }

    // 회원 검색 (이메일)
    async findByEmail(email: string, select?: Prisma.UserSelect) {
        const user = await this.prisma.user.findUnique({ 
            where: { email }, 
            select: select
        });
        if (!user) throw new UnauthorizedException();
        
        return user;
    }

    // 회원 중복 검사 (이메일)
    async existsByEmail(email: string) {
        const user = await this.prisma.user.findUnique({ where: { email }});
        if (user) throw new UnauthorizedException();
    }

    // CREATE
    async create(tx: Prisma.TransactionClient, createUserDto: CreateUserDto) {
        await this.existsByEmail(createUserDto.email);

        const user = await tx.user.create({
            data: {
                email: createUserDto.email,
                password: createUserDto.passwordHash,
                nickname: createUserDto.nickname,
                role: createUserDto.role,
                imgProfile: createUserDto.imgProfile,
                shelterId: createUserDto.shelterId,
            },
            select: USER_SELECT,
        });

        return user;
    }

    // READ
    async me(auth: AuthRequest) {
        return { auth };
        // return this.find(auth.id, USER_SELECT);
    }

    async meUser(auth: AuthRequest) {
        return this.find(auth.id, USER_SELECT);
    }

    async meShelter(auth: AuthRequest) {
        return this.find(auth.id, USER_SELECT);
    }
}
