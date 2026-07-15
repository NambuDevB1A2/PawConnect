import { Prisma } from "@prisma/client";

export const USER_SELECT = 
    Prisma.validator<Prisma.UserSelect>()
    ({
        email: true,
        nickname: true,
        role: true,
        imgProfile: true,
    });