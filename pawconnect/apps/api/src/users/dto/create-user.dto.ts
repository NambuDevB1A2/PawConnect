import { Role } from "@prisma/client";

export class CreateUserDto {
    email: string;
    passwordHash: string;
    nickname: string;
    role: Role;
    imgProfile: string;
    
    shelterId?: string;
}