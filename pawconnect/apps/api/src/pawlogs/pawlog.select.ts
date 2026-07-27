import { Prisma } from "@prisma/client";
import { USER_SELECT } from '@/users/user.select';

export const PAWLOG_IMAGE_SELECT = 
    Prisma.validator<Prisma.PawLogImageSelect>()
    ({
        id: true,
        img: true,
    });

export const PAWLOG_SELECT = 
    Prisma.validator<Prisma.PawLogSelect>()
    ({
        id: true,
        title: true,
        content: true,
        author: {
            select: USER_SELECT,
        },
        createdAt: true,
        updatedAt: true,
        images: {
            select: PAWLOG_IMAGE_SELECT,
        }
    });

export const PAWLOG_ORDERBY = {
    OLDEST: Prisma.validator<Prisma.PawLogOrderByWithRelationInput>()
    ({
        createdAt: 'asc',
    }),

    NEWEST: Prisma.validator<Prisma.PawLogOrderByWithRelationInput>()
    ({
        createdAt: 'desc',
    }),

    UPDATED: Prisma.validator<Prisma.PawLogOrderByWithRelationInput>()
    ({
        updatedAt: 'desc',
    }),
};
