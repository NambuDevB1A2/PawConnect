import { Prisma } from "@prisma/client";

// include-> animal include 중복 상수
export const ADOPTION_ANIMAL_INCLUDE ={
    animal: {
        include: {
        shelter: { select: { name: true } },
        animalSpecies: { select: { name: true } },
        animalBreed: { select: { name: true } },
        },
    },
} as const;

export const ADOPTION_ORDERBY = {
    OLDEST: Prisma.validator<Prisma.AdoptionOrderByWithRelationInput>()
    ({
        createdAt: 'asc',
    }),

    NEWEST: Prisma.validator<Prisma.AdoptionOrderByWithRelationInput>()
    ({
        createdAt: 'desc',
    }),

    UPDATED: Prisma.validator<Prisma.AdoptionOrderByWithRelationInput>()
    ({
        updatedAt: 'desc',
    }),
};
