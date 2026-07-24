import { Prisma } from "@prisma/client";
import { USER_SELECT } from '@/users/user.select';

export const PETPOST_IMAGE_SELECT = 
    Prisma.validator<Prisma.PetPostImageSelect>()
    ({
        id: true,
        img: true,
    });

export const PETPOST_SELECT = 
    Prisma.validator<Prisma.PetPostSelect>()
    ({
        id: true,
        title: true,
        content: true,
        author: {
            select: USER_SELECT,
        },
        updatedAt: true,
        images: {
            select: PETPOST_IMAGE_SELECT,
        }
    });

export const PETPOST_ORDERBY = {
    OLDEST: Prisma.validator<Prisma.PetPostOrderByWithRelationInput>()
    ({
        createdAt: 'asc',
    }),

    NEWEST: Prisma.validator<Prisma.PetPostOrderByWithRelationInput>()
    ({
        createdAt: 'desc',
    }),

    UPDATED: Prisma.validator<Prisma.PetPostOrderByWithRelationInput>()
    ({
        updatedAt: 'desc',
    }),
};
