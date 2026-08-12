import { Prisma } from "@prisma/client";

export const USER_SELECT = 
    Prisma.validator<Prisma.UserSelect>()
    ({
        id: true,
        nickname: true,
        imgProfile: true,
    });
    
export const USER_DETAIL_SELECT = 
    Prisma.validator<Prisma.UserSelect>()
    ({
        id: true,
        email: true,
        nickname: true,
        role: true,
        shelterId: true,
        imgProfile: true,
    });
