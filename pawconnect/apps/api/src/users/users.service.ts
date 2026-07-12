import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { USER_SELECT } from './users.select';

@Injectable()
export class UsersService {
    constructor (private readonly prisma: PrismaService) {}

    async existsEmail(email: string) {
        const user = await this.prisma.user.findUnique({ where: { email }});
        if (user) throw new ConflictException();
    }

    // CREATE
    async create(createUserDto: CreateUserDto) {
        await this.existsEmail(createUserDto.email);

        const user = await this.prisma.user.create({
            data: {
                email: createUserDto.email,
                password: createUserDto.passwordHash,
                nickname: createUserDto.nickname,
                role: createUserDto.role,
                imgProfile: createUserDto.imgProfile,
            },
            select: USER_SELECT,
        });

        return user;
    }
}
