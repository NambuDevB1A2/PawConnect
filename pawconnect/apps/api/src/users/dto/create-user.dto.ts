import { Role } from "@prisma/client";

export class CreateUserDataDto {
    email: string;
    passwordHash: string;
    nickname: string;
    role: Role;
    imgProfile: string;
    agreedToTerms: boolean;
    
    shelterId?: string;
}