import { Prisma } from "@prisma/client";

export const SHELTER_IMAGE_SELECT = 
    Prisma.validator<Prisma.ShelterImageSelect>()
    ({
        id: true,
        img: true,
    });

export const SHELTERS_SELECT = 
    Prisma.validator<Prisma.ShelterSelect>()
    ({
        id: true,
        name: true,
        address: true,
        imgBanner: true,
        images: {
            select: SHELTER_IMAGE_SELECT
        },
        _count: {
            select: { 
                animals: true 
            }
        }
    });

export const SHELTER_SELECT = 
    Prisma.validator<Prisma.ShelterSelect>()
    ({
        id: true,
        name: true,
        address: true,
        imgBanner: true,
        images: {
            select: SHELTER_IMAGE_SELECT
        },
    });

export const SHELTER_DETAIL_SELECT = 
    Prisma.validator<Prisma.ShelterSelect>()
    ({
        id: true,
        name: true,
        address: true,
        addressDetail: true,
        phone: true,
        operatingHours: true,
        description: true,
        imgBanner: true,
        images: {
            select: SHELTER_IMAGE_SELECT,
        },
    });

export const SHELTER_ORDERBY = {
    OLDEST: Prisma.validator<Prisma.ShelterOrderByWithRelationInput>()
    ({
        createdAt: 'asc',
    }),

    NEWEST: Prisma.validator<Prisma.ShelterOrderByWithRelationInput>()
    ({
        createdAt: 'desc',
    }),

    UPDATED: Prisma.validator<Prisma.ShelterOrderByWithRelationInput>()
    ({
        updatedAt: 'desc',
    }),
};
