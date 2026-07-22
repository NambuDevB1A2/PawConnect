import { Prisma } from "@prisma/client";

export const SHELTER_SELECT = 
    Prisma.validator<Prisma.ShelterSelect>()
    ({
        id: true,
        name: true,
        imgBanner: true,
    });

export const SHELTER_IMAGE_SELECT = 
    Prisma.validator<Prisma.ShelterImageSelect>()
    ({
        id: true,
        img: true,
    });